<template>
  <Page @loaded="getWorkshopPostulationList">
    <ActionBar title="Postulaciones de Talleres">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView
        for="workshopPostulation in workshopPostulationList"
        @itemTap="showWorkshopPostulation"
        row="1"
      >
        <v-template>
          <GridLayout rows="*, *" columns="60%, *, auto">
            <Image
              src="res://outline_car_repair_black_36"
              stretch="aspectFit"
              row="0"
              col="0"
              rowSpan="2"
            />
            <Label
              :text="workshopPostulation.workshop_name"
              row="0"
              col="1"
              class="title-text"
            />
            <Label row="1" col="1" class="caption-text"
              >{{ formatDateTime(workshopPostulation.postulation_date_time) }}
            </Label>
            <Label row="0" col="2" rowSpan="2" class="caption-text">{{
              translatePostulationStatus(
                workshopPostulation.postulation_current_status
              )
            }}</Label>
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        src="res://baseline_filter_list_white_36"
        @tap="goToFilterWorkshopPostulationListPage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>