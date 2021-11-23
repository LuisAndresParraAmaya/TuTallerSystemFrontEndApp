<template>
  <Page @loaded="defineInformationByOfferType">
    <ActionBar title="Oferta">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Nombre" textWrap="true" class="paragraph font-bold" />
        <Label :text="offer.offer_name" textWrap="true" class="paragraph" />
        <Label text="Descuento" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="offer.offer_discount + '%'"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Valido hasta"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            formatDate(offer.offer_valid_until_date) +
            ' ' +
            offer.offer_valid_until_time
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          :text="activatedToMsg"
          textWrap="true"
          class="paragraph font-bold"
        />
        <template v-for="offerItem in offerItemList">
          <Label
            :key="offerItem"
            :text="translateSubscriptionName(offerItem)"
            textWrap="true"
            class="paragraph"
          />
        </template>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>