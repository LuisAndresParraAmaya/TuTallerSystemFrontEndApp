<template>
  <Page>
    <ActionBar :title="workshopOfficeService.workshop_office_service_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Precio" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="
            '$' + workshopOfficeService.workshop_office_service_price + ' CLP'
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Tiempo estimado"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopOfficeService.workshop_office_service_estimated_time"
          textWrap="true"
          class="paragraph"
        />
        <Label text="Descripción" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="workshopOfficeService.workshop_office_service_description"
          textWrap="true"
          class="paragraph"
        />
        <MDButton
          v-show="actualFrame == 'navigator'"
          text="Solicitar"
          @tap="requestWorkshopService"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>