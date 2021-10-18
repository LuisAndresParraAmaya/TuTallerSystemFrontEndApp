import { validateActualPassword } from "~/utils/validator"
import { validatePassword } from "~/utils/validator"
import { validateConfirmPassword } from "~/utils/validator"
import { ApplicationSettings } from "@nativescript/core"

export default {
  data() {
    return {
      actualPasswordInput: '',
      newPasswordInput: '',
      confirmNewPasswordInput: '',

      actualPasswordInputErr: '',
      newPasswordInputErr: '',
      confirmNewPasswordInputErr: '',

      isModifyPasswordBtnTappable: true
    }
  },

  methods: {
    modifyPassword() {
      if (this.validateFormModifyPassword()) {
        this.isModifyPasswordBtnTappable = false
        const data = { user_rut: ApplicationSettings.getString('user'), user_password: this.actualPasswordInput, user_new_password: this.newPasswordInput }

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
            }).then(() => this.isModifyPasswordBtnTappable = true)
          })
          .then(response => {
            switch (response.Response) {
              case 'Operation Success':
                this.$navigateBack()
                break
              case 'Actual Password Failed':
                this.actualPasswordInputErr = 'La contraseña actual es incorrecta. Inténtalo nuevamente.'
                this.isModifyPasswordBtnTappable = true
            }
          })
      }
    },

    validateFormModifyPassword() {
      let isValidationOK = true
      //Actual password validation
      let actualPasswordValidationRes = validateActualPassword(this.actualPasswordInput)
      if (actualPasswordValidationRes !== null) {
        this.actualPasswordInputErr = actualPasswordValidationRes
        isValidationOK = false
      }
      //New password validation
      let newPasswordValidationRes = validatePassword(this.newPasswordInput)
      if (newPasswordValidationRes !== null) {
        this.newPasswordInputErr = newPasswordValidationRes
        isValidationOK = false
      } else {
        let confirmNewPasswordValidationRes = validateConfirmPassword(this.newPasswordInput, this.confirmNewPasswordInput)
        if (confirmNewPasswordValidationRes !== null) {
          this.confirmNewPasswordInputErr = confirmNewPasswordValidationRes
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

    onActualPasswordTxtChange() {
      this.actualPasswordInputErr = ''
    },
    onNewPasswordTxtChange() {
      this.newPasswordInputErr = ''
    },
    onConfirmNewPasswordTxtChange() {
      this.confirmNewPasswordInputErr = ''
    },

    goToPreviousPage() {
      this.$navigateBack();
    }
  },
}