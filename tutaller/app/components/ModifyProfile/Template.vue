<template>
  <Page>
    <ActionBar title="Modificar perfil">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField v-model='rutInput' hint='Rut'/>
        <MDTextField v-model='nameInput' hint='Nombre' maxLength='45'/>
        <MDTextField v-model='lastNameInput' hint='Apellido' maxLength='45'/>
        <MDTextField v-model='emailInput' keyboardType='email' hint='Correo electrónico' maxLength='45'/>
        <MDTextField v-model='phoneInput' keyboardType='phone' hint='Teléfono' />
        <MDButton text='Actualizar datos' @tap='modifyProfile' :isEnabled='isModifyBtnTappable'/>
        <MDButton text='Cambiar contraseña' @tap='goToChangePasswordPage'/>
        <MDButton text='Eliminar cuenta' @tap='goToDeleteAccountPage' class='danger'/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>