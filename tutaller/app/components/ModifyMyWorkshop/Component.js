export default {
    props: ['myWorkshop'],
    data() {
        return {
            phoneCountryCodeList: ['+56 Chile'],

            workshopNameInput: this.myWorkshop.workshop_name,
            workshopPhoneInput: this.myWorkshop.workshop_number,
            phoneCountryCodeInput: '+56 Chile',
            workshopDescriptionInput: this.myWorkshop.workshop_description,

            workshopNameInputErr: '',
            workshopPhoneInputErr: '',
            workshopPhoneCountryCodeInputErr: '',
            workshopDescriptionInputErr: '',

            isModifyBtnTappable: true
        }
    },

    methods: {
        modifyMyWorkshop() {
            alert('Función en construcción')
        },

        validateFormModifyMyWorkshop() {

        },

        selectPhoneCountryCode(event) {
            event.object.getViewById('txtPhoneCountryCode').clearFocus()
            action('Código de país', 'Cancelar', this.phoneCountryCodeList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.phoneCountryCodeInput = result
                    }
                })
        },

        onWorkshopNameTxtChange() {
            this.workshopNameInputErr = ''
        },
        onWorkshopPhoneTxtChange() {
            this.workshopPhoneInputErr = ''
            this.workshopPhoneCountryCodeInputErr = ''
        },
        onWorkshopDescriptionTxtChange() {
            this.workshopDescriptionInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}