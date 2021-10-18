<template>
  <Page @loaded="getWorkshopOfficeServiceList">
    <ActionBar :title="pageTitle">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView
        for="workshopOfficeService in workshopOfficeServiceList"
        @itemTap="showWorkshopOfficeService"
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
              :text="workshopOfficeService.workshop_office_service_name"
              row="0"
              col="1"
              class="title-text"
            />
            <Label
              :text="
                '$' +
                workshopOfficeService.workshop_office_service_price +
                ' CLP'
              "
              row="1"
              col="1"
              class="caption-text"
            />
            <Label
              :text="
                workshopOfficeService.workshop_office_service_estimated_time
              "
              row="2"
              col="1"
              class="caption-text"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        v-show="actualFrame == 'accountNav'"
        src="res://baseline_filter_list_white_36"
        @tap="goToAddWorkshopOfficeServicePage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>