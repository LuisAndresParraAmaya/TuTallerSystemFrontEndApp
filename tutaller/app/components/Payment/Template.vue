<template>
  <Page @loaded="realizePay">
    <ActionBar title="Realizar pago">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <StackLayout>
      
    </StackLayout>
    <WebView id="webViewWebPay" />
  </Page>
</template>

<script src='./Component.js'></script>