<template>
  <Page>
        <ActionBar title="Gestión de talleres">
          <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
        </ActionBar>
        <ScrollView>
          <StackLayout>
            <MDButton text="Postular taller" @tap="goToPostulateWorkshopPage"/>
            <MDButton text="Listar talleres postulados" @tap="goToWorkshopPostulationListPage"/>
          </StackLayout>
        </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>