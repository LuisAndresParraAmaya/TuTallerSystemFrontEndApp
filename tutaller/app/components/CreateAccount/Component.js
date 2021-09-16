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
        createAccount() {
          const data = {user_rut: this.rutInput, user_type_id: 1, user_name: this.nameInput, user_last_name: this.lastNameInput, user_email: this.emailInput, user_phone: this.phoneInput, user_password: this.passwordInput, user_status:'enabled'}

          fetch('http://10.0.2.2:8080/CreateAccount', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data})
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/Home')
        },

        goToDeleteAccountPage(){
          this.$navigator.navigate('/deleteaccount')
        },
        goToModifyPassword() {
          this.$navigator.navigate('/modifypassword')
        },
        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}