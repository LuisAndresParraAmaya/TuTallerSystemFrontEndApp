export default {
    methods: {
        goToCreateAccountPage(){
            this.$navigator.navigate('/createaccount')
        },
        goToLoginPage(){
            this.$navigator.navigate('/login')
        }
    }
}