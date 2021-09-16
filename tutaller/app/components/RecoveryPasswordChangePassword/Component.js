export default {
    data() {
      return {
        newPasswordInput: '',
        confirmNewPasswordInput: ''
      }
    },

    methods: {
        changePassword(){
          data = {user_rut: 1, user_new_password: this.newPasswordInput}

          fetch('http://10.0.2.2:8080/RecoveryPasswordChangePassword', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/Login')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}