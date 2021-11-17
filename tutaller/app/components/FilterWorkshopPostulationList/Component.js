const sqlite = require('nativescript-sqlite')

export default {
    props: ['workshopPostulationList'],
    data() {
        return {
            workshopNameInput: '',
            postulationStatusInput: '',
            fromPostulationDateInput: undefined,
            toPostulationDateInput: undefined,
            toPostulationDateInputErr: '',

            isFilterBtnTappable: true
        }
    },

    methods: {
        filterWorkshopPostulationList() {
            if (this.validateFormFilterWorkshopPostulationList()) {
                this.isFilterBtnTappable = false
                const data = { workshop_name: this.workshopNameInput.trim(), postulation_status: postulationStatusInput.trim(), from_postulation_date: this.fromPostulationDateInput, to_postulation_date: this.toPostulationDateInput }

            }
            new sqlite('tutaller.db', (err, db) => {
                db.execSQL('DROP TABLE IF EXISTS workshop_postulation_list;')
                db.execSQL('CREATE TABLE IF NOT EXISTS workshop_postulation_list (id INTEGER, postulation_current_status TEXT, postulation_message TEXT, workshop_id INTEGER')
            })
        },

        validateFormFilterWorkshopPostulationList() {
            let isValidationOK = true
            //Rut validation
            if (this.fromPostulationDateInput > this.toPostulationDateInput) {
                this.toPostulationDateInputErr = 'Ingresa un periodo de tiempo valido.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        selectPostulationStatus(event) {
            event.object.getViewById('txtPostulationStatus').clearFocus()
            action('Estado de postulación', 'Cancelar', this.postulationStatusList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.postulationStatusInput = result
                    }
                })
        },

        onFromPostulationDateChange(event) {
            this.fromPostulationDateInput = event.value
        },
        onToPostulationDateChange(event) {
            this.toPostulationDateInput = event.value
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    },
}