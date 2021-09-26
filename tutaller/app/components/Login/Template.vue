<template>
  <Page>
    <ActionBar title="Iniciar sesión">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>
      <MDTextField v-model='emailInput' keyboardType='email' hint='Correo electrónico'/>
      <MDTextField v-model='passwordInput' secure='true' hint='Contraseña'/>
      <MDButton text="Iniciar sesión" @tap="login" :isEnabled='isLoginBtnTappable'/>

      <MDButton text="¿Olvidaste tu contraseña?" class="text-btn" @tap='goToRecoveryPasswordPage'/>
      <MDButton text="Regístrate en TuTaller" class="text-btn" @tap='goToCreateAccountPage'/>
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>