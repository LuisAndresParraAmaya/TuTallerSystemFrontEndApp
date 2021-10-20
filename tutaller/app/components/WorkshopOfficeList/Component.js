import { formatEvaluation } from "~/utils/formatter"

export default {
    props: ['filteredWorkshopOfficeList'],
    data() {
        return {
            actualWorkshopOfficeList: '',
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
                            this.actualWorkshopOfficeList = response.response
                            if (this.filteredWorkshopOfficeList) {
                                this.workshopOfficeList = this.filteredWorkshopOfficeList
                            } else {
                                this.workshopOfficeList = response.response
                            }
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
            this.$navigator.navigate('/FilterWorkshopOfficeList', { props: { workshopOfficeList: this.actualWorkshopOfficeList }, backstackVisible: false })
        }
    }
}