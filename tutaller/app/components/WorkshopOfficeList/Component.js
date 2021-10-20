import { formatEvaluation } from "~/utils/formatter"

export default {
    props: ['filteredWorkshopOfficeList'],
    data() {
        return {
            workshopOfficeList: '',
            formatEvaluation: formatEvaluation
        }
    },

    methods: {
        getWorkshopList() {
            fetch('http://10.0.2.2:8080/WorkshopOfficeList', {
                method: 'GET',
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
                            this.workshopOfficeList = response.response
                            console.log('FILTER: ', this.filteredWorkshopOfficeList)
                            break
                        case 'Offices not found':
                            console.log('fail')
                    }
                })
        },

        onPageLoaded(event) {
            this.getWorkshopList()
            //refresh ad image
            event.object.getViewById('imgWorkshopOfficeAd').src = 'http://10.0.2.2:8080/img?t' + new Date().getTime()
        },

        showWorkshopOffice(event) {
            this.$navigator.navigate('/WorkshopOffice', { props: { workshopOffice: event.item } })
        },

        showWorkshopOfficeFromAd() {
            console.log('TODO')
        },

        goToFilterWorkshopOfficeListPage(event) {
            this.$navigator.navigate('/FilterWorkshopOfficeList', { props: { workshopOfficeList: this.workshopOfficeList }, backstackVisible: false })
        }
    }
}