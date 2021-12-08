import { ApplicationSettings } from "@nativescript/core"
import { showSnackBarInsufficientPrivileges } from "~/utils/msg"
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['workshopOfficeWork'],
    data() {
        return {
            isCompleteBtnTappable: true
        }
    },

    methods: {
        //Definitely complete the workshop office work
        completeWorkshopOfficeWork() {
            this.isCompleteBtnTappable = false
            confirm({
                title: '¿Estás seguro de confirmar la finalización del servicio?',
                message: 'Al confirmar la finalización del servicio, se le enviará de manera definitiva el dinero que has pagado a dicha sucursal, por lo que no podrás abrir un caso de disputa después de confirmar.',
                okButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result) {
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
                            this.isCompleteBtnTappable = true
                        })
                        .then(response => {
                            switch (response.Response) {
                                case 'Operation Success':
                                    alert({
                                        title: 'Servicio finalizado satisfactoriamente',
                                        message: 'Ahora puedes evaluar a la sucursal automotriz según el servicio prestado, la cual nos permitirá mejorar continuamente el listado de sucursales de TuTaller.',
                                        okButtonText: 'OK'
                                    }).then(() => this.$navigateBack())
                                    break
                                case 'Operation Failed':
                                    console.log('Operation failed')
                                    this.isCompleteBtnTappable = true
                                    break
                                case 'Workshop office work not found':
                                    console.log('Workshop office work not found')
                                    this.isCompleteBtnTappable = true
                                    break
                                case 'Workshop office work is already completed':
                                    const snackBar = new SnackBar()
                                    snackBar.simple('El servicio automotriz ya se encuentra finalizado de manera definitiva.')
                                    this.isCompleteBtnTappable = true
                                    break
                                case 'That workshop office work status already changed':
                                    const snackBar2 = new SnackBar()
                                    snackBar2.simple('Ya se ha completado esta parte del proceso de finalización del servicio.')
                                    this.isCompleteBtnTappable = true
                            }
                        })
                } else this.isCompleteBtnTappable = true
            })
        },

        validateFormCompleteWorkshopOfficeWork() {
            let isValidationOK = true
            //Check it the logged user is the customer
            if (!this.isUserACustomer()) {
                this.showSnackBarInsufficientPrivileges()
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        //Check if the logged in user is the customer, based on the Rut associated to the work and the user type (2 = regular user)
        isUserACustomer() {
            return this.workshopOfficeWork.customer_rut == ApplicationSettings.getString('user') && ApplicationSettings.getString('userType') == 2
        },

        goToFileWorkshopOfficeWorkDisputeCasePage() {
            if (this.isUserACustomer()) this.$navigator.navigate('/FileWorkshopOfficeWorkDisputeCase', { props: { workshopOfficeWork: this.workshopOfficeWork }, frame: 'serviceNav' })
            else this.showSnackBarInsufficientPrivileges()
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}