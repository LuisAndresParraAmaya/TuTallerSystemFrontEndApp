<template>
  <Page @loaded="getWorkshopPostulationList">
    <ActionBar title="Gestionar cuestionarios">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView
        for="usabilityQuestionnaire in usabilityQuestionnaireList"
        @itemTap="showUsabilityQuestionnaire"
        row="1"
      >
        <v-template>
          <GridLayout rows="*" columns="60%, *, auto">
            <Image
              src="res://outline_car_repair_black_36"
              stretch="aspectFit"
              row="0"
              col="0"
            />
            <Label
              :text="usabilityQuestionnaire.usability_questionnaire_name"
              row="0"
              col="1"
              class="title-text"
            />
            <Label
              :text="
                translateActiveInactiveStatus(
                  usabilityQuestionnaire.usability_questionnaire_status
                )
              "
              row="0"
              col="2"
              class="caption-text"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        src="res://outline_add_white_36"
        @tap="goToAddUsabilityQuestionnairePage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>