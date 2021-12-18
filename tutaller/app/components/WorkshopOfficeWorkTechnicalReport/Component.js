export default {
    props: ['workshopOfficeWorkId'],
    data() {
        return {
            workshopOfficeWorkTechnicalReport: ''
        }
    },

    methods: {
        getWorkshopOfficeWorkTechnicalReport() {
            const data = { workshop_office_work_id: this.workshopOfficeWorkId }

            fetch('http://10.0.2.2:8080/WorkshopOfficeWorkTechnicalReport', {
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
                            this.workshopOfficeWorkTechnicalReport = response.WorkshopOfficeWorkTechnicalReport[0]
                            break
                        case 'Technical report not found':
                            console.log('Technical report not found')
                    }
                })
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}