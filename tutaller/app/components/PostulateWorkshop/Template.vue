<template>
  <Page>
    <ActionBar title="Postular taller">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField v-model='workshopNameInput' hint='Nombre del taller' :error='workshopNameInputErr' @textChange='onWorkshopNameTxtChange'/>
        <MDTextField v-model='workshopPhoneInput' keyboardInput='phone' hint='Número de teléfono del taller' :error='workshopPhoneInputErr' @textChange='onWorkshopPhoneTxtChange'/>
        <MDTextField v-model='workshopDescriptionInput' hint='Descripción del taller' :error='workshopDescriptionInputErr' @textChange='onWorkshopDescriptionTxtChange'/>
        <MDTextView v-model='workshopPostulationMessage' hint='Mensaje' :error='workshopPostulationMessageErr' @textChange='onWorkshopPostulationMessageTxtChange'/>
        <MDButton text='Enviar postulación' @tap='sendPostulation' :isEnabled='isSendBtnTappable'/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>