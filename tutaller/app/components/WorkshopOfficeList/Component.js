import { formatQualification } from "~/utils/formatter"
import { ApplicationSettings } from "@nativescript/core"
import { CoreTypes } from "@nativescript/core"
import { calculateDistance } from "~/utils/calculator"
const sqlite = require('nativescript-sqlite')

export default {
    props: ['filteredWorkshopOfficeList'],
    data() {
        return {
            onFilter: '',
            actualWorkshopOfficeList: '',
            workshopOfficeList: '',

            formatQualification: formatQualification,
            calculateDistance: calculateDistance
        }
    },

    methods: {
        onPageLoaded(event) {
            //If the filter function was recently used, clear it when the page is loaded again
            if (this.onFilter) {
                this.onFilter = false
                this.filteredWorkshopOfficeList = ''
            }
            //Get and load the workshop list from the back-end
            this.getWorkshopList()
            //Refresh ad image
            event.object.getViewById('imgWorkshopOfficeAd').src = 'http://10.0.2.2:8080/img?t' + new Date().getTime()
            //Temporal solution to make the service tab in bottom navigation to update the WorkshopOfficeWorkList view (TODO)
            if (this.$navigator.paths.serviceNav == '/WorkshopOfficeWorkList') this.$navigator.navigate('/WorkshopOfficeWorkList', { frame: 'serviceNav' })
            //Show usability questionnaire (if any is active), not showing it to the system admin
            if (ApplicationSettings.getString('userType') !== '1' && ApplicationSettings.getString('user') !== undefined) this.showUsabilityQuestionnaire()
        },

        //Get the workshop office list, ordered by nearest location by geolocation and total rating
        getWorkshopList() {
            fetch('http://10.0.2.2:8080/WorkshopOfficeList', {
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
                        default:
                            this.actualWorkshopOfficeList = response.response
                            if (this.filteredWorkshopOfficeList) {
                                this.onFilter = true
                                this.workshopOfficeList = this.filteredWorkshopOfficeList
                            } else {
                                this.workshopOfficeList = response.response
                            }
                            this.requestGeolocation()
                            break
                        case 'Offices not found':
                            console.log('Offices not found')
                    }
                })
        },

        //Request geolocation permissions. If accepted, then proceed to store temporally the latitude and longitude that was geolocated with high accuracy
        requestGeolocation() {
            const geolocation = require('@nativescript/geolocation')
            //Request permissions
            geolocation.enableLocationRequest().then(() => {
                //Get current location with high accuracy
                geolocation.getCurrentLocation({ desiredAccuracy: CoreTypes.Accuracy.high, maximumAge: 5000, timeout: 20000 }).then(currentLocation => {
                    let geolocationLatitude = currentLocation.latitude
                    let geolocationLongitude = currentLocation.longitude
                    this.getWorkshopListDistanceInfo(geolocationLatitude, geolocationLongitude)
                })
            })
        },

        //Get for each workshop in the list its distance info considering the obtained latitude and longitude when geolocating the user
        async getWorkshopListDistanceInfo(geolocationLatitude, geolocationLongitude) {
            const geocoding = require('@nativescript-community/geocoding')

            for (let i = 0; i < this.workshopOfficeList.length; i++) {
                let address = this.workshopOfficeList[i].workshop_office_address
                let commune = this.workshopOfficeList[i].workshop_office_commune
                let region = this.workshopOfficeList[i].workshop_office_region
                await geocoding.getLocationFromName(address + ', ' + commune + ', ' + region).then(workshopOfficeLocation => {
                    let distance = this.calculateDistance(geolocationLatitude, geolocationLongitude, workshopOfficeLocation.latitude, workshopOfficeLocation.longitude, 'N')
                    let averageRating = this.workshopOfficeList[i].workshop_office_average_rating
                    this.workshopOfficeList[i].workshop_office_distance_geolocation = distance
                    if (averageRating != 0.0) this.workshopOfficeList[i].workshop_office_distance_rating_div = (distance / averageRating)
                    else this.workshopOfficeList[i].workshop_office_distance_rating_div = distance
                })
            }
            this.filterWorkshopListRatingNearestLocation(this.workshopOfficeList)
        },

        //Filter and reorder the workshop list, considering the total rating and nearest location for each one
        filterWorkshopListRatingNearestLocation() {
            const filteredWorkshopOfficeList = []

            new sqlite('tutaller.db', (err, db) => {
                db.execSQL('DROP TABLE IF EXISTS workshop_office_list;')
                db.execSQL('CREATE TABLE workshop_office_list (workshop_id INTEGER, workshop_office_id INTEGER, workshop_name TEXT, workshop_number INTEGER, workshop_description TEXT, commune_id INTEGER, workshop_office_commune TEXT, region_id INTEGER, workshop_office_region TEXT, workshop_office_address TEXT, workshop_suscription_id INTEGER, workshop_office_phone INTEGER, workshop_office_average_rating INTEGER, workshop_office_total_evaluations INTEGER, workshop_office_distance_geolocation INTEGER, workshop_office_distance_rating_div INTEGER);')
                this.workshopOfficeList.forEach(element => db.execSQL('INSERT INTO workshop_office_list (workshop_id, workshop_office_id, workshop_name, workshop_number, workshop_description, commune_id, workshop_office_commune, region_id, workshop_office_region, workshop_office_address, workshop_suscription_id, workshop_office_phone, workshop_office_average_rating, workshop_office_total_evaluations, workshop_office_distance_geolocation, workshop_office_distance_rating_div) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [element.workshop_id, element.workshop_office_id, element.workshop_name, element.workshop_number, element.workshop_description, element.commune_id, element.workshop_office_commune, element.region_id, element.workshop_office_region, element.workshop_office_address, element.workshop_suscription_id, element.workshop_office_phone, element.workshop_office_average_rating, element.workshop_office_total_evaluations, element.workshop_office_distance_geolocation, element.workshop_office_distance_rating_div]))
                let promise = db.all('SELECT * FROM workshop_office_list ORDER BY workshop_office_distance_rating_div ASC')
                promise.then((resultSet) => {
                    for (let i = 0; i < resultSet.length; i++) {
                        filteredWorkshopOfficeList.push({ workshop_id: resultSet[i][0], workshop_office_id: resultSet[i][1], workshop_name: resultSet[i][2], workshop_number: resultSet[i][3], workshop_description: resultSet[i][4], commune_id: resultSet[i][5], workshop_office_commune: resultSet[i][6], region_id: resultSet[i][7], workshop_office_region: resultSet[i][8], workshop_office_address: resultSet[i][9], workshop_suscription_id: resultSet[i][10], workshop_office_phone: resultSet[i][11], workshop_office_average_rating: resultSet[i][12], workshop_office_total_evaluations: resultSet[i][13], workshop_office_distance_geolocation: resultSet[i][14], workshop_office_distance_rating_div: resultSet[i][15] })
                    }
                })
                this.workshopOfficeList = filteredWorkshopOfficeList
            })
        },

        //Show the usability questionnaire to the user
        showUsabilityQuestionnaire() {
            const data = { user_user_rut: ApplicationSettings.getString('user') }

            fetch('http://10.0.2.2:8080/ShowUsabilityQuestionnaire', {
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
                            this.$navigator.modal('/ShowUsabilityQuestionnaire', { props: { usabilityQuestionnaire: response.UsabilityQuestionnaire[0] }, id: 'modalShowUsabilityQuestionnaire', fullscreen: true })
                            break
                        case 'No active questionnaire found':
                            console.log('No active questionnaire found')
                            break
                        case 'User cannot do the questionnaire':
                            console.log('User cannot do the questionnaire')
                    }
                })
        },

        showWorkshopOffice(event) {
            this.$navigator.navigate('/WorkshopOffice', { props: { workshopOffice: event.item } })
        },

        showWorkshopOfficeFromAd() {
            console.log('TODO')
        },

        goToFilterWorkshopOfficeListPage() {
            this.$navigator.navigate('/FilterWorkshopOfficeList', { props: { workshopOfficeList: this.actualWorkshopOfficeList }, backstackVisible: false })
        }
    }
}