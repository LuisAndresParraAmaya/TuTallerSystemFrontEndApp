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
                workshopOfficeService.workshop_office_service_estimated_time
              "
              row="1"
              col="1"
              class="caption-text"
            />
            <!-- If the service has an active offer -->
            <template v-if="workshopOfficeService.offer_discount !== 0">
              <Label text="En oferta" row="2" col="1" class="caption-text" />
              <Label
                :text="'$' + workshopOfficeService.offer_price + ' CLP'"
                row="1"
                col="2"
                class="meta-text"
              />
            </template>
            <Label
              :text="
                '$' +
                workshopOfficeService.workshop_office_service_price +
                ' CLP'
              "
              row="0"
              col="2"
              :class="{
                'text-line-through': workshopOfficeService.offer_discount !== 0,
              }"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        v-show="actualFrame == 'accountNav'"
        src="res://outline_add_white_36"
        @tap="goToAddWorkshopOfficeServicePage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>