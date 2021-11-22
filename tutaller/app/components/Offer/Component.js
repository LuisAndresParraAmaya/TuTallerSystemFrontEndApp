import { formatDate } from "~/utils/formatter"
const sqlite = require('nativescript-sqlite')

export default {
    props: ['offer', 'offerType'],
    data() {
        return {
            formatDate: formatDate,
            activatedToMsg: '',
            offerItemList: []
        }
    },

    methods: {
        //Change the view content (msg, item list) according to the offer type (suscription plan or workshop office service)
        defineInformationByOfferType() {
            if (this.offerType == 'subscriptionPlan') {
                this.activatedToMsg = 'Se encuentra activada en los siguientes planes'
            }
            else if (this.offerType == 'workshopOfficeService') {
                this.activatedToMsg = 'Se encuentra activada en los siguientes servicios'
            }
            this.getOfferItemListTemp()
        },

        //From SQLite, it gets the offer name list according to the previously selected offer
        getOfferItemListTemp() {
            new sqlite('tutaller.db', (err, db) => {
                let promise = ''
                promise = db.all('SELECT offer_item_name FROM offer_item WHERE offer_discount NOT IN (0) AND id = ?', [this.offer.id])
                promise.then((resultSet) => {
                    for (let i = 0; i < resultSet.length; i++) {
                        this.offerItemList.push(resultSet[i][0])
                    }
                })
            })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}