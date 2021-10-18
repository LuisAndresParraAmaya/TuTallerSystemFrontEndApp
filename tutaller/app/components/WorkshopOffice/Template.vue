<template>
  <Page>
    <ActionBar :title="workshopOffice.workshop_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          :text="
            formatEvaluation(
              workshopOffice.workshop_office_average_rating,
              workshopOffice.workshop_office_total_evaluations
            )
          "
          textWrap="true"
          class="fas paragraph"
        />
        <Label
          :text="workshopOffice.workshop_description"
          textWrap="true"
          class="paragraph"
        />
        <Label
          :text="
            workshopOffice.workshop_office_address +
            ', ' +
            workshopOffice.workshop_office_commune +
            ', ' +
            workshopOffice.workshop_office_region
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          :text="'+56 ' + workshopOffice.workshop_office_phone"
          textWrap="true"
          class="paragraph"
        />
        <MDButton
          text="Escoger servicios"
          @tap="goToWorkshopOfficeServiceList"
        />
        <MDButton text="Ver empleados" @tap="goToWorkshopOfficeEmployeeList" />
        <MDButton
          text="Realizar un reclamo"
          @tap="goToFileWorkshopOfficeComplaint"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>