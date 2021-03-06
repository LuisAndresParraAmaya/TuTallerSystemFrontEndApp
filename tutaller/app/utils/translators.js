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

//Returns the translated active/inactive status. If nothing applies, just return it untranslated.
export function translateActiveInactiveStatus(status) {
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
        case 'confirmcompletiontechnician':
        case 'confirmcompletioncustomer':
            return 'Esperando termino'
        case 'caseopened':
            return 'En disputa'
        case 'complete':
            return 'Finalizado'
        case 'completeandevaluated':
            return 'Finalizado y evaluado'
        case 'cancelled':
            return 'Cancelado'
    }
    return status
}

//Returns the translated service work dispute case status. If nothing applies, just return it untranslated.
export function translateServiceWorkDisputeCaseStatus(status) {
    switch (status) {
        case 'pending':
            return 'Pendiente'
        case 'resolvedinfavorofcustomer':
            return 'A favor del cliente'
        case 'resolvedinfavorofoffice':
            return 'A favor del taller'
    }
    return status
}

//Returns the translated week day (there are only seven)
export function translateWeekDay(weekDay) {
    switch (weekDay) {
        case 'monday':
            return 'Lunes'
        case 'tuesday':
            return 'Martes'
        case 'wednesday':
            return 'Miercoles'
        case 'thursday':
            return 'Jueves'
        case 'friday':
            return 'Viernes'
        case 'saturday':
            return 'Sábado'
        case 'sunday':
            return 'Domingo'
    }
}

//Returns the translated question type. If nothing applies, just return it untranslated.
export function translateQuestionType(questionnaireQuestionType) {
    switch (questionnaireQuestionType) {
        case 'multiplechoice':
            return 'Alternativas'
        case 'essayquestion':
            return 'Desarrollo'
    }
    return questionnaireQuestionType
}