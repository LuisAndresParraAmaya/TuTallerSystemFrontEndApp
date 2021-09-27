<template>
  <Page>
        <ActionBar title="Cuenta"/>
        <ScrollView>
          <StackLayout>
            <MDButton text="Crear cuenta" @tap="goToCreateAccountPage"/>
            <MDButton text="Iniciar sesión" @tap="goToLoginPage"/>
            <MDButton text="Modificar perfil" @tap="goToModifyProfilePage"/>
            <MDButton text="Gestionar talleres" @tap="goToWorkshopManagementPage"/>
            <MDButton text="Cerrar sesión" @tap="logOut" class='danger'/>
          </StackLayout>
        </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>