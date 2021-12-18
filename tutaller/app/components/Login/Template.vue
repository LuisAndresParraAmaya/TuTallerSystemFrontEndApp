<template>
  <Page>
    <ActionBar title="Iniciar sesión">
      <NavigationButton
        @tap="closeModal"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <StackLayout>
      <MDTextField
        v-model="emailInput"
        keyboardType="email"
        hint="Correo electrónico"
        :error="emailInputErr"
        @textChange="onEmailTxtChange"
      />
      <MDTextField
        v-model="passwordInput"
        secure="true"
        hint="Contraseña"
        :error="passwordInputErr"
        @textChange="onPasswordTxtChange"
      />
      <MDButton
        text="Iniciar sesión"
        @tap="login"
        :isEnabled="isLoginBtnTappable"
      />

      <MDButton
        text="¿Olvidaste tu contraseña?"
        class="text-btn"
        @tap="goToRecoveryPasswordPage"
        :isEnabled="isRecoveryBtnTappable"
      />
      <MDButton
        text="Regístrate en TuTaller"
        class="text-btn"
        @tap="goToAddAccountPage"
        :isEnabled="isCreateBtnTappable"
      />
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>