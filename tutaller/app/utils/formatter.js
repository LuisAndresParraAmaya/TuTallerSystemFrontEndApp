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

//Returns the date in the DD/MM/YYYY format
export function formatDate(date) {
    let d = date.split('T', 1)[0]
    const year = d.split('-', 1)[0]
    const month = d.split('-', 2)[1]
    const day = d.split('-', 3)[2]
    return day + '/' + month + '/' + year
}

//Formats the date to the format required in the DB (YYYY-MM-DD)
export function formatDateToDB(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//Formats the time in the hh:mm format
export function formatTimeHM(time) {
    let minute = time.split(':', 1)[0]
    let second = time.split(':', 2)[1]
    return minute + ':' + second
}

//Formats the time to the format required in the DB (hh:mm)
export function formatTimeToDB(time) {
    return time.getHours() + ':' + time.getMinutes()
}

//Formats the time to the hh:mm:ss format
export function formatTimeToHHMMSS(time) {
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second

    return hour + ':' + minute + ':' + second
}

//Returns the rating number, the rating number expressed in font awesome stars/half stars, and the number of total evaluations (if required, else just send a -1)
export function formatQualification(rating, totalEvaluations) {
    let qualificationFormat = 'Sin valorizaciones'
    if (rating == 5) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf005;&#xf005;')
    } else if (rating >= 4.5) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf005;&#xf089;')
    } else if (rating >= 4) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf005;')
    } else if (rating >= 3.5) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf005;&#xf005;&#xf089;')
    } else if (rating >= 3) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf005;&#xf005;')
    } else if (rating >= 2.5) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf005;&#xf089;')
    } else if (rating >= 2) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf005;')
    } else if (rating >= 1.5) {
        qualificationFormat = he.decode(rating + ' &#xf005;&#xf089;')
    } else if (rating == 1) {
        qualificationFormat = he.decode(rating + ' &#xf005;')
    }
    if (totalEvaluations !== -1) qualificationFormat += ' (' + totalEvaluations + ')'
    return qualificationFormat
}

//Returns the qualification to number (1, 2, 3, 4 or 5)
export function formatQualificationToNumber(rating) {
    switch (rating) {
        case '5 Estrellas':
            return 5
        case '4 Estrellas':
            return 4
        case '3 Estrellas':
            return 3
        case '2 Estrellas':
            return 2
        case '1 Estrella':
            return 1
    }
}

//Add the hyphen "-" to the Rut
export function formatRut(rut) {
    return [rut.slice(0, 8), '-', rut.slice(8)].join('')
}

//Only returns the numbers that pertains to the Rut
export function deformatRut(rut) {
    return rut.replace('-', '').replace("-", "").replace(/k/gi, '0')
}