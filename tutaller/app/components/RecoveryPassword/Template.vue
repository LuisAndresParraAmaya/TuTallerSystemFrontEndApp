<template>
    <Page>
    <ActionBar title="Reestablecer contraseña">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>
      <TextField v-model='emailInput' secure='true' hint='Correo electrónico'/>
      <Button text='Enviar código' @tap='sendCodeToUser' class='btn'/>
      <Label text="La eliminación será realizada al transcurrir 30 días desde la desactivación, para reactivar tu cuenta solo debes volver a iniciar sesión." textWrap="true" />
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>