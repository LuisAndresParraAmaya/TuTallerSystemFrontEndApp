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
          const data = {'user_rut':this.rutInput, 'user_type_id':1, 'user_name':this.nameInput, 'user_last_name':this.lastNameInput, 'user_email':this.emailInput, 'user_phone':this.phoneInput, 'user_password':this.passwordInput, 'user_status':1}

          fetch('http://localhost:3306/CreateAccount', {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/home')
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