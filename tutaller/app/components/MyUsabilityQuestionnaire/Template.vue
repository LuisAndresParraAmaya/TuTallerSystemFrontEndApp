<template>
  <Page @loaded="getUsabilityQuestionnaireAnswerList">
    <ActionBar title="Cuestionario">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Nombre de cuestionario"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="usabilityQuestionnaire.usability_questionnaire_name"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Descripción del cuestionario"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="usabilityQuestionnaire.usability_questionnaire_description"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Estado del cuestionario"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            translateActiveInactiveStatus(
              usabilityQuestionnaire.usability_questionnaire_status
            )
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Cantidad de usuarios que la han respondido"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="usabilityQuestionnaireUserAnswerCount"
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Preguntas y respuestas"
          textWrap="true"
          class="paragraph font-bold"
        />
        <template
          v-for="(
            usabilityQuestionnaireQuestion, index
          ) in usabilityQuestionnaireAnswerList"
        >
          <Label :key="usabilityQuestionnaireQuestion" class="paragraph">
            <FormattedString>
              <Span
                :text="'Pregunta ' + parseInt(index + 1) + ': '"
                class="font-bold"
              />
              <Span
                :text="
                  usabilityQuestionnaireQuestion.questionnaire_question_name
                "
              />
            </FormattedString>
          </Label>
          <Label :key="usabilityQuestionnaireQuestion" class="paragraph">
            <FormattedString>
              <Span
                :text="
                  'Clasificación de la pregunta ' + parseInt(index + 1) + ': '
                "
                class="font-bold"
              />
              <Span
                :text="
                  translateQuestionType(
                    usabilityQuestionnaireQuestion.questionnaire_question_type
                  )
                "
              />
            </FormattedString>
          </Label>
          <Label
            :key="usabilityQuestionnaireQuestion"
            :text="'Respuestas de la pregunta ' + parseInt(index + 1)"
            textWrap="true"
            class="paragraph font-bold"
          />
          <template
            v-for="usabilityQuestionnaireAnswer in usabilityQuestionnaireQuestion.questionnaire_response_list"
          >
            <Label
              v-if="usabilityQuestionnaireAnswer.questionnaire_response == null"
              :key="usabilityQuestionnaireAnswer"
              text="No hay ninguna respuesta para esta pregunta hasta ahora."
              textWrap="true"
              class="paragraph"
            />
            <Label
              v-else
              :key="usabilityQuestionnaireAnswer"
              :text="usabilityQuestionnaireAnswer.questionnaire_response"
              textWrap="true"
              class="paragraph"
            />
          </template>
        </template>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>