import { ApplicationSettings } from '@nativescript/core'
import { SnackBar } from '@nativescript-community/ui-material-snackbar'
import { validateName } from '~/utils/validator'
import { validatePhone } from '~/utils/validator'

export default {
    data() {
        return {
            phoneCountryCodeList: ['+56 Chile'],

            workshopNameInput: '',
            workshopPhoneInput: '',
            workshopPhoneCountryCodeInput: '',
            workshopDescriptionInput: '',
            workshopPostulationMessage: '',

            workshopNameInputErr: '',
            workshopPhoneInputErr: '',
            workshopPhoneCountryCodeInputErr: '',
            workshopDescriptionInputErr: '',
            workshopPostulationMessageErr: '',

            isSendBtnTappable: true
        }
    },

    methods: {
        sendPostulation() {
            if (this.validateFormSendPostulation()) {
                this.isSendBtnTappable = false
                const data = { user_rut: ApplicationSettings.getString('user'), workshop_name: this.workshopNameInput.trim(), workshop_number: this.workshopPhoneInput.trim(), workshop_description: this.workshopDescriptionInput.trim(), postulation_message: this.workshopPostulationMessage.trim() }

                fetch('http://10.0.2.2:8080/SendPostulation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data })
                }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        switch (response.Response) {
                            case 'Operation Success':
                                this.$navigateBack()
                                break
                            case 'Operation Failed':
                                this.isSendBtnTappable = true
                        }
                    })
            }
        },

        validateFormSendPostulation() {
            let isValidationOK = true
            //Workshop name validation
            let workshopNameValidationRes = validateName(this.workshopNameInput.trim())
            if (workshopNameValidationRes !== null) {
                this.workshopNameInputErr = workshopNameValidationRes
                isValidationOK = false
            }
            //Workshop phone validation
            let workshopPhoneValidationRes = validatePhone(this.workshopPhoneInput.trim(), this.workshopPhoneCountryCodeInput.trim())
            if (workshopPhoneValidationRes !== null) {
                this.workshopPhoneInputErr = workshopPhoneValidationRes
                this.workshopPhoneCountryCodeInputErr = ' '
                isValidationOK = false
            }
            //Null workshop description input validation
            if (this.workshopDescriptionInput.trim() == '') {
                this.workshopDescriptionInputErr = 'Ingresa la descripción de tu taller.'
                isValidationOK = false
            }
            //Null workshop message input validation
            if (this.workshopPostulationMessage.trim() == '') {
                this.workshopPostulationMessageErr = 'Ingresa un mensaje para tu postulación.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        selectPhoneCountryCode(event) {
            event.object.getViewById('txtPhoneCountryCode').clearFocus()
            action('Código de país', 'Cancelar', this.phoneCountryCodeList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.workshopPhoneCountryCodeInput = result
                    }
                })
        },

        onWorkshopNameTxtChange() {
            this.workshopNameInputErr = ''
        },
        onWorkshopPhoneTxtChange() {
            this.workshopPhoneInputErr = ''
            this.workshopPhoneCountryCodeInputErr = ''
        },
        onWorkshopDescriptionTxtChange() {
            this.workshopDescriptionInputErr = ''
        },
        onWorkshopPostulationMessageTxtChange() {
            this.workshopPostulationMessageErr = ''
        },

        goToPreviousPage() {
            const snackBar = new SnackBar()
            snackBar.simple('Su postulación fue enviada correctamente a los administradores de TuTaller')
            this.$navigateBack()
        }
    },
}