import { translateSubscriptionName } from "~/utils/translators"
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['offerType', 'addOfferData', 'workshopOfficeId'],
    data() {
        return {
            itemList: [],
            itemListNotFoundMsg: '',
            isActivateOfferBtnTappable: true,

            translateSubscriptionName: translateSubscriptionName
        }
    },

    methods: {
        activateOffer() {
            let checkedItemIdList = []
            for (let i = 1; i < this.itemList.length; i++) {//The parent (i = 0) is skipped
                if (this.itemList[i].isChecked) checkedItemIdList.push(this.itemList[i].id)
            }
            //If the checkedItemIdList is not null
            if (checkedItemIdList.length !== 0) {
                this.isActivateOfferBtnTappable = false
                confirm({
                    title: '¿Estás seguro de activar tu oferta?',
                    message: 'Al activarla, los usuarios empezarán a obtener automáticamente un descuento al adquirir alguno de los ítems a los que has asignado tu oferta.',
                    okButtonText: 'Activar',
                    cancelButtonText: 'Cancelar'
                }).then(result => {
                    if (result) {
                        const data = { offer: this.addOfferData, offer_item_id_list: checkedItemIdList }

                        fetch('http://10.0.2.2:8080/ActivateOffer', {
                            method: 'POST',
                            body: JSON.stringify({ data }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json())
                            .catch(error => {
                                console.error('Error:', error)
                                alert({
                                    title: 'Error',
                                    message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                                    okButtonText: 'OK'
                                }).then(() => this.isActivateOfferBtnTappable = true)
                            })
                            .then(response => {
                                switch (response.Response) {
                                    case 'Operation Success':
                                        this.$navigateBack()
                                        break
                                    case 'One of the offers are already activated':
                                        const snackBar = new SnackBar()
                                        snackBar.simple('Uno de los ítems seleccionados ya se encuentra con una oferta activada actualmente.')
                                        this.isActivateOfferBtnTappable = true
                                }
                            })
                    } else this.isActivateOfferBtnTappable = true
                })
            } else {
                const snackBar = new SnackBar()
                snackBar.simple('Para crear tu oferta debes asignarla al menos a un ítem')
            }
        },

        getItemList() {
            if (this.offerType == 'subscriptionPlan') {
                this.itemListNotFoundMsg = 'No se cuentan con planes de suscripción ingresadas en la plataforma o estas actualmente disponen de una oferta activa. Intenta ingresar un plan de suscripción o esperar a que las ofertas correspondientes lleguen a su periodo de fin.'
                this.itemList.push({ id: 'parentCheckBox', name: 'Planes de suscripción', isChecked: false })
                this.getSubscriptionList()
            }
            else if (this.offerType == 'workshopOfficeService') {
                this.itemListNotFoundMsg = 'La sucursal automotriz no cuenta con servicios ingresados o estos actualmente disponen de una oferta activa. Intenta ingresar un servicio automotriz a tu sucursal o esperar a que las ofertas correspondientes lleguen a su periodo de fin.'
                this.itemList.push({ id: 'parentCheckBox', name: 'Servicios automotrices', isChecked: false })
                this.getWorkshopOfficeServiceList()
            }
        },

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
                            for (let i = 0; i <= response.SubscriptionList.length; i++) {
                                //Only lists the subscriptions that doesn't have offers currently
                                if (response.SubscriptionList[i].offer_id == 1) this.itemList.push({ id: response.SubscriptionList[i].id, name: this.translateSubscriptionName(response.SubscriptionList[i].name), isChecked: false })
                            }
                            break
                        case 'Operation Failed':
                            console.log('Subscriptions not found')
                    }
                })
        },

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
                            for (let i = 0; i <= response.response.length; i++) {
                                //Only lists the workshop office services that doesn't have offers currently
                                if (response.response[i].offer_id == 1) this.itemList.push({ id: response.response[i].id, name: response.response[i].workshop_office_service_name, isChecked: false })
                            }
                            break
                        case 'Services not found':
                            console.log('Workshop office services not found')
                    }
                })
        },

        //Registers the checked/unchecked for multiple or a single checkBox in the itemList
        onItemListCheckBoxChange(event, index, id) {
            if (id == 'parentCheckBox') {
                for (let i = 1; i < this.itemList.length; i++) {//The parent (i = 0) is skipped
                    this.itemList[i].isChecked = event.value //event value can be true or false
                }
            } else {
                this.itemList[index].isChecked = event.value
            }
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}