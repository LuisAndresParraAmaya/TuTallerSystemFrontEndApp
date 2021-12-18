<template>
  <Page @loaded="getUsabilityQuestionnaireQuestionList">
    <ActionBar title="Realizar cuestionario">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Este cuestionario solo enviará tus respuestas, sin incluir información que te identifique."
          textWrap="true"
          class="paragraph"
        />
        <template
          v-for="(
            usabilityQuestionnaireQuestion, index
          ) in usabilityQuestionnaireQuestionList"
        >
          <Label
            :key="usabilityQuestionnaireQuestion"
            :text="usabilityQuestionnaireQuestion.questionnaire_question_name"
            class="paragraph font-bold"
            textWrap="true"
          />
          <MDTextView
            v-show="
              usabilityQuestionnaireQuestion.questionnaire_question_type ==
              'multiplechoice'
            "
            id="txtQuestionnaireQuestionChoice"
            :key="usabilityQuestionnaireQuestion"
            v-model="usabilityQuestionnaireQuestion.questionnaire_response"
            hint="Respuesta"
            maxLength="255"
            @focus="selectQuestionnaireQuestionChoice($event, index)"
            :error="usabilityQuestionnaireQuestion.questionnaire_question_err"
            @textChange="
              usabilityQuestionnaireQuestion.questionnaire_question_err = ''
            "
          />
          <MDTextView
            v-show="
              usabilityQuestionnaireQuestion.questionnaire_question_type ==
              'essayquestion'
            "
            :key="usabilityQuestionnaireQuestion"
            v-model="usabilityQuestionnaireQuestion.questionnaire_response"
            hint="Respuesta"
            maxLength="255"
            :error="usabilityQuestionnaireQuestion.questionnaire_question_err"
            @textChange="
              usabilityQuestionnaireQuestion.questionnaire_question_err = ''
            "
          />
        </template>
        <MDButton
          text="Enviar respuestas"
          @tap="answerUsabilityQuestionnaire"
          :isEnabled="isAnswerQuestionnaireBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>