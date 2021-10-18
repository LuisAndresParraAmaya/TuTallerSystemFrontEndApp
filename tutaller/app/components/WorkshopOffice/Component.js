const he = require('he')
import { formatEvaluation } from '~/utils/formatter'

export default {
    props: ['workshopOffice'],
    data() {
        return {
            formatEvaluation: formatEvaluation,
            he: he
        }
    },
    methods: {
        goToWorkshopOfficeServiceList() {
            this.$navigator.navigate('/WorkshopOfficeServiceList', { props: { workshopOfficeId: this.workshopOffice.workshop_office_id, actualFrame: 'navigator' } })
        },
        goToWorkshopOfficeEmployeeList() {
            this.$navigator.navigate('/WorkshopOfficeEmployeeList', { props: { workshopOfficeId: this.workshopOffice.workshop_office_id, actualFrame: 'navigator' } })
        },
        goToFileWorkshopOfficeComplaint() {
            this.$navigator.navigate('/FileWorkshopOfficeComplaint', { props: { workshopOffice: this.workshopOffice, actualFrame: 'navigator' } })
        },

        goToPreviousPage() {
            this.$navigateBack();
        }
    }
}