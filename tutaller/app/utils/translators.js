//Returns the translated subscription name. If nothing applies, just return it untranslated.
export function translateSubscriptionName(suscriptionName) {
    switch (suscriptionName) {
        case 'unsubscribed':
            return 'Sin suscripción'
        case 'basic':
            return 'Plan básico'
    }
    return suscriptionName
}

//Returns the translated periodicity. If nothing applies, just return it untranslated.
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
    return periodicity
}

//Returns the translated postulation status. If nothing applies, just return it untranslated.
export function translatePostulationStatus(status) {
    switch (status) {
        case 'pending':
            return 'Pendiente'
        case 'accepted':
            return 'Aceptado'
        case 'rejected':
            return 'Rechazado'
    }
    return status
}

//Returns the translated ad status. If nothing applies, just return it untranslated.
export function translateAdStatus(status) {
    switch (status) {
        case 'active':
            return 'Activo'
        case 'inactive':
            return 'Inactivo'
    }
    return status
}

//Returns the translated work status. If nothing applies, just return it untranslated.
export function translateWorkStatus(status) {
    switch (status) {
        case 'working':
            return 'En progreso'
        case 'confirmcompletion':
            return 'Esperando termino'
        case 'complete':
            return 'Terminado'
    }
    return status
}