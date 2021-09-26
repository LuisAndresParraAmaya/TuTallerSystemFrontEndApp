export default {
    name: 'WorkshopPostulationList',
    methods: {
        showWorkshopPostulation() {
            this.$navigator.navigate('/ShowWorkshop')
        },

        goToPreviousPage(){
            this.$navigateBack();
        }
    }
}