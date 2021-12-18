<template>
  <Page>
    <ActionBar title="Añadir cuestionario">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Cuestionario"
          textWrap="true"
          class="paragraph font-bold"
        />
        <MDTextView
          v-model="questionnaireNameInput"
          hint="Nombre del cuestionario"
          maxLength="45"
          :error="questionnaireNameInputErr"
          @textChange="onQuestionnaireNameTxtChange"
        />
        <MDTextView
          v-model="questionnaireDescriptionInput"
          hint="Descripción del cuestionario"
          maxLength="580"
          :error="questionnaireDescriptionInputErr"
          @textChange="onQuestionnaireDescriptionTxtChange"
        />
        <!--Question list -->
        <Label text="Preguntas" textWrap="true" class="paragraph font-bold" />
        <template
          v-for="(
            questionnaireQuestion, indexQuestion
          ) in questionnaireQuestionList"
        >
          <GridLayout
            :key="questionnaireQuestion"
            rows="auto"
            columns="*, auto"
          >
            <Label
              :text="'Pregunta ' + parseInt(indexQuestion + 1)"
              textWrap="true"
              class="paragraph"
              col="0"
            />
            <!--Remove question button. Only shown if it's not the first question in the list -->
            <Label
              v-show="indexQuestion !== 0"
              text.decode="&#xf1f8;"
              @tap="removeQuestionnaireQuestionInput(indexQuestion)"
              class="paragraph fas"
              col="1"
            />
          </GridLayout>
          <MDTextView
            :key="questionnaireQuestion"
            v-model="questionnaireQuestion.questionNameInput"
            hint="Nombre de la pregunta"
            maxLength="45"
            :error="questionnaireQuestion.questionNameInputErr"
            @textChange="questionnaireQuestion.questionNameInputErr = ''"
          />
          <MDTextView
            id="txtQuestionnaireQuestionType"
            :key="questionnaireQuestion"
            v-model="questionnaireQuestion.questionTypeLabel"
            hint="Tipo de pregunta"
            maxLength="45"
            :error="questionnaireQuestion.questionTypeInputErr"
            @textChange="questionnaireQuestion.questionTypeInputErr = ''"
            @focus="selectQuestionnaireQuestionType($event, indexQuestion)"
          />
          <!-- Alternative list (only shown if selected 'multiplechoice' in the questionTypeInput) -->
          <StackLayout
            :key="questionnaireQuestion"
            v-show="questionnaireQuestion.questionTypeInput == 'multiplechoice'"
          >
            <template
              v-for="(
                questionItem, indexQuestionItem
              ) in questionnaireQuestion.questionItemList"
            >
              <GridLayout :key="questionItem" rows="auto" columns="*, auto">
                <Label
                  :key="questionItem"
                  :text="
                    'Alternativa ' +
                    parseInt(indexQuestionItem + 1) +
                    ' de la pregunta ' +
                    parseInt(indexQuestion + 1)
                  "
                  textWrap="true"
                  class="paragraph"
                />
                <!--Remove alternative button. Only shown if it's not the first or second alternative in the list -->
                <Label
                  v-show="parseInt(indexQuestionItem) > 1"
                  text.decode="&#xf1f8;"
                  @tap="
                    removeQuestionnaireQuestionAlternative(
                      indexQuestion,
                      indexQuestionItem
                    )
                  "
                  class="paragraph fas"
                  col="1"
                />
              </GridLayout>
              <MDTextView
                :key="questionItem"
                v-model="questionItem.questionItemNameInput"
                hint="Nombre de la alternativa"
                maxLength="580"
                :error="questionItem.questionItemNameInputErr"
                @textChange="questionItem.questionItemNameInputErr = ''"
              />
            </template>
            <!-- Button to add another alternative to the correspondent question -->
            <StackLayout orientation="horizontal">
              <MDFloatingActionButton
                src="res://outline_add_white_36"
                @tap="addQuestionnaireQuestionAlternative(indexQuestion)"
                row="1"
                class="circle-btn"
              />
              <Label
                :text="
                  'Añadir otra alternativa a la pregunta ' +
                  parseInt(indexQuestion + 1)
                "
                textWrap="true"
                class="caption-text"
              />
            </StackLayout>
          </StackLayout>
        </template>
        <!-- Button to add another question to the questionnaire -->
        <StackLayout orientation="horizontal">
          <MDFloatingActionButton
            src="res://outline_add_white_36"
            @tap="addQuestionnaireQuestionInput"
            row="1"
            class="circle-btn"
          />
          <Label
            text="Añadir otra pregunta"
            textWrap="true"
            class="caption-text"
          />
        </StackLayout>
        <!-- Button to add and activate the questionnaire -->
        <MDButton
          text="Añadir y activar"
          @tap="addUsabilityQuestionnaire"
          :isEnabled="isAddQuestionnaireBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>