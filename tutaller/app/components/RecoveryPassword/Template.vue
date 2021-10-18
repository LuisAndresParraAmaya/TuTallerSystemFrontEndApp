<template>
    <Page>
    <ActionBar title="Reestablecer contraseña">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField ref='txtEmail' v-model='emailInput' keyboardType='email' hint='Correo electrónico' :error='emailInputErr' @textChange='onEmailTxtChange'/>
        <MDButton text='Enviar código' @tap='sendCodeToUser' :isEnabled='isSendCodeBtnTappable'/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>