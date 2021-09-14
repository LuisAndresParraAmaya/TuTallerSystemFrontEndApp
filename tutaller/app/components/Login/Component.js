export default {
    data() {
      return {
        emailInput: '',
        passwordInput: ''
      }
    },

    methods: {
      login() {
        const accountLoginDetail = {'email':this.emailInput, 'password':this.passwordInput}
        this.$navigator.navigate('/home')
      },

      goToPreviousPage() {
        this.$navigateBack()
      },
      goToCreateAccount() {
        this.$navigator.navigate('/createaccount')
      }
    }
  }