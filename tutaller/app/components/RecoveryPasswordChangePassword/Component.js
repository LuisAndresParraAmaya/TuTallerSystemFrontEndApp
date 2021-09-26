const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'RecoveryPasswordChangePassword',
    data() {
      return {
        newPasswordInput: '',
        confirmNewPasswordInput: '',
        passTxtErr: '',
        confirmPassTxtErr: '',
        isChangePassBtnTappable: true
      }
    },

    methods: {
        changePassword() {
          this.isChangePassBtnTappable = false
          const data = {user_rut: appSettings.getString('user_rut'), user_password: this.newPasswordInput}

          fetch('http://10.0.2.2:8080/ModifyPassword', {
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
              this.isChangePassBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Operation Success':
                this.$navigator.navigate('/AccountOptions', {clearHistory: true})
                break
              default:
                this.isChangePassBtnTappable = true
            }
          });
        },

        onPassTxtChange() {
          this.passTxtErr = ''
        },
        onConfirmPassTxtChange() {
          this.confirmPassTxtErr = ''
        },

        goToPreviousPage() {
          this.$navigateBack();
        }
    },
}