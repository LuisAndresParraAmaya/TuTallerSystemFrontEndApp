export default {
    props: ['workshopOfficeWorkAdvance'],
    data() {
        return {
        }
    },

    methods: {
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}