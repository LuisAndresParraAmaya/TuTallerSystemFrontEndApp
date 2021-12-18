<template>
  <Page>
    <ActionBar title="Cuestionario">
      <NavigationButton
        @tap="closeModal"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <StackLayout>
      <Label
        :text="usabilityQuestionnaire.usability_questionnaire_name"
        textWrap="true"
        class="paragraph font-bold"
      />
      <Label
        :text="usabilityQuestionnaire.usability_questionnaire_description"
        textWrap="true"
        class="paragraph"
      />
      <MDButton
        text="Realizar"
        class="text-btn"
        @tap="goToUsabilityQuestionnairePage"
        :isEnabled="isRealizeBtnTappable"
      />
      <MDButton
        text="Hacer más tarde"
        class="text-btn"
        @tap="doUsabilityQuestionnaireLater"
        :isEnabled="isDoLaterBtnTappable"
      />
      <MDButton
        text="No volver a recordar"
        class="text-btn"
        @tap="stopRemindingUsabilityQuestionnaire"
        :isEnabled="isStopRemindBtnTappable"
      />
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>