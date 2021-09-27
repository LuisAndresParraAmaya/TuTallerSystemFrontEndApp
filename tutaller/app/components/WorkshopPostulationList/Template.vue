<template>
  <Page @loaded='getWorkshopPostulationList'>
        <ActionBar title='Postulaciones de Talleres'>
          <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
        </ActionBar>
        <ListView for="workshopPostulation in workshopPostulationList" @itemTap="showWorkshopPostulation">
          <v-template>
            <GridLayout columns='60%, *' rows='*, *'>
              <Image src="res://outline_car_repair_black_36" stretch="aspectFit" row='0' col='0' rowSpan='2'/>
              <Label :text="workshopPostulation.workshop_name" class='title-text' row='0' col='1'/>
              <Label :text="workshopPostulation.postulation_date_time" class='caption-text' row='1' col='1'/>
            </GridLayout>
          </v-template>
        </ListView>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>