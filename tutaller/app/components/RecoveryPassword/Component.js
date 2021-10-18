import { ApplicationSettings } from '@nativescript/core'
import { validateEmail } from '~/utils/validator'

export default {
  data() {
    return {
      emailInput: '',
      emailInputErr: '',
      isSendCodeBtnTappable: true
    }
  },

  methods: {
    sendCodeToUser() {
      if (this.validateFormSendCodeToUser()) {
        this.isSendCodeBtnTappable = false
        const data = { user_email: this.emailInput.trim() }

        fetch('http://10.0.2.2:8080/RecoveryPassword', {
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
              this.isSendCodeBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Recovery Password Sended':
                ApplicationSettings.setString('user_email', data.user_email)
                this.$navigator.navigate('/RecoveryPasswordVerifyIdentity', { props: { email: data.user_email }, frame: 'modalLogin', backstackVisible: false })
                break
              case 'Operation Failed':
                this.emailInputErr = 'El correo electrónico ingresado no corresponde a ningún usuario registrado. Inténtalo de nuevo.'
                this.isSendCodeBtnTappable = true
            }
          })
      }
    },

    validateFormSendCodeToUser() {
      let isValidationOK = true
      //E-mail validation
      let emailValidationRes = validateEmail(this.emailInput.trim())
      if (emailValidationRes !== null) {
        this.emailInputErr = emailValidationRes
        isValidationOK = false
      }
      //Check if validation is OK
      if (isValidationOK) {
        return true
      } else {
        return false
      }
    },

    onEmailTxtChange() {
      this.emailInputErr = ''
    },

    goToPreviousPage() {
      this.$navigateBack()
    }
  },
}