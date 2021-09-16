export default {
    data() {
      return {
        sentCodeInput: ''
      }
    },

    methods: {
        verifyCorrectCode(){
          fetch('http://10.0.2.2:8080/RecoveryPasswordVerifyIdentity', {
            method: 'POST',
            body: JSON.stringify({
              user_sent_code: this.sentCodeInput
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

          this.$navigator.navigate('/RecoveryPasswordChangePassword')
        },

        goToPreviousPage(){
          this.$navigateBack();
        }
    },
}