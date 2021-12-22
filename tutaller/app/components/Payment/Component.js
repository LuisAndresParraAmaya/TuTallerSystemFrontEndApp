import { SnackBar } from "@nativescript-community/ui-material-snackbar"
import { ApplicationSettings } from "@nativescript/core"
const webViewInterfaceModule = require('nativescript-webview-interface')

export default {
    props: ['itemId', 'itemDescription', 'price', 'operationType', 'buyerId', 'merchantName'],
    data() {
        return {
            webViewInterface: null
        }
    },
    methods: {
        realizePay() {
            const data = {
                sessionId: this.itemId,
                amount: this.price, rut: ApplicationSettings.getString('user'),
                itemId: this.itemId,
                itemDescription: this.itemDescription,
                operationType: this.operationType,
                buyerId: this.buyerId,
                merchantName: this.merchantName
            }

            fetch('http://10.0.2.2:8080/RealizePayMobile', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    const snackBar = new SnackBar()
                    snackBar.simple('No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.')
                })
                .then(response => {
                    let url = response.url
                    let token = response.token
                    this.onWebViewStarted(url, token)
                })
        },

        //Start the webview, sending a URL post to WebPay. Also, listening to the changes according to the new URL redirects
        async onWebViewStarted(url, token) {
            const webPayView = this.$refs['webViewWebPay'].nativeView

            this.webViewInterface = new webViewInterfaceModule.WebViewInterface(webPayView, 'https://webpay3gint.transbank.cl/webpayserver/initTransaction')

            let htmlPost = "<!DOCTYPE html>" +
                "<html>" +
                "<body onload='document.frm1.submit()'>" +
                "<form action='" + url + "' method='post' name='frm1'>" +
                "<input type='hidden' name='token_ws' value='" + token + "'/>" +
                "</form>" +
                "</body>" +
                "</html>"

            await webPayView.android.loadData(htmlPost, 'text/html', 'UTF-8')

            //Enable the cookie manager. It depends on the level of the API that Android uses the way that it is enabled
            if (android.os.Build.VERSION.SDK_INT >= 21) android.webkit.CookieManager.getInstance().setAcceptThirdPartyCookies(webPayView.android, true)
            else android.webkit.CookieManager.getInstance().setAcceptCookie(true)

            //Assign the cache in the webView
            webPayView.android.getSettings().setCacheMode(android.webkit.WebSettings.LOAD_CACHE_ELSE_NETWORK)

            webPayView.on('loadFinished', () => {
                let currentURL = webPayView.android.getUrl()
                switch (currentURL) {
                    case 'http://www.blankwebsite.com/':
                        alert({
                            title: 'Compra realizada',
                            message: 'La compra fue exitosa. El comprobante de pago ha sido enviado a su correo electrónico.',
                            okButtonText: 'OK'
                        })
                        this.onPaymentComplete()
                        break
                    case 'https://www.blank.org/':
                        alert({
                            title: 'Error',
                            message: 'La transacción ha sido rechazada. Verifica la validez de la información respecto a tu método de pago utilizado e inténtalo nuevamente.',
                            okButtonText: 'OK'
                        }).then(() => this.goToPreviousPage())
                }
            })
        },

        onPaymentComplete() {
            this.onWebViewClosed()
            switch (this.operationType) {
                case 'payWorkshopService':
                    this.addWorkshopOfficeWork()
                    break
                case 'paySubscription':
                    this.$navigator.navigate('/AccountOptions', { frame: 'accountNav', clearHistory: true })
                    break
                case 'payWorkshopAd':
                    this.activateWorkshopOfficeAd()
            }
        },

        addWorkshopOfficeWork() {
            const data = { workshop_office_service_id: this.itemId, user_user_rut: ApplicationSettings.getString('user') }

            fetch('http://10.0.2.2:8080/AddWorkshopOfficeWork', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    })
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.$navigator.navigate('/WorkshopOfficeList', { clearHistory: true })
                        case 'Invalid user rut or service':
                            console.log('Invalid user rut or service')
                        case 'Milestone adding failed':
                            console.log('Milestone adding failed')
                    }
                })
        },

        activateWorkshopOfficeAd() {
            const data = { id: this.itemId, workshop_office_ad_bid: this.price }
            fetch('http://10.0.2.2:8080/AdvertiseWorkShopOfficeAd', {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error)
                    alert({
                        title: 'Error',
                        message: 'No se pudo realizar la acción. Comprueba la red e inténtalo de nuevo.',
                        okButtonText: 'OK'
                    }).then(() => this.isActivateAdTappable = true)
                })
                .then(response => {
                    switch (response.Response) {
                        case 'Operation Success':
                            this.$navigator.navigate('/AccountOptions', { clearHistory: true, frame: 'accountNav' })
                            break
                        case 'Ad already activated':
                            const snackBar = new SnackBar()
                            snackBar.simple('Para efectuar otra puja al mismo anuncio, debes esperar 24 horas desde su activación.')
                            break
                        case 'Operation Failed':
                            console.log('Operation activate ad failed')
                    }
                })
        },

        //When the user wants to stop the webview, clearing its cookies and cache
        onWebViewClosed() {
            const webPayView = this.$refs['webViewWebPay'].nativeView

            //Delete cookies
            if (android.os.Build.VERSION.SDK_INT >= 21) android.webkit.CookieManager.getInstance().removeAllCookies(null)
            else android.webkit.CookieManager.getInstance().removeAllCookie()

            //Delete cache
            webPayView.android.clearCache(true)
        },

        goToPreviousPage() {
            this.onWebViewClosed()
            this.$navigateBack()
        }
    }
}