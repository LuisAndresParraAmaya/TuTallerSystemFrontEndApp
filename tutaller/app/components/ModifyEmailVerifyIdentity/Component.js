import { Dialogs, inputType } from '@nativescript/core'
import { ApplicationSettings } from '@nativescript/core'
import { SnackBar } from '@nativescript-community/ui-material-snackbar'
import { Toasty } from '@triniwiz/nativescript-toasty'

export default {
    props: ['modifyProfileData'],
    data() {
        return {
            codeInput: '',
            codeInputErr: '',
            isConfirmBtnTappable: true
        }
    },

    methods: {
        changeEmailValidation() {
            this.isConfirmBtnTappable = false
            const data = { user_email: ApplicationSettings.getString('userEmail'), recovery_code: this.codeInput.trim() }

            fetch('http://10.0.2.2:8080/SendValidateEmailCode', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    }).then(() => {
                        this.isConfirmBtnTappable = true
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Validate Email Success':
                            this.modifyProfile()
                            break
                        case 'Validate Email Failed':
                            this.codeInputErr = 'El código ingresado es erroneo'
                            this.isConfirmBtnTappable = true
                    }
                })
        },

        modifyProfile() {
            prompt({
                message: 'Confirma tu contraseña actual para modificar tu perfil',
                inputType: inputType.password,
                okButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(passwordInput => {
                if (passwordInput.result) {
                    const data = { user_rut: ApplicationSettings.getString('user'), user_new_rut: this.modifyProfileData.user_rut.trim(), user_name: this.modifyProfileData.user_name.trim(), user_last_name: this.modifyProfileData.user_last_name.trim(), user_email: this.modifyProfileData.user_email.trim(), user_phone: this.modifyProfileData.user_phone.trim(), user_password: passwordInput.text }

                    fetch('http://10.0.2.2:8080/ModifyProfile', {
                        method: 'POST',
                        body: JSON.stringify({ data }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                        .catch(error => {
                            console.error('Error:', error)
                            alert({
                                title: 'Error',
                                message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                                okButtonText: 'OK'
                            }).then(() => {
                                this.isConfirmBtnTappable = true
                            })
                        })
                        .then(response => {
                            switch (response.Response) {
                                default:
                                    ApplicationSettings.setString('user', response.user_new_rut.toString())
                                    ApplicationSettings.setString('userName', data.user_name)
                                    ApplicationSettings.setString('userLastName', data.user_last_name)
                                    ApplicationSettings.setString('userPhone', data.user_phone.toString())
                                    ApplicationSettings.setString('userEmail', data.user_email)
                                    this.$navigator.navigate('/AccountOptions', { frame: 'accountNav', clearHistory: true })
                                    break
                                case 'Operation Failed':
                                    this.isConfirmBtnTappable = true
                                    break
                                case 'Actual Password Failed':
                                    const snackBar = new SnackBar()
                                    snackBar.simple('La contraseña actual es incorrecta. Inténtalo nuevamente.')
                                    this.isConfirmBtnTappable = true
                            }
                        })
                } else {
                    this.isConfirmBtnTappable = true
                }
            })
        },

        onCodeTxtChange() {
            this.codeInputErr = ''
        },

        goToPreviousPage() {
            confirm({
                title: '¿Estás seguro de volver?',
                message: 'Esto cancelará el proceso de actualización actual de tu cuenta.',
                okButtonText: 'Volver',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result) {
                    this.$navigator.navigate('/ModifyAccount', { frame: 'accountNav', backstackVisible: false })
                }
            })
        }
    }
}