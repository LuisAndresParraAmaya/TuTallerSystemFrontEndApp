import { formatQualification } from "~/utils/formatter"
import { ApplicationSettings } from '@nativescript/core'
import { SnackBar } from "@nativescript-community/ui-material-snackbar"
import { showSnackBarInsufficientPrivileges } from "~/utils/msg"

export default {
    props: ['evaluationId', 'evaluationRating', 'evaluationReview', 'evaluationUserRut', 'workshopOffice'],
    data() {
        return {
            moderateReasonInput: '',
            moderateReasonInputErr: '',

            isModerateEvaluationTappable: true,

            formatQualification: formatQualification
        }
    },

    methods: {
        moderateWorkshopOfficeEvaluation() {
            if (this.validateFormModerateWorkshopOfficeEvaluation()) {
                this.isModerateEvaluationTappable = false
                confirm({
                    title: '¿Estás seguro de moderar la evaluación del usuario?',
                    message: 'Esto eliminará permanentemente su evaluación y se le enviará a su correo electrónico la razón que has redactado.',
                    okButtonText: 'Moderar',
                    cancelButtonText: 'Cancelar'
                }).then(result => {
                    if (result) {
                        const data = { id: this.evaluationId, user_user_rut: this.evaluationUserRut, moderate_reason: this.moderateReasonInput.trim(), workshop_evaluation_rating: this.evaluationRating, workshop_evaluation_review: this.evaluationReview, workshop_name: this.workshopOffice.workshop_name, workshop_office_region: this.workshopOffice.workshop_office_region, workshop_office_commune: this.workshopOffice.workshop_office_commune, workshop_office_address: this.workshopOffice.workshop_office_address }

                        fetch('http://10.0.2.2:8080/ModerateWorkshopOfficeEvaluation', {
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
                                    case 'Operation Success':
                                        this.$navigateBack()
                                        break
                                    case 'Evaluation not found':
                                        const snackBar = new SnackBar()
                                        snackBar.simple('No puedes moderar esta evaluación. Inténtalo más tarde.')
                                        this.isModerateEvaluationTappable = true
                                }
                            })
                    } else {
                        this.isModerateEvaluationTappable = true
                    }
                })
            }
        },

        validateFormModerateWorkshopOfficeEvaluation() {
            let isValidationOK = true
            //Check if logged in user type is admin
            if (ApplicationSettings.getString('userType') !== '1') {
                showSnackBarInsufficientPrivileges()
                isValidationOK = false
            }
            //Null moderate reason input
            if (this.moderateReasonInput.trim() == '') {
                this.moderateReasonInputErr = 'Ingresa una razón de moderación.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        onModerateReasonTxtChange() {
            this.moderateReasonInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}