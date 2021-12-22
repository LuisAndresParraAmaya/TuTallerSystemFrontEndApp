const he = require('he')
import { ApplicationSettings } from '@nativescript/core'
import { formatQualification } from '~/utils/formatter'
import { SnackBar } from '@nativescript-community/ui-material-snackbar'
import { translateWeekDay } from '~/utils/translators'
import { formatTimeHM } from '~/utils/formatter'

export default {
    props: ['workshopOffice'],
    data() {
        return {
            workshopOfficeEvaluationList: '',
            workshopOfficeAttentionList: [],
            he: he,
            workshopOfficeEvaluationOptionsUser: ['Eliminar evaluación'],
            workshopOfficeEvaluationOptionsAdmin: ['Eliminar evaluación como administrador'],
            userType: '',
            userRut: '',

            formatQualification: formatQualification,
            translateWeekDay: translateWeekDay,
            formatTimeHM: formatTimeHM
        }
    },
    methods: {
        //Once the page is loaded, make sure to get the current user's Rut and type (system admin or normal user), also get the actual office information and its evaluation list
        loadPageData() {
            this.userType = ApplicationSettings.getString('userType')
            this.userRut = ApplicationSettings.getString('user')
            this.getWorkshopOfficeInformation()
            this.getWorkshopOfficeEvaluationList()
            this.getWorkshopOfficeAttentionList()
        },

        //Delete a evaluation from a workshop office from the user's POV, requiring the evaluation id and the Rut from the currently logged in user 
        deleteWorkshopOfficeEvaluation(evaluationId) {
            confirm({
                title: '¿Estás seguro de eliminar la evaluación?',
                message: 'Podrás volver a realizar otra evaluación a esta sucursal automotriz cuando recibas nuevamente alguno de sus servicios.',
                okButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result) {
                    const data = { id: evaluationId, user_user_rut: this.userRut }

                    fetch('http://10.0.2.2:8080/DeleteWorkshopOfficeEvaluation', {
                        method: 'POST',
                        body: JSON.stringify({ data }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(res => res.json())
                        .catch(error => {
                            console.error('Error:', error)
                            const snackBar = new SnackBar()
                            snackBar.simple('No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.')
                        })
                        .then(response => {
                            switch (response.Response) {
                                case 'Operation Success':
                                    this.loadPageData()
                                    break
                                case 'Evaluation not found':
                                    const snackBar = new SnackBar()
                                    snackBar.simple('No puedes eliminar esta evaluación. Inténtalo más tarde.')
                            }
                        })
                }
            })
        },

        //Get the evaluation list for the current workshop office, needing its id
        getWorkshopOfficeEvaluationList() {
            const data = { workshop_office_id: this.workshopOffice.workshop_office_id }

            fetch('http://10.0.2.2:8080/WorkshopOfficeEvaluationList', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.workshopOfficeEvaluationList = response.WorkshopOfficeEvaluationList
                            break
                        case 'Operation Failed':
                            console.log('Evaluations not found')
                    }
                })
        },

        //Get the workshop office general information. It requires the workshop office id
        getWorkshopOfficeInformation() {
            const data = { workshop_office_id: this.workshopOffice.workshop_office_id }

            fetch('http://10.0.2.2:8080/WorkshopOffice', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.workshopOffice.workshop_office_id = response.WorkshopOffice[0].workshop_office_id
                            this.workshopOffice.workshop_name = response.WorkshopOffice[0].workshop_name
                            this.workshopOffice.workshop_number = response.WorkshopOffice[0].workshop_number
                            this.workshopOffice.workshop_description = response.WorkshopOffice[0].workshop_description
                            this.workshopOffice.workshop_office_phone = response.WorkshopOffice[0].workshop_office_phone
                            this.workshopOffice.workshop_office_commune = response.WorkshopOffice[0].workshop_office_commune
                            this.workshopOffice.workshop_office_region = response.WorkshopOffice[0].workshop_office_region
                            this.workshopOffice.workshop_office_address = response.WorkshopOffice[0].workshop_office_address
                            this.workshopOffice.workshop_office_average_rating = response.WorkshopOffice[0].workshop_office_average_rating
                            this.workshopOffice.workshop_office_total_evaluations = response.WorkshopOffice[0].workshop_office_total_evaluations
                            break
                        case 'Office not found':
                            console.log('Office not found')
                    }
                })
        },

        getWorkshopOfficeAttentionList() {
            const data = { workshop_office_id: this.workshopOffice.workshop_office_id }

            fetch('http://10.0.2.2:8080/MyWorkshopOfficeAttention', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                })
                .then(response => {
                    switch (response.Response) {
                        default:
                            for (let i = 0; i < response.response.length; i++) {
                                this.$set(this.workshopOfficeAttentionList, i, response.response[i])
                            }
                            break
                        case 'Attention Not Found':
                            console.log('Attention not found')
                    }
                })
        },

        //If the user selects an option from the DropDown that contains the evaluation options
        onWorkshopOfficeEvaluationOptionChange(event, evaluationId, evaluationUserRut, evaluationRating, evaluationReview) {
            //Clears the index for the DropDown that contains the evaluation options, so the text doesn't appear into it
            event.object.getViewById('ddWorkshopOfficeEvaluationOptions').selectedIndex = null
            //Deletes evaluation as user or admin, based on the currently logged in user (maker of the evaluation or an admin)
            if (evaluationUserRut == this.userRut) this.deleteWorkshopOfficeEvaluation(evaluationId)
            else if (evaluationUserRut !== this.userRut && this.userType == 1) this.goToModerateWorkshopOfficeEvaluationPage(evaluationId, evaluationRating, evaluationReview, evaluationUserRut)
        },

        //For each evaluation, set the correspondent list for its options based on the currently logged in user
        getWorkshopOfficeEvaluationsOptions(evaluationUserRut) {
            if (evaluationUserRut == this.userRut) return this.workshopOfficeEvaluationOptionsUser
            else if (evaluationUserRut !== this.userRut && this.userType == 1) return this.workshopOfficeEvaluationOptionsAdmin
        },

        //Go to moderate workshop office evaluation. It requires the evaluation id, its rating, review and the rut from the user that made it
        goToModerateWorkshopOfficeEvaluationPage(evaluationId, evaluationRating, evaluationReview, evaluationUserRut) {
            this.$navigator.navigate('/ModerateWorkshopOfficeEvaluation', { props: { evaluationId: evaluationId, evaluationRating: evaluationRating, evaluationReview: evaluationReview, evaluationUserRut: evaluationUserRut, workshopOffice: this.workshopOffice } })
            this.workshopOfficeEvaluationList = ''
        },
        //Show the workshop office service list, requiring that office id and the office attention list. The actualframe allows to show content in that view according to the frame (navigator or accountNav)
        goToWorkshopOfficeServiceListPage() {
            this.$navigator.navigate('/WorkshopOfficeServiceList', { props: { workshopOffice: this.workshopOffice, workshopOfficeAttentionList: this.workshopOfficeAttentionList, actualFrame: 'navigator' } })
        },
        //Show the workshop office employee list, requiring that office id
        goToWorkshopOfficeEmployeeListPage() {
            this.$navigator.navigate('/WorkshopOfficeEmployeeList', { props: { workshopOfficeId: this.workshopOffice.workshop_office_id, actualFrame: 'navigator' } })
        },
        //Go to the file complaint view for a workshop office, requiring the workshopOffice object (to get the workshop id, wokshop name, etc.). Also, user needs to be logged in to use the function
        goToFileWorkshopOfficeComplaintPage() {
            if (ApplicationSettings.getString('user') == undefined) this.$navigator.modal('/Login', { id: 'modalLogin', fullscreen: true })
            else this.$navigator.navigate('/FileWorkshopOfficeComplaint', { props: { workshopOffice: this.workshopOffice, actualFrame: 'navigator' } })
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}