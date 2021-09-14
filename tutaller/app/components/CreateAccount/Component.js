export default {
    data() {
      return {
        rutInput: '',
        nameInput: '',
        lastNameInput: '',
        emailInput: '',
        phoneInput: '',
        passwordInput: '',
        confirmPasswordInput: ''
      }
    },

    methods: {
        goToPreviousPage() {
            this.$navigateBack()
        },

        createAccount() {
          const account = {'rut':this.rutInput, 'name':this.nameInput, 'lastName':this.lastNameInput, 'email':this.emailInput, 'phone':this.phoneInput, 'password':this.passwordInput}
          this.$navigator.navigate('/home')
        }
    }
}