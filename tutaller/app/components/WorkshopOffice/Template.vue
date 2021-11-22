<template>
  <Page @loaded="loadPageData">
    <ActionBar :title="workshopOffice.workshop_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *" cols="*">
      <StackLayout row="0" col="0">
        <Label
          :text="
            formatQualification(
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
        <Label textWrap="true" class="paragraph">
          <FormattedString>
            <Span text.decode="&#xf041; " class="fas" />
            <Label
              :text="
                workshopOffice.workshop_office_address +
                ', ' +
                workshopOffice.workshop_office_commune +
                ', ' +
                workshopOffice.workshop_office_region
              "
            />
          </FormattedString>
        </Label>
        <Label
          text="Teléfono de esta sucursal"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label textWrap="true" class="paragraph">
          <FormattedString>
            <Span text.decode="&#xf095; " class="fas" />
            <Label :text="'+56 ' + workshopOffice.workshop_office_phone" />
          </FormattedString>
        </Label>
        <Label
          text="Teléfono de la cadena de talleres"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label textWrap="true" class="paragraph">
          <FormattedString>
            <Span text.decode="&#xf095; " class="fas" />
            <Label :text="'+56 ' + workshopOffice.workshop_number" />
          </FormattedString>
        </Label>
        <MDButton
          text="Escoger servicios"
          @tap="goToWorkshopOfficeServiceListPage"
        />
        <MDButton
          text="Ver empleados"
          @tap="goToWorkshopOfficeEmployeeListPage"
        />
        <MDButton
          text="Realizar un reclamo"
          @tap="goToFileWorkshopOfficeComplaintPage"
        />
        <Label
          text="Puntuaciones y opiniones"
          textWrap="true"
          class="paragraph font-bold"
        />
      </StackLayout>
      <ListView
        for="workshopOfficeEvaluation in workshopOfficeEvaluationList"
        row="1"
        col="0"
      >
        <v-template>
          <GridLayout rows="auto, auto, auto" columns="*">
            <GridLayout rows="auto" columns="auto, *, auto" row="0" col="0">
              <Label text.decode="&#xf2bd;" row="0" col="0" class="fas" />
              <Label
                :text="
                  workshopOfficeEvaluation.user_name +
                  ' ' +
                  workshopOfficeEvaluation.user_last_name
                "
                row="0"
                col="1"
                class="caption-text"
              />
              <!-- <Button text.decode="&#xf142;" @tap="aa" class="icon-btn fas" row="0" col="2" /> -->
              <DropDown
                id="ddWorkshopOfficeEvaluationOptions"
                v-show="
                  userRut == workshopOfficeEvaluation.user_user_rut ||
                  userType == 1
                "
                :items="
                  getWorkshopOfficeEvaluationsOptions(
                    workshopOfficeEvaluation.user_user_rut
                  )
                "
                @selectedIndexChanged="
                  onWorkshopOfficeEvaluationOptionChange(
                    $event,
                    workshopOfficeEvaluation.workshop_office_evaluation_id,
                    workshopOfficeEvaluation.user_user_rut,
                    workshopOfficeEvaluation.workshop_evaluation_rating,
                    workshopOfficeEvaluation.workshop_evaluation_review
                  )
                "
                row="0"
                col="2"
              />
            </GridLayout>
            <Label
              :text="
                formatQualification(
                  workshopOfficeEvaluation.workshop_evaluation_rating,
                  -1
                )
              "
              row="1"
              col="0"
              class="fas"
            />
            <Label
              :text="workshopOfficeEvaluation.workshop_evaluation_review"
              textWrap="true"
              row="2"
              col="0"
            />
          </GridLayout>
        </v-template>
      </ListView>
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>