<template>
  <Page @loaded="getSubscriptionList">
    <ActionBar title="Suscripciones">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ListView
      for="subscription in subscriptionList"
      @itemTap="showSubscription"
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
            :text="translateSubscriptionName(subscription.name)"
            row="0"
            col="1"
            class="title-text"
          />
          <Label
            :text="translatePeriodicity(subscription.periodicity)"
            row="1"
            col="1"
            class="caption-text"
          />
          <!-- If the subscription plan has an active offer -->
          <template v-if="subscription.offer_discount !== 0">
            <Label text="En oferta" row="2" col="1" class="caption-text" />
            <Label
              :text="'$' + subscription.offer_price + ' CLP'"
              row="1"
              col="2"
              class="meta-text"
            />
          </template>
          <Label
            :text="'$' + subscription.price + ' CLP'"
            row="0"
            col="2"
            class="meta-text"
            :class="{ 'text-line-through': subscription.offer_discount !== 0 }"
          />
        </GridLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script src='./Component.js'></script>