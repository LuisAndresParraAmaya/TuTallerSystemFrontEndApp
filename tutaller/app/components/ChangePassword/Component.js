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
          const userPasswordData = {'user_rut':sessionStorage.getItem('user'), 'user_actual_password':this.actualPasswordInput, 'user_new_password':this.newPasswordInput}

          fetch('http://localhost:3306/ChangePassword', {
            method: 'POST',
            body: JSON.stringify(userPasswordData),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/home')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}