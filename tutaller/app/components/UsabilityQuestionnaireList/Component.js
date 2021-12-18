import { translateActiveInactiveStatus } from "~/utils/translators"

export default {
    data() {
        return {
            usabilityQuestionnaireList: '',
            translateActiveInactiveStatus: translateActiveInactiveStatus
        }
    },

    methods: {
        showUsabilityQuestionnaire(event) {
            this.$navigator.navigate('/MyUsabilityQuestionnaire', { props: { usabilityQuestionnaire: event.item }, frame: 'accountNav' })
        },

        getWorkshopPostulationList() {
            fetch('http://10.0.2.2:8080/UsabilityQuestionnaireList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.usabilityQuestionnaireList = response.UsabilityQuestionnaireList
                            break
                        case 'Operation Failed':
                            console.log('Questionnaires not found')
                    }
                })
        },

        goToAddUsabilityQuestionnairePage() {
            this.$navigator.navigate('/AddUsabilityQuestionnaire', { frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}