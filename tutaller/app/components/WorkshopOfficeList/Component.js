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
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        default:
                            this.workshopOfficeList = response.response
                            break
                        case 'Offices not found':
                            console.log('fail')
                    }
                })
        },

        getAdImg() {
            fetch('http://10.0.2.2:8080/img', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        default:
                            console.log(response.response)
                    }
                })
        },

        onPageLoaded() {
            this.getWorkshopList()
            this.getAdImg()
        },

        showWorkshopOffice(event) {
            this.$navigator.navigate('/WorkshopOffice', { props: { workshopOffice: event.item } })
        },

        showWorkshopOfficeFromAd() {
            console.log('hola')
        },

        goToFilterWorkshopOfficeListPage() {
            this.$navigator.navigate('/FilterWorkshopOfficeList', { props: { workshopOfficeList: this.workshopOfficeList }, backstackVisible: false } )
        }
    }
}