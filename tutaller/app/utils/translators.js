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