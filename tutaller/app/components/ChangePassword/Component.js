export default {
    name: 'ChangePassword',
    data() {
      return {
        actualPasswordInput: '',
        newPasswordInput: '',
        confirmNewPasswordInput: '',
        isModifyPasswordBtnTappable: true
      }
    },

    methods: {
        modifyPassword(){
          this.isModifyPasswordBtnTappable = false
          const data = {user_rut: appSettings.getString('user'), user_actual_password: this.actualPasswordInput, user_new_password: this.newPasswordInput}

          fetch('http://10.0.2.2:8080/ChangePassword', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => {
            console.error('Error:', error)
            alert({
              title: 'Error',
              message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
              okButtonText: 'OK'
            }).then(() => {
              this.isModifyPasswordBtnTappable = true
            })
          })
          .then(() => {
            this.$navigator.navigate('/AccountOptions')
          });
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}