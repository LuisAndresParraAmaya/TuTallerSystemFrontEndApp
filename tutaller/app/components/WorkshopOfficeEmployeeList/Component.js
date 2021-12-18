import { ApplicationSettings } from '@nativescript/core'

export default {
    props: ['workshopOfficeId', 'myWorkshop', 'actualFrame'],
    data() {
        return {
            myWorkshopOfficeEmployeeList: '',
            userType: ApplicationSettings.getString('userType')
        }
    },

    methods: {
        getWorkshopOfficeEmployeeList() {
            const data = { workshop_office_id: this.workshopOfficeId }
            fetch('http://10.0.2.2:8080/WorkshopOfficeEmployeeList', {
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
                            this.myWorkshopOfficeEmployeeList = response.response
                            break
                        case 'Employees not found':
                            console.log('fail')
                    }
                })
        },

        showMyWorkshopOfficeEmployee(event) {
            //this.$navigator.navigate('/MyWorkshopOfficeEmployee', { props: { myWorkshopOfficeEmployee: event.item }, frame: 'accountNav' })
            alert('Función en construcción')
        },

        goToAddWorkshopOfficeEmployeePage() {
            this.$navigator.navigate('/AddWorkshopOfficeEmployee', { props: { workshopOfficeId: this.workshopOfficeId }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}