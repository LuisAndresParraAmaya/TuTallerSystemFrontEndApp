export default {
    data() {
      return {
        actualPasswordInput: '',
        confirmActualPasswordInput: ''
      }
    },

    methods: {
        deleteAccount(){
            fetch('http://10.0.2.2:8080/DeleteAccount', {
              method: 'POST',
              body: JSON.stringify({
                user_rut: sessionStorage.getItem('user'),
                user_password:this.actualPasswordInput
              }),
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