import { validateName } from "~/utils/validator"
import { validateDatetime } from "~/utils/validator"
import { validateDiscount } from "~/utils/validator"
import { formatDateToDB } from "~/utils/formatter"
import { formatTimeToDB } from "~/utils/formatter"

export default {
    props: ['offerType', 'workshopOfficeId'],
    data() {
        return {
            nameInput: '',
            discountInput: '',
            validUntilDate: '',
            validUntilTime: '',

            nameInputErr: '',
            discountInputErr: '',
            validUntilErr: '',

            isAddOfferBtnTappable: true,
        }
    },

    methods: {
        addOffer() {
            if (this.validateFormAddWorkshopOfficeServiceOffer()) {
                const data = { offer_type: this.offerType, offer_name: this.nameInput, offer_discount: this.discountInput, offer_valid_until_date: formatDateToDB(this.validUntilDate), offer_valid_until_time: formatTimeToDB(this.validUntilTime) }
                this.$navigator.navigate('/ActivateOffer', { props: { addOfferData: data, offerType: this.offerType, workshopOfficeId: this.workshopOfficeId }, frame: 'accountNav', backstackVisible: false })
            }
        },

        validateFormAddWorkshopOfficeServiceOffer() {
            let isValidationOK = true
            //Name validation
            let nameValidationRes = validateName(this.nameInput.trim())
            if (nameValidationRes !== null) {
                this.nameInputErr = nameValidationRes
                isValidationOK = false
            }
            //Discount validation
            let discountValidationRes = validateDiscount(this.discountInput)
            if (discountValidationRes !== null) {
                this.discountInputErr = discountValidationRes
                isValidationOK = false
            }
            //Valid until date/time validation
            let validUntilDatetimeValidationRes = validateDatetime(this.validUntilDate, this.validUntilTime, new Date())
            if (validUntilDatetimeValidationRes !== null) {
                this.validUntilErr = validUntilDatetimeValidationRes
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) {
                return true
            } else {
                return false
            }
        },

        onNameTxtChange() {
            this.nameInputErr = ''
        },
        onDiscountTxtChange() {
            this.discountInputErr = ''
        },
        onValidUntilDateChange(event) {
            this.validUntilDate = event.value
            this.validUntilErr = ''
        },
        onValidUntilTimeChange(event) {
            this.validUntilTime = event.value
            this.validUntilErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}