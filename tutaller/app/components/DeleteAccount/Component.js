export default {
    data() {
      return {
        actualPasswordInput: '',
        confirmActualPasswordInput: ''
      }
    },

    methods: {
        deleteAccount(){
            const userPasswordData = {'user_rut':sessionStorage.getItem('user'), 'user_password':this.actualPasswordInput}

            fetch('http://localhost:3306/DeleteAccount', {
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