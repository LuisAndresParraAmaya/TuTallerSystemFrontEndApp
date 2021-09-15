<template>
<Page>
    <ActionBar title="Modifica tu contraseña">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>
      <Label text="Si coincide con la dirección de correo electrónico de tu cuenta, te enviaremos un código." textWrap="true" />
      <TextField v-model='newPasswordInput' secure='true' hint='Contraseña nueva' maxLength='45'/>
      <TextField v-model='confirmNewPasswordInput' secure='true' hint='Confirmar contraseña nueva' maxLength='45'/>
      <Button text='Verificar' @tap='changePassword' class='btn'/>
    </StackLayout>
</Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>