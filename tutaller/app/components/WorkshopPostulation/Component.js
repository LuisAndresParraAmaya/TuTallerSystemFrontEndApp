export default {
    name: 'WorkshopPostulation',
    props: ['workshopPostulation'],
    data() {
        return {
        }
    },

    methods: {
        rejectWorkshopPostulation() {

        },
        acceptWorkshopPostulation() {

        },
        
        goToPreviousPage() {
        this.$navigateBack();
        }
    }
}