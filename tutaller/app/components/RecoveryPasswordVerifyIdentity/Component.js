export default {
    data() {
      return {
        sentCodeInput: ''
      }
    },

    methods: {
        verifyCorrectCode(){
          const userSentCodeInput = {'user_sent_code':this.sentCodeInput}

          fetch('http://localhost:3306/RecoveryPasswordVerifyIdentity', {
            method: 'POST',
            body: JSON.stringify(userSentCodeInput),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/recoverypasswordchangepassword')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}