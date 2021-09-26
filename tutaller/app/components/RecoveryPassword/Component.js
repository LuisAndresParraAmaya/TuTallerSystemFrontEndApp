const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'RecoveryPassword',
    data() {
      return {
        emailInput: '',
        emailInputErr: '',
        isSendCodeBtnTappable: true
      }
    },

    methods: {
        sendCodeToUser(){
          this.isSendCodeBtnTappable = false
          const data = {user_email: this.emailInput}

          fetch('http://10.0.2.2:8080/RecoveryPassword', {
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
              this.isSendCodeBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Recovery Password Sended':
                appSettings.setString('user_email', data.user_email)
                this.$navigator.navigate('/RecoveryPasswordVerifyIdentity', {props: {email: data.user_email}})
                break
              case 'Operation Failed':
                this.emailInputErr = 'El correo electrónico ingresado no corresponde a ningún usuario registrado'
                this.isSendCodeBtnTappable = true
            }
          })
        },

        onEmailTxtChange() {
          this.emailInputErr = ''
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}