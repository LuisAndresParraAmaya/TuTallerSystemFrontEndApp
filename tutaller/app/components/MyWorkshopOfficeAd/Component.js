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
                title: 'Ingresa el monto en CLP que quieres pujar',
                message: 'El anuncio estará activo durante 24 horas.',
                inputType: inputType.number,
                okButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(bidInput => {
                if (bidInput.result) {
                    const bid = bidInput.text
                    if (this.validateFormActivateWorkshopOfficeAd(bid)) {
                        this.$navigator.navigate('/Payment', {
                            props: {
                                itemId: this.myWorkshopAd.id,
                                itemDescription: this.myWorkshopAd.workshop_office_ad_name,
                                price: bid,
                                operationType: 'payWorkshopAd',
                                buyerId: 0,
                                merchantName: 'TuTaller'
                            }, frame: 'accountNav'
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