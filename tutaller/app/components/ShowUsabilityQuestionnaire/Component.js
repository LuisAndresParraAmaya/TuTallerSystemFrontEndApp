import { ApplicationSettings } from "@nativescript/core"
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['usabilityQuestionnaire'],
    data() {
        return {
            isRealizeBtnTappable: true,
            isDoLaterBtnTappable: true,
            isStopRemindBtnTappable: true
        }
    },

    methods: {
        //Do the questionnaire later (in 1 day it will show again)
        doUsabilityQuestionnaireLater() {
            this.changeUserUsabilityQuestionnaireStatus('dolater')
        },
        //Stop reminding/showing the usability questionnaire to the user. It will never show again
        stopRemindingUsabilityQuestionnaire() {
            this.changeUserUsabilityQuestionnaireStatus('dontremind')
        },
        //Change the user usability questionnaire status
        changeUserUsabilityQuestionnaireStatus(newStatus) {
            this.changeButtonsTappableStatus(false)
            const data = { usability_questionnaire_id: this.usabilityQuestionnaire.id, user_user_rut: ApplicationSettings.getString('user'), status: newStatus }

            fetch('http://10.0.2.2:8080/ChangeUserUsabilityQuestionnaireStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data })
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    const snackBar = new SnackBar()
                    snackBar.simple('No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.')
                    this.changeButtonsTappableStatus(true)
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.closeModal()
                            break
                        case 'Cannot change the status':
                            const snackBar = new SnackBar()
                            snackBar.simple('El estado del cuestionario ya ha sido cambiado al solicitado.')
                            this.changeButtonsTappableStatus(true)
                    }
                })
        },

        changeButtonsTappableStatus(status) {
            this.isRealizeBtnTappable = status
            this.isDoLaterBtnTappable = status
            this.isStopRemindBtnTappable = status
        },

        goToUsabilityQuestionnairePage() {
            this.$navigator.navigate('/UsabilityQuestionnaire', { props: { usabilityQuestionnaireId: this.usabilityQuestionnaire.id }, frame: 'modalShowUsabilityQuestionnaire' })
        },
        //Close the current modal
        closeModal() {
            this.$modal.close()
        }
    }
}