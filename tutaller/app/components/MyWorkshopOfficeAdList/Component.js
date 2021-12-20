import { translateActiveInactiveStatus } from "~/utils/translators"

export default {
    props: ['myWorkshop', 'workshopOfficeId'],
    data() {
        return {
            myWorkshopOfficeAdList: '',
            translateActiveInactiveStatus: translateActiveInactiveStatus
        }
    },

    methods: {
        getMyWorkshopOfficeAdList() {
            const data = { workshop_office_id: this.workshopOfficeId }

            fetch('http://10.0.2.2:8080/WorkshopOfficeAdList', {
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
                            this.myWorkshopOfficeAdList = response.response
                            break
                        case 'Ads not found':
                            console.log('Ads not found')
                    }
                })
        },

        showMyWorkshopOfficeAd(event) {
            this.$navigator.navigate('/MyWorkshopOfficeAd', { props: { myWorkshopAd: event.item }, frame: 'accountNav', backstackVisible: false })
        },

        goToAddWorkshopOfficeAdPage() {
            this.$navigator.navigate('/AddWorkshopOfficeAd', { props: { workshopOfficeId: this.workshopOfficeId }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}