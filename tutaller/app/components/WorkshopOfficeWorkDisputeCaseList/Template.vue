<template>
  <Page @loaded="getWorkshopOfficeWorkDisputeCaseList">
    <ActionBar title="Casos de disputa">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ListView
      for="workshopOfficeWorkDisputeCase in workshopOfficeWorkDisputeCaseList"
      @itemTap="showWorkshopOfficeWorkDisputeCase"
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
            :text="workshopOfficeWorkDisputeCase.workshop_office_service_name"
            row="0"
            col="1"
            class="title-text"
          />
          <Label
            :text="workshopOfficeWorkDisputeCase.workshop_name"
            row="1"
            col="1"
            class="caption-text"
          />
          <Label
            :text="
              formatDateTime(
                workshopOfficeWorkDisputeCase.workshop_office_work_case_date_time
              )
            "
            row="2"
            col="1"
            class="caption-text"
          />
          <Label row="0" col="2" rowSpan="3" class="caption-text">{{
            translateServiceWorkDisputeCaseStatus(
              workshopOfficeWorkDisputeCase.case_current_status
            )
          }}</Label>
        </GridLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script src='./Component.js'></script>