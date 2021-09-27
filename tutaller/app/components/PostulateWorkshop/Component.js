const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'PostulateWorkshop',
    data() {
      return {
        workshopNameInput: '',
        workshopPhoneInput: '',
        workshopDescriptionInput: '',
        workshopPostulationMessage: '',

        workshopNameInputErr: '',
        workshopPhoneInputErr: '',
        workshopDescriptionInputErr: '',
        workshopPostulationMessageErr: '',
        
        isSendBtnTappable: true
      }
    },

    methods: {
        sendPostulation() {
            this.isSendBtnTappable = false
            const data = {user_rut: appSettings.getString('user'), workshop_name: this.workshopNameInput, workshop_number: this.workshopPhoneInput, workshop_description: this.workshopDescriptionInput, postulation_message: this.workshopPostulationMessage}

            fetch('http://10.0.2.2:8080/SendPostulation', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                switch (response.Response) {
                    case 'Operation Success':
                        this.$navigator.navigate('/AccountOptions')
                        break
                    case 'Operation Failed':
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
        onWorkshopPostulationMessageTxtChange() {
            this.workshopPostulationMessageErr = ''
        },

        goToPreviousPage(){
          this.$navigateBack()
        }
    },
}