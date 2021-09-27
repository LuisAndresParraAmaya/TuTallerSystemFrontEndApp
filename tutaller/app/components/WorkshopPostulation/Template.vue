<template>
  <Page>
      <ActionBar :title='workshopPostulation.workshop_name'>
        <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
      </ActionBar>
      <ScrollView>
        <StackLayout>
            <Label :text="workshopPostulation.postulation_message" textWrap="true"/>
            <Label :text="workshopPostulation.postulation_date_time" textWrap="true"/>
            <MDButton text="Rechazar" @tap="rejectWorkshopPostulation" class='danger'/>
            <MDButton text="Aceptar" @tap="acceptWorkshopPostulation" />
        </StackLayout>
      </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>