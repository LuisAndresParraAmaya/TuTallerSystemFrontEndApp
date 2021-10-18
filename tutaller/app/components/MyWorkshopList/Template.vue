<template>
  <Page @loaded="getMyWorkshopList">
    <ActionBar title="Mis talleres">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ListView for="myWorkshop in myWorkshopList" @itemTap="showMyWorkshop">
      <v-template>
        <GridLayout columns="60%, *" rows="*, *">
          <Image
            src="res://outline_car_repair_black_36"
            stretch="aspectFit"
            row="0"
            col="0"
            rowSpan="2"
          />
          <Label
            :text="myWorkshop.workshop_name"
            class="title-text"
            row="0"
            col="1"
          />
          <Label
            :text="'+56 ' + myWorkshop.workshop_number"
            class="caption-text"
            row="1"
            col="1"
          />
        </GridLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script src='./Component.js'></script>