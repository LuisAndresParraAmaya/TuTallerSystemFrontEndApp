<template>
  <Page>
    <ActionBar title="Eliminar cuenta">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField v-model='actualPasswordInput' secure='true' hint='Contraseña actual' :error='actualPasswordInputErr' @textChange='onPasswordTxtChange'/>
        <MDTextField v-model='confirmActualPasswordInput' secure='true' hint='Confirmar contraseña actual' :error='confirmActualPasswordInputErr' @textChange='onPasswordTxtChange'/>
        <MDButton text='Eliminar mi cuenta' @tap='deleteAccount' class='danger' :isEnabled='isDeleteAccountTappable'/>
        <Label text="La eliminación será realizada al transcurrir 30 días desde la desactivación, para reactivar tu cuenta solo debes volver a iniciar sesión." textWrap="true" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>