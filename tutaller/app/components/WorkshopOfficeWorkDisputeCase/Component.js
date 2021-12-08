import { formatDateTime } from "~/utils/formatter"
import { translateServiceWorkDisputeCaseStatus } from "~/utils/translators"

export default {
    props: ['workshopOfficeWorkDisputeCase'],
    data() {
        return {
            translateServiceWorkDisputeCaseStatus: translateServiceWorkDisputeCaseStatus,
            formatDateTime: formatDateTime
        }
    },

    methods: {
        goToResolveWorkshopOfficeWorkDisputeCasePage() {
            this.$navigator.navigate('/ResolveWorkshopOfficeWorkDisputeCase', { props: { workshopOfficeWorkDisputeCase: this.workshopOfficeWorkDisputeCase }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}