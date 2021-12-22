<template>
  <Page>
    <ActionBar :title="myWorkshopAd.workshop_office_ad_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Imagen del anuncio"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Image
          ref="adImage"
          :src="'http://10.0.2.2:8080/' + myWorkshopAd.image_name"
          stretch="aspectFit"
          class="paragraph"
        />
        <Label
          text="Monto de puja activo"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="'$' + myWorkshopAd.workshop_office_ad_bid + ' CLP'"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Monto pujado en total"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="'$' + myWorkshopAd.workshop_office_ad_money_spent + ' CLP'"
          textWrap="true"
          class="paragraph"
        />
        <Label text="Estado" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="
            translateActiveInactiveStatus(
              myWorkshopAd.workshop_office_ad_status
            )
          "
          textWrap="true"
          class="paragraph"
        />
        <MDButton
          v-show="myWorkshopAd.workshop_office_ad_status == 'inactive'"
          text="Activar"
          @tap="activateWorkshopOfficeAd"
          :isEnabled="isActivateAdTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>