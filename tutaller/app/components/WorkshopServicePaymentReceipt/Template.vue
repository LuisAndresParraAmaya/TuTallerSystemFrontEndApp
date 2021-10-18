<template>
  <Page>
    <ActionBar title="Acuso de recibo">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDButton text="Descargar recibo" @tap="downloadServiceReceipt" />
        <MDButton text="Continuar" @tap="continueServiceProcess" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>