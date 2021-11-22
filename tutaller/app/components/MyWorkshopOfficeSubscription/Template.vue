<template>
  <Page>
    <ActionBar title="Subscripción">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Estado de la suscripción"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="getWorkshopOfficePostulationStatus()"
          textWrap="true"
          class="paragraph"
        />
        <MDButton
          v-if="myWorkshopOffice.workshop_suscription_id == 1"
          text="Subscribirse"
          @tap="goToSubscriptionListPage"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>