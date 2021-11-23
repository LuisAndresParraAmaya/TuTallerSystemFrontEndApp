import { formatQualification } from "~/utils/formatter"

export default {
    props: ['filteredWorkshopOfficeList'],
    data() {
        return {
            actualWorkshopOfficeList: '',
            workshopOfficeList: '',
            formatQualification: formatQualification
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
            //Temporal solution to make the service tab in bottom navigation to update the WorkshopOfficeWorkList view (TODO)
            if (this.$navigator.paths.serviceNav == '/WorkshopOfficeWorkList') this.$navigator.navigate('/WorkshopOfficeWorkList', { frame: 'serviceNav' })
        },

        showWorkshopOffice(event) {
            this.$navigator.navigate('/WorkshopOffice', { props: { workshopOffice: event.item } })
        },

        showWorkshopOfficeFromAd() {
            console.log('TODO')
        },

        goToFilterWorkshopOfficeListPage() {
            this.$navigator.navigate('/FilterWorkshopOfficeList', { props: { workshopOfficeList: this.actualWorkshopOfficeList }, backstackVisible: false })
        }
    }
}