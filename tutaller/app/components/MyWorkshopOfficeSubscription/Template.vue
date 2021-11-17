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
        <template v-if="myWorkshopOffice.workshop_suscription_id !== 1">
          <Label
            text="Fecha de expiración"
            textWrap="true"
            class="paragraph font-bold"
          />
          <Label text="Expira el " textWrap="true" class="paragraph" />
        </template>
        <template v-else>
          <MDButton text="Subscribirse" @tap="goToSubscriptionListPage" />
        </template>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>