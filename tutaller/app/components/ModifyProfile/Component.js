import { Dialogs, inputType } from '@nativescript/core'

export default {
    data() {
        return {
          rutInput: '',
          nameInput: '',
          lastNameInput: '',
          emailInput: '',
          phoneInput: ''
        }
      },
  
      methods: {
          modifyProfile() {
            prompt({
              title: 'Confirma tu contraseña actual para modificar tu perfil',
              inputType: inputType.password,
              okButtonText: 'OK',
              cancelButtonText: 'Cancel'
            })
            .then(result => {
              if (result.result){
                const userModifyData = {'user_actual_rut':sessionStorage.getItem('user'), 'user_new_rut':this.rutInput, 'user_name':this.nameInput, 'user_last_name':this.lastNameInput, 'user_email':this.emailInput, 'user_phone':this.phoneInput, 'user_password':result.text}
                
                fetch('http://localhost:3306/ModifyProfile', {
                  method: 'POST',
                  body: JSON.stringify(userModifyData),
                  headers:{
                    'Content-Type': 'application/json'
                  }
                }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
                
                this.$navigator.navigate('/home')
              }
            })
          },

          goToChangePasswordPage() {
            this.$navigator.navigate('/changepassword')
          },
          goToDeleteAccountPage() {
            this.$navigator.navigate('/deleteaccount')
          },
          goToPreviousPage() {
            this.$navigateBack()
          }
    }
}