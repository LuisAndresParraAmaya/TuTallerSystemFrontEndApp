//Calculate the rut check digit, returning the rut plus its digit but without the hyphen
export function calculateRutCheckDigit(rut) {
    let rutWithoutCheckDigit = parseInt(rut.split('-')[0])
    let rutWithoutCheckDigitMod = parseInt(rut.split('-')[0])
    let a = 0
    let b = 1
    for (; rutWithoutCheckDigitMod; rutWithoutCheckDigitMod = Math.floor(rutWithoutCheckDigitMod / 10)) b = (b + rutWithoutCheckDigitMod % 10 * (9 - a++ % 6)) % 11
    let checkDigit = b ? b - 1 : 'K'
    return rutWithoutCheckDigit.toString() + checkDigit.toString()
}

//Calculate the distance between 2 points, using a determined unit (K or N)
export function calculateDistance(latitude1, longitude1, latitude2, longitude2, unit) {
    if ((latitude1 == latitude2) && (longitude1 == longitude2)) return 0
    else {
        let radiuslatitude1 = Math.PI * latitude1 / 180
        let radiuslatitude2 = Math.PI * latitude2 / 180
        let theta = longitude1 - longitude2
        let radiustheta = Math.PI * theta / 180
        let distance = Math.sin(radiuslatitude1) * Math.sin(radiuslatitude2) + Math.cos(radiuslatitude1) * Math.cos(radiuslatitude2) * Math.cos(radiustheta)
        if (distance > 1) distance = 1
        distance = ((Math.acos(distance)) * 180 / Math.PI) * 60 * 1.1515
        if (unit == 'K') distance = distance * 1.609344
        else if (unit == 'N') distance = distance * 0.8684
        return distance
    }
}