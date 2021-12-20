import { formatDateTime } from "~/utils/formatter"
import { translatePostulationStatus } from "~/utils/translators"
import { formatRut } from "~/utils/formatter"
import { calculateRutCheckDigit } from "~/utils/calculator"

export default {
    props: ['workshopPostulation'],
    data() {
        return {
            workshopStatus: '',
            isAcceptPostulationTappable: true,
            isRejectPostulationTappable: true,

            formatDateTime: formatDateTime,
            translatePostulationStatus: translatePostulationStatus,
            formatRut: formatRut,
            calculateRutCheckDigit: calculateRutCheckDigit
        }
    },

    methods: {
        acceptWorkshopPostulation() {
            this.isAcceptPostulationTappable = false
            this.isRejectPostulationTappable = false
            confirm({
                message: '¿Estás seguro de aceptar la postulación?',
                okButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result) {
                    const data = { id: this.workshopPostulation.id, user_rut: this.workshopPostulation.postulant_rut }
                    fetch('http://10.0.2.2:8080/AcceptWorkshopPostulation', {
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
                                this.isAcceptPostulationTappable = true
                                this.isRejectPostulationTappable = true
                            })
                        })
                        .then(response => {
                            switch (response.Response) {
                                case 'Operation Success':
                                    this.$navigateBack()
                                    break
                                case 'Operation Failed':
                                    this.isAcceptPostulationTappable = true
                                    this.isRejectPostulationTappable = true
                            }
                        })
                } else {
                    this.isAcceptPostulationTappable = true
                    this.isRejectPostulationTappable = true
                }
            })
        },

        goToRejectWorkshopPostulationPage() {
            this.$navigator.navigate('/RejectWorkshopPostulation', { props: { workshopPostulation: this.workshopPostulation }, frame: 'accountNav' })
        },
        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}