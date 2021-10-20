export default {
    props: ['workshopOffice'],
    data() {
        return {
            complaintInput: '',
            complaintInputErr: '',

            isFileWorkshopOfficeComplaintTappable: true
        }
    },

    methods: {
        fileWorkshopOfficeComplaint() {
            if (this.validateFormFileWorkshopOfficeComplaint()) {
                this.isFileWorkshopOfficeComplaintTappable = false
                const data = { workshop_id: this.workshopOffice.workshop_id, workshop_name: this.workshopOffice.workshop_name, workshop_office_region: this.workshopOffice.workshop_office_region, workshop_office_commune: this.workshopOffice.workshop_office_commune, workshop_office_address: this.workshopOffice.workshop_office_address, complaint: this.complaintInput.trim() }

                fetch('http://10.0.2.2:8080/FileWorkShopOfficeComplaint', {
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
                            this.isFileWorkshopOfficeComplaintTappable = true
                        })
                    })
                    .then(response => {
                        switch (response.Response) {
                            //TODO CHANGE RESPONSES
                            case 'Operation Success':
                                console.log('Success:', response)
                                this.$navigateBack()
                                break
                            default:
                                this.isFileWorkshopOfficeComplaintTappable = true
                        }
                    })
            }
        },

        validateFormFileWorkshopOfficeComplaint() {
            let isValidationOK = true
            //Null complaint input
            if (this.complaintInput.trim() == '') {
                this.complaintInputErr = 'Ingresa un reclamo'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) {
                return true
            } else {
                return false
            }
        },

        onComplaintTxtChange() {
            this.complaintInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}