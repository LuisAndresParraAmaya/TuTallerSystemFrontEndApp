
export default {
    data() {
      return {
        emailInput: '',
        passwordInput: ''
      }
    },

    methods: {
      login() {
        fetch('http://10.0.2.2:8080/Login', {
          method: 'POST',
          body: JSON.stringify({
            user_email: this.emailInput, 
            user_password: this.passwordInput
          }),
          headers:{
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
        
        this.$navigator.navigate('/Home')
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