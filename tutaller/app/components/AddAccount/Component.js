import { action } from "@nativescript/core"
import { VueMaskFilter } from 'v-mask'
import { deformatRut } from "~/utils/formatter"
const validator = require('~/utils/validator')

export default {
  data() {
    return {
      phoneCountryCodeList: ['+56 Chile'],

      rutInput: '',
      nameInput: '',
      lastNameInput: '',
      emailInput: '',
      phoneInput: '',
      phoneCountryCodeInput: '',
      passwordInput: '',
      confirmPasswordInput: '',

      rutInputErr: '',
      nameInputErr: '',
      lastNameInputErr: '',
      emailInputErr: '',
      phoneInputErr: '',
      phoneCountryCodeInputErr: '',
      passwordInputErr: '',
      confirmPasswordInputErr: '',

      isCreateAccountBtnTappable: true,
    }
  },

  methods: {
    createAccount() {
      if (this.validateFormCreateAccount()) {
        this.isCreateAccountBtnTappable = false
        const data = { user_rut: deformatRut(this.rutInput.trim()), user_name: this.nameInput.trim(), user_last_name: this.lastNameInput.trim(), user_email: this.emailInput.trim(), user_phone: this.phoneInput.trim(), user_password: this.passwordInput, user_status: 'enabled' }

        fetch('http://10.0.2.2:8080/CreateAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data })
        }).then(res => res.json())
          .catch(error => {
            console.error('Error:', error)
            alert({
              title: 'Error',
              message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
              okButtonText: 'OK'
            }).then(() => {
              this.isCreateAccountBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Create Account Success':
                this.$navigateBack()
                break
              case 'Rut already in use':
                this.rutInputErr = 'El rut ingresado ya se encuentra en uso. Ingresa otro.'
                this.isCreateAccountBtnTappable = true
                break
              case 'Email already in use':
                this.emailInputErr = 'El correo electrónico ingresado ya se encuentra en uso. Ingresa otro.'
                this.isCreateAccountBtnTappable = true
                break
              case 'Phone already in use':
                this.phoneInputErr = 'El número de teléfono ingresado ya se encuentra en uso. Ingresa otro.'
                this.isCreateAccountBtnTappable = true
            }
          })
      }
    },

    validateFormCreateAccount() {
      let isValidationOK = true
      //Rut validation
      let rutValidationRes = validator.validateRut(this.rutInput.trim())
      if (rutValidationRes !== null) {
        this.rutInputErr = rutValidationRes
        isValidationOK = false
      }
      //Name validation
      let nameValidationRes = validator.validateName(this.nameInput.trim())
      if (nameValidationRes !== null) {
        this.nameInputErr = nameValidationRes
        isValidationOK = false
      }
      //Last name validation
      let lastNameValidationRes = validator.validateLastName(this.lastNameInput.trim())
      if (lastNameValidationRes !== null) {
        this.lastNameInputErr = lastNameValidationRes
        isValidationOK = false
      }
      //E-mail validation
      let emailValidationRes = validator.validateEmail(this.emailInput.trim())
      if (emailValidationRes !== null) {
        this.emailInputErr = emailValidationRes
        isValidationOK = false
      }
      //Phone validation
      let phoneValidationRes = validator.validatePhone(this.phoneInput.trim(), this.phoneCountryCodeInput.trim())
      if (phoneValidationRes !== null) {
        this.phoneInputErr = phoneValidationRes
        this.phoneCountryCodeInputErr = ' '
        isValidationOK = false
      }
      //Password validation
      let passwordValidationRes = validator.validatePassword(this.passwordInput)
      if (passwordValidationRes !== null) {
        this.passwordInputErr = passwordValidationRes
        isValidationOK = false
      } else {
        let confirmPasswordValidationRes = validator.validateConfirmPassword(this.passwordInput, this.confirmPasswordInput)
        if (confirmPasswordValidationRes !== null) {
          this.confirmPasswordInputErr = confirmPasswordValidationRes
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

    selectPhoneCountryCode(event) {
      event.object.getViewById('txtPhoneCountryCode').clearFocus()
      action('Código de país', 'Cancelar', this.phoneCountryCodeList)
        .then(result => {
          if (result !== 'Cancelar') {
            this.phoneCountryCodeInput = result
          }
        })
    },

    onRutTxtChange() {
      this.rutInputErr = ''
    },
    onNameTxtChange() {
      this.nameInputErr = ''
    },
    onLastNameTxtChange() {
      this.lastNameInputErr = ''
    },
    onEmailTxtChange() {
      this.emailInputErr = ''
    },
    onPhoneTxtChange() {
      this.phoneInputErr = ''
      this.phoneCountryCodeInputErr = ''
    },
    onPasswordTxtChange() {
      this.passwordInputErr = ''
    },
    onConfirmPasswordTxtChange() {
      this.confirmPasswordInputErr = ''
    },

    goToPreviousPage() {
      this.$navigateBack()
    }
  },
}