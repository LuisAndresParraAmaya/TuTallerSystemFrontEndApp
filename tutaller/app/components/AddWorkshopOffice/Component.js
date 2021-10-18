import { action } from "@nativescript/core"
const validator = require('~/utils/validator')
import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
  props: ['myWorkshop'],
  data() {
    return {
      regionObject: [],
      regionList: [],
      communeObject: [],
      communeList: [],
      phoneCountryCodeList: ['+56 Chile'],

      regionIdInput: '',
      regionInput: '',
      communeIdInput: '',
      communeInput: '',
      addressInput: '',
      phoneInput: '',
      phoneCountryCodeInput: '',

      isMondayChecked: false,
      isTuesdayChecked: false,
      isWednesdayChecked: false,
      isThursdayChecked: false,
      isFridayChecked: false,
      isSaturdayChecked: false,
      isSundayChecked: false,

      mondayApertureTimeInput: '',
      mondayDepartureTimeInput: '',
      tuesdayApertureTimeInput: '',
      tuesdayDepartureTimeInput: '',
      wednesdayApertureTimeInput: '',
      wednesdayDepartureTimeInput: '',
      thursdayApertureTimeInput: '',
      thursdayDepartureTimeInput: '',
      fridayApertureTimeInput: '',
      fridayDepartureTimeInput: '',
      saturdayApertureTimeInput: '',
      saturdayDepartureTimeInput: '',
      sundayApertureTimeInput: '',
      sundayDepartureTimeInput: '',

      mondayApertureTime: '',
      mondayDepartureTime: '',
      tuesdayApertureTime: '',
      tuesdayDepartureTime: '',
      wednesdayApertureTime: '',
      wednesdayDepartureTime: '',
      thursdayApertureTime: '',
      thursdayDepartureTime: '',
      fridayApertureTime: '',
      fridayDepartureTime: '',
      saturdayApertureTime: '',
      saturdayDepartureTime: '',
      sundayApertureTime: '',
      sundayDepartureTime: '',

      regionInputErr: '',
      communeInputErr: '',
      addressInputErr: '',
      phoneInputErr: '',
      phoneCountryCodeInputErr: '',
      mondayInputErr: '',
      tuesdayInputErr: '',
      wednesdayInputErr: '',
      thursdayInputErr: '',
      fridayInputErr: '',
      saturdayInputErr: '',
      sundayInputErr: '',

      isCommuneInputHidden: true,

      isAddWorkshopOfficeBtnTappable: true
    }
  },

  methods: {
    addWorkshopOffice() {
      if (this.validateFormAddWorkshopOffice()) {
        this.isAddWorkshopOfficeBtnTappable = false
        const workshopOfficeAttentionData = []

        if (this.isMondayChecked) {
          const mondayApertureTime = this.mondayApertureTimeInput.getHours() + ':' + this.mondayApertureTimeInput.getMinutes()
          const mondayDepartureTime = this.mondayDepartureTimeInput.getHours() + ':' + this.mondayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ workshop_office_attention_day: 'monday', workshop_office_attention_aperture_time: mondayApertureTime, workshop_office_attention_departure_time: mondayDepartureTime })
        }
        if (this.isTuesdayChecked) {
          const tuesdayApertureTime = this.tuesdayApertureTimeInput.getHours() + ':' + this.tuesdayApertureTimeInput.getMinutes()
          const tuesdayDepartureTime = this.tuesdayDepartureTimeInput.getHours() + ':' + this.tuesdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ workshop_office_attention_day: 'tuesday', workshop_office_attention_aperture_time: tuesdayApertureTime, workshop_office_attention_departure_time: tuesdayDepartureTime })
        }
        if (this.isWednesdayChecked) {
          const wednesdayApertureTime = this.wednesdayApertureTimeInput.getHours() + ':' + this.wednesdayApertureTimeInput.getMinutes()
          const wednesdayDepartureTime = this.wednesdayDepartureTimeInput.getHours() + ':' + this.wednesdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ workshop_office_attention_day: 'wednesday', workshop_office_attention_aperture_time: wednesdayApertureTime, workshop_office_attention_departure_time: wednesdayDepartureTime })
        }
        if (this.isThursdayChecked) {
          const thursdayApertureTime = this.thursdayApertureTimeInput.getHours() + ':' + this.thursdayApertureTimeInput.getMinutes()
          const thursdayDepartureTime = this.thursdayDepartureTimeInput.getHours() + ':' + this.thursdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ workshop_office_attention_day: 'thursday', workshop_office_attention_aperture_time: thursdayApertureTime, workshop_office_attention_departure_time: thursdayDepartureTime })
        }
        if (this.isFridayChecked) {
          const fridayApertureTime = this.fridayApertureTimeInput.getHours() + ':' + this.fridayApertureTimeInput.getMinutes()
          const fridayDepartureTime = this.fridayDepartureTimeInput.getHours() + ':' + this.fridayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ workshop_office_attention_day: 'friday', workshop_office_attention_aperture_time: fridayApertureTime, workshop_office_attention_departure_time: fridayDepartureTime })
        }
        if (this.isSaturdayChecked) {
          const saturdayApertureTime = this.saturdayApertureTimeInput.getHours() + ':' + this.saturdayApertureTimeInput.getMinutes()
          const saturdayDepartureTime = this.saturdayDepartureTimeInput.getHours() + ':' + this.saturdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ workshop_office_attention_day: 'saturday', workshop_office_attention_aperture_time: saturdayApertureTime, workshop_office_attention_departure_time: saturdayDepartureTime })
        }
        if (this.isSundayChecked) {
          const sundayApertureTime = this.sundayApertureTimeInput.getHours() + ':' + this.sundayApertureTimeInput.getMinutes()
          const sundayDepartureTime = this.sundayDepartureTimeInput.getHours() + ':' + this.sundayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ workshop_office_attention_day: 'sunday', workshop_office_attention_aperture_time: sundayApertureTime, workshop_office_attention_departure_time: sundayDepartureTime })
        }

        if (workshopOfficeAttentionData.length !== 0) {
          const data = { workshop_id: this.myWorkshop.workshop_id, commune_id: this.communeIdInput, workshop_suscription_id: 1, workshop_office_address: this.addressInput.trim(), workshop_office_phone: this.phoneInput.trim(), workshop_office_attention: workshopOfficeAttentionData }

          fetch('http://10.0.2.2:8080/AddWorkshopOffice', {
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
                this.isAddWorkshopOfficeBtnTappable = true
              })
            })
            .then(response => {
              switch (response.Response) {
                case 'Office Attention Success':
                  this.$navigateBack()
                  break
                default:
                  this.isAddWorkshopOfficeBtnTappable = true
              }
            })
        } else {
          const snackBar = new SnackBar()
          snackBar.simple('Debes ingresar al menos un día para el horario de atención')
          this.isAddWorkshopOfficeBtnTappable = true
        }
      }
    },

    validateFormAddWorkshopOffice() {
      let isValidationOK = true
      //Null region input validation
      if (this.regionInput.trim() == '') {
        this.regionInputErr = 'Ingresa una región'
        isValidationOK = false
      } else if (this.communeInput.trim() == '') {
        //Null commune input validation
        this.communeInputErr = 'Ingresa una comuna'
        isValidationOK = false
      }
      //Address validation
      let addressValidationRes = validator.validateAddress(this.addressInput.trim())
      if (addressValidationRes !== null) {
        this.addressInputErr = addressValidationRes
        isValidationOK = false
      }
      //Phone validation
      let phoneValidationRes = validator.validatePhone(this.phoneInput.trim(), this.phoneCountryCodeInput.trim())
      if (phoneValidationRes !== null) {
        this.phoneInputErr = phoneValidationRes
        this.phoneCountryCodeInputErr = ' '
        isValidationOK = false
      }
      //Monday time validation
      let mondayValidationRes = validator.validateAttentionTime(this.isMondayChecked, this.mondayApertureTimeInput, this.mondayDepartureTimeInput, 'lunes')
      if (mondayValidationRes !== null) {
        this.mondayInputErr = mondayValidationRes
        isValidationOK = false
      }
      //Tuesday time validation
      let tuesdayValidationRes = validator.validateAttentionTime(this.isTuesdayChecked, this.tuesdayApertureTimeInput, this.tuesdayDepartureTimeInput, 'martes')
      if (tuesdayValidationRes !== null) {
        this.tuesdayInputErr = tuesdayValidationRes
        isValidationOK = false
      }
      //Wednesday time validation
      let wednesdayValidationRes = validator.validateAttentionTime(this.isWednesdayChecked, this.wednesdayApertureTimeInput, this.wednesdayDepartureTimeInput, 'miercoles')
      if (wednesdayValidationRes !== null) {
        this.wednesdayInputErr = wednesdayValidationRes
        isValidationOK = false
      }
      //Thursday time validation
      let thursdayValidationRes = validator.validateAttentionTime(this.isThursdayChecked, this.thursdayApertureTimeInput, this.thursdayDepartureTimeInput, 'jueves')
      if (thursdayValidationRes !== null) {
        this.thursdayInputErr = thursdayValidationRes
        isValidationOK = false
      }
      //Friday time validation
      let fridayValidationRes = validator.validateAttentionTime(this.isFridayChecked, this.fridayApertureTimeInput, this.fridayDepartureTimeInput, 'viernes')
      if (fridayValidationRes !== null) {
        this.fridayInputErr = fridayValidationRes
        isValidationOK = false
      }
      //Saturday time validation
      let saturdayValidationRes = validator.validateAttentionTime(this.isSaturdayChecked, this.saturdayApertureTimeInput, this.saturdayDepartureTimeInput, 'sábado')
      if (saturdayValidationRes !== null) {
        this.saturdayInputErr = saturdayValidationRes
        isValidationOK = false
      }
      //Sunday time validation
      let sundayValidationRes = validator.validateAttentionTime(this.isSundayChecked, this.sundayApertureTimeInput, this.sundayDepartureTimeInput, 'domingo')
      if (sundayValidationRes !== null) {
        this.sundayInputErr = sundayValidationRes
        isValidationOK = false
      }
      //Check if validation is OK
      if (isValidationOK) {
        return true
      } else {
        return false
      }
    },

    onPageLoaded() {
      fetch('http://10.0.2.2:8080/RegionList', {
        method: 'GET',
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
          this.regionObject = response.response
          response.response.forEach(element => {
            this.regionList.push(element.region_name)
          })
        })

      fetch('http://10.0.2.2:8080/CommuneList', {
        method: 'GET',
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
          this.communeObject = response.response
        })
    },

    selectRegion(event) {
      event.object.getViewById('txtRegion').clearFocus()
      action('Región de la sucursal', 'Cancelar', this.regionList)
        .then(result => {
          if (result !== 'Cancelar') {
            this.regionInput = result
            this.regionObject.forEach(element => {
              if (element.region_name == this.regionInput) {
                this.regionIdInput = element.id
              }
            })
            this.communeList = []
            this.communeObject.forEach(element => {
              if (element.region_id == this.regionIdInput) {
                this.communeList.push(element.commune_name)
              }
            })
            this.isCommuneInputHidden = false
            this.communeIdInput = ''
            this.communeInput = ''
          }
        })
    },
    selectCommune(event) {
      event.object.getViewById('txtCommune').clearFocus()
      action('Comuna de la sucursal', 'Cancelar', this.communeList)
        .then(result => {
          if (result !== 'Cancelar') {
            this.communeInput = result
            this.communeObject.forEach(element => {
              if (element.commune_name == this.communeInput) {
                this.communeIdInput = element.id
              }
            })
          }
        })
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

    onRegionTxtChange() {
      this.regionInputErr = ''
    },
    onCommuneTxtChange() {
      this.communeInputErr = ''
    },
    onAddressTxtChange() {
      this.addressInputErr = ''
    },
    onPhoneTxtChange() {
      this.phoneInputErr = ''
      this.phoneCountryCodeInputErr = ''
    },

    onMondaySwitchChange() {
      if (this.isMondayChecked) {
        this.isMondayChecked = false
      } else {
        this.isMondayChecked = true
      }
      this.mondayInputErr = ''
    },
    onMondayApertureTimeChange(event) {
      this.mondayApertureTimeInput = event.value
      this.mondayInputErr = ''
    },
    onMondayDepartureTimeChange(event) {
      this.mondayDepartureTimeInput = event.value
      this.mondayInputErr = ''
    },

    onTuesdaySwitchChange() {
      if (this.isTuesdayChecked) {
        this.isTuesdayChecked = false
      } else {
        this.isTuesdayChecked = true
      }
      this.tuesdayInputErr = ''
    },
    onTuesdayApertureTimeChange(event) {
      this.tuesdayApertureTimeInput = event.value
      this.tuesdayInputErr = ''
    },
    onTuesdayDepartureTimeChange(event) {
      this.tuesdayDepartureTimeInput = event.value
      this.tuesdayInputErr = ''
    },

    onWednesdaySwitchChange() {
      if (this.isWednesdayChecked) {
        this.isWednesdayChecked = false
      } else {
        this.isWednesdayChecked = true
      }
      this.wednesdayInputErr = ''
    },
    onWednesdayApertureTimeChange(event) {
      this.wednesdayApertureTimeInput = event.value
      this.wednesdayInputErr = ''
    },
    onWednesdayDepartureTimeChange(event) {
      this.wednesdayDepartureTimeInput = event.value
      this.wednesdayInputErr = ''
    },

    onThursdaySwitchChange() {
      if (this.isThursdayChecked) {
        this.isThursdayChecked = false
      } else {
        this.isThursdayChecked = true
      }
      this.thursdayInputErr = ''
    },
    onThursdayApertureTimeChange(event) {
      this.thursdayApertureTimeInput = event.value
      this.thursdayInputErr = ''
    },
    onThursdayDepartureTimeChange(event) {
      this.thursdayDepartureTimeInput = event.value
      this.thursdayInputErr = ''
    },

    onFridaySwitchChange() {
      if (this.isFridayChecked) {
        this.isFridayChecked = false
      } else {
        this.isFridayChecked = true
      }
      this.fridayInputErr = ''
    },
    onFridayApertureTimeChange(event) {
      this.fridayApertureTimeInput = event.value
      this.fridayInputErr = ''
    },
    onFridayDepartureTimeChange(event) {
      this.fridayDepartureTimeInput = event.value
      this.fridayInputErr = ''
    },

    onSaturdaySwitchChange() {
      if (this.isSaturdayChecked) {
        this.isSaturdayChecked = false
      } else {
        this.isSaturdayChecked = true
      }
      this.saturdayInputErr = ''
    },
    onSaturdayApertureTimeChange(event) {
      this.saturdayApertureTimeInput = event.value
      this.saturdayInputErr = ''
    },
    onSaturdayDepartureTimeChange(event) {
      this.saturdayDepartureTimeInput = event.value
      this.saturdayInputErr = ''
    },

    onSundaySwitchChange() {
      if (this.isSundayChecked) {
        this.isSundayChecked = false
      } else {
        this.isSundayChecked = true
      }
      this.sundayInputErr = ''
    },
    onSundayApertureTimeChange(event) {
      this.sundayApertureTimeInput = event.value
      this.sundayInputErr = ''
    },
    onSundayDepartureTimeChange(event) {
      this.sundayDepartureTimeInput = event.value
      this.sundayInputErr = ''
    },

    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}