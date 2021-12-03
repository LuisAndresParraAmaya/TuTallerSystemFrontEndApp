import { action } from "@nativescript/core"
import { ApplicationSettings } from "@nativescript/core"
import { formatQualificationToNumber } from "~/utils/formatter"
import { showSnackBarInsufficientPrivileges } from "~/utils/msg"

export default {
    props: ['workshopOfficeWork'],
    data() {
        return {
            qualificationList: ['5 Estrellas', '4 Estrellas', '3 Estrellas', '2 Estrellas', '1 Estrella'],

            qualificationInputLabel: '',
            qualificationInput: undefined,
            reviewInput: '',

            qualificationInputErr: '',
            reviewInputErr: '',

            isAddEvaluationBtnTappable: true
        }
    },

    methods: {
        addWorkshopOfficeEvaluation() {
            if (this.validateFormAddWorkshopOfficeEvaluation()) {
                this.isAddEvaluationBtnTappable = false
                const data = { workshop_evaluation_rating: this.qualificationInput, workshop_evaluation_review: this.reviewInput.trim(), workshop_office_id: this.workshopOfficeWork.workshop_office_id, user_user_rut: ApplicationSettings.getString('user'), workshop_office_work_id: this.workshopOfficeWork.workshop_office_work_id }

                fetch('http://10.0.2.2:8080/AddWorkshopOfficeEvaluation', {
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
                            this.isAddEvaluationBtnTappable = true
                        })
                    })
                    .then(response => {
                        switch (response.Response) {
                            case 'Operation Success':
                                this.$navigateBack()
                                break
                            case 'Could not add the evaluation':
                                console.log('Could not add the evaluation')
                                this.isAddEvaluationBtnTappable = true
                                break
                            case 'Could not update the work status':
                                console.log('Could not update the work status')
                                this.isAddEvaluationBtnTappable = true
                        }
                    })
            }
        },

        validateFormAddWorkshopOfficeEvaluation() {
            let isValidationOK = true
            //Check it the logged user is the customer
            if (!this.isUserACustomer()) {
                this.showSnackBarInsufficientPrivileges()
                isValidationOK = false
            }
            //Qualification validation
            if (this.qualificationInput == undefined) {
                this.qualificationInputErr = 'Ingresa una calificación.'
                isValidationOK = false
            }
            //Review validation
            if (this.reviewInput.trim() == '') {
                this.reviewInputErr = 'Ingresa una reseña.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        selectQualification(event) {
            event.object.getViewById('txtQualification').clearFocus()
            action('Calificación', 'Cancelar', this.qualificationList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.qualificationInputLabel = result
                        this.qualificationInput = formatQualificationToNumber(result)
                    }
                })
        },

        onQualificationTxtChange() {
            this.qualificationInputErr = ''
        },
        onReviewTxtChange() {
            this.reviewInputErr = ''
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