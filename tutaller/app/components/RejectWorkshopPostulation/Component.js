export default {
    props: ['workshopPostulation'],
    data() {
        return {
            workshopStatus: '',

            rejectReasonInput: '',
            rejectReasonInputErr: '',

            isRejectPostulationTappable: true
        }
    },

    methods: {
        rejectWorkshopPostulation() {
            if (this.validateFormRejectWorkshopPostulation()) {
                this.isRejectPostulationTappable = false
                confirm({
                    message: '¿Estás seguro de rechazar la postulación?',
                    okButtonText: 'Rechazar',
                    cancelButtonText: 'Cancelar'
                }).then(result => {
                    if (result) {
                        const data = { id: this.workshopPostulation.id, user_rut: this.workshopPostulation.user_user_rut, reject_reason: this.rejectReasonInput.trim() }
                        fetch('http://10.0.2.2:8080/RejectWorkshopPostulation', {
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
                                }).then(() => this.isRejectPostulationTappable = true)
                            })
                            .then(response => {
                                switch (response.Response) {
                                    case 'Operation Success':
                                        this.$navigateBack()
                                        break
                                    case 'Operation Failed':
                                        this.isRejectPostulationTappable = true
                                }
                            })
                    } else {
                        this.isRejectPostulationTappable = true
                    }
                })
            }
        },

        validateFormRejectWorkshopPostulation() {
            let isValidationOK = true
            //Null reject reason input
            if (this.rejectReasonInput.trim() == '') {
                this.rejectReasonInputErr = 'Ingresa una razón de rechazo'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) {
                return true
            } else {
                return false
            }
        },

        onRejectReasonTxtChange() {
            this.rejectReasonInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}