<template>
  <Page>
    <ActionBar title="Evaluar servicio recibido">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Por favor, al evaluar el trabajo realizado por la sucursal automotriz asegurate de ser honesto, de esta forma nos estarás ayudando a mejorar TuTaller."
          textWrap="true"
          class="paragraph"
        />
        <MDTextView
          id="txtQualification"
          v-model="qualificationInputLabel"
          keyboardInput="number"
          hint="Calificación"
          :error="qualificationInputErr"
          @textChange="onQualificationTxtChange"
          @focus="selectQualification"
        />
        <MDTextView
          v-model="reviewInput"
          hint="Reseña"
          maxLength="580"
          :error="reviewInputErr"
          @textChange="onReviewTxtChange"
        />
        <MDButton
          text="Enviar"
          @tap="addWorkshopOfficeEvaluation"
          :isEnabled="isAddEvaluationBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>