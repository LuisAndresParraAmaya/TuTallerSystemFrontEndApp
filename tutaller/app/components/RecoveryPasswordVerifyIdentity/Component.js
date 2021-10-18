import { ApplicationSettings } from '@nativescript/core'

export default {
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
      const data = { user_email: ApplicationSettings.getString('user_email'), recovery_code: this.sentCodeInput.trim() }
      fetch('http://10.0.2.2:8080/SendCode', {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
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
              ApplicationSettings.setString('user_rut', response.user_rut.toString())
              this.$navigator.navigate('/RecoveryPasswordModifyPassword', { frame: 'modalLogin' }).then(this.isVerifyCodeBtnTappable = true)
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