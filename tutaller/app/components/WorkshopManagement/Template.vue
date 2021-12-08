<template>
  <Page>
    <ActionBar title="Gestionar talleres" @loaded="onPageLoaded">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDButton
          v-if="
            userType == 1 //1 = admin
          "
          text="Listar talleres postulados"
          @tap="goToWorkshopPostulationListPage"
        />
        <MDButton
          v-if="
            userType == 1 //1 = admin
          "
          text="Listar casos de disputa"
          @tap="goToWorkshopOfficeWorkDisputeCaseListPage"
        />
        <template v-else>
          <MDButton text="Mis talleres" @tap="goToMyWorkshopList" />
          <MDButton
            text="Postular taller"
            @tap="goToAddWorkshopPostulationPage"
          />
        </template>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>