export default {
    props: ['workshopOffice', 'workshopOfficeService', 'workshopOfficeAttentionList', 'actualFrame'],
    data() {
        return {
        }
    },

    methods: {
        requestWorkshopService() {
            this.$navigator.navigate('/ReserveWorkshopOfficeAttention', { props: { workshopOffice: this.workshopOffice, workshopOfficeService: this.workshopOfficeService, workshopOfficeAttentionList: this.workshopOfficeAttentionList } })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}