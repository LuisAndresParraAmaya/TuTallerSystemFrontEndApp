export function validateRut(rut) {
    if (rut == '') return 'Ingresa el rut.'
    if (!/^[0-9]+[-|-]{1}[0-9kK]{1}$/.test(rut)) return 'Ingresa un rut valido.'
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
    return null
}

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