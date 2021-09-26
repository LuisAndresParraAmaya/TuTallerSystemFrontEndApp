export default {
    name: 'ReserveWorkshopAttention',
    data() {
        return {
            reservedDatetimeInput: ''
        }
    },

    methods: {
        reserveAttention() {
            
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}