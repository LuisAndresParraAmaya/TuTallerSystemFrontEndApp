import { SnackBar } from "@nativescript-community/ui-material-snackbar"
import { ApplicationSettings } from "@nativescript/core"

export default {
  props: ['usabilityQuestionnaireId'],
  data() {
    return {
      usabilityQuestionnaireQuestionList: [],
      isAnswerQuestionnaireBtnTappable: true
    }
  },

  methods: {
    //Send the user's answers to the back-end and store them
    answerUsabilityQuestionnaire() {
      if (this.validateFormAnswerUsabilityQuestionnaire()) {
        this.isAnswerQuestionnaireBtnTappable = false
        const data = { user_user_rut: ApplicationSettings.getString('user'), usability_questionnaire_id: this.usabilityQuestionnaireId, questionnaire_question_list: this.usabilityQuestionnaireQuestionList }

        fetch('http://10.0.2.2:8080/AnswerUsabilityQuestionnaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data })
        }).then(res => res.json())
          .catch(error => {
            console.error('Error:', error)
            const snackBar = new SnackBar()
            snackBar.simple('No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.')
            this.isAnswerQuestionnaireBtnTappable = true
          })
          .then(response => {
            switch (response.Response) {
              case 'Operation Success':
                //Change the user usability questionnaire status to 'complete'
                this.changeUserUsabilityQuestionnaireStatus('complete')
                break
              case 'Cannot answer the questionnaire':
                alert({
                  title: 'Error',
                  message: 'No puedes responder este cuestionario, ya sea debido a que optaste por no realizarlo anteriormente o ya lo has respondido.',
                  okButtonText: 'OK'
                }).then(() => this.closeModal())
            }
          })
      }
    },

    validateFormAnswerUsabilityQuestionnaire() {
      let isValidationOK = true
      //Null answer input
      for (let i = 0; i < this.usabilityQuestionnaireQuestionList.length; i++) {
        if (this.usabilityQuestionnaireQuestionList[i].questionnaire_response.trim() == '') {
          this.usabilityQuestionnaireQuestionList[i].questionnaire_question_err = 'Ingresa tu respuesta.'
          isValidationOK = false
        }
      }
      //Check if validation is OK
      if (isValidationOK) return true
      else return false
    },

    //Change the user usability questionnaire status
    changeUserUsabilityQuestionnaireStatus(newStatus) {
      const data = { usability_questionnaire_id: this.usabilityQuestionnaireId, user_user_rut: ApplicationSettings.getString('user'), status: newStatus }

      fetch('http://10.0.2.2:8080/ChangeUserUsabilityQuestionnaireStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      }).then(res => res.json())
        .catch(error => {
          console.error('Error:', error)
          const snackBar = new SnackBar()
          snackBar.simple('No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.')
        })
        .then(response => {
          switch (response.Response) {
            case 'Operation Success':
              this.closeModal()
              break
            case 'Cannot change the status':
              alert({
                title: 'Error',
                message: 'El estado del cuestionario ya ha sido cambiado al solicitado.',
                okButtonText: 'OK'
              }).then(() => this.closeModal())
          }
        })
    },

    //Get the question list from the usability questionnaire
    getUsabilityQuestionnaireQuestionList() {
      const data = { usability_questionnaire_id: this.usabilityQuestionnaireId }

      fetch('http://10.0.2.2:8080/UsabilityQuestionnaireQuestionList', {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .catch(error => {
          console.error('Error:', error)
        })
        .then(response => {
          switch (response.Response) {
            case 'Operation Success':
              //Filter and order the obtained question list
              this.filterUsabilityQuestionnaireQuestionList(response.UsabilityQuestionnaireQuestionList)
              break
            case 'Questions not found':
              console.log('Questions not found')
          }
        })
    },

    //Filter and order the question list, setting the correspondent item list to a multiple choice question
    filterUsabilityQuestionnaireQuestionList(questionnaireQuestionList) {
      let questionIdList = []
      //Filter the ids
      for (let i = 0; i < questionnaireQuestionList.length; i++) {
        questionIdList.push(questionnaireQuestionList[i].questionnaire_question_id)
      }
      //Remove duplicate ids from the list
      questionIdList = [...new Set(questionIdList)]
      //Filter the question list
      for (let i = 0; i < questionIdList.length; i++) {
        let filterIndex = questionnaireQuestionList.filter(element => element.questionnaire_question_id == questionIdList[i])
        let filterItemStatementListIndex = []
        for (let z = 0; z < filterIndex.length; z++) {
          let questionnaireResponse = filterIndex[z].questionnarie_question_item_statement
          filterItemStatementListIndex.push({ questionnarie_question_item_statement: questionnaireResponse })
        }
        this.usabilityQuestionnaireQuestionList.push({ questionnaire_question_id: questionnaireQuestionList.filter(element => element.questionnaire_question_id == questionIdList[i])[0].questionnaire_question_id, questionnaire_question_name: questionnaireQuestionList.filter(element => element.questionnaire_question_id == questionIdList[i])[0].questionnaire_question_name, questionnaire_question_type: questionnaireQuestionList.filter(element => element.questionnaire_question_id == questionIdList[i])[0].questionnaire_question_type, questionnaire_question_err: '', questionnaire_response: '', questionnarie_question_item_statement_list: filterItemStatementListIndex })
      }
    },

    selectQuestionnaireQuestionChoice(event, index) {
      event.object.getViewById('txtQuestionnaireQuestionChoice').clearFocus()
      let questionnaireQuestionList = []
      for (let i = 0; i < this.usabilityQuestionnaireQuestionList[index].questionnarie_question_item_statement_list.length; i++) {
        questionnaireQuestionList.push(this.usabilityQuestionnaireQuestionList[index].questionnarie_question_item_statement_list[i].questionnarie_question_item_statement)
      }
      action('Alternativa', 'Cancelar', questionnaireQuestionList)
        .then(result => {
          if (result !== 'Cancelar') {
            this.usabilityQuestionnaireQuestionList[index].questionnaire_response = result
          }
        })
    },

    //Close the current modal
    closeModal() {
      this.$modal.close()
    },
    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}