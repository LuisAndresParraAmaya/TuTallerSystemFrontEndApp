export default {
    methods: {
        filterWorkshop() {

        },

        goToCreateAccountPage(){
            this.$navigator.navigate('/createaccount')
        },
        goToLoginPage(){
            this.$navigator.navigate('/login')
        },
        goToModifyProfilePage() {
            this.$navigator.navigate('/modifyprofile')
        }
    }
}