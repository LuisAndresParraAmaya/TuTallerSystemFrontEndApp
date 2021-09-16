import { Dialogs, inputType } from '@nativescript/core'
const appSettings = require('@nativescript/core/application-settings')

export default {
    data() {
        return {
          rutInput: appSettings.getNumber('user'),
          nameInput: '',
          lastNameInput: '',
          emailInput: '',
          phoneInput: ''
        }
      },
  
      methods: {
          modifyProfile() {
            prompt({
              title: 'Confirma tu contraseña actual para modificar tu perfil',
              inputType: inputType.password,
              okButtonText: 'OK',
              cancelButtonText: 'Cancel'
            })
            .then(result => {
              if (result.result){
                const data = {user_rut: appSettings.getNumber('user'), user_new_rut: this.rutInput, user_name: this.nameInput, user_last_name: this.lastNameInput, user_email: this.emailInput, user_phone: this.phoneInput, user_password: result.text}

                fetch('http://10.0.2.2:8080/ModifyProfile', {
                  method: 'POST',
                  body: JSON.stringify({data}),
                  headers:{
                    'Content-Type': 'application/json'
                  }
                }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
                
                this.$navigator.navigate('/Home')
              }
            })
          },

          goToChangePasswordPage() {
            this.$navigator.navigate('/ChangePassword')
          },
          goToDeleteAccountPage() {
            this.$navigator.navigate('/DeleteAccount')
          },
          goToPreviousPage() {
            this.$navigateBack()
          }
    }
}