export default {
    props: ['workshopOfficeService', 'workshopOfficeAttentionList', 'actualFrame'],
    data() {
        return {

        }
    },

    methods: {
        requestWorkshopService() {
            this.$navigator.navigate('/ReserveWorkshopOfficeAttention', { props: { workshopOfficeService: this.workshopOfficeService, workshopOfficeAttentionList: this.workshopOfficeAttentionList } })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}