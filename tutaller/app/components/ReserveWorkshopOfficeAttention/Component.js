export default {
    props: ['workshopOfficeService'],
    data() {
        return {
            reservedDateInput: '',
            reservedTimeInput: ''
        }
    },

    methods: {
        reserveAttention() {
            console.log(this.workshopOfficeService)
            alert('Función en construcción')
            //this.$navigator.navigate('/PayWorkshopOfficeService')
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}