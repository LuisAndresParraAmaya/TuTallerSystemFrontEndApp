import { formatQualification } from "~/utils/formatter"
import { ApplicationSettings } from "@nativescript/core"

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
        onPageLoaded(event) {
            this.getWorkshopList()
            //refresh ad image
            event.object.getViewById('imgWorkshopOfficeAd').src = 'http://10.0.2.2:8080/img?t' + new Date().getTime()
            //Temporal solution to make the service tab in bottom navigation to update the WorkshopOfficeWorkList view (TODO)
            if (this.$navigator.paths.serviceNav == '/WorkshopOfficeWorkList') this.$navigator.navigate('/WorkshopOfficeWorkList', { frame: 'serviceNav' })
            //Show usability questionnaire (if any is active), not showing it to the system admin
            if (ApplicationSettings.getString('userType') !== '1' && ApplicationSettings.getString('user') !== undefined) this.showUsabilityQuestionnaire()
        },

        //Get the workshop office list, ordered by nearest location by geolocation and total rating
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

        showUsabilityQuestionnaire() {
            const data = { user_user_rut: ApplicationSettings.getString('user') }

            fetch('http://10.0.2.2:8080/ShowUsabilityQuestionnaire', {
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
                        case 'Operation Success':
                            this.$navigator.modal('/ShowUsabilityQuestionnaire', { props: { usabilityQuestionnaire: response.UsabilityQuestionnaire[0] }, id: 'modalShowUsabilityQuestionnaire', fullscreen: true })
                            break
                        case 'No active questionnaire found':
                            console.log('No active questionnaire found')
                            break
                        case 'User cannot do the questionnaire':
                            console.log('User cannot do the questionnaire')
                    }
                })
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