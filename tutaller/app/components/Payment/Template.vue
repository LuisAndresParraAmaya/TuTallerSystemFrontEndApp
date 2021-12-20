<template>
  <Page @loaded="realizePay">
    <ActionBar title="Realizar pago">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="*, auto">
      <WebView ref="webViewWebPay" id="webViewWebPay" row="0" @tap="a" />
      <MDButton text="Continuar" @tap="confirmPaymentCompletion" row="1" />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>