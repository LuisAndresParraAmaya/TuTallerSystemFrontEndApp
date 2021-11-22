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