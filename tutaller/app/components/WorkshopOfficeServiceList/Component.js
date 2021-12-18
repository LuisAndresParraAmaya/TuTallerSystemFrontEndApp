export default {
    props: ['myWorkshop', 'workshopOfficeId', 'workshopOfficeAttentionList', 'actualFrame'],
    data() {
        return {
            pageTitle: this.setPageTitle(),
            workshopOfficeServiceList: ''
        }
    },

    methods: {
        getWorkshopOfficeServiceList() {
            const data = { workshop_office_id: this.workshopOfficeId }
            fetch('http://10.0.2.2:8080/WorkshopOfficeServiceList', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                })
                .then(response => {
                    switch (response.Response) {
                        default:
                            this.workshopOfficeServiceList = response.response
                            break
                        case 'Services not found':
                            console.log('Services not found')
                    }
                })
        },

        showWorkshopOfficeService(event) {
            this.$navigator.navigate('/WorkshopOfficeService', { props: { workshopOfficeService: event.item, workshopOfficeId: this.workshopOfficeId, workshopOfficeAttentionList: this.workshopOfficeAttentionList, actualFrame: this.actualFrame }, frame: this.actualFrame })
        },

        setPageTitle() {
            if (this.actualFrame == 'accountNav') {
                return 'Servicios automotrices'
            } else {
                return 'Escoger servicios'
            }
        },

        goToAddWorkshopOfficeServicePage() {
            this.$navigator.navigate('/AddWorkshopOfficeService', { props: { workshopOfficeId: this.workshopOfficeId }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}