const he = require('he')

//Returns the date time in the DD/MM/YYYY hh:mm format
export function formatDateTime(datetime) {
    let date = datetime.split('T', 1)[0]
    let time = datetime.split('T', 2)[1]
    const year = date.split('-', 1)[0]
    const month = date.split('-', 2)[1]
    const day = date.split('-', 3)[2]
    const hourminute = time.split(':', 1)[0] + ':' + time.split(':', 2)[1]
    return day + '/' + month + '/' + year + ' ' + hourminute
}

//Returns the rating number, the rating number expressed in font awesome stars/half stars, and the number of total evaluations
export function formatEvaluation(rating, totalEvaluations) {
    if (rating == 5) {
        return he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf005;&#xf005;' + ' (' + totalEvaluations + ')')
    } else if (rating >= 4.5) {
        return he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf005;&#xf089;' + ' (' + totalEvaluations + ')')
    } else if (rating >= 4) {
        return he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf005;' + ' (' + totalEvaluations + ')')
    } else if (rating >= 3.5) {
        return he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf089;' + ' (' + totalEvaluations + ')')
    } else if (rating >= 3) {
        return he.decode(rating + ' &#xf005;&#xf005;&#xf005;' + ' (' + totalEvaluations + ')')
    } else if (rating >= 2.5) {
        return he.decode(rating + ' &#xf005;&#xf005;&#xf089;' + ' (' + totalEvaluations + ')')
    } else if (rating >= 2) {
        return he.decode(rating + ' &#xf005;&#xf005;' + ' (' + totalEvaluations + ')')
    } else if (rating >= 1.5) {
        return he.decode(rating + ' &#xf005;&#xf089;' + ' (' + totalEvaluations + ')')
    } else if (rating == 1) {
        return he.decode(rating + ' &#xf005;' + ' (' + totalEvaluations + ')')
    } else {
        return 'Sin valorizaciones'
    }
}

//Returns the translated postulation status
export function formatPostulationStatus(status) {
    switch (status) {
        case 'pending':
            return 'Pendiente'
        case 'accepted':
            return 'Aceptado'
        case 'rejected':
            return 'Rechazado'
    }
    return null
}

//Returns the translated ad status
export function formatAdStatus(status) {
    switch (status) {
        case 'active':
            return 'Activo'
        case 'inactive':
            return 'Inactivo'
    }
    return null
}

//Add the hyphen "-" to the Rut
export function formatRut(rut) {
    return [rut.slice(0, 8), '-', rut.slice(8)].join('')
}

//Only returns the numbers that pertains to the Rut
export function deformatRut(rut) {
    return rut.replace('-', '').replace("-", "").replace(/k/gi, '0')
}