export default {
    data() {
      return {
        actualPasswordInput: '',
        newPasswordInput: '',
        confirmNewPasswordInput: ''
      }
    },

    methods: {
        modifyPassword(){
          const data = {user_rut: sessionStorage.getItem('user'), user_actual_password: this.actualPasswordInput, user_new_password: this.newPasswordInput}

          fetch('http://10.0.2.2:8080/ChangePassword', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/Home')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}