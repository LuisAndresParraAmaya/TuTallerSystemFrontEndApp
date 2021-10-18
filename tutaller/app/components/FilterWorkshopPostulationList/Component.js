import { postulationStatusList } from "~/utils/lists"

export default {
    data() {
        return {
            workshopNameInput: '',
            postulationStatusInput: '',
            fromPostulationDateInput: undefined,
            toPostulationDateInput: undefined,
            toPostulationDateInputErr: '',

            isFilterBtnTappable: true
        }
    },

    methods: {
        filterWorkshopPostulationList() {
            if (this.validateFormFilterWorkshopPostulationList()) {
                this.isFilterBtnTappable = false
                const data = { workshop_name: this.workshopNameInput.trim(), postulation_status: postulationStatusInput.trim(), from_postulation_date: this.fromPostulationDateInput, to_postulation_date: this.toPostulationDateInput }

                fetch('http://10.0.2.2:8080/FilterWorkshopPostulationList', {
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
                            this.isFilterBtnTappable = true
                        })
                    })
                    .then(response => {
                        switch (response.Response) {
                            case 'Operation Success':
                                this.$navigateBack()
                                break
                            case 'Operation Failed':
                                alert({
                                    title: 'Error',
                                    message: 'Se ha producido un error. Inténtalo de nuevo.',
                                    okButtonText: 'OK'
                                }).then(() => {
                                    this.isFilterBtnTappable = true
                                })
                        }
                    })
            }
        },

        validateFormFilterWorkshopPostulationList() {
            let isValidationOK = true
            //Rut validation
            if (this.fromPostulationDateInput > this.toPostulationDateInput) {
                this.toPostulationDateInputErr = 'Ingresa un periodo de tiempo valido.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) {
                return true
            } else {
                return false
            }
        },

        selectPostulationStatus(event) {
            event.object.getViewById('txtPostulationStatus').clearFocus()
            action('Estado de postulación', 'Cancelar', this.postulationStatusList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.postulationStatusInput = result
                    }
                })
        },

        onFromPostulationDateChange(event) {
            this.fromPostulationDateInput = event.value
        },
        onToPostulationDateChange(event) {
            this.toPostulationDateInput = event.value
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    },
}