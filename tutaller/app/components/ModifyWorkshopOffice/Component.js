import { action } from "@nativescript/core"

export default {
  props: ['myWorkshopOffice', 'myWorkshopOfficeAttention'],
  data() {
    return {
      regionObject: [],
      regionList: [],
      communeObject: [],
      communeList: [],
      phoneCountryCodeList: ['+56 Chile'],

      regionInput: this.myWorkshopOffice.region_name,
      communeInput: this.myWorkshopOffice.commune_name,
      addressInput: this.myWorkshopOffice.workshop_office_address,
      phoneInput: this.myWorkshopOffice.workshop_office_phone,
      phoneCountryCodeInput: '+56 Chile',

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

      mondayApertureTime: undefined,
      mondayDepartureTime: undefined,
      tuesdayApertureTime: undefined,
      tuesdayDepartureTime: undefined,
      wednesdayApertureTime: undefined,
      wednesdayDepartureTime: undefined,
      thursdayApertureTime: undefined,
      thursdayDepartureTime: undefined,
      fridayApertureTime: undefined,
      fridayDepartureTime: undefined,
      saturdayApertureTime: undefined,
      saturdayDepartureTime: undefined,
      sundayApertureTime: undefined,
      sundayDepartureTime: undefined,

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

      isModifyWorkshopOfficeBtnTappable: true
    }
  },

  methods: {
    fillWorkshopOfficeActualInfo(event) {
      //Workshop office attention has data
      if (this.myWorkshopOfficeAttention !== null) {
        for (let i = 0; i < this.myWorkshopOfficeAttention.length; i++) {
          switch (this.myWorkshopOfficeAttention[i].workshop_office_attention_day) {
            case 'monday':
              event.object.getViewById('switchMonday').checked = true
              this.mondayApertureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_aperture_time
              this.mondayDepartureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_departure_time
              break
            case 'tuesday':
              event.object.getViewById('switchTuesday').checked = true
              this.tuesdayApertureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_aperture_time
              this.tuesdayDepartureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_departure_time
              break
            case 'wednesday':
              event.object.getViewById('switchWednesday').checked = true
              this.wednesdayApertureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_aperture_time
              this.wednesdayDepartureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_departure_time
              break
            case 'thursday':
              event.object.getViewById('switchThursday').checked = true
              this.thursdayApertureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_aperture_time
              this.thursdayDepartureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_departure_time
              break
            case 'friday':
              event.object.getViewById('switchFriday').checked = true
              this.fridayApertureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_aperture_time
              this.fridayDepartureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_departure_time
              break
            case 'saturday':
              event.object.getViewById('switchSaturday').checked = true
              this.saturdayApertureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_aperture_time
              this.saturdayDepartureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_departure_time
              break
            case 'sunday':
              event.object.getViewById('switchSunday').checked = true
              this.sundayApertureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_aperture_time
              this.sundayDepartureTime = this.myWorkshopOfficeAttention[i].workshop_office_attention_departure_time
          }
        }
      }
    },

    modifyWorkshopOffice() {
      alert('Función en construcción')
/*       if (this.validateFormModifyWorkshopOffice()) {
        this.isModifyWorkshopOfficeBtnTappable = false
        const workshopOfficeAttentionData = []

        if (this.isMondayChecked) {
          const mondayApertureTime = this.mondayApertureTimeInput.getHours() + ':' + this.mondayApertureTimeInput.getMinutes()
          const mondayDepartureTime = this.mondayDepartureTimeInput.getHours() + ':' + this.mondayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ day: 'monday', aperture_time: mondayApertureTime, departure_time: mondayDepartureTime })
        }
        if (this.isTuesdayChecked) {
          const tuesdayApertureTime = this.tuesdayApertureTimeInput.getHours() + ':' + this.tuesdayApertureTimeInput.getMinutes()
          const tuesdayDepartureTime = this.tuesdayDepartureTimeInput.getHours() + ':' + this.tuesdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ day: 'tuesday', aperture_time: tuesdayApertureTime, departure_time: tuesdayDepartureTime })
        }
        if (this.isWednesdayChecked) {
          const wednesdayApertureTime = this.wednesdayApertureTimeInput.getHours() + ':' + this.wednesdayApertureTimeInput.getMinutes()
          const wednesdayDepartureTime = this.wednesdayDepartureTimeInput.getHours() + ':' + this.wednesdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ day: 'wednesday', aperture_time: wednesdayApertureTime, departure_time: wednesdayDepartureTime })
        }
        if (this.isThursdayChecked) {
          const thursdayApertureTime = this.thursdayApertureTimeInput.getHours() + ':' + this.thursdayApertureTimeInput.getMinutes()
          const thursdayDepartureTime = this.thursdayDepartureTimeInput.getHours() + ':' + this.thursdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ day: 'thursday', aperture_time: thursdayApertureTime, departure_time: thursdayDepartureTime })
        }
        if (this.isFridayChecked) {
          const fridayApertureTime = this.fridayApertureTimeInput.getHours() + ':' + this.fridayApertureTimeInput.getMinutes()
          const fridayDepartureTime = this.fridayDepartureTimeInput.getHours() + ':' + this.fridayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ day: 'friday', aperture_time: fridayApertureTime, departure_time: fridayDepartureTime })
        }
        if (this.isSaturdayChecked) {
          const saturdayApertureTime = this.saturdayApertureTimeInput.getHours() + ':' + this.saturdayApertureTimeInput.getMinutes()
          const saturdayDepartureTime = this.saturdayDepartureTimeInput.getHours() + ':' + this.saturdayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ day: 'saturday', aperture_time: saturdayApertureTime, departure_time: saturdayDepartureTime })
        }
        if (this.isSundayChecked) {
          const sundayApertureTime = this.sundayApertureTimeInput.getHours() + ':' + this.sundayApertureTimeInput.getMinutes()
          const sundayDepartureTime = this.sundayDepartureTimeInput.getHours() + ':' + this.sundayDepartureTimeInput.getMinutes()
          workshopOfficeAttentionData.push({ day: 'wednesday', aperture_time: sundayApertureTime, departure_time: sundayDepartureTime })
        }

        const data = { workshop_id: 1, commune_id: this.communeInput, workshop_suscription_id: 1, workshop_office_address: this.addressInput.trim(), workshop_office_phone: this.phoneCountryCodeInput.match(/(\d+)/)[0] + this.phoneInput.trim(), workshop_office_attention: workshopOfficeAttentionData }

        fetch('http://10.0.2.2:8080/ModifyWorkshopOffice', {
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
              this.isModifyWorkshopOfficeBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Operation Success':
                this.$navigator.navigate('/MyWorkshopList', { frame: 'accountNav' })
                break
              default:
                this.isModifyWorkshopOfficeBtnTappable = true
            }
          })
      } */
    },

    validateFormModifyWorkshopOffice() {
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
      //Null address input validation
      if (this.addressInput.trim() == '') {
        this.addressInputErr = 'Ingresa una dirección'
      }
      //Null phone country code input
      if (this.phoneCountryCodeInput.match(/(\d+)/) == null) {
        this.phoneInputErr = 'Ingresa el código de país del teléfono'
        this.phoneCountryCodeInputErr = ' '
        isValidationOK = false
      } else if (this.phoneInput.trim() == '') {
        //Null phone input validation
        this.phoneInputErr = 'Ingresa el número de teléfono'
        isValidationOK = false
      }
      //Monday time validations
      if (this.isMondayChecked && this.mondayApertureTimeInput == '' && this.mondayDepartureTimeInput == '') {
        this.mondayInputErr = 'Ingresa la hora de apertura y de cierre del día lunes'
        isValidationOK = false
      } else if (this.isMondayChecked && this.mondayApertureTimeInput == '') {
        this.mondayInputErr = 'Ingresa la hora de apertura del día lunes'
        isValidationOK = false
      } else if (this.isMondayChecked && this.mondayDepartureTimeInput == '') {
        this.mondayInputErr = 'Ingresa la hora de cierre del día lunes'
        isValidationOK = false
      }
      //Tuesday time validations
      if (this.isTuesdayChecked && this.tuesdayApertureTimeInput == '' && this.tuesdayDepartureTimeInput == '') {
        this.tuesdayInputErr = 'Ingresa la hora de apertura y de cierre del día martes'
        isValidationOK = false
      } else if (this.isTuesdayChecked && this.tuesdayApertureTimeInput == '') {
        this.tuesdayInputErr = 'Ingresa la hora de apertura del día martes'
        isValidationOK = false
      } else if (this.isTuesdayChecked && this.tuesdayDepartureTimeInput == '') {
        this.tuesdayInputErr = 'Ingresa la hora de cierre del día martes'
        isValidationOK = false
      }
      //Wednesday time validations
      if (this.isWednesdayChecked && this.wednesdayApertureTimeInput == '' && this.wednesdayDepartureTimeInput == '') {
        this.wednesdayInputErr = 'Ingresa la hora de apertura y de cierre del día miercoles'
        isValidationOK = false
      } else if (this.isWednesdayChecked && this.wednesdayApertureTimeInput == '') {
        this.wednesdayInputErr = 'Ingresa la hora de apertura del día miercoles'
        isValidationOK = false
      } else if (this.isWednesdayChecked && this.wednesdayDepartureTimeInput == '') {
        this.wednesdayInputErr = 'Ingresa la hora de cierre del día miercoles'
        isValidationOK = false
      }
      //Thursday time validations
      if (this.isThursdayChecked && this.thursdayApertureTimeInput == '' && this.thursdayDepartureTimeInput == '') {
        this.thursdayInputErr = 'Ingresa la hora de apertura y de cierre del día jueves'
        isValidationOK = false
      } else if (this.isThursdayChecked && this.thursdayApertureTimeInput == '') {
        this.thursdayInputErr = 'Ingresa la hora de apertura del día jueves'
        isValidationOK = false
      } else if (this.isThursdayChecked && this.thursdayDepartureTimeInput == '') {
        this.thursdayInputErr = 'Ingresa la hora de cierre del día jueves'
        isValidationOK = false
      }
      //Friday time validations
      if (this.isFridayChecked && this.fridayApertureTimeInput == '' && this.fridayDepartureTimeInput == '') {
        this.fridayInputErr = 'Ingresa la hora de apertura y de cierre del día viernes'
        isValidationOK = false
      } else if (this.isFridayChecked && this.fridayApertureTimeInput == '') {
        this.fridayInputErr = 'Ingresa la hora de apertura del día viernes'
        isValidationOK = false
      } else if (this.isFridayChecked && this.fridayDepartureTimeInput == '') {
        this.fridayInputErr = 'Ingresa la hora de cierre del día viernes'
        isValidationOK = false
      }
      //Saturday time validations
      if (this.isSaturdayChecked && this.saturdayApertureTimeInput == '' && this.saturdayDepartureTimeInput == '') {
        this.saturdayInputErr = 'Ingresa la hora de apertura y de cierre del día sábado'
        isValidationOK = false
      } else if (this.isSaturdayChecked && this.saturdayApertureTimeInput == '') {
        this.saturdayInputErr = 'Ingresa la hora de apertura del día sábado'
        isValidationOK = false
      } else if (this.isSaturdayChecked && this.saturdayDepartureTimeInput == '') {
        this.saturdayInputErr = 'Ingresa la hora de cierre del día sábado'
        isValidationOK = false
      }
      //Sunday time validations
      if (this.isSundayChecked && this.sundayApertureTimeInput == '' && this.sundayDepartureTimeInput == '') {
        this.sundayInputErr = 'Ingresa la hora de apertura y de cierre del día domingo'
        isValidationOK = false
      } else if (this.isSundayChecked && this.sundayApertureTimeInput == '') {
        this.sundayInputErr = 'Ingresa la hora de apertura del día domingo'
        isValidationOK = false
      } else if (this.isSundayChecked && this.sundayDepartureTimeInput == '') {
        this.sundayInputErr = 'Ingresa la hora de cierre del día domingo'
        isValidationOK = false
      }
      //Check if validation is OK
      if (isValidationOK) {
        return true
      } else {
        return false
      }
    },

    selectRegion(event) {
      event.object.getViewById('txtRegion').clearFocus()
      action('Región de la sucursal', 'Cancelar', this.regionList)
        .then(result => {
          if (result !== 'Cancelar') {
            this.regionInput = result
          }
        })
    },
    selectCommune(event) {
      event.object.getViewById('txtCommune').clearFocus()
      action('Comuna de la sucursal', 'Cancelar', this.communeList)
        .then(result => {
          if (result !== 'Cancelar') {
            this.communeInput = result
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