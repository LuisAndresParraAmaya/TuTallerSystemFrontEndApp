<template>
  <Page>
    <ActionBar title="Iniciar sesión">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>

      <TextField v-model='emailInput' keyboardType='email' hint='Correo electrónico'/>
      <TextField v-model='passwordInput' secure='true' hint='Contraseña' maxLength='45'/>
      <Button text="Iniciar sesión" @tap="login" />

      <Label text="¿Olvidaste tu contraseña?" textWrap="true" class="fas"/>
      <Label text="Regístrate en TuTaller" textWrap="true" class="fas" @tap='goToCreateAccount'/>
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>