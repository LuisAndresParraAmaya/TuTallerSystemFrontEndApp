export default {
    name: 'PostulateWorkshop',
    data() {
      return {
        workshopNameInput: '',
        workshopPhoneInput: '',
        workshopDescriptionInput: '',
        workshopOfficeCommuneInput: '',
        workshopOfficeAddressInput: '',
        workshopOfficePhoneInput: '',
        workshopPostulationMessage: '',

        workshopNameInputErr: '',
        workshopPhoneInputErr: '',
        workshopDescriptionInputErr: '',
        workshopOfficeCommuneInputErr: '',
        workshopOfficeAddressInputErr: '',
        workshopOfficePhoneInputErr: '',
        workshopPostulationMessageErr: '',
        
        isSendBtnTappable: true
      }
    },

    methods: {
        sendPostulation() {
            this.isSendBtnTappable = false
            const data = {workshop_name: this.workshopNameInput, workshop_number: this.workshopPhoneInput, workshop_description: this.workshopDescriptionInput, workshop_office_commune: this.workshopOfficeCommuneInput, workshop_office_address: this.workshopOfficeAddressInput, workshop_office_phone: this.workshopOfficePhoneInput, postulation_description: this.workshopPostulationMessage, postulation_current_status: 'pending'}

            fetch('http://10.0.2.2:8080/DoWorkshopPostulation', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                switch (response.Response) {
                    case 'Success':
                        this.$navigator.navigate('/AccountOptions')
                        break
                    default:
                        this.isSendBtnTappable = true
                }
            })
        },

        onWorkshopNameTxtChange() {
            this.workshopNameInputErr = ''
        },
        onWorkshopPhoneTxtChange() {
            this.workshopPhoneInputErr = ''
        },
        onWorkshopDescriptionTxtChange() {
            this.workshopDescriptionInputErr = ''
        },
        onWorkshopOfficeCommuneTxtChange() {
            this.workshopOfficeCommuneInputErr = ''
        },
        onWorkshopOfficeAddressTxtChange() {
            this.workshopOfficeAddressInputErr = ''
        },
        onWorkshopOfficePhoneTxtChange() {
            this.workshopOfficePhoneInputErr = ''
        },
        onWorkshopPostulationMessageTxtChange() {
            this.workshopPostulationMessageErr = ''
        },

        goToPreviousPage(){
          this.$navigateBack()
        }
    },
}