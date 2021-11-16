import { validateName } from "~/utils/validator"
import { validateEmail } from "~/utils/validator"

export default {
    data() {
        return {
            nameInput: '',
            emailInput: '',
            subjectInput: '',
            messageInput: '',

            nameInputErr: '',
            emailInputErr: '',
            subjectInputErr: '',
            messageInputErr: '',

            isFileSupportTicketBtnTappable: true
        }
    },

    methods: {
        fileSupportTicket() {
            if (this.validateFormFileSupportTicket()) {
                this.isFileSupportTicketBtnTappable = false
                const data = { user_name: this.nameInput, user_email: this.emailInput, support_subject: this.subjectInput, support_message: this.messageInput }

                fetch('http://10.0.2.2:8080/FileSupportTicket', {
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
                            this.isFileSupportTicketBtnTappable = true
                        })
                    })
                    .then(response => {
                        switch (response.Response) {
                            case 'Operation Success':
                                this.$navigateBack()
                                break
                            default:
                                this.isFileSupportTicketBtnTappable = true
                        }
                    })
            }
        },

        validateFormFileSupportTicket() {
            let isValidationOK = true
            //Name validation
            let nameValidationRes = validateName(this.nameInput.trim())
            if (nameValidationRes !== null) {
                this.nameInputErr = nameValidationRes
                isValidationOK = false
            }
            //E-mail validation
            let emailValidationRes = validateEmail(this.emailInput.trim())
            if (emailValidationRes !== null) {
                this.emailInputErr = emailValidationRes
                isValidationOK = false
            }
            //Subject validation
            if (this.subjectInput.trim() == '') {
                this.subjectInputErr = 'Ingresa un asunto'
                isValidationOK = false
            }
            //Message validation
            if (this.messageInput.trim() == '') {
                this.messageInputErr = 'Ingresa un mensaje'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) {
                return true
            } else {
                return false
            }
        },

        onNameTxtChange() {
            this.nameInputErr = ''
        },
        onEmailTxtChange() {
            this.emailInputErr = ''
        },
        onSubjectTxtChange() {
            this.subjectInputErr = ''
        },
        onMessageTxtChange() {
            this.messageInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}