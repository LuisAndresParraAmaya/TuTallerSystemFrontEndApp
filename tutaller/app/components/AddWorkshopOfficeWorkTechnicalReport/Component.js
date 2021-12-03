import { ApplicationSettings } from "@nativescript/core"
import { showSnackBarInsufficientPrivileges } from "~/utils/msg"
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    props: ['workshopOfficeWorkId', 'workshopOfficeWorkMilestoneId', 'workshopOfficeEmployeeList'],
    data() {
        return {
            brandInput: '',
            modelInput: '',
            kmInput: '',
            ppuInput: '',
            fuelTypeInput: '',
            colorInput: '',
            engineInput: '',
            chassisInput: '',
            descriptionInput: '',

            brandInputErr: '',
            modelInputErr: '',
            kmInputErr: '',
            ppuInputErr: '',
            fuelTypeInputErr: '',
            colorInputErr: '',
            engineInputErr: '',
            chassisInputErr: '',
            descriptionInputErr: '',

            isAddTechnicalReportBtnTappable: true
        }
    },

    methods: {
        addWorkshopOfficeWorkTechnicalReport() {
            if (this.validateFormCreateAccount()) {
                const data = { workshop_office_work_id: this.workshopOfficeWorkId, office_work_technical_report_km: this.kmInput.trim(), office_work_technical_report_ppu: this.ppuInput.trim(), office_work_technical_report_fuel_type: this.fuelTypeInput.trim(), office_work_technical_report_color: this.colorInput.trim(), office_work_technical_report_engine: this.engineInput.trim(), office_work_technical_report_model: this.modelInput.trim(), office_work_technical_report_brand: this.brandInput.trim(), office_work_technical_report_chassis: this.chassisInput.trim(), office_work_technical_report_description: this.descriptionInput.trim() }

                fetch('http://10.0.2.2:8080/AddWorkshopOfficeWorkTechnicalReport', {
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
                                this.completeWorkshopOfficeWorkMilestone()
                                break
                            case 'Workshop office work already has a technical report':
                                alert({
                                    title: 'Error',
                                    message: 'A este trabajo ya se le ha ingresado la ficha técnica.',
                                    okButtonText: 'OK'
                                }).then(() => this.$navigateBack())
                                break
                            case 'Operation Failed':
                                console.log('Operation Failed')
                        }
                    })
            }
        },

        //Complete the current workshop office work milestone
        completeWorkshopOfficeWorkMilestone() {
            this.isAddTechnicalReportBtnTappable = false
            const data = { workshop_office_work_milestone_id: this.workshopOfficeWorkMilestoneId, workshop_office_work_id: this.workshopOfficeWorkId }

            fetch('http://10.0.2.2:8080/CompleteWorkshopOfficeWorkMilestone', {
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
                    }).then(() => {
                        this.isAddTechnicalReportBtnTappable = true
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.$navigateBack()
                            break
                        case 'Workshop milestone already completed':
                            const snackBar = new SnackBar()
                            snackBar.simple('El hito solicitado ya se encuentra completado.')
                            this.isAddTechnicalReportBtnTappable = true
                            break
                        case 'No workshop milestone is pending':
                            console.log('No workshop milestone is pending')
                            this.isAddTechnicalReportBtnTappable = true
                    }
                })
        },

        validateFormCreateAccount() {
            let isValidationOK = true
            //Check if logged in user type is the technician
            if (!this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) || ApplicationSettings.getString('userType') != 4) {
                showSnackBarInsufficientPrivileges()
                isValidationOK = false
            }
            //Brand validation
            if (this.brandInput.trim() == '') {
                this.brandInputErr = 'Ingresa la marca.'
                isValidationOK = false
            }
            //Model validation
            if (this.modelInput.trim() == '') {
                this.modelInputErr = 'Ingresa el modelo.'
                isValidationOK = false
            }
            //Km validation
            if (this.kmInput.trim() == '') {
                this.kmInputErr = 'Ingresa el kilometraje.'
                isValidationOK = false
            } else if (this.kmInput.trim() <= 0) {
                this.kmInputErr = 'El kilometraje debe ser mayor a 0.'
                isValidationOK = false
            }
            //Ppu validation
            if (this.ppuInput.trim() == '') {
                this.ppuInputErr = 'Ingresa la placa patente única.'
                isValidationOK = false
            }
            //Fuel type validation
            if (this.fuelTypeInput.trim() == '') {
                this.fuelTypeInputErr = 'Ingresa el tipo de combustible.'
                isValidationOK = false
            }
            //Color validation
            if (this.colorInput.trim() == '') {
                this.colorInputErr = 'Ingresa el color.'
                isValidationOK = false
            }
            //Engine validation
            if (this.engineInput.trim() == '') {
                this.engineInputErr = 'Ingresa el número de motor.'
                isValidationOK = false
            }
            //Chassis validation
            if (this.chassisInput.trim() == '') {
                this.chassisInputErr = 'Ingresa el número de chasis.'
                isValidationOK = false
            }
            //Description validation
            if (this.descriptionInput.trim() == '') {
                this.descriptionInputErr = 'Ingresa la descripción.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        onBrandTxtChange() {
            this.brandInputErr = ''
        },
        onModelTxtChange() {
            this.modelInputErr = ''
        },
        onKmTxtChange() {
            this.kmInputErr = ''
        },
        onPpuTxtChange() {
            this.ppuInputErr = ''
        },
        onFuelTypeTxtChange() {
            this.fuelTypeInputErr = ''
        },
        onColorTxtChange() {
            this.colorInputErr = ''
        },
        onEngineTxtChange() {
            this.engineInputErr = ''
        },
        onChassisTxtChange() {
            this.chassisInputErr = ''
        },
        onDescriptionTxtChange() {
            this.descriptionInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}