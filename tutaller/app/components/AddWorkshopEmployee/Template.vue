<template>
  <Page>
    <ActionBar title="Añadir empleados">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDButton text="Añadir empleados" @tap="addWorkshopEmployees" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>