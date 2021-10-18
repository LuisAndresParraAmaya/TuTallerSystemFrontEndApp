export default {
    props: ['workshopOfficeService', 'actualFrame'],
    data() {
        return {

        }
    },

    methods: {
        requestWorkshopService() {
            this.$navigator.navigate('/ReserveWorkshopOfficeAttention', { props: { workshopOfficeService: this.workshopOfficeService } })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}