const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'RecoveryPasswordVerifyIdentity',
    props: ['email'],
    data() {
      return {
        sentCodeInput: '',
        codeInputErr: '',
        isVerifyCodeBtnTappable: true
      }
    },

    methods: {
        verifyCorrectCode() {
          this.isVerifyCodeBtnTappable = false
          const data = {user_email: appSettings.getString('user_email'), recovery_code: this.sentCodeInput}
          fetch('http://10.0.2.2:8080/SendCode', {
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
              this.isVerifyCodeBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Checked Code Success':
                appSettings.setString('user_rut', response.user_rut.toString())
                this.$navigator.navigate('/RecoveryPasswordChangePassword')
                break
              case 'Operation Failed':
                this.codeInputErr = 'El código ingresado es erroneo'
                this.isVerifyCodeBtnTappable = true
            }
          })
        },

        onCodeTxtChange() {
          this.codeInputErr = ''
        },

        goToPreviousPage() {
          this.$navigateBack();
        }
    },
}