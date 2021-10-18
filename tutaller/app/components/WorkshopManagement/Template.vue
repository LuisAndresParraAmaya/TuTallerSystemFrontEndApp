<template>
  <Page>
    <ActionBar title="Gestión de talleres" @loaded="onPageLoaded">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDButton text="Mis talleres" @tap="goToMyWorkshopList" />
        <MDButton
          text="Postular taller"
          @tap="goToAddWorkshopPostulationPage"
        />
        <MDButton
          v-show="
            userType == 1 //1 = admin
          "
          text="Listar talleres postulados"
          @tap="goToWorkshopPostulationListPage"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>