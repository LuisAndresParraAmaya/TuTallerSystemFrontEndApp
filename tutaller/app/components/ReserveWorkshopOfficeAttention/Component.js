import { validateDatetime } from "~/utils/validator"

export default {
    props: ['workshopOfficeService'],
    data() {
        return {
            reservedDateInput: '',
            reservedTimeInput: '',
            reservedDatetimeErr: ''
        }
    },

    methods: {
        reserveAttention() {
            if (this.validateFormReserveAttention()) {
                this.$navigator.navigate('/PayWorkshopOfficeService')
            }
        },

        validateFormReserveAttention() {
            let isValidationOK = true
            //Valid until date/time validation
            let reservedDatetimeValidationRes = validateDatetime(this.reservedDateInput, this.reservedTimeInput, new Date())
            if (reservedDatetimeValidationRes !== null) {
                this.reservedDatetimeErr = reservedDatetimeValidationRes
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        onReservedDateChange(event) {
            this.reservedDateInput = event.value
            this.reservedDatetimeErr = ''
        },
        onReservedTimeChange(event) {
            this.reservedTimeInput = event.value
            this.reservedDatetimeErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}