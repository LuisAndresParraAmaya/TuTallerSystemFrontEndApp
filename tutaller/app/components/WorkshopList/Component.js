export default {
    name: 'WorkshopList',
    data() {
        return {
            items: [
                {text: 'Foo'}, 
                {text: 'Bar'}, 
                {text: 'Bap'}
            ]
        }
    },

    methods: {
        showWorkshop() {
            this.$navigator.navigate('/ShowWorkshop')
        },
        filterWorkshop() {

        }
    }
}