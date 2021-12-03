import { ApplicationSettings } from "@nativescript/core"
import { showSnackBarInsufficientPrivileges } from "~/utils/msg"
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['workshopOfficeWork'],
    data() {
        return {
            workshopOfficeWorkCurrentStatusDescription: '',

            workshopOfficeMilestoneList: '',
            workshopOfficeCurrentMilestone: '',
            milestoneProgressCols: '',

            workshopOfficeWorkAdvanceList: '',

            workshopOfficeEmployeeList: '',

            doServiceActionBtnText: '',
            isDoServiceActionBtnHidden: true,
            isShowTechnicalReportBtnHidden: true,
            isGoToAddWorkshopOfficeWorkAdvancePageBtnHidden: true
        }
    },
    methods: {
        //Requests to do a service action depending on the currently logged in user (customer/technician) and actual work milestone
        doServiceAction() {
            switch (this.workshopOfficeCurrentMilestone.workshop_office_work_milestone_name) {
                //Only the employee is allowed to confirm the vehicle reception
                case 'Recepción del vehículo':
                    if (this.isUserATechnician()) {
                        confirm({
                            message: '¿Estás seguro de confirmar la recepción del vehículo del cliente?',
                            okButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar'
                        }).then(result => {
                            if (result) {
                                this.completeWorkshopOfficeWorkMilestone()
                            }
                        })
                    } else showSnackBarInsufficientPrivileges()
                    break
                //Only the employee can realize the workshop office work technical report
                case 'Inspección del vehículo':
                    if (this.isUserATechnician()) this.goToAddWorkshopOfficeWorkTechnicalReportPage()
                    else showSnackBarInsufficientPrivileges()
                    break
                //Only the employee can inform the vehicle retirement, with the purpose to get to the phase where the client needs to retire their vehicle
                case 'Realización del servicio':
                    if (this.isUserATechnician()) {
                        confirm({
                            title: '¿Estás seguro de informar el retiro del vehículo?',
                            message: 'Procura que el trabajo en el vehículo esté terminado antes de informar al cliente que ya puede venir a retirarlo.',
                            okButtonText: 'Informar',
                            cancelButtonText: 'Cancelar'
                        }).then(result => {
                            if (result) {
                                this.completeWorkshopOfficeWorkMilestone()
                            }
                        })
                    } else showSnackBarInsufficientPrivileges()
                    break
                //Only the employee can confirm that the client has retired their vehicle
                case 'Retiro del vehículo':
                    if (this.isUserATechnician()) {
                        confirm({
                            message: '¿Estás seguro de confirmar que el cliente ya ha retirado su vehículo?',
                            okButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar'
                        }).then(result => {
                            if (result) {
                                this.completeWorkshopOfficeWorkMilestone()
                                this.completeWorkshopOfficeWork()
                            }
                        })
                    } else showSnackBarInsufficientPrivileges()
            }

            switch (this.workshopOfficeWork.workshop_office_work_status) {
                //The employee is the first to confirm that the service work is over
                case 'confirmcompletiontechnician':
                    if (this.isUserATechnician()) {
                        confirm({
                            title: '¿Estás seguro de confirmar la finalización del servicio?',
                            message: 'Al confirmar la finalización del servicio, luego se solicitará la confirmación por parte del cliente también.',
                            okButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar'
                        }).then(result => {
                            if (result) {
                                this.completeWorkshopOfficeWork()
                            }
                        })
                    } else showSnackBarInsufficientPrivileges()
                    break
                //The customer is the last to confirm that the service work is over
                case 'confirmcompletioncustomer':
                    if (this.isUserACustomer()) {
                        this.goToCompleteWorkshopOfficeWorkPage()
                    } else showSnackBarInsufficientPrivileges()
                    break
                //Once the service is definitely completed, then the customer can evaluate the work
                case 'complete':
                    if (this.isUserACustomer()) {
                        this.goToAddWorkshopOfficeEvaluationPage()
                    } else showSnackBarInsufficientPrivileges()
            }
        },

        //Checks the workshop office work current status and changes the view content based on it
        checkWorkshopOfficeWorkStatus() {
            if (this.isUserATechnician() && this.workshopOfficeWork.workshop_office_work_status !== ('complete' && 'completeandevaluated')) {
                this.isGoToAddWorkshopOfficeWorkAdvancePageBtnHidden = false
            } else this.isGoToAddWorkshopOfficeWorkAdvancePageBtnHidden = true

            switch (this.workshopOfficeWork.workshop_office_work_status) {
                case 'confirmcompletiontechnician':
                    this.workshopOfficeWorkCurrentStatusDescription = 'El técnico debe confirmar la finalización del servicio.'
                    if (this.isUserATechnician()) {
                        this.doServiceActionBtnText = 'Confirmar finalización del servicio'
                        this.isDoServiceActionBtnHidden = false
                    } else this.isDoServiceActionBtnHidden = true
                    this.isShowTechnicalReportBtnHidden = false
                    break
                case 'confirmcompletioncustomer':
                    this.workshopOfficeWorkCurrentStatusDescription = 'El cliente debe confirmar la finalización del servicio.'
                    if (this.isUserACustomer()) {
                        this.doServiceActionBtnText = 'Comprobar finalización del servicio'
                        this.isDoServiceActionBtnHidden = false
                    } else this.isDoServiceActionBtnHidden = true
                    this.isShowTechnicalReportBtnHidden = false
                    break
                case 'complete':
                    this.workshopOfficeWorkCurrentStatusDescription = 'El servicio se encuentra finalizado.'
                    if (this.isUserACustomer()) {
                        this.doServiceActionBtnText = 'Evaluar servicio recibido'
                        this.isDoServiceActionBtnHidden = false
                    } else this.isDoServiceActionBtnHidden = true
                    this.isShowTechnicalReportBtnHidden = false
                    break
                case 'completeandevaluated':
                    this.workshopOfficeWorkCurrentStatusDescription = 'El servicio se encuentra finalizado y el cliente ya lo ha evaluado.'
                    this.isDoServiceActionBtnHidden = true
                    this.isShowTechnicalReportBtnHidden = false
            }
        },

        //Get the employee list from the workshop office that is lending the service to the client. At the end get the milestone and advance list because some functions are limited to the employee
        getWorkshopOfficeEmployeeList() {
            const data = { workshop_office_id: this.workshopOfficeWork.workshop_office_id }

            fetch('http://10.0.2.2:8080/WorkshopOfficeEmployeeList', {
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
                        //Assigns the employee list and shows the add advance button if the logged in user is the technician and the work is not completed yet. After, it loads the milestone and advance list
                        default:
                            this.workshopOfficeEmployeeList = response.response
                            this.getWorkshopOfficeWorkMilestoneList()
                            this.getWorkshopOfficeAdvanceList()
                            break
                        case 'Employees not found':
                            console.log('Employees not found')
                            this.getWorkshopOfficeWorkMilestoneList()
                            this.getWorkshopOfficeAdvanceList()
                    }
                })
        },

        //Get the workshop office work milestone list. It requires the workshop office work id.
        getWorkshopOfficeWorkMilestoneList() {
            const data = { workshop_office_work_id: this.workshopOfficeWork.workshop_office_work_id }

            fetch('http://10.0.2.2:8080/WorkshopOfficeWorkMilestoneList', {
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
                            this.workshopOfficeMilestoneList = response.WorkshopOfficeWorkMilestoneList

                            //Repeat the number of columns for the gridlayout based on the workmilestone list length (allows to symmetric stretch horizontally)
                            this.milestoneProgressCols = '*, '.repeat(this.workshopOfficeMilestoneList.length)

                            if (this.workshopOfficeMilestoneList.some(element => element.workshop_office_work_milestone_status == 'working')) {
                                this.workshopOfficeCurrentMilestone = this.workshopOfficeMilestoneList.filter(element => element.workshop_office_work_milestone_status == 'working')[0]
                                this.workshopOfficeWorkCurrentStatusDescription = this.workshopOfficeCurrentMilestone.workshop_office_work_milestone_description

                                //Assign service action button text and permissions (customer/technician)
                                switch (this.workshopOfficeCurrentMilestone.workshop_office_work_milestone_name) {
                                    case 'Recepción del vehículo':
                                        if (this.isUserATechnician()) {
                                            this.doServiceActionBtnText = 'Confirmar recepción del vehículo'
                                            this.isDoServiceActionBtnHidden = false
                                        }
                                        break
                                    case 'Inspección del vehículo':
                                        if (this.isUserATechnician()) {
                                            this.doServiceActionBtnText = 'Realizar ficha técnica'
                                            this.isDoServiceActionBtnHidden = false
                                        }
                                        break
                                    case 'Realización del servicio':
                                        if (this.isUserATechnician()) {
                                            this.doServiceActionBtnText = 'Informar retiro del vehículo'
                                            this.isDoServiceActionBtnHidden = false
                                        }
                                        this.isShowTechnicalReportBtnHidden = false
                                        break
                                    case 'Retiro del vehículo':
                                        if (this.isUserATechnician()) {
                                            this.doServiceActionBtnText = 'Confirmar retiro del vehículo'
                                            this.isDoServiceActionBtnHidden = false
                                        }
                                        this.isShowTechnicalReportBtnHidden = false
                                }
                            } else this.getWorkshopOfficeWorkInfo()
                            break
                        case 'Work milestones not found':
                            console.log('Work milestones not found')
                    }
                })
        },
        //Complete the current workshop office work milestone, then reload the milestone list
        completeWorkshopOfficeWorkMilestone() {
            const data = { workshop_office_work_milestone_id: this.workshopOfficeCurrentMilestone.id, workshop_office_work_id: this.workshopOfficeWork.workshop_office_work_id }

            fetch('http://10.0.2.2:8080/CompleteWorkshopOfficeWorkMilestone', {
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
                            this.getWorkshopOfficeWorkMilestoneList()
                            break
                        case 'Workshop milestone already completed':
                            const snackBar = new SnackBar()
                            snackBar.simple('El hito solicitado ya se encuentra completado.')
                            this.getWorkshopOfficeWorkMilestoneList()
                            break
                        case 'No workshop milestone is pending':
                            console.log('No workshop milestone is pending')
                    }
                })
        },

        //Get the workshop office work general information
        getWorkshopOfficeWorkInfo() {
            const data = { id: this.workshopOfficeWork.workshop_office_work_id }

            fetch('http://10.0.2.2:8080/WorkshopOfficeWork', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(() => {
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.$set(this.workshopOfficeWork, 'workshop_office_work_status', response.WorkshopOfficeWork[0].workshop_office_work_status)
                            this.checkWorkshopOfficeWorkStatus()
                            break
                        case 'Workshop office work not found':
                            console.log('Workshop office work not found')
                    }
                })
        },
        //Do the steps to complete the workshop office work, based on the status (first iteration = confirmcompletiontechnician, second iteration = confirmcompletioncustomer, last iteration = complete)
        completeWorkshopOfficeWork() {
            const data = { id: this.workshopOfficeWork.workshop_office_work_id, workshop_office_work_actual_status: this.workshopOfficeWork.workshop_office_work_status }

            fetch('http://10.0.2.2:8080/CompleteWorkshopOfficeWork', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(() => {
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.$set(this.workshopOfficeWork, 'workshop_office_work_status', response.workshop_office_work_status)
                            this.workshopOfficeCurrentMilestone = ''
                            this.checkWorkshopOfficeWorkStatus()
                            break
                        case 'Operation Failed':
                            console.log('Operation failed')
                            break
                        case 'Workshop office work not found':
                            console.log('Workshop office work not found')
                            break
                        case 'Workshop office work is already completed':
                            const snackBar = new SnackBar()
                            snackBar.simple('El servicio automotriz ya se encuentra finalizado de manera definitiva.')
                            break
                        case 'That workshop office work status already changed':
                            const snackBar2 = new SnackBar()
                            snackBar2.simple('Ya se ha completado esta parte del proceso de finalización del servicio.')
                            this.getWorkshopOfficeWorkMilestoneList()
                    }
                })
        },

        getWorkshopOfficeAdvanceList() {
            const data = { workshop_office_work_id: this.workshopOfficeWork.workshop_office_work_id }

            fetch('http://10.0.2.2:8080/WorkshopOfficeWorkAdvanceList', {
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
                            this.workshopOfficeWorkAdvanceList = response.WorkshopOfficeWorkAdvanceList
                            break
                        case 'Work advances not found':
                            console.log('Work advances not found')
                    }
                })
        },
        //Shows the workshop office advance detail in a new view
        showWorkshopOfficeAdvance(event) {
            this.$navigator.navigate('/WorkshopOfficeWorkAdvance', { props: { workshopOfficeWorkAdvance: event.item }, frame: 'serviceNav' })
        },

        //Check if the logged in user is a technician from the workshop office that is lending the service, based on the technicians Ruts associated to the work and the user type (4 = workshop technician)
        isUserATechnician() {
            return this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4 && this.workshopOfficeWork.customer_rut !== ApplicationSettings.getString('user')
        },
        //Check if the logged in user is the customer, based on the Rut associated to the work and the user type (2 = regular user)
        isUserACustomer() {
            return this.workshopOfficeWork.customer_rut == ApplicationSettings.getString('user') && ApplicationSettings.getString('userType') == 2
        },

        goToWorkshopOfficeWorkTechnicalReport() {
            this.$navigator.navigate('/WorkshopOfficeWorkTechnicalReport', { props: { workshopOfficeWorkId: this.workshopOfficeWork.workshop_office_work_id }, frame: 'serviceNav' })
        },
        //Go to the view to add a technical report for the workshop office work
        goToAddWorkshopOfficeWorkTechnicalReportPage() {
            this.$navigator.navigate('/AddWorkshopOfficeWorkTechnicalReport', { props: { workshopOfficeWorkId: this.workshopOfficeWork.workshop_office_work_id, workshopOfficeWorkMilestoneId: this.workshopOfficeCurrentMilestone.id, workshopOfficeEmployeeList: this.workshopOfficeEmployeeList }, frame: 'serviceNav' })
        },
        //Go to the view to add a workshop office work advance. Only the employee can add an advance
        goToAddWorkshopOfficeWorkAdvancePage() {
            if (this.isUserATechnician()) this.$navigator.navigate('/AddWorkshopOfficeWorkAdvance', { props: { workshopOfficeWorkId: this.workshopOfficeWork.workshop_office_work_id, workshopOfficeEmployeeList: this.workshopOfficeEmployeeList }, frame: 'serviceNav' })
            else showSnackBarInsufficientPrivileges()
        },
        goToCompleteWorkshopOfficeWorkPage() {
            this.$navigator.navigate('/CompleteWorkshopOfficeWork', { props: { workshopOfficeWork: this.workshopOfficeWork }, frame: 'serviceNav' })
        },
        goToAddWorkshopOfficeEvaluationPage() {
            this.$navigator.navigate('/AddWorkshopOfficeEvaluation', { props: { workshopOfficeWork: this.workshopOfficeWork }, frame: 'serviceNav' })
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}