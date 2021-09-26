<template>
  <Page>
    <ActionBar title="Crear cuenta">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField v-model='rutInput' hint='Rut' :error='rutInputErr' @textChange='onRutTxtChange'/>
        <MDTextField v-model='nameInput' hint='Nombre' maxLength='45' :error='nameInputErr' @textChange='onNameTxtChange'/>
        <MDTextField v-model='lastNameInput' hint='Apellido' maxLength='45' :error='lastNameInputErr' @textChange='onLastNameTxtChange'/>
        <MDTextField v-model='emailInput' keyboardType='email' hint='Correo electrónico' maxLength='45' :error='emailInputErr' @textChange='onEmailTxtChange'/>
        <MDTextField v-model='phoneInput' keyboardType='phone' hint='Teléfono (opcional)' :error='phoneInputErr' @textChange='onPhoneTxtChange'/>
        <MDTextField v-model='passwordInput' secure='true' hint='Contraseña' maxLength='45' :error='passwordInputErr' @textChange='onPasswordTxtChange'/>
        <MDTextField v-model='confirmPasswordInput' secure='true' hint='Confirmar contraseña' maxLength='45' :error='confirmPasswordInputErr' @textChange='onConfirmPasswordTxtChange'/>
        <MDButton text='Crear cuenta' @tap='createAccount' :isEnabled='isCreateAccountBtnTappable'/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>