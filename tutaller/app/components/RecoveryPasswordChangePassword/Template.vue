<template>
<Page>
    <ActionBar title="Modifica tu contraseña">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField v-model='newPasswordInput' secure='true' hint='Contraseña nueva' maxLength='45' :error='passTxtErr' @textChange='onPassTxtChange'/>
        <MDTextField v-model='confirmNewPasswordInput' secure='true' hint='Confirmar contraseña nueva' maxLength='45' :error='confirmPassTxtErr' @textChange='onConfirmPassTxtChange'/>
        <MDButton text='Cambiar mi contraseña' @tap='changePassword' :isEnabled='isChangePassBtnTappable'/>
      </StackLayout>
    </ScrollView>
</Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>