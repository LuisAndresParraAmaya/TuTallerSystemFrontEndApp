import { SnackBar } from "@nativescript-community/ui-material-snackbar"
import { ApplicationSettings } from "@nativescript/core"

export default {
    props: ['workshopOfficeId', 'price'],
    data() {
        return {
        }
    },
    methods: {
        realizePay(event) {
            const data = { sessionId: this.workshopOfficeId, amount: this.price, rut: ApplicationSettings.getString('user') }
            console.log(data)

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
                    this.onWebViewStarted(event, url, token)
                })
        },

        confirmPaymentCompletion() {
            const webPayView = this.$refs['webViewWebPay'].nativeView
            console.log(webPayView)

            let currentURL = webPayView.android.getUrl()
            switch (currentURL) {
                case 'http://10.0.2.2:3000/PaymentSuccess':
                    if (this.workshopOfficeId !== undefined) this.$navigator.navigate('/AccountOptions', { frame: 'accountNav', clearHistory: true })
                    break
                case 'http://10.0.2.2:3000/PaymentReject':
                    alert({
                        title: 'Error',
                        message: 'La transacción ha sido rechazada. Verifica la validez de la información respecto a tu método de pago utilizado e inténtalo nuevamente.',
                        okButtonText: 'OK'
                    }).then(() => this.goToPreviousPage())
                    break
                default:
                    const snackBar = new SnackBar()
                    snackBar.simple('Debes completar el proceso de compra para continuar.')
            }
        },

        async onWebViewStarted(event, url, token) {
            const webPayView = event.object.getViewById('webViewWebPay')

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
        },

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