export default {
    methods: {
        filterWorkshop() {

        },

        goToCreateAccountPage(){
            this.$navigator.navigate('/CreateAccount')
        },
        goToLoginPage(){
            this.$navigator.navigate('/Login')
        },
        goToModifyProfilePage() {
            this.$navigator.navigate('/ModifyProfile')
        }
    }
}