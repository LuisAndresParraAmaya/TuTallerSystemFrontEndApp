<template>
  <Page>
    <ActionBar title="Modificar contraseña">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>
      <TextField v-model='actualPasswordInput' secure='true' hint='Contraseña actual'/>
      <TextField v-model='newPasswordInput' secure='true' hint='Contraseña nueva' maxLength='45'/>
      <TextField v-model='confirmNewPasswordInput' secure='true' hint='Confirmar contraseña nueva' maxLength='45'/>
      <Button text='Cambiar mi contraseña' @tap='modifyPassword' class='btn'/>
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>