export default {
  props: ['workshopOfficeId'],
  data() {
    return {
      specializationList: ['Técnico', 'Pintura'],

      rutInput: '',
      specializationInput: '',
      experienceInput: '',

      rutInputErr: '',
      specializationInputErr: '',
      experienceInputErr: '',

      isAddEmployeeBtnTappable: true
    }
  },

  methods: {
    addWorkshopOfficeEmployees() {
      if (this.validateFormAddWorkshopOfficeAd()) {
        this.isAddEmployeeBtnTappable = false
        const data = { workshop_office_id: this.workshopOfficeId, user_rut: this.rutInput.trim().replace('-', ''), workshop_office_employee_specialization: this.specializationInput.trim(), workshop_office_employee_experience: this.experienceInput.trim() }

        fetch('http://10.0.2.2:8080/AddWorkshopOfficeEmployee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data })
        }).then(res => res.json())
          .catch(error => {
            console.error('Error:', error)
            alert({
              title: 'Error',
              message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
              okButtonText: 'OK'
            }).then(() => {
              this.isAddEmployeeBtnTappable = true
            })
          })
          .then(response => {
            switch (response.Response) {
              case 'Operation Success':
                this.goToPreviousPage()
                break
              case 'Rut not exist':
                this.rutInputErr = 'El rut ingresado no corresponde a ningún usuario registrado. Inténtalo nuevamente.'
                this.isAddEmployeeBtnTappable = true
            }
          })
      }
    },

    validateFormAddWorkshopOfficeAd() {
      let isValidationOK = true
      //Null ad rut input
      if (this.rutInput.trim() == '') {
        this.rutInputErr = 'Ingresa el rut del empleado'
        isValidationOK = false
      }
      //Null specialization input
      if (this.specializationInput.trim() == '') {
        this.specializationInputErr = 'Ingresa la especialización del empleado'
        isValidationOK = false
      }
      //Null experience input
      if (this.experienceInput.trim() == '') {
        this.experienceInputErr = 'Ingresa la experiencia del empleado'
        isValidationOK = false
      }
      //Check if validation is OK
      if (isValidationOK) {
        return true
      } else {
        return false
      }
    },

    onRutTxtChange() {
      this.rutInputErr = ''
    },
    onSpecializationTxtChange() {
      this.specializationInputErr = ''
    },
    onExperienceTxtChange() {
      this.experienceInputErr = ''
    },

    selectSpecialization(event) {
      event.object.getViewById('txtSpecialization').clearFocus()
      action('Especialización del empleado', 'Cancelar', this.specializationList)
        .then(result => {
          if (result !== 'Cancelar') {
            this.specializationInput = result
          }
        })
    },

    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}