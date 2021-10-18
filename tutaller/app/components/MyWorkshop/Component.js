export default {
    props: ['myWorkshop'],
    data() {
        return {
        }
    },

    methods: {
        goToModifyMyWorkshopPage() {
            this.$navigator.navigate('/ModifyMyWorkshop', { props: { myWorkshop: this.myWorkshop }, frame: 'accountNav' })
        },
        goToMyWorkshopOfficeListPage() {
            this.$navigator.navigate('/MyWorkshopOfficeList', { props: { myWorkshop: this.myWorkshop }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}