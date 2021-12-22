import { ApplicationSettings } from "@nativescript/core"
import { formatTimeToDB, formatDateToDB } from "~/utils/formatter"

export default {
    props: ['workshopOffice', 'workshopOfficeService', 'reservedDatetime'],
    data() {
        return {
            formatDateToDB: formatDateToDB,
            formatTimeToDB: formatTimeToDB
        }
    },

    methods: {
        payWorkshopService() {
            if (ApplicationSettings.getString('user') == undefined) this.$navigator.modal('/Login', { id: 'modalLogin', fullscreen: true })
            else {
                this.$navigator.navigate('/Payment', {
                    props: {
                        itemId: this.workshopOfficeService.id,
                        itemDescription: this.workshopOfficeService.workshop_office_service_name + ', agendado para el ' + this.formatDateToDB(this.reservedDatetime.reserved_date) + ' ' + this.formatTimeToDB(this.reservedDatetime.reserved_time),
                        price: this.workshopOfficeService.offer_price,
                        operationType: 'payWorkshopService',
                        buyerId: 0,
                        merchantName: this.workshopOffice.workshop_name + ', sucursal de ' + this.workshopOffice.workshop_office_address + ', ' + this.workshopOffice.workshop_office_commune + ', ' + this.workshopOffice.workshop_office_region
                    }
                })
            }
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}