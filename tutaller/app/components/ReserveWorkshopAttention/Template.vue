<template>
  <Page>
    <ActionBar title="Reservar atención">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
          <TextField v-model='reservedDatetimeInput' hint="Hora y fecha" keyboardType='datetime'/>
        <MDButton text="Reservar" @tap="reserveAttention" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>