<template>
  <Page>
    <ActionBar title="Modificar contraseña">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField v-model='actualPasswordInput' secure='true' hint='Contraseña actual'/>
        <MDTextField v-model='newPasswordInput' secure='true' hint='Contraseña nueva' maxLength='45'/>
        <MDTextField v-model='confirmNewPasswordInput' secure='true' hint='Confirmar contraseña nueva' maxLength='45'/>
        <MDButton text='Cambiar mi contraseña' @tap='modifyPassword' :isEnabled='isModifyPasswordBtnTappable'/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>