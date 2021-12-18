import { translateServiceWorkDisputeCaseStatus } from "~/utils/translators"
import { formatDateTime } from "~/utils/formatter"

export default {
  data() {
    return {
      workshopOfficeWorkDisputeCaseList: '',
      translateServiceWorkDisputeCaseStatus: translateServiceWorkDisputeCaseStatus,
      formatDateTime: formatDateTime
    }
  },

  methods: {
    showWorkshopOfficeWorkDisputeCase(event) {
      this.$navigator.navigate('/WorkshopOfficeWorkDisputeCase', { props: { workshopOfficeWorkDisputeCase: event.item }, frame: 'accountNav', backstackVisible: false })
    },

    getWorkshopOfficeWorkDisputeCaseList() {
      fetch('http://10.0.2.2:8080/WorkshopOfficeWorkDisputeCaseList', {
        method: 'GET',
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
              this.workshopOfficeWorkDisputeCaseList = response.WorkshopOfficeWorkDisputeCaseList
              break
            case 'Work disputes not found':
              console.log('Work disputes not found')
          }
        })
    },

    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}