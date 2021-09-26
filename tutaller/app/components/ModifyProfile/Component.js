import { Dialogs, inputType } from '@nativescript/core'
const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'ModifyProfile',
    data() {
        return {
          rutInput: appSettings.getString('user'),
          nameInput: '',
          lastNameInput: '',
          emailInput: '',
          phoneInput: '',
          isModifyBtnTappable: true
        }
    },
  
    methods: {
        modifyProfile() {
          this.isModifyBtnTappable = false
          prompt({
            title: 'Confirma tu contraseña actual para modificar tu perfil',
            inputType: inputType.password,
            okButtonText: 'OK',
            cancelButtonText: 'Cancel'
          })
          .then(result => {
            if (result.result){
              const data = {user_rut: appSettings.getString('user'), user_new_rut: this.rutInput, user_name: this.nameInput, user_last_name: this.lastNameInput, user_email: this.emailInput, user_phone: this.phoneInput, user_password: result.text}
              
              fetch('http://10.0.2.2:8080/ModifyProfile', {
                method: 'POST',
                body: JSON.stringify({data}),
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => {
                console.error('Error:', error)
                alert({
                  title: 'Error',
                  message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                  okButtonText: 'OK'
                }).then(() => {
                  this.isModifyBtnTappable = true
                })
              })
              .then(() => {
                appSettings.setString('user', this.rutInput)
                this.$navigator.navigate('/AccountOptions')
              });
            } else {
                this.isModifyBtnTappable = true
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