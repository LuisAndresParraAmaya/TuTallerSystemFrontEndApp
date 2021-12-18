export function calculateRutCheckDigit(rut) {
    let rutWithoutCheckDigit = parseInt(rut.split('-')[0])
    let rutWithoutCheckDigitMod = parseInt(rut.split('-')[0])
    let a = 0
    let b = 1
    for (; rutWithoutCheckDigitMod; rutWithoutCheckDigitMod = Math.floor(rutWithoutCheckDigitMod / 10)) b = (b + rutWithoutCheckDigitMod % 10 * (9 - a++ % 6)) % 11
    let checkDigit = b ? b - 1 : 'K'
    return rutWithoutCheckDigit.toString() + checkDigit.toString()
}