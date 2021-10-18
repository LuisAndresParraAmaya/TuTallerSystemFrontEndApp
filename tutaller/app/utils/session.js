import { ApplicationSettings } from "@nativescript/core"

export function logOut(view) {
    ApplicationSettings.clear()
    //view.$navigator.navigate('/WorkshopOfficeList')
    //view.$navigator.navigate('/WorkshopService', { frame: 'serviceNav' })
    view.$navigator.navigate('/AccountOptions', { frame: 'accountNav' })
}