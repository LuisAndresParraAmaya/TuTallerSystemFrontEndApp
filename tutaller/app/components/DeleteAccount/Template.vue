<template>
  <Page>
    <ActionBar title="Eliminar cuenta">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>
      <TextField v-model='actualPasswordInput' secure='true' hint='Contraseña actual'/>
      <TextField v-model='confirmActualPasswordInput' secure='true' hint='Confirmar contraseña actual'/>
      <Button text='Eliminar mi cuenta' @tap='deleteAccount' class='btndanger'/>
      <Label text="La eliminación será realizada al transcurrir 30 días desde la desactivación, para reactivar tu cuenta solo debes volver a iniciar sesión." textWrap="true" />
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>