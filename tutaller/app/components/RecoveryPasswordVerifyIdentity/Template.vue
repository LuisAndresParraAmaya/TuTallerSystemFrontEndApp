<template>
<Page>
    <ActionBar title="Verifica tu identidad">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>
      <Label text="Si coincide con la dirección de correo electrónico de tu cuenta, te enviaremos un código." textWrap="true" />
      <TextField v-model='sentCodeInput' secure='true' hint='Escribe el código'/>
      <Button text='Verificar' @tap='verifyCorrectCode' class='btn'/>
    </StackLayout>
</Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>