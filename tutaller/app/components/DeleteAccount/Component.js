const appSettings = require('@nativescript/core/application-settings')

export default {
    name: 'DeleteAccount',
    data() {
      return {
        actualPasswordInput: '',
        confirmActualPasswordInput: '',
        actualPasswordInputErr: '',
        confirmActualPasswordInputErr: '',
        isDeleteAccountTappable: true
      }
    },

    methods: {
        deleteAccount() {
          if (this.validateFormDeleteAccount()) {
            this.isDeleteAccountTappable = false
            const data = {user_rut: appSettings.getString('user'), user_password:this.actualPasswordInput}
  
            fetch('http://10.0.2.2:8080/DisableAccount', {
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
                this.isDeleteAccountTappable = true
              })
            })
            .then(response => {
              switch (response.Response) {
                case 'Operation Success':
                  alert({
                    message: 'Has desactivado tu cuenta en TuTaller',
                    okButtonText: 'OK'
                  }).then(() => {
                    this.$navigator.navigate('/AccountOptions')
                  })
                  break
                default:
                  this.actualPasswordInputErr = 'La contraseña ingresada es incorrecta.'
                  this.isDeleteAccountTappable = true
              }
            });
          }
        },

        validateFormDeleteAccount() {
          if (this.actualPasswordInput !== this.confirmActualPasswordInput) {
            this.confirmActualPasswordInputErr = 'Las contraseñas ingresadas no coinciden'
            return false
          }
          return true
        },

        onPasswordTxtChange() {
          this.actualPasswordInputErr = ''
          this.confirmActualPasswordInputErr = ''
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}