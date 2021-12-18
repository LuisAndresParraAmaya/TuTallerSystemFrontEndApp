import { translateWeekDay } from "./translators"
import { formatTimeToHHMMSS } from '~/utils/formatter'
import { weekdayList } from "./lists"
import { calculateRutCheckDigit } from "./calculator"

export function validateRut(rut) {
    if (rut == '') return 'Ingresa el rut.'
    if (!/^[0-9]+[-|-]{1}[0-9kK]{1}$/.test(rut)) return 'Ingresa el rut con su cadena completa.'
    else if (calculateRutCheckDigit(rut).toLowerCase() != rut.replace('-', '').toLowerCase()) return 'Ingresa un rut valido.'
    return null
}

export function validateName(name) {
    if (name == '') return 'Ingresa el nombre.'
    return null
}

export function validateLastName(lastName) {
    if (lastName == '') return 'Ingresa el apellido.'
    return null
}

export function validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email == '') return 'Ingresa el correo electrónico.'
    else if (!emailRegex.test(email)) return 'Ingresa un correo electrónico valido.'
    return null
}

export function validatePhone(phone, countryCode) {
    if (countryCode.match(/(\d+)/) == null) return 'Ingresa el código de país del teléfono.'
    else if (phone == '') return 'Ingresa el número de teléfono.'
    else if (phone.length !== 9) return 'Ingresa un número de teléfono valido.'
    return null
}

export function validateActualPassword(password) {
    if (password == '') return 'Ingresa la contraseña actual.'
    return null
}

export function validatePassword(password) {
    if (password == '') return 'Ingresa una contraseña.'
    else if (password.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})') == null) return 'La contraseña ingresada es insegura. Inténtalo de nuevo.'
    return null
}

export function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword == '') return 'Confirma la contraseña.'
    else if (password !== confirmPassword) return 'Las contraseñas ingresadas no coinciden. Inténtalo de nuevo.'
    return null
}

export function validateAddress(address) {
    if (address == '') return 'Ingresa la dirección.'
    return null
}

export function validateAttentionTime(isSwitchChecked, appertureTime, departureTime, day) {
    if (isSwitchChecked && appertureTime == '' && departureTime == '') return 'Ingresa la hora de apertura y de cierre del día ' + day + '.'
    else if (isSwitchChecked && appertureTime == '') return 'Ingresa la hora de apertura del día ' + day + '.'
    else if (isSwitchChecked && departureTime == '') return 'Ingresa la hora de cierre del día ' + day + '.'
    else if (isSwitchChecked && appertureTime >= departureTime) return 'Ingresa una hora de apertura que no sea mayor o igual a la de cierre'
    return null
}

//Validate a image, making sure it's a png, jpg or jpeg. Also, validates that it's not greater or equal than 5 MB and that the file name is less that 45 characters
export function validateImage(name, ext, size) {
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') return 'Tipo de archivo no valido. Debe ser un archivo .png, .jpg o .jpeg.'
    else if (size >= 5242880) return 'Tamaño de archivo no valido. Debe ser inferior a 5MB.'
    else if (name.length > 45) return 'El nombre del archivo debe contener menos de 45 caracteres.'
    return null
}

export function validateMoney(money) {
    if (money <= 0) return 'Ingresa un monto mayor a 0.'
    return null
}

export function validateDatetime(date, time, minDatetime) {
    if (date == '') {
        return 'Ingresa la fecha.'
    } else {
        if (time == '') {
            return 'Ingresa la hora.'
        } else {
            //If the date is the same as the min date (without considering the time)
            if (date.toDateString() == minDatetime.toDateString()) {
                if (time < minDatetime) return 'La hora seleccionada debe ser superior a la de hoy.'
            }
        }
    }
    return null
}

export function validateDatetimeAttention(selectedDate, selectedTime, attentionList) {
    let selectedWeekday = weekdayList[selectedDate.getDay()]
    let translatedSelectedWeekday = translateWeekDay(selectedWeekday).toLowerCase()
    let selectedTimeHHMMSS = formatTimeToHHMMSS(selectedTime)

    if (!attentionList.some(item => item.workshop_office_attention_day == selectedWeekday)) return 'La sucursal no atiende el día ' + translatedSelectedWeekday + '. Selecciona otro día.'

    for (let i = 0; i < attentionList.length; i++) {
        if (attentionList[i].workshop_office_attention_day == selectedWeekday) {
            if (selectedTimeHHMMSS < attentionList[i].workshop_office_attention_aperture_time) return 'Ingresa una hora que sea superior al horario de apertura para el día ' + translatedSelectedWeekday + '.'
            else if (selectedTimeHHMMSS > attentionList[i].workshop_office_attention_departure_time) return 'Ingresa una hora que sea inferior al horario de cierre para el día ' + translatedSelectedWeekday + '.'
        }
    }
    return null
}

export function validateDiscount(discount) {
    if (discount == '') return 'Ingresa el descuento.'
    else if (discount < 1) return 'Ingresa un descuento mayor o igual a 1.'
    else if (discount > 100) return 'Ingresa un descuento menor o igual a 100.'
    return null
}