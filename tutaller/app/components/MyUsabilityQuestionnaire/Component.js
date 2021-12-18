import { translateActiveInactiveStatus } from "~/utils/translators"
import { translateQuestionType } from "~/utils/translators"

export default {
    props: ['usabilityQuestionnaire'],
    data() {
        return {
            usabilityQuestionnaireAnswerList: [],
            usabilityQuestionnaireUserAnswerCount: 0,

            translateActiveInactiveStatus: translateActiveInactiveStatus,
            translateQuestionType: translateQuestionType
        }
    },

    methods: {
        //Get from a usability questionnaire the list that contains its questions and the answers for each question
        getUsabilityQuestionnaireAnswerList() {
            const data = { usability_questionnaire_id: this.usabilityQuestionnaire.id }

            fetch('http://10.0.2.2:8080/UsabilityQuestionnaireAnswerList', {
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
                            //Filter the obtained answer list
                            this.filterUsabilityQuestionnaireAnswerList(response.UsabilityQuestionnaireAnswerList)
                            break
                        case 'Answers not found':
                            console.log('Answers not found')
                    }
                })
        },

        //Filter and order the usability questionnaire answer list, in order to have a object for each question that contains its responses
        filterUsabilityQuestionnaireAnswerList(questionnaireAnswerList) {
            let answerIdList = []
            //Filter the ids
            for (let i = 0; i < questionnaireAnswerList.length; i++) {
                answerIdList.push(questionnaireAnswerList[i].questionnaire_question_id)
            }
            //Remove duplicate ids from the list
            answerIdList = [...new Set(answerIdList)]
            //Filter the answer list
            for (let i = 0; i < answerIdList.length; i++) {
                let filterIndex = questionnaireAnswerList.filter(element => element.questionnaire_question_id == answerIdList[i])
                let filterResponseListIndex = []
                for (let z = 0; z < filterIndex.length; z++) {
                    let questionnaireResponse = filterIndex[z].questionnaire_response
                    filterResponseListIndex.push({ questionnaire_response: questionnaireResponse })
                }
                this.usabilityQuestionnaireAnswerList.push({ questionnaire_question_name: questionnaireAnswerList.filter(element => element.questionnaire_question_id == answerIdList[i])[0].questionnaire_question_name, questionnaire_question_type: questionnaireAnswerList.filter(element => element.questionnaire_question_id == answerIdList[i])[0].questionnaire_question_type, questionnaire_response_list: filterResponseListIndex })
            }
            //Count the number of users that have answered the questionnaire
            let rutList = []
            for (let i = 0; i < questionnaireAnswerList.length; i++) {
                let userRut = questionnaireAnswerList[i].user_user_rut
                if (userRut !== null) rutList.push(userRut)
            }
            rutList = [...new Set(rutList)]
            this.usabilityQuestionnaireUserAnswerCount = rutList.length
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}