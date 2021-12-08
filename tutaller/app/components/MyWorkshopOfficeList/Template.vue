<template>
  <Page @loaded="getMyWorkshopOfficeList">
    <ActionBar title="Sucursales del taller">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView
        for="myWorkshopOffice in myWorkshopOfficeList"
        @itemTap="showMyWorkshopOffice"
        row="1"
      >
        <v-template>
          <GridLayout rows="*, *, *" columns="60%, *, auto">
            <Image
              src="res://outline_car_repair_black_36"
              stretch="aspectFit"
              row="0"
              col="0"
              rowSpan="3"
            />
            <Label
              :text="myWorkshopOffice.workshop_office_address"
              row="0"
              col="1"
              class="title-text"
            />
            <Label
              :text="
                myWorkshopOffice.commune_name +
                ', ' +
                myWorkshopOffice.region_name
              "
              row="1"
              col="1"
              class="caption-text"
            />
            <Label
              :text="'+56 ' + myWorkshopOffice.workshop_office_phone"
              row="2"
              col="1"
              class="caption-text"
            />
            <Label row="0" col="2" rowSpan="3" class="caption-text">{{
              formatWorkshopSuscriptionName(
                myWorkshopOffice.workshop_office_suscription_name
              )
            }}</Label>
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        src="res://outline_add_white_36"
        @tap="goToAddWorkshopOfficePage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>