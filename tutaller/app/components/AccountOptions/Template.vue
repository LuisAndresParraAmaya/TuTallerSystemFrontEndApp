<template>
  <Page @loaded="checkifLoggedIn">
    <ActionBar title="Cuenta" />
    <ScrollView>
      <StackLayout>
        <MDButton
          v-show="!isLoggedIn"
          text="Iniciar sesión"
          @tap="goToLoginPage"
        />
        <MDButton
          v-if="isLoggedIn"
          text="Modificar perfil"
          @tap="goToAccountManagementPage"
        />
        <MDButton
          v-show="isLoggedIn"
          text="Gestionar talleres"
          @tap="goToWorkshopManagementPage"
        />
        <MDButton
          v-show="isLoggedIn"
          text="Gestionar suscripciones"
          @tap="goToSubscriptionManagementPage"
        />
        <MDButton text="Soporte de TuTaller" @tap="goToFileSupportTicketPage" />
        <MDButton
          v-show="isLoggedIn"
          text="Cerrar sesión"
          @tap="logOut"
          class="danger-color"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>