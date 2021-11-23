<template>
  <Page>
    <ActionBar title="Realizar pago">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <WebView
      src="http://nativescript-vue.org/"
      @loadStarted="onWebViewLoadStarted"
    />
  </Page>
</template>

<script src='./Component.js'></script>