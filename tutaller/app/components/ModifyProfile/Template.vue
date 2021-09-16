<template>
  <Page>
    <ActionBar title="Modificar perfil">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>

      <TextField v-model='rutInput' hint='Rut'/>
      <TextField v-model='nameInput' hint='Nombre' maxLength='45'/>
      <TextField v-model='lastNameInput' hint='Apellido' maxLength='45'/>
      <TextField v-model='emailInput' keyboardType='email' hint='Correo electrónico' maxLength='45'/>
      <TextField v-model='phoneInput' keyboardType='phone' hint='Teléfono' />
      <Button text='Actualizar datos' @tap='modifyProfile' class='btn'/>
      <Button text='Cambiar contraseña' @tap='goToChangePasswordPage' class='btn'/>
      <Button text='Eliminar cuenta' @tap='goToDeleteAccountPage' class='btndanger'/>
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>