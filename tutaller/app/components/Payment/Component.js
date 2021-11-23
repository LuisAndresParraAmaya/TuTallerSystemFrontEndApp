export default {
    data() {
        return {
        }
    },
    methods: {
        onWebViewLoadStarted(event) {
            const webPayView = event.object

            //Enable the cookie manager. It depends on the level of the API that Android uses the way that it is enabled
            if (android.os.Build.VERSION.SDK_INT >= 21) android.webkit.CookieManager.getInstance().setAcceptThirdPartyCookies(webPayView.android, true)
            else android.webkit.CookieManager.getInstance().setAcceptCookie(true)

            //Assign the cache in the webView
            webPayView.android.getSettings().setCacheMode(android.webkit.WebSettings.LOAD_CACHE_ELSE_NETWORK)
        },

        onWebViewClosed(event) {
            const webPayView = event.object

            //Delete cookies
            if (android.os.Build.VERSION.SDK_INT >= 21) android.webkit.CookieManager.getInstance().removeAllCookies(null)
            else android.webkit.CookieManager.getInstance().removeAllCookie()

            //Delete cache
            webPayView.android.clearCache(true)
        },

        goToPreviousPage() {
            this.$navigateBack()
        }
    }
}