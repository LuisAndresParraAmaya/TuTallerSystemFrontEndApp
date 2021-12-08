<template>
  <Page>
    <ActionBar title="Caso de disputa">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Nombre del taller automotriz"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopOfficeWorkDisputeCase.workshop_name"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Dirección de la sucursal automotriz involucrada"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkDisputeCase.workshop_office_address +
            ', ' +
            workshopOfficeWorkDisputeCase.workshop_office_commune +
            ', ' +
            workshopOfficeWorkDisputeCase.workshop_office_region
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Nombre del servicio"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopOfficeWorkDisputeCase.workshop_office_service_name"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Nombre del cliente"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkDisputeCase.customer_name +
            ' ' +
            workshopOfficeWorkDisputeCase.customer_last_name
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Nombre del administrador del taller automotriz"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkDisputeCase.workshop_admin_name +
            ' ' +
            workshopOfficeWorkDisputeCase.workshop_admin_last_name
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Mensaje del cliente respecto a la disputa"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopOfficeWorkDisputeCase.workshop_office_work_case_msg"
          textWrap="true"
          class="paragraph"
        />
        <Label text="Estado" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="
            translateServiceWorkDisputeCaseStatus(
              workshopOfficeWorkDisputeCase.case_current_status
            )
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Fecha de apertura del caso"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            formatDateTime(
              workshopOfficeWorkDisputeCase.workshop_office_work_case_date_time
            )
          "
          textWrap="true"
          class="paragraph"
        />
        <MDButton
          v-show="
            workshopOfficeWorkDisputeCase.case_current_status == 'pending' //Only show the resolve button if the case is pending
          "
          text="Resolver"
          @tap="goToResolveWorkshopOfficeWorkDisputeCasePage"
          :isEnabled="isRejectPostulationTappable"
          col="0"
          row="0"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>