import { inputType } from "@nativescript/core"
import { translateActiveInactiveStatus } from "~/utils/translators"
import { validateMoney } from "~/utils/validator"
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['myWorkshopAd'],
    data() {
        return {
            translateActiveInactiveStatus: translateActiveInactiveStatus,
            isActivateAdTappable: true
        }
    },

    methods: {
        activateWorkshopOfficeAd() {
            this.isActivateAdTappable = false
            prompt({
                title: 'Ingresa el monto que quieres pujar',
                message: 'El anuncio estará activo durante 24 horas.',
                inputType: inputType.number,
                okButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(bidInput => {
                if (bidInput.result) {
                    if (this.validateFormActivateWorkshopOfficeAd(bidInput.text)) {
                        const data = { id: this.myWorkshopAd.id, workshop_office_ad_bid: bidInput.text }
                        fetch('http://10.0.2.2:8080/AdvertiseWorkShopOfficeAd', {
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
                                }).then(() => this.isActivateAdTappable = true)
                            })
                            .then(response => {
                                switch (response.Response) {
                                    case 'Operation Success':
                                        this.$navigateBack()
                                        break
                                    case 'Ad already activated':
                                        const snackBar = new SnackBar()
                                        snackBar.simple('Para efectuar otra puja al mismo anuncio, debes esperar 24 horas desde su activación.')
                                        this.isActivateAdTappable = true
                                        break
                                    case 'Operation Failed':
                                        this.isActivateAdTappable = true
                                }
                            })
                    } else {
                        this.isActivateAdTappable = true
                    }
                } else {
                    this.isActivateAdTappable = true
                }
            })
        },

        validateFormActivateWorkshopOfficeAd(bid) {
            let isValidationOK = true
            //Bid validation
            let bidValidationRes = validateMoney(bid)
            if (bidValidationRes !== null) {
                const snackBar = new SnackBar()
                snackBar.simple(bidValidationRes)
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}