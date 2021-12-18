import { SnackBar } from "@nativescript-community/ui-material-snackbar"

export default {
    data() {
        return {
            questionnaireNameInput: '',
            questionnaireDescriptionInput: '',

            questionnaireNameInputErr: '',
            questionnaireDescriptionInputErr: '',

            questionnaireQuestionList: [{ questionNameInput: '', questionTypeInput: '', questionTypeLabel: '', questionNameInputErr: '', questionTypeInputErr: '', questionItemList: [] }],
            questionnaireQuestionTypeList: ['Alternativas', 'Desarrollo'],

            isAddQuestionnaireBtnTappable: true
        }
    },

    methods: {
        addUsabilityQuestionnaire() {
            if (this.validateFormAddUsabilityQuestionnaire()) {
                confirm({
                    title: '¿Estás seguro de crear y activar este cuestionario?',
                    message: 'Se desactivarán los otros cuestionarios que se encuentren activos actualmente.',
                    okButtonText: 'Crear y activar',
                    cancelButtonText: 'Cancelar'
                }).then(result => {
                    if (result) {
                        const data = { usability_questionnaire_name: this.questionnaireNameInput.trim(), usability_questionnaire_description: this.questionnaireDescriptionInput.trim(), questionnaire_question_list: this.questionnaireQuestionList }

                        fetch('http://10.0.2.2:8080/AddUsabilityQuestionnaire', {
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
                                this.isAddQuestionnaireBtnTappable = true
                            })
                            .then(response => {
                                switch (response.Response) {
                                    case 'Operation Success':
                                        this.goToPreviousPage()
                                }
                            })
                    }
                })
            }
        },

        validateFormAddUsabilityQuestionnaire() {
            let isValidationOK = true
            //Null questionnaire name input
            if (this.questionnaireNameInput.trim() == '') {
                this.questionnaireNameInputErr = 'Ingresa el nombre del cuestionario.'
                isValidationOK = false
            }
            //Null questionnaire description input
            if (this.questionnaireDescriptionInput.trim() == '') {
                this.questionnaireDescriptionInputErr = 'Ingresa la descripción del cuestionario.'
                isValidationOK = false
            }
            //Null question input
            for (let i = 0; i < this.questionnaireQuestionList.length; i++) {
                if (this.questionnaireQuestionList[i].questionNameInput.trim() == '') {
                    this.questionnaireQuestionList[i].questionNameInputErr = 'Ingresa el nombre de la pregunta.'
                    isValidationOK = false
                }
                switch (this.questionnaireQuestionList[i].questionTypeInput.trim()) {
                    case '':
                        this.questionnaireQuestionList[i].questionTypeInputErr = 'Ingresa el tipo de pregunta.'
                        isValidationOK = false
                        break
                    case 'multiplechoice':
                        for (let z = 0; z < this.questionnaireQuestionList[i].questionItemList.length; z++) {
                            if (this.questionnaireQuestionList[i].questionItemList[z].questionItemNameInput.trim() == '') {
                                this.questionnaireQuestionList[i].questionItemList[z].questionItemNameInputErr = 'Ingresa el nombre de la alternativa.'
                                isValidationOK = false
                            }
                        }
                }
            }
            //Check if validation is OK
            if (isValidationOK) return true
            else return false
        },

        addQuestionnaireQuestionInput() {
            this.questionnaireQuestionList.push({ questionNameInput: '', questionTypeInput: '', questionTypeLabel: '', questionNameInputErr: '', questionTypeInputErr: '', questionItemList: [] })
        },
        addQuestionnaireQuestionAlternative(questionIndex) {
            this.questionnaireQuestionList[questionIndex].questionItemList.push({ questionItemNameInput: '', questionItemNameInputErr: '' })
        },
        removeQuestionnaireQuestionInput(questionIndex) {
            this.questionnaireQuestionList.splice(questionIndex, 1)
        },
        removeQuestionnaireQuestionAlternative(questionIndex, indexQuestionItem) {
            this.questionnaireQuestionList[questionIndex].questionItemList.splice(indexQuestionItem, 1)
        },

        selectQuestionnaireQuestionType(event, index) {
            event.object.getViewById('txtQuestionnaireQuestionType').clearFocus()
            action('Tipo de pregunta', 'Cancelar', this.questionnaireQuestionTypeList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        switch (result) {
                            case 'Alternativas':
                                this.questionnaireQuestionList[index].questionTypeLabel = 'Alternativas'
                                this.questionnaireQuestionList[index].questionTypeInput = 'multiplechoice'
                                this.questionnaireQuestionList[index].questionItemList = [{ questionItemNameInput: '', questionItemNameInputErr: '' }, { questionItemNameInput: '', questionItemNameInputErr: '' }]
                                break
                            case 'Desarrollo':
                                this.questionnaireQuestionList[index].questionTypeLabel = 'Desarrollo'
                                this.questionnaireQuestionList[index].questionTypeInput = 'essayquestion'
                                this.questionnaireQuestionList[index].questionItemList = []
                        }
                    }
                })
        },

        onQuestionnaireNameTxtChange() {
            this.questionnaireNameInputErr = ''
        },
        onQuestionnaireDescriptionTxtChange() {
            this.questionnaireDescriptionInputErr = ''
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}