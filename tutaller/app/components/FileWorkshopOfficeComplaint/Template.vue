<template>
  <Page>
    <ActionBar title="Realizar un reclamo">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Por favor, al realizar un reclamo asegurate de ser honesto, de esta forma nos estarás ayudando a mejorar TuTaller." textWrap="true" class="paragraph"/>
        <MDTextView v-model='complaintInput' hint="Ingresa un reclamo" :error='complaintInputErr' @textChange='onComplaintTxtChange'/>
        <MDButton text="Enviar" @tap="fileWorkshopOfficeComplaint" :isEnabled='isFileWorkshopOfficeComplaintTappable'/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>