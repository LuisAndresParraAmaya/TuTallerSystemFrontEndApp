const mPicker = require('nativescript-mediafilepicker')
const mediaFilePicker = new mPicker.Mediafilepicker()
const path = require('path')
const fileSystemModule = require('@nativescript/core/file-system')
import { ApplicationSettings } from '@nativescript/core'
import { SnackBar } from '@nativescript-community/ui-material-snackbar'
import { validateName } from '~/utils/validator'
import { validatePhone } from '~/utils/validator'
import { validateImage } from '~/utils/validator'

export default {
    data() {
        return {
            phoneCountryCodeList: ['+56 Chile'],

            workshopNameInput: '',
            workshopPhoneInput: '',
            workshopPhoneCountryCodeInput: '',
            workshopDescriptionInput: '',
            workshopBusinessNameInput: '',
            workshopPostulationMessage: '',
            imageFile: '',
            imagePath: '',
            imageName: '',
            imageExt: '',

            workshopNameInputErr: '',
            workshopPhoneInputErr: '',
            workshopPhoneCountryCodeInputErr: '',
            workshopDescriptionInputErr: '',
            workshopBusinessNameInputErr: '',
            workshopPostulationMessageErr: '',
            imageInputErr: '',

            isSendBtnTappable: true
        }
    },

    methods: {
        sendPostulation() {
            if (this.validateFormSendPostulation()) {
                try {
                    let params = [
                        { name: 'user_rut', value: ApplicationSettings.getString('user') },
                        { name: 'workshop_name', value: this.workshopNameInput.trim() },
                        { name: 'workshop_number', value: this.workshopPhoneInput.trim() },
                        { name: 'workshop_description', value: this.workshopDescriptionInput.trim() },
                        { name: 'workshop_business_name', value: this.workshopBusinessNameInput.trim() },
                        { name: 'postulation_message', value: this.workshopPostulationMessage.trim() },
                        { name: 'file', filename: this.imagePath, mimeType: 'image/' + this.imageExt }
                    ]

                    this.$navigator.navigate('/AddWorkshopOffice', { props: { paramsSendPostulation: params, operationType: 'sendPostulation' }, frame: 'accountNav' })
                } catch (e) {
                    console.error(e)
                }
            }
        },

        validateFormSendPostulation() {
            let isValidationOK = true
            //Workshop name validation
            let workshopNameValidationRes = validateName(this.workshopNameInput.trim())
            if (workshopNameValidationRes !== null) {
                this.workshopNameInputErr = workshopNameValidationRes
                isValidationOK = false
            }
            //Workshop phone validation
            let workshopPhoneValidationRes = validatePhone(this.workshopPhoneInput.trim(), this.workshopPhoneCountryCodeInput.trim())
            if (workshopPhoneValidationRes !== null) {
                this.workshopPhoneInputErr = workshopPhoneValidationRes
                this.workshopPhoneCountryCodeInputErr = ' '
                isValidationOK = false
            }
            //Null workshop description input validation
            if (this.workshopDescriptionInput.trim() == '') {
                this.workshopDescriptionInputErr = 'Ingresa la descripción de tu taller.'
                isValidationOK = false
            }
            //Null workshop business name input validation
            if (this.workshopBusinessNameInput.trim() == '') {
                this.workshopBusinessNameInputErr = 'Ingresa la razón social de tu taller.'
                isValidationOK = false
            }
            //Null workshop message input validation
            if (this.workshopPostulationMessage.trim() == '') {
                this.workshopPostulationMessageErr = 'Ingresa un mensaje para tu postulación.'
                isValidationOK = false
            }
            //Null image input
            if (this.imagePath.trim() == '') {
                this.imageInputErr = 'Ingresa la foto de tu cédula de identidad.'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        selectPhoneCountryCode(event) {
            event.object.getViewById('txtPhoneCountryCode').clearFocus()
            action('Código de país', 'Cancelar', this.phoneCountryCodeList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.workshopPhoneCountryCodeInput = result
                    }
                })
        },

        async selectImage() {
            var options = {
                android: {
                    isCaptureMood: false,
                    isNeedCamera: false,
                    maxNumberFiles: 1,
                    isNeedFolderList: true
                }
            }
            mediaFilePicker.openImagePicker(options)
            mediaFilePicker.on('getFiles', res => {
                const imagePath = res.object.get('results')[0].file
                const imageParsedPath = path.parse(imagePath)
                const imageName = imageParsedPath.name
                const imageExt = imageParsedPath.ext.split('.').pop()
                const imageSize = fileSystemModule.File.fromPath(imagePath).size
                //Image validation
                let imageValidationRes = validateImage(imageName, imageExt, imageSize)
                if (imageValidationRes !== null) {
                    const snackBar = new SnackBar()
                    snackBar.simple(imageValidationRes)
                } else {//Validation OK
                    this.imagePath = imagePath
                    this.imageName = imageName
                    this.imageExt = imageExt
                    this.onImageImgChange()
                }
            })
            mediaFilePicker.on('error', error => {
                console.log('Error:', error)
                const snackBar = new SnackBar()
                snackBar.simple('Se ha producido un error para cargar la imagen. Inténtalo nuevamente.')
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
        onWorkshopBusinessNameTxtChange() {
            this.workshopBusinessNameInputErr = ''
        },
        onWorkshopPostulationMessageTxtChange() {
            this.workshopPostulationMessageErr = ''
        },
        onImageImgChange() {
            this.imageInputErr = ''
        },

        goToPreviousPage() {
            const snackBar = new SnackBar()
            snackBar.simple('Su postulación fue enviada correctamente a los administradores de TuTaller')
            this.$navigateBack()
        }
    },
}