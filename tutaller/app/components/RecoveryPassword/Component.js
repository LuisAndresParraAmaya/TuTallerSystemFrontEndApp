export default {
    data() {
      return {
        emailInput: ''
      }
    },

    methods: {
        sendCodeToUser(){
          fetch('http://10.0.2.2:8080/RecoveryPassword', {
            method: 'POST',
            body: JSON.stringify({
              user_email:this.emailInput
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/RecoveryPasswordVerifyIdentity')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}