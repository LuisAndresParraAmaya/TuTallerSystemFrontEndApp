import { validateName } from "~/utils/validator"
import { validateEmail } from "~/utils/validator"
import { ApplicationSettings } from "@nativescript/core"
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['workshopOfficeWork'],
    data() {
        return {
            messageInput: '',
            messageInputErr: '',

            isFileCaseBtnTappable: true
        }
    },

    methods: {
        fileWorkshopOfficeWorkDisputeCase() {
            if (this.validateFormFileWorkshopOfficeWorkDisputeCase()) {
                this.isFileCaseBtnTappable = false
                const data = { workshop_office_work_case_msg: this.messageInput.trim(), workshop_office_work_id: this.workshopOfficeWork.workshop_office_work_id, user_user_rut: ApplicationSettings.getString('user') }

                fetch('http://10.0.2.2:8080/FileWorkshopOfficeWorkDisputeCase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data })
                }).then(res => res.json())
                    .catch(error => {
                        console.error('Error:', error)
                        alert({
                            title: 'Error',
                            message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                            okButtonText: 'OK'
                        }).then(() => {
                            this.isFileCaseBtnTappable = true
                        })
                    })
                    .then(response => {
                        switch (response.Response) {
                            case 'Operation Success':
                                this.$navigator.navigate('/WorkshopOfficeWorkList', { frame: 'serviceNav', clearHistory: true })
                                break
                            case 'Work must be in the phase where the customer has to confirm its completion':
                                const snackBar = new SnackBar()
                                snackBar.simple('No se te permite abrir un caso de disputa en el estado actual del servicio.')
                                this.isFileCaseBtnTappable = true
                        }
                    })
            }
        },

        validateFormFileWorkshopOfficeWorkDisputeCase() {
            let isValidationOK = true
            //Check it the logged user is the customer
            if (!this.isUserACustomer()) {
                this.showSnackBarInsufficientPrivileges()
                isValidationOK = false
            }
            //Message validation
            if (this.messageInput.trim() == '') {
                this.messageInputErr = 'Ingresa un mensaje'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        onMessageTxtChange() {
            this.messageInputErr = ''
        },

        //Check if the logged in user is the customer, based on the Rut associated to the work and the user type (2 = regular user)
        isUserACustomer() {
            return this.workshopOfficeWork.customer_rut == ApplicationSettings.getString('user') && ApplicationSettings.getString('userType') == 2
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}