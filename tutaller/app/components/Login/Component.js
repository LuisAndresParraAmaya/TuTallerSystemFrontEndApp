const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'Login',
    data() {
      return {
        emailInput: '',
        passwordInput: '',
        isLoginBtnTappable: true
      }
    },

    methods: {
      login() {
        this.isLoginBtnTappable = false
        const data = {user_email: this.emailInput, user_password: this.passwordInput}

        fetch('http://10.0.2.2:8080/Login', {
          method: 'POST',
          body: JSON.stringify({data}),
          headers:{
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
        .catch(error => {
          console.error('Error:', error)
          alert({
            title: 'Error',
            message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
            okButtonText: 'OK'
          }).then(() => {
            this.isLoginBtnTappable = true
          })
        })
        .then(response => {
          appSettings.setString('user', response.user_rut.toString())
          this.$navigator.navigate('/AccountOptions', {clearHistory: true})
        })
      },

      goToPreviousPage() {
        this.$navigateBack()
      },
      goToRecoveryPasswordPage() {
        this.$navigator.navigate('/RecoveryPassword')
      },
      goToCreateAccountPage() {
        this.$navigator.navigate('/CreateAccount')
      }
    }
  }