import { validateDatetime } from "~/utils/validator"
import { translateWeekDay } from '~/utils/translators'
import { formatTimeHM } from '~/utils/formatter'
import { validateDatetimeAttention } from "~/utils/validator"

export default {
    props: ['workshopOffice', 'workshopOfficeService', 'workshopOfficeAttentionList'],
    data() {
        return {
            reservedDateInput: '',
            reservedTimeInput: '',
            reservedDatetimeErr: '',

            translateWeekDay: translateWeekDay,
            formatTimeHM: formatTimeHM
        }
    },

    methods: {
        reserveAttention() {
            if (this.validateFormReserveAttention()) {
                const reservedDatetime = { reserved_date: this.reservedDateInput, reserved_time: this.reservedTimeInput }
                this.$navigator.navigate('/PayWorkshopOfficeService', { props: { workshopOffice: this.workshopOffice, workshopOfficeService: this.workshopOfficeService, reservedDatetime: reservedDatetime } })
            }
        },

        validateFormReserveAttention() {
            let isValidationOK = true
            //Valid until date/time validation
            let reservedDatetimeValidationRes = validateDatetime(this.reservedDateInput, this.reservedTimeInput, new Date())
            if (reservedDatetimeValidationRes !== null) {
                this.reservedDatetimeErr = reservedDatetimeValidationRes
                isValidationOK = false
            } else {
                //Attention date/time validation
                let reservedDatetimeAttentionValidationRes = validateDatetimeAttention(this.reservedDateInput, this.reservedTimeInput, this.workshopOfficeAttentionList)
                if (reservedDatetimeAttentionValidationRes !== null) {
                    this.reservedDatetimeErr = reservedDatetimeAttentionValidationRes
                    isValidationOK = false
                }
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