<template>
  <Page>
    <ActionBar title="Suscripciones">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDButton text="Comprar ahora" @tap="paySubscription" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>