<template>
  <Page>
    <ActionBar :title="workshopPostulation.workshop_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Razón social del taller"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopPostulation.workshop_business_name"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Descripción del taller"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopPostulation.workshop_description"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Número de teléfono del taller"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="'+56 ' + workshopPostulation.workshop_number"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Dirección de la sucursal principal"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopPostulation.workshop_office_address +
            ', ' +
            workshopPostulation.workshop_office_commune +
            ', ' +
            workshopPostulation.workshop_office_region
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Número de teléfono de la sucursal principal"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="'+56 ' + workshopPostulation.workshop_office_phone"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Mensaje de postulación"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopPostulation.postulation_message"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Estado de la postulación"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label textWrap="true" class="paragraph">{{
          translatePostulationStatus(
            workshopPostulation.postulation_current_status
          )
        }}</Label>
        <Label
          text="Fecha de postulación"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label textWrap="true" class="paragraph">{{
          formatDateTime(workshopPostulation.postulation_date_time)
        }}</Label>
        <Label
          text="Rut del postulante"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            formatRut(
              calculateRutCheckDigit(
                formatRut(workshopPostulation.postulant_rut.toString())
              )
            )
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Nombre y apellido del postulante"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopPostulation.postulant_name +
            ' ' +
            workshopPostulation.postulant_last_name
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Foto de la cédula de identidad del postulante"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Image
          :src="
            'http://10.0.2.2:8080/' +
            workshopPostulation.postulation_user_identity_document_image
          "
          stretch="aspectFit"
          class="paragraph"
        />
        <GridLayout
          v-show="
            workshopPostulation.postulation_current_status == 'pending' //Only show the accept/reject buttons if the postulation is pending
          "
          columns="*, *"
          rows="auto, auto"
        >
          <MDButton
            text="Rechazar"
            @tap="goToRejectWorkshopPostulationPage"
            :isEnabled="isRejectPostulationTappable"
            col="0"
            row="0"
            class="danger-color"
          />
          <MDButton
            text="Aceptar"
            @tap="acceptWorkshopPostulation"
            :isEnabled="isAcceptPostulationTappable"
            col="1"
            row="0"
          />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>