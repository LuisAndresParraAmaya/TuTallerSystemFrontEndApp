import { ApplicationSettings } from "@nativescript/core"

export default {
    props: ['workshopOfficeService', 'reservedDatetime'],
    data() {
        return {
        }
    },

    methods: {
        payWorkshopService() {
            //this.addWorkshopOfficeWork()
            this.$navigator.navigate('/Payment')
        },

        addWorkshopOfficeWork() {
            const data = { workshop_office_service_id: this.workshopOfficeService.id, user_user_rut: ApplicationSettings.getString('user') }

            fetch('http://10.0.2.2:8080/AddWorkshopOfficeWork', {
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
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            console.log(new Date())
                            this.$navigator.navigate('/PaymentReceipt', { props: { workshopOfficeService: this.workshopOfficeService } })
                            break
                        case 'Invalid user rut or service':
                            console.log('Invalid user rut or service')
                            break
                        case 'Milestone adding failed':
                            console.log('Milestone adding failed')
                    }
                })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}