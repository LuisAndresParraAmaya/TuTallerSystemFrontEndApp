import { ApplicationSettings } from '@nativescript/core'
import { validateEmail } from '~/utils/validator'

export default {
  props: ['rootFrame'],
  data() {
    return {
      emailInput: '',
      passwordInput: '',
      emailInputErr: '',
      passwordInputErr: '',
      isLoginBtnTappable: true,
      isRecoveryBtnTappable: true,
      isCreateBtnTappable: true
    }
  },

  methods: {
    login() {
      if (this.validateFormLogin()) {
        this.changeButtonsTappableStatus(false)
        const data = { user_email: this.emailInput.trim(), user_password: this.passwordInput }

        fetch('http://10.0.2.2:8080/Login', {
          method: 'POST',
          body: JSON.stringify({ data }),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
          .catch(error => {
            console.error('Error:', error)
            alert({
              title: 'Error',
              message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
              okButtonText: 'OK'
            }).then(() => this.changeButtonsTappableStatus(true))
          })
          .then(response => {
            switch (response.Response) {
              case 'Login Success':
                this.setSessionData(response)
                this.closeModal()
                break
              case 'Login Failed':
                this.passwordInputErr = 'La contraseña es incorrecta'
                this.changeButtonsTappableStatus(true)
                break
              case 'Reactivate Success':
                alert({
                  title: 'Cuenta reactivada',
                  message: 'Has iniciado sesión dentro del periodo de los 30 días, por lo que tu cuenta ha sido reactivada.',
                  okButtonText: 'OK'
                }).then(() => {
                  this.setSessionData(response)
                  this.closeModal()
                })
                break
              case 'Account deleted':
                alert({
                  title: 'Error',
                  message: 'Tu cuenta ha estado desactivada durante más de 30 días y ya no se puede reactivar.',
                  okButtonText: 'OK'
                }).then(() => this.changeButtonsTappableStatus(true))
            }
          })
      }
    },

    changeButtonsTappableStatus(status) {
      this.isLoginBtnTappable = status
      this.isRecoveryBtnTappable = status
      this.isCreateBtnTappable = status
    },

    setSessionData(response) {
      ApplicationSettings.setString('user', response.user_rut.toString())
      ApplicationSettings.setString('userName', response.user_name)
      ApplicationSettings.setString('userLastName', response.user_last_name)
      ApplicationSettings.setString('userPhone', response.user_phone.toString())
      ApplicationSettings.setString('userEmail', response.user_email)
      ApplicationSettings.setString('userPassword', response.user_password)
      ApplicationSettings.setString('userType', response.user_type_id.toString())
    },

    validateFormLogin() {
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
    onPasswordTxtChange() {
      this.passwordInputErr = ''
    },

    closeModal() {
      let navigationPath = ''
      switch (this.rootFrame) {
        default:
          navigationPath = this.$root.$navigator.paths.navigator
          break
        case 'serviceNav':
          navigationPath = this.$root.$navigator.paths.serviceNav
          break
        case 'accountNav':
          navigationPath = this.$root.$navigator.paths.accountNav
          break
      }
      this.$root.$navigator.navigate(navigationPath, { frame: this.rootFrame })
      this.$modal.close()
    },
    goToRecoveryPasswordPage() {
      this.$navigator.navigate('/RecoveryPassword', { frame: 'modalLogin', backstackVisible: false })
    },
    goToAddAccountPage() {
      this.$navigator.navigate('/AddAccount', { frame: 'modalLogin' })
    }
  }
}