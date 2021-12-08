import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['workshopOfficeWorkDisputeCase'],
    data() {
        return {
            resolutionMessageInput: '',
            resolutionMessageInputErr: '',

            isRespondBtnTappable: true
        }
    },

    methods: {
        resolveWorkshopOfficeWorkDisputeCase(caseNewStatus) {
            if (this.validateFormResolveWorkshopOfficeWorkDisputeCase()) {
                this.isRespondBtnTappable = false

                let confirmTitle = ''
                if (caseNewStatus == 'resolvedinfavorofoffice') confirmTitle = '¿Estás seguro de resolver el caso a favor del taller?'
                else confirmTitle = '¿Estás seguro de resolver el caso a favor del cliente?'
                confirm({
                    title: confirmTitle,
                    message: 'Al resolver el caso, se le retornará de manera inmediata el dinero a la parte a la que respondiste a favor.',
                    okButtonText: 'Resolver',
                    cancelButtonText: 'Cancelar'
                }).then(result => {
                    if (result) {
                        const data = { case_resolve_msg: this.resolutionMessageInput.trim(), idworkshop_office_work_case: this.workshopOfficeWorkDisputeCase.idworkshop_office_work_case, case_new_status: caseNewStatus, workshop_office_work_id: this.workshopOfficeWorkDisputeCase.workshop_office_work_id, workshop_office_service_name: this.workshopOfficeWorkDisputeCase.workshop_office_service_name, customer_name: this.workshopOfficeWorkDisputeCase.customer_name, customer_last_name: this.workshopOfficeWorkDisputeCase.customer_last_name, customer_email: this.workshopOfficeWorkDisputeCase.customer_email, workshop_admin_name: this.workshopOfficeWorkDisputeCase.workshop_admin_name, workshop_admin_last_name: this.workshopOfficeWorkDisputeCase.workshop_admin_last_name, workshop_admin_email: this.workshopOfficeWorkDisputeCase.workshop_admin_email, workshop_name: this.workshopOfficeWorkDisputeCase.workshop_name, workshop_office_address: this.workshopOfficeWorkDisputeCase.workshop_office_address, workshop_office_commune: this.workshopOfficeWorkDisputeCase.workshop_office_commune, workshop_office_region: this.workshopOfficeWorkDisputeCase.workshop_office_region }
                        fetch('http://10.0.2.2:8080/ResolveWorkshopOfficeWorkDisputeCase', {
                            method: 'POST',
                            body: JSON.stringify({ data }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json())
                            .catch(error => {
                                console.error('Error:', error)
                                alert({
                                    title: 'Error',
                                    message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                                    okButtonText: 'OK'
                                }).then(() => this.isRespondBtnTappable = true)
                            })
                            .then(response => {
                                switch (response.Response) {
                                    case 'Operation Success':
                                        this.$navigateBack()
                                        break
                                    case 'Dispute already resolved':
                                        const snackBar = new SnackBar()
                                        snackBar.simple('El caso de disputa ya ha sido resuelto.')
                                        this.isRespondBtnTappable = true
                                }
                            })
                    } else {
                        this.isRespondBtnTappable = true
                    }
                })
            }
        },

        validateFormResolveWorkshopOfficeWorkDisputeCase() {
            let isValidationOK = true
            //Null resolution message input
            if (this.resolutionMessageInput.trim() == '') {
                this.resolutionMessageInputErr = 'Ingresa un mensaje para la resolución del caso.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        onResolutionMessageTxtChange() {
            this.resolutionMessageInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}