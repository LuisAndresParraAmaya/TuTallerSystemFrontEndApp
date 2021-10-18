import { Dialogs, inputType } from '@nativescript/core'
import { SnackBar } from '@nativescript-community/ui-material-snackbar'
import { ApplicationSettings } from '@nativescript/core'
import { formatRut } from '~/utils/formatter'
const validator = require('~/utils/validator')

export default {
  data() {
    return {
      phoneCountryCodeList: ['+56 Chile'],

      rutInput: formatRut(ApplicationSettings.getString('user')),
      nameInput: ApplicationSettings.getString('userName'),
      lastNameInput: ApplicationSettings.getString('userLastName'),
      emailInput: ApplicationSettings.getString('userEmail'),
      phoneInput: ApplicationSettings.getString('userPhone'),
      phoneCountryCodeInput: '+56 Chile',

      rutInputErr: '',
      nameInputErr: '',
      lastNameInputErr: '',
      emailInputErr: '',
      phoneInputErr: '',
      phoneCountryCodeInputErr: '',

      isModifyBtnTappable: true
    }
  },

  methods: {
    modifyProfile() {
      if (this.validateFormModifyProfile()) {
        this.isModifyBtnTappable = false
        let data = { user_rut: ApplicationSettings.getString('user'), user_new_rut: this.rutInput.trim().replace('-', ''), user_name: this.nameInput.trim(), user_last_name: this.lastNameInput.trim(), user_email: this.emailInput.trim(), user_phone: this.phoneInput.trim() }
        //If the user changes the email, then the system will redirect them to a e-mail verification view
        if (this.emailInput.trim() !== ApplicationSettings.getString('userEmail')) {
          this.goToModifyEmailVerifyIdentityPage(data)
        } else {
          //If no changes to the email, then the modify profile process is performed normally
          prompt({
            message: 'Confirma tu contraseña actual para modificar tu perfil',
            inputType: inputType.password,
            okButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          })
            .then(passwordInput => {
              if (passwordInput.result) {
                data = { ...data, user_password: passwordInput.text }

                fetch('http://10.0.2.2:8080/ModifyProfile', {
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
                    }).then(() => this.isModifyBtnTappable = true)
                  })
                  .then(response => {
                    switch (response.Response) {
                      default:
                        ApplicationSettings.setString('user', response.user_new_rut.toString())
                        ApplicationSettings.setString('userName', data.user_name)
                        ApplicationSettings.setString('userLastName', data.user_last_name)
                        ApplicationSettings.setString('userPhone', data.user_phone.toString())
                        ApplicationSettings.setString('userEmail', data.user_email)
                        this.$navigateBack()
                        break
                      case 'Operation Failed':
                        this.isModifyBtnTappable = true
                        break
                      case 'Actual Password Failed':
                        const snackBar = new SnackBar()
                        snackBar.simple('La contraseña actual es incorrecta. Inténtalo nuevamente.')
                        this.isModifyBtnTappable = true
                    }
                  })
              } else {
                this.isModifyBtnTappable = true
              }
            })
        }
      }
    },

    validateFormModifyProfile() {
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
    },
    onPasswordTxtChange() {
      this.passwordInputErr = ''
    },
    onConfirmPasswordTxtChange() {
      this.confirmPasswordInputErr = ''
    },

    goToModifyEmailVerifyIdentityPage(modifyData) {
      const data = { user_email: ApplicationSettings.getString('userEmail'), user_new_email: this.emailInput }

      fetch('http://10.0.2.2:8080/SendValidateCodeEmail', {
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
            this.isModifyBtnTappable = true
          })
        })
        .then(response => {
          switch (response.Response) {
            case 'Validate Code Sended':
              this.$navigator.navigate('/ModifyEmailVerifyIdentity', { props: { modifyProfileData: modifyData }, frame: 'accountNav', backstackVisible: false }).then(this.isModifyBtnTappable = true)
              break
            default:
              this.isModifyBtnTappable = true
          }
        })
    },
    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}