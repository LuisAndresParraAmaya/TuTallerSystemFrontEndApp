<template>
  <Page>
    <ActionBar title="Modificar contraseña">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField
          v-model="actualPasswordInput"
          secure="true"
          hint="Contraseña actual"
          :error="actualPasswordInputErr"
          @textChange="onActualPasswordTxtChange"
        />
        <MDTextField
          v-model="newPasswordInput"
          secure="true"
          hint="Nueva contraseña"
          helper="Como mínimo debe contener 1 letra en minúscula, 1 letra en mayúscula, 1 número y debe ser de 8 caracteres."
          :error="newPasswordInputErr"
          @textChange="onNewPasswordTxtChange"
        />
        <MDTextField
          v-model="confirmNewPasswordInput"
          secure="true"
          hint="Confirmar nueva contraseña"
          :error="confirmNewPasswordInputErr"
          @textChange="onConfirmNewPasswordTxtChange"
        />
        <MDButton
          text="Cambiar mi contraseña"
          @tap="modifyPassword"
          :isEnabled="isModifyPasswordBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>