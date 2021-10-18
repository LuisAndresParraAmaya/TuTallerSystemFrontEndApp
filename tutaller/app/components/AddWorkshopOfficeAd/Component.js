const mPicker = require('nativescript-mediafilepicker')
const mediaFilePicker = new mPicker.Mediafilepicker()
const path = require('path')
const fileSystemModule = require('@nativescript/core/file-system')
import { SnackBar } from '@nativescript-community/ui-material-snackbar'
import { ImageSource } from '@nativescript/core'
import { validateImage } from '~/utils/validator'

export default {
    props: ['workshopOfficeId'],
    data() {
        return {
            adNameInput: '',
            adImageFile: '',
            adImagePath: '',
            adImageName: '',
            adImageExt: '',

            adNameInputErr: '',
            adImageInputErr: '',

            isAddAdBtnTappable: true,
        }
    },

    methods: {
        addWorkshopOfficeAd() {
            if (this.validateFormAddWorkshopOfficeAd()) {
                this.isAddAdBtnTappable = false

                let file = this.adImagePath
                let url = 'http://10.0.2.2:8080/AddWorkshopOfficeAd'
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
                    { name: 'workshop_office_ad_name', value: this.adNameInput.trim() },
                    { name: 'workshop_office_id', value: this.workshopOfficeId },
                    { name: 'file', filename: file, mimeType: 'image/' + this.adImageExt }
                ]
                let task = session.multipartUpload(params, request)
                task.on('error', error => {
                    console.log('Error:', error)
                    const snackBar = new SnackBar()
                    snackBar.simple('Se ha producido un error al momento de realizar la acción. Inténtalo nuevamente.')
                    this.isAddAdBtnTappable = true
                })
                task.on('responded', response => {
                    switch (JSON.parse(response.data).Response) {
                        case 'Operation Success':
                            this.$navigateBack()
                            break
                        case 'Operation Failed':
                            this.isAddAdBtnTappable = true
                    }
                })
            }
        },

        validateFormAddWorkshopOfficeAd() {
            let isValidationOK = true
            //Null ad name input
            if (this.adNameInput.trim() == '') {
                this.adNameInputErr = 'Ingresa un nombre para el anuncio'
                isValidationOK = false
            }
            //Null ad image input
            if (this.adImagePath.trim() == '') {
                this.adImageInputErr = 'Ingresa una imagen para el anuncio'
                isValidationOK = false
            }
            //Check if validation is OK
            if (isValidationOK) {
                return true
            } else {
                return false
            }
        },

        async selectAdImage() {
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
                    this.adImagePath = imagePath
                    this.adImageName = imageName
                    this.adImageExt = imageExt
                    this.onAdImageImgChange()
                }
            })
            mediaFilePicker.on('error', error => {
                console.log('Error:', error)
                const snackBar = new SnackBar()
                snackBar.simple('Se ha producido un error para cargar la imagen. Inténtalo nuevamente.')
            })
        },

        onAdNameTxtChange() {
            this.adNameInputErr = ''
        },
        onAdImageImgChange() {
            this.adImageInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    },
}