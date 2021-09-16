<template>
  <Page>
    <ActionBar title="Crear cuenta">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <StackLayout>
      <TextField id='txtRut' v-model='rutInput' hint='Rut'/>
      <TextField v-model='nameInput' hint='Nombre' maxLength='45'/>
      <TextField v-model='lastNameInput' hint='Apellido' maxLength='45'/>
      <TextField v-model='emailInput' keyboardType='email' hint='Correo electrónico' maxLength='45'/>
      <TextField v-model='phoneInput' keyboardType='phone' hint='Teléfono' />
      <TextField v-model='passwordInput' secure='true' hint='Contraseña' maxLength='45'/>
      <TextField v-model='confirmPasswordInput' secure='true' hint='Confirmar contraseña' maxLength='45'/>
      <Button text='Crear cuenta' @tap='createAccount' class="btn"/>
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>