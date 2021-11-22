import { translateSubscriptionName } from "~/utils/translators"
import { formatDate } from "~/utils/formatter"
const sqlite = require('nativescript-sqlite')

export default {
    props: ['offerType', 'workshopOfficeId'],
    data() {
        return {
            offerList: [],
            titleType: '',
            translateSubscriptionName: translateSubscriptionName,
            formatDate: formatDate
        }
    },

    methods: {
        //Navigates to the view that show the offer detail, sending the offer itself according to the selected item and the offer type (suscriptionPlan or workshopOfficeService)
        showOffer(event) {
            this.$navigator.navigate('/Offer', { props: { offer: event.item, offerType: this.offerType }, frame: 'accountNav', backstackVisible: false })
        },

        //Gets the offer list, depending on the offer type, to call the functions to get the correspondent list
        getOfferList() {
            //Empty the current offer list first
            this.offerList = []
            //Change the GUI title and get the offer list depending on the requested item (subscription plan or workshop office service)
            if (this.offerType == 'subscriptionPlan') {
                this.titleType = 'planes'
                this.getSubscriptionList()
            }
            else if (this.offerType == 'workshopOfficeService') {
                this.titleType = 'servicios'
                this.getWorkshopOfficeServiceList()
            }
        },

        //Gets the suscription plan list. If it succeds, it proceds to call the function to add the offer and its suscriptions locally in SQLite
        getSubscriptionList() {
            fetch('http://10.0.2.2:8080/SubscriptionList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.addOfferItemListTemp(response.SubscriptionList)
                            break
                        case 'Operation Failed':
                            console.log('Subscriptions not found')
                    }
                })
        },

        //Gets the workshop office service list. If it succeds, it proceds to call the function to add the offer and its workshop office services locally in SQLite
        getWorkshopOfficeServiceList() {
            const data = { workshop_office_id: this.workshopOfficeId }
            fetch('http://10.0.2.2:8080/WorkshopOfficeServiceList', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        default:
                            this.addOfferItemListTemp(response.response)
                            break
                        case 'Services not found':
                            console.log('Services not found')
                    }
                })
        },

        //Adds the offer, including its items (suscription or service), locally in SQLite
        addOfferItemListTemp(itemList) {
            new sqlite('tutaller.db', (err, db) => {
                db.execSQL('DROP TABLE IF EXISTS offer_item;')
                db.execSQL('CREATE TABLE offer_item (id INTEGER, offer_name TEXT NOT NULL, offer_discount INTEGER NOT NULL, offer_valid_until_date TEXT NOT NULL, offer_valid_until_time TEXT NOT NULL, offer_item_name TEXT NOT NULL);')
                itemList.forEach(element => {
                    let addOfferItemValues = [element.offer_id, element.offer_name, element.offer_discount, element.offer_valid_until_date, element.offer_valid_until_time]
                    if (this.offerType == 'subscriptionPlan') addOfferItemValues.push(element.name)
                    else if (this.offerType == 'workshopOfficeService') addOfferItemValues.push(element.workshop_office_service_name)
                    db.execSQL('INSERT INTO offer_item (id, offer_name, offer_discount, offer_valid_until_date, offer_valid_until_time, offer_item_name) VALUES (?, ?, ?, ?, ?, ?)', addOfferItemValues)
                })
                let promise = ''
                promise = db.all('SELECT id, offer_name, offer_discount, offer_valid_until_date, offer_valid_until_time FROM offer_item WHERE offer_discount NOT IN (0) GROUP BY id;')
                promise.then((resultSet) => {
                    for (let i = 0; i < resultSet.length; i++) {
                        this.offerList.push({ id: resultSet[i][0], offer_name: resultSet[i][1], offer_discount: resultSet[i][2], offer_valid_until_date: resultSet[i][3], offer_valid_until_time: resultSet[i][4] })
                    }
                })
            })
        },

        //Go to the Add offer page, sending the offer type (suscription plan or workshop office service) and the workshop office id (if the offer type is workshop office service)
        goToAddOfferPage() {
            this.$navigator.navigate('/AddOffer', { props: { offerType: this.offerType, workshopOfficeId: this.workshopOfficeId }, frame: 'accountNav', backstackVisible: false })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}