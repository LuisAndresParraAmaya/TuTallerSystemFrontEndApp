import { ApplicationSettings } from "@nativescript/core"
import { showSnackBarInsufficientPrivileges } from "~/utils/msg"

export default {
    props: ['workshopOfficeWork'],
    data() {
        return {
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
            //Only the employee is allowed to confirm the vehicle reception
            if (this.workshopOfficeCurrentMilestone.workshop_office_work_milestone_name == 'Recepción del vehículo') {
                if (this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4) this.confirmVehicleReception()
                else showSnackBarInsufficientPrivileges()
            }
            //Only the employee can realize the workshop office work technical report
            if (this.workshopOfficeCurrentMilestone.workshop_office_work_milestone_name == 'Inspección del vehículo') {
                if (this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4) this.goToAddWorkshopOfficeWorkTechnicalReportPage()
                else showSnackBarInsufficientPrivileges()
            }
            //Only the employee can finalize the service, with the purpose to get to the phase where the client needs to retire their vehicle
            if (this.workshopOfficeCurrentMilestone.workshop_office_work_milestone_name == 'Realización del servicio') {
                if (this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4) console.log('Función en construcción')
                else showSnackBarInsufficientPrivileges()
            }
        },

        //Confirm dialog that the technician can accept or cancel in relation to the vehicle reception. If they accept, then the function to complete the current milestone is called
        confirmVehicleReception() {
            confirm({
                message: '¿Estás seguro de confirmar la recepción del vehículo?',
                okButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result) {
                    this.completeWorkshopOfficeWorkMilestone()
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
                        case 'Workshop milestone not found':
                            console.log('Workshop milestone not found')
                            break
                        case 'No workshop milestone is pending':
                            console.log('No workshop milestone is pending')
                    }
                })
        },

        //Shows the workshop office advance detail in a new view
        showWorkshopOfficeAdvance(event) {
            this.$navigator.navigate('/WorkshopOfficeWorkAdvance', { props: { workshopOfficeWorkAdvance: event.item }, frame: 'serviceNav' })
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
                            this.workshopOfficeCurrentMilestone = this.workshopOfficeMilestoneList.filter(element => element.workshop_office_work_milestone_status == 'working')[0]
                            //Repeat the number of columns for the gridlayout based on the workmilestone list length (allows to symmetric stretch horizontally)
                            this.milestoneProgressCols = '*, '.repeat(this.workshopOfficeMilestoneList.length)
                            //Assign service action button text and permissions (customer/technician)
                            switch (this.workshopOfficeCurrentMilestone.workshop_office_work_milestone_name) {
                                case 'Recepción del vehículo':
                                    if (this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4) {
                                        this.doServiceActionBtnText = 'Confirmar recepción del vehículo'
                                        this.isDoServiceActionBtnHidden = false
                                        this.isGoToAddWorkshopOfficeWorkAdvancePageBtnHidden = false
                                    }
                                    break
                                case 'Inspección del vehículo':
                                    if (this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4) {
                                        this.doServiceActionBtnText = 'Realizar ficha técnica'
                                        this.isDoServiceActionBtnHidden = false
                                        this.isGoToAddWorkshopOfficeWorkAdvancePageBtnHidden = false
                                    }
                                    break
                                case 'Realización del servicio':
                                    if (this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4) {
                                        this.doServiceActionBtnText = 'Finalizar servicio'
                                        this.isDoServiceActionBtnHidden = false
                                        this.isGoToAddWorkshopOfficeWorkAdvancePageBtnHidden = false
                                    }
                                    this.isShowTechnicalReportBtnHidden = false
                                    break
                                case 'Retiro del vehículo':
                                    this.isShowTechnicalReportBtnHidden = false
                            }
                            break
                        case 'Work milestones not found':
                            console.log('Work milestones not found')
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

        goToWorkshopOfficeWorkTechnicalReport() {
            this.$navigator.navigate('/WorkshopOfficeWorkTechnicalReport', { props: { workshopOfficeWorkId: this.workshopOfficeWork.workshop_office_work_id }, frame: 'serviceNav' })
        },
        //Go to the view to add a technical report for the workshop office work
        goToAddWorkshopOfficeWorkTechnicalReportPage() {
            this.$navigator.navigate('/AddWorkshopOfficeWorkTechnicalReport', { props: { workshopOfficeWorkId: this.workshopOfficeWork.workshop_office_work_id, workshopOfficeWorkMilestoneId: this.workshopOfficeCurrentMilestone.id, workshopOfficeEmployeeList: this.workshopOfficeEmployeeList }, frame: 'serviceNav' })
        },
        //Go to the view to add a workshop office work advance. Only the employee can add an advance
        goToAddWorkshopOfficeWorkAdvancePage() {
            if (this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) && ApplicationSettings.getString('userType') == 4) this.$navigator.navigate('/AddWorkshopOfficeWorkAdvance', { props: { workshopOfficeWorkId: this.workshopOfficeWork.workshop_office_work_id, workshopOfficeEmployeeList: this.workshopOfficeEmployeeList }, frame: 'serviceNav' })
            else showSnackBarInsufficientPrivileges()
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}