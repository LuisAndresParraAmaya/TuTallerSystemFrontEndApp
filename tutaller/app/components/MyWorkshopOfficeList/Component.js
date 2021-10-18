export default {
    props: ['myWorkshop'],
    data() {
        return {
            myWorkshopOfficeList: ''
        }
    },

    methods: {
        getMyWorkshopOfficeList() {
            const data = { workshop_id: this.myWorkshop.workshop_id }
            fetch('http://10.0.2.2:8080/MyWorkShopOfficeList', {
                method: 'POST',
                body: JSON.stringify({ data }),
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
                    }).then(() => {
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        default:
                            this.myWorkshopOfficeList = response.response
                            break
                        case 'Any WorkShop Found':
                            console.log('fail')
                    }
                })
        },

        showMyWorkshopOffice(event) {
            const data = { workshop_office_id: event.item.workshop_office_id }
            fetch('http://10.0.2.2:8080/MyWorkshopOfficeAttention', {
                method: 'POST',
                body: JSON.stringify({ data }),
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
                    }).then(() => {
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        default:
                            this.$navigator.navigate('/MyWorkshopOffice', { props: { myWorkshopOffice: event.item, myWorkshopOfficeAttention: response.response }, frame: 'accountNav' })
                            break
                        case 'Attention Not Found':
                            console.log('fail')
                    }
                })
        },

        formatWorkshopSuscriptionName(str) {
            switch (str) {
                case 'unsubscribed':
                    return 'Sin subscripción activa'
                case 'basic':
                    return 'Plan básico activo'
            }
        },

        goToAddWorkshopOfficePage() {
            this.$navigator.navigate('/AddWorkshopOffice', { props: { myWorkshop: this.myWorkshop }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}