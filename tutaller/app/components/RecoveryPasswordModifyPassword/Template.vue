<template>
  <Page>
    <ActionBar title="Modifica tu contraseña">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField
          v-model="newPasswordInput"
          secure="true"
          hint="Contraseña nueva"
          helper="Como mínimo debe contener 1 letra en minúscula, 1 letra en mayúscula, 1 número y debe ser de 8 caracteres."
          :error="newPasswordInputErr"
          @textChange="onPasswordTxtChange"
        />
        <MDTextField
          v-model="confirmNewPasswordInput"
          secure="true"
          hint="Confirmar contraseña nueva"
          :error="confirmNewPasswordInputErr"
          @textChange="onConfirmPasswordTxtChange"
        />
        <MDButton
          text="Cambiar mi contraseña"
          @tap="changePassword"
          :isEnabled="isChangePassBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>