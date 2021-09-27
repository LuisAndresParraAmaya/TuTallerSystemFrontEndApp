export default {
    name: 'WorkshopManagement',
    methods: {
        goToPostulateWorkshopPage() {
            this.$navigator.navigate('/PostulateWorkshop')
        },
        goToWorkshopPostulationListPage() {
            this.$navigator.navigate('/WorkshopPostulationList')
        },
        goToPreviousPage(){
            this.$navigateBack()
        }
    }
}