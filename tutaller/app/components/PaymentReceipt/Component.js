export default {
    data() {
        return {
            isContinueBtnTappable: true
        }
    },
    methods: {
        continueProcess() {
            this.isContinueBtnTappable = false
            alert({
                message: 'Puedes revisar el estado del servicio en la pestaña de servicios.',
                okButtonText: 'OK'
            }).then(() => {
                this.$navigator.navigate('/WorkshopOfficeList')
                this.isContinueBtnTappable = true
            })
        },

        downloadPaymentReceipt() {

        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}