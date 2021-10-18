import { ApplicationSettings } from '@nativescript/core'
import { validateActualPassword } from '~/utils/validator'
import { validateConfirmPassword } from '~/utils/validator'
import { logOut } from '~/utils/session'

export default {
  data() {
    return {
      actualPasswordInput: '',
      confirmActualPasswordInput: '',

      actualPasswordInputErr: '',
      confirmActualPasswordInputErr: '',

      isDeleteAccountTappable: true
    }
  },

  methods: {
    deleteAccount() {
      if (this.validateFormDeleteAccount()) {
        this.isDeleteAccountTappable = false
        confirm({
          message: '¿Estás seguro de desactivar tu cuenta?',
          okButtonText: 'Desactivar',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result) {
            const data = { user_rut: ApplicationSettings.getString('user'), user_password: this.actualPasswordInput }

            fetch('http://10.0.2.2:8080/DisableAccount', {
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
                }).then(() => this.isDeleteAccountTappable = true)
              })
              .then(response => {
                switch (response.Response) {
                  case 'Operation Success':
                    alert({
                      message: 'Has desactivado tu cuenta en TuTaller',
                      okButtonText: 'OK'
                    }).then(() => {
                      logOut(this)
                    })
                    break
                  default:
                    this.actualPasswordInputErr = 'La contraseña ingresada es incorrecta.'
                    this.isDeleteAccountTappable = true
                }
              })
          } else {
            this.isDeleteAccountTappable = true
          }
        })
      }
    },

    validateFormDeleteAccount() {
      let isValidationOK = true
      //Actual password validation
      let actualPasswordValidationRes = validateActualPassword(this.actualPasswordInput)
      if (actualPasswordValidationRes !== null) {
        this.actualPasswordInputErr = actualPasswordValidationRes
        isValidationOK = false
      } else {
        let confirmActualPasswordValidationRes = validateConfirmPassword(this.actualPasswordInput, this.confirmActualPasswordInput)
        if (confirmActualPasswordValidationRes !== null) {
          this.confirmActualPasswordInputErr = confirmActualPasswordValidationRes
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
      this.actualPasswordInputErr = ''
      this.confirmActualPasswordInputErr = ''
    },

    goToPreviousPage() {
      this.$navigateBack()
    }
  },
}