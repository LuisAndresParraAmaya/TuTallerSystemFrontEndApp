import { ApplicationSettings } from "@nativescript/core"
import { translateWorkStatus } from "~/utils/translators"

export default {
    data() {
        return {
            workshopOfficeWorkList: '',
            translateWorkStatus: translateWorkStatus
        }
    },

    methods: {
        showWorkshopOfficeWork(event) {
            this.$navigator.navigate('/WorkshopOfficeWork', { props: { workshopOfficeWork: event.item }, frame: 'serviceNav' })
        },

        getWorkshopOfficeWorkList() {
            const data = { user_rut: ApplicationSettings.getString('user') }

            fetch('http://10.0.2.2:8080/WorkshopOfficeWorkList', {
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
                            this.workshopOfficeWorkList = response.WorkshopOfficeWorkList
                            break
                        case 'Workshop office works not found':
                            console.log('Workshop office works not found')
                    }
                })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}