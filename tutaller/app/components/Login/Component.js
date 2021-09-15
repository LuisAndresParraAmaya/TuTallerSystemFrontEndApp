
export default {
    data() {
      return {
        emailInput: '',
        passwordInput: ''
      }
    },

    methods: {
      login() {
        const userLoginDetail = { user_email: this.emailInput, user_password: this.passwordInput }

        fetch('http://localhost:3306/Login', {
          method: 'POST',
          body: JSON.stringify(userLoginDetail),
          headers:{
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
        
        this.$navigator.navigate('/home')
        },

      goToPreviousPage() {
        this.$navigateBack()
      },
      goToRecoveryPasswordPage() {
        this.$navigator.navigate('/recoverypassword')
      },
      goToCreateAccountPage() {
        this.$navigator.navigate('/createaccount')
      }
    }
  }