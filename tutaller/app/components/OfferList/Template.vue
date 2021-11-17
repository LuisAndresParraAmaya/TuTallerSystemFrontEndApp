<template>
  <Page @loaded="getOfferList">
    <ActionBar :title="'Ofertas de '+titleType">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView
        for="offer in offerList"
        @itemTap="showOffer"
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
              :text="offer.offer_name"
              row="0"
              col="1"
              class="title-text"
            />
            <Label :text="offer.offer_discount+'% de descuento'" row="1" col="1" class="caption-text fas" />
            <Label
              :text="'Valido hasta '+formatDate(offer.offer_valid_until_date)+' '+offer.offer_valid_until_time"
              row="2"
              col="1"
              class="caption-text"
              textWrap="true"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        src="res://baseline_filter_list_white_36"
        @tap="goToAddOfferPage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>