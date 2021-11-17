//Returns the translated subscription name
export function translateSubscriptionName(suscriptionName) {
    switch (suscriptionName) {
        case 'unsubscribed':
            return 'Sin suscripción'
        case 'basic':
            return 'Plan básico'
    }
    return suscriptionName
}

//Returns the translated periodicity
export function translatePeriodicity(periodicity) {
    switch (periodicity) {
        case 'none':
            return 'Ninguno'
        case 'daily':
            return 'Diario'
        case 'monthly':
            return 'Mensual'
        case 'yearly':
            return 'Anual'
    }
    return null
}

//Returns the translated postulation status
export function translatePostulationStatus(status) {
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
export function translateAdStatus(status) {
    switch (status) {
        case 'active':
            return 'Activo'
        case 'inactive':
            return 'Inactivo'
    }
    return null
}