<template>
  <Page @loaded="getMyWorkshopOfficeAdList">
    <ActionBar title="Anuncios publicitarios">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView
        for="myWorkshopOfficeAd in myWorkshopOfficeAdList"
        @itemTap="showMyWorkshopOfficeAd"
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
              :text="myWorkshopOfficeAd.workshop_office_ad_name"
              row="0"
              col="1"
              class="title-text"
            />
            <Label
              :text="'$' + myWorkshopOfficeAd.workshop_office_ad_bid + ' CLP'"
              row="1"
              col="1"
              class="caption-text"
            />
            <Label
              :text="
                translateAdStatus(myWorkshopOfficeAd.workshop_office_ad_status)
              "
              row="0"
              col="2"
              rowSpan="2"
              class="caption-text"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        src="res://baseline_filter_list_white_36"
        @tap="goToAddWorkshopOfficeAdPage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>