export default {
    name: 'CreateAccount',
    data() {
      return {
        rutInput: '',
        nameInput: '',
        lastNameInput: '',
        emailInput: '',
        phoneInput: '',
        passwordInput: '',
        confirmPasswordInput: '',

        rutInputErr: '',
        nameInputErr: '',
        lastNameInputErr: '',
        emailInputErr: '',
        phoneInputErr: '',
        passwordInputErr: '',
        confirmPasswordInputErr: '',

        isCreateAccountBtnTappable: true
      }
    },

    methods: {
        createAccount() {
          this.isCreateAccountBtnTappable = false
          const data = {user_rut: this.rutInput, user_type_id: 1, user_name: this.nameInput, user_last_name: this.lastNameInput, user_email: this.emailInput, user_phone: this.phoneInput, user_password: this.passwordInput, user_status:'enabled'}

          fetch('http://10.0.2.2:8080/CreateAccount', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data})
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
            console.log('Success:', response)
            this.$navigator.navigate('/AccountOptions')
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

        goToPreviousPage(){
          this.$navigateBack()
        }
    },
}