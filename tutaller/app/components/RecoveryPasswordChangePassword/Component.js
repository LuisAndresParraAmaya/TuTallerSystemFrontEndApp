export default {
    data() {
      return {
        newPasswordInput: '',
        confirmNewPasswordInput: ''
      }
    },

    methods: {
        changePassword(){
          //Cambiar
          const userrut = 1;

          const userPasswordData = {'user_rut':userrut, 'user_new_password':this.newPasswordInput}

          fetch('http://localhost:3306/RecoveryPasswordChangePassword', {
            method: 'POST',
            body: JSON.stringify(userPasswordData),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/login')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}