export default {
    props: ['workshopOfficeId'],
    data() {
        return {
            serviceNameInput: '',
            servicePriceInput: '',
            serviceEstimatedTimeInput: '',
            serviceDescriptionInput: '',

            serviceNameInputErr: '',
            servicePriceInputErr: '',
            serviceEstimatedTimeInputErr: '',
            serviceDescriptionInputErr: '',

            isAddServiceBtnTappable: true,
        }
    },

    methods: {
        addWorkshopOfficeService() {
            if (this.validateFormAddWorkshopOfficeService()) {
                this.isAddServiceBtnTappable = false
                const data = { workshop_office_id: this.workshopOfficeId, offer_id: 1, workshop_office_service_name: this.serviceNameInput.trim(), workshop_office_service_price: this.servicePriceInput.trim(), workshop_office_service_estimated_time: this.serviceEstimatedTimeInput.trim(), workshop_office_service_description: this.serviceDescriptionInput.trim() }

                fetch('http://10.0.2.2:8080/AddWorkshopOfficeService', {
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
                            this.isAddServiceBtnTappable = true
                        })
                    })
                    .then(response => {
                        switch (response.Response) {
                            case 'Operation Success':
                                this.$navigateBack()
                                break
                            default:
                                this.isAddServiceBtnTappable = true
                        }
                    })
            }
        },

        validateFormAddWorkshopOfficeService() {
            let isValidationOK = true
            //Null service name input
            if (this.serviceNameInput.trim() == '') {
                this.serviceNameInputErr = 'Ingresa un nombre para el servicio'
                isValidationOK = false
            }
            //Null service price input
            if (this.servicePriceInput.trim() == '') {
                this.servicePriceInputErr = 'Ingresa un precio'
                isValidationOK = false
            }
            //Null service estimated time input
            if (this.serviceEstimatedTimeInput.trim() == '') {
                this.serviceEstimatedTimeInputErr = 'Ingresa un tiempo estimado'
                isValidationOK = false
            }
            //Null service description input
            if (this.serviceDescriptionInput.trim() == '') {
                this.serviceDescriptionInputErr = 'Ingresa una descripción'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        onServiceNameTxtChange() {
            this.serviceNameInputErr = ''
        },
        onServicePriceTxtChange() {
            this.servicePriceInputErr = ''
        },
        onServiceEstimatedTimeTxtChange() {
            this.serviceEstimatedTimeInputErr = ''
        },
        onServiceDescriptionTxtChange() {
            this.serviceDescriptionInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    },
}