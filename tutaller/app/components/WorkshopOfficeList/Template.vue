<template>
  <Page @loaded="onPageLoaded">
    <ActionBar title="Talleres automotrices" />
    <StackLayout>
      <Image
        id="imgWorkshopOfficeAd"
        @tap="showWorkshopOfficeFromAd"
        stretch="fill"
        class="ad-image"
      />
      <GridLayout rows="*">
        <Label
          v-if="workshopOfficeList == ''"
          text="Por el momento no se encuentran sucursales automotrices que dispongan de suscripciones activas. Vuelve más tarde."
          textWrap="true"
          class="paragraph text-center h-middle"
          row="0"
        />
        <ListView
          v-else
          for="workshopOffice in workshopOfficeList"
          @itemTap="showWorkshopOffice"
          row="0"
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
                :text="workshopOffice.workshop_name"
                row="0"
                col="1"
                class="title-text"
              />
              <Label row="1" col="1" class="caption-text fas">{{
                formatQualification(
                  workshopOffice.workshop_office_average_rating,
                  workshopOffice.workshop_office_total_evaluations
                )
              }}</Label>
              <Label
                :text="
                  workshopOffice.workshop_office_address +
                  ', ' +
                  workshopOffice.workshop_office_commune +
                  ', ' +
                  workshopOffice.workshop_office_region
                "
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
          @tap="goToFilterWorkshopOfficeListPage"
          row="0"
          class="fab-btn"
        />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>