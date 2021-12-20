const sqlite = require('nativescript-sqlite')

export default {
    props: ['workshopOfficeList'],
    data() {
        return {
            regionObject: [],
            regionList: ['Cualquiera'],
            communeObject: [],
            communeList: [],
            qualificationList: ['5', '4,5 y más', '4 y más', '3,5 y más', '3 y más', '2,5 y más', '2 y más', '1,5 y más', '1 y más', '0 y más'],

            regionIdInput: undefined,
            regionInput: 'Cualquiera',
            communeIdInput: undefined,
            communeInput: 'Cualquiera',
            qualificationInput: '0 y más',

            isFilterBtnTappable: true
        }
    },

    methods: {
        filterWorkshopList() {
            const filteredWorkshopOfficeList = []
            //this.isFilterBtnTappable = false
            let qualification = this.qualificationNumber(this.qualificationInput)
            let region = this.regionInput.trim()
            let commune = this.communeInput.trim()

            new sqlite('tutaller.db', (err, db) => {
                db.execSQL('DROP TABLE IF EXISTS workshop_office_list;')
                db.execSQL('CREATE TABLE workshop_office_list (workshop_id INTEGER, workshop_office_id INTEGER, workshop_name TEXT, workshop_number INTEGER, workshop_description TEXT, commune_id INTEGER, workshop_office_commune TEXT, region_id INTEGER, workshop_office_region TEXT, workshop_office_address TEXT, workshop_suscription_id INTEGER, workshop_office_phone INTEGER, workshop_office_average_rating INTEGER, workshop_office_total_evaluations INTEGER);')
                this.workshopOfficeList.forEach(element => db.execSQL('INSERT INTO workshop_office_list (workshop_id, workshop_office_id, workshop_name, workshop_number, workshop_description, commune_id, workshop_office_commune, region_id, workshop_office_region, workshop_office_address, workshop_suscription_id, workshop_office_phone, workshop_office_average_rating, workshop_office_total_evaluations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [element.workshop_id, element.workshop_office_id, element.workshop_name, element.workshop_number, element.workshop_description, element.commune_id, element.workshop_office_commune, element.region_id, element.workshop_office_region, element.workshop_office_address, element.workshop_suscription_id, element.workshop_office_phone, element.workshop_office_average_rating, element.workshop_office_total_evaluations]))
                let promise = ''
                if (region == 'Cualquiera' && commune == 'Cualquiera') {
                    promise = db.all('SELECT * FROM workshop_office_list WHERE workshop_office_average_rating >= ?', [qualification])
                } else if (commune == 'Cualquiera') {
                    promise = db.all('SELECT * FROM workshop_office_list WHERE workshop_office_average_rating >= ? AND workshop_office_region = ?', [qualification, region])
                } else {
                    promise = db.all('SELECT * FROM workshop_office_list WHERE workshop_office_average_rating >= ? AND workshop_office_region = ? AND workshop_office_commune = ?', [qualification, region, commune])
                }
                promise.then((resultSet) => {
                    for (let i = 0; i < resultSet.length; i++) {
                        filteredWorkshopOfficeList.push({ workshop_id: resultSet[i][0], workshop_office_id: resultSet[i][1], workshop_name: resultSet[i][2], workshop_number: resultSet[i][3], workshop_description: resultSet[i][4], commune_id: resultSet[i][5], workshop_office_commune: resultSet[i][6], region_id: resultSet[i][7], workshop_office_region: resultSet[i][8], workshop_office_address: resultSet[i][9], workshop_suscription_id: resultSet[i][10], workshop_office_phone: resultSet[i][11], workshop_office_average_rating: resultSet[i][12], workshop_office_total_evaluations: resultSet[i][13] })
                    }
                })
                this.$navigator.navigate('/WorkshopOfficeList', { props: { filteredWorkshopOfficeList: filteredWorkshopOfficeList } })
            })
        },

        onPageLoaded() {
            fetch('http://10.0.2.2:8080/RegionList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    this.regionObject = response.response
                    response.response.forEach(element => {
                        this.regionList.push(element.region_name)
                    })
                })

            fetch('http://10.0.2.2:8080/CommuneList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    this.communeObject = response.response
                })
        },

        selectRegion(event) {
            event.object.getViewById('txtRegion').clearFocus()
            action('Región de la sucursal', 'Cancelar', this.regionList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.regionIdInput = undefined
                        this.regionInput = result
                        this.regionObject.forEach(element => {
                            if (element.region_name == this.regionInput) {
                                this.regionIdInput = element.id
                            }
                        })
                        this.communeList = ['Cualquiera']
                        this.communeObject.forEach(element => {
                            if (element.region_id == this.regionIdInput) {
                                this.communeList.push(element.commune_name)
                            }
                        })
                        this.isCommuneInputHidden = false
                        this.communeIdInput = undefined
                        this.communeInput = 'Cualquiera'
                    }
                })
        },
        selectCommune(event) {
            event.object.getViewById('txtCommune').clearFocus()
            action('Comuna de la sucursal', 'Cancelar', this.communeList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.communeInput = result
                        this.communeObject.forEach(element => {
                            if (element.commune_name == this.communeInput) {
                                this.communeIdInput = element.id
                            }
                        })
                    }
                })
        },
        selectQualification(event) {
            event.object.getViewById('txtQualification').clearFocus()
            action('Calificación de la sucursal', 'Cancelar', this.qualificationList)
                .then(result => {
                    if (result !== 'Cancelar') {
                        this.qualificationInput = result
                    }
                })
        },

        qualificationNumber(qualification) {
            switch (qualification) {
                case '5':
                    return 5
                case '4,5 y más':
                    return 4.5
                case '4 y más':
                    return 4
                case '3,5 y más':
                    return 3.5
                case '3 y más':
                    return 3
                case '2,5 y más':
                    return 2.5
                case '2 y más':
                    return 2
                case '1,5 y más':
                    return 1.5
                case '1 y más':
                    return 1
                case '0 y más':
                    return 0
            }
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    },
}