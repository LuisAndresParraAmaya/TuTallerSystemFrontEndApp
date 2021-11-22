<template>
  <Page>
    <ActionBar title="Moderar evaluación">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Ingresa la razón por la cual quieres moderar y eliminar la siguiente evaluación del usuario"
          textWrap="true"
          class="paragraph"
        />
        <Label text="Calificación" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="formatQualification(evaluationRating, -1)"
          class="paragraph fas"
        />
        <Label text="Reseña" textWrap="true" class="paragraph font-bold" />
        <Label :text="evaluationReview" textWrap="true" class="paragraph" />
        <MDTextView
          v-model="moderateReasonInput"
          hint="Razón de moderación"
          :error="moderateReasonInputErr"
          @textChange="onModerateReasonTxtChange"
        />
        <MDButton
          text="Moderar"
          @tap="moderateWorkshopOfficeEvaluation"
          :isEnabled="isModerateEvaluationTappable"
          class="danger-color"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>