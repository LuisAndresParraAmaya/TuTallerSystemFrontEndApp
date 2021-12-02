const mPicker = require('nativescript-mediafilepicker')
const mediaFilePicker = new mPicker.Mediafilepicker()
const path = require('path')
const fileSystemModule = require('@nativescript/core/file-system')
import { SnackBar } from '@nativescript-community/ui-material-snackbar'
import { validateImage } from '~/utils/validator'
import { showSnackBarInsufficientPrivileges } from '~/utils/msg'
import { ApplicationSettings } from '@nativescript/core'

export default {
    props: ['workshopOfficeWorkId', 'workshopOfficeEmployeeList'],
    data() {
        return {
            descriptionInput: '',
            imageFile: '',
            imagePath: '',
            imageName: '',
            imageExt: '',

            descriptionInputErr: '',
            imageInputErr: '',

            isAddAdvanceBtnTappable: true,
        }
    },

    methods: {
        addWorkshopOfficeWorkAdvance() {
            if (this.validateFormAddWorkshopOfficeWorkAdvance()) {
                this.isAddAdvanceBtnTappable = false

                let file = this.imagePath
                let url = 'http://10.0.2.2:8080/AddWorkshopOfficeWorkAdvance'
                let name = file.substr(file.lastIndexOf('/') + 1)

                let bghttp = require('@nativescript/background-http')
                let session = bghttp.session('image-upload')
                let request = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    },
                    description: 'Uploading' + name
                }
                let params = [
                    { name: 'workshop_office_service_advance_description', value: this.descriptionInput.trim() },
                    { name: 'workshop_office_work_id', value: this.workshopOfficeWorkId },
                    { name: 'file', filename: file, mimeType: 'image/' + this.imageExt }
                ]
                let task = session.multipartUpload(params, request)
                task.on('error', () => {
                    const snackBar = new SnackBar()
                    snackBar.simple('Se ha producido un error al momento de realizar la acción. Inténtalo nuevamente.')
                    this.isAddAdvanceBtnTappable = true
                })
                task.on('responded', response => {
                    switch (JSON.parse(response.data).Response) {
                        case 'Operation Success':
                            this.$navigateBack()
                            break
                        case 'Operation Failed':
                            this.isAddAdvanceBtnTappable = true
                    }
                })
            }
        },

        validateFormAddWorkshopOfficeWorkAdvance() {
            let isValidationOK = true
            //Check if logged in user type is the technician
            if (!this.workshopOfficeEmployeeList.some(item => item.user_rut == ApplicationSettings.getString('user')) || ApplicationSettings.getString('userType') != 4) {
                showSnackBarInsufficientPrivileges()
                isValidationOK = false
            }
            //Null description input
            if (this.descriptionInput.trim() == '') {
                this.descriptionInputErr = 'Ingresa una descripción para el avance'
                isValidationOK = false
            }
            //Null image input
            if (this.imagePath.trim() == '') {
                this.imageInputErr = 'Ingresa una imagen para el avance'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
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

        onDescriptionTxtChange() {
            this.descriptionInputErr = ''
        },
        onImageImgChange() {
            this.imageInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    },
}