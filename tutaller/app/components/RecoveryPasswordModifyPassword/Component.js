import { ApplicationSettings } from '@nativescript/core'
import { validatePassword } from '~/utils/validator'
import { validateConfirmPassword } from '~/utils/validator'

export default {
  data() {
    return {
      newPasswordInput: '',
      confirmNewPasswordInput: '',
      newPasswordInputErr: '',
      confirmNewPasswordInputErr: '',
      isChangePassBtnTappable: true
    }
  },

  methods: {
    changePassword() {
      if (this.validateFormChangePassword()) {
        this.isChangePassBtnTappable = false
        const data = { user_rut: ApplicationSettings.getString('user_rut'), user_new_password: this.newPasswordInput }

        fetch('http://10.0.2.2:8080/ModifyPassword', {
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
              this.isChangePassBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Operation Success':
                this.$navigator.navigate('/Login', { clearHistory: true, frame: 'modalLogin', backstackVisible: false })
                break
              default:
                this.isChangePassBtnTappable = true
            }
          })
      }
    },

    validateFormChangePassword() {
      let isValidationOK = true
      //Password validation
      let passwordValidationRes = validatePassword(this.newPasswordInput)
      if (passwordValidationRes !== null) {
        this.newPasswordInputErr = passwordValidationRes
        isValidationOK = false
      } else {
        let confirmPasswordValidationRes = validateConfirmPassword(this.newPasswordInput, this.confirmNewPasswordInput)
        if (confirmPasswordValidationRes !== null) {
          this.confirmNewPasswordInputErr = confirmPasswordValidationRes
          isValidationOK = false
        }
      }
      //Check if validation is OK
      if (isValidationOK) {
        return true
      } else {
        return false
      }
    },

    onPasswordTxtChange() {
      this.newPasswordInputErr = ''
    },
    onConfirmPasswordTxtChange() {
      this.confirmNewPasswordInputErr = ''
    },

    goToPreviousPage() {
      this.$navigateBack();
    }
  },
}