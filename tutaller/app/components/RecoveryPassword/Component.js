export default {
    data() {
      return {
        emailInput: ''
      }
    },

    methods: {
        sendCodeToUser(){
          const userEmailData = {'user_email':this.emailInput}

          fetch('http://localhost:3306/RecoveryPassword', {
            method: 'POST',
            body: JSON.stringify(userEmailData),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/recoverypasswordverifyidentity')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}