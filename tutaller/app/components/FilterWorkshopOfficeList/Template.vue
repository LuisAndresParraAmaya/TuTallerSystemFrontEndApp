<template>
  <Page @loaded="onPageLoaded">
    <ActionBar title="Filtrar talleres">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          id="txtRegion"
          v-model="regionInput"
          @focus="selectRegion"
          hint="Región"
        />
        <MDTextView
          id="txtCommune"
          v-model="communeInput"
          @focus="selectCommune"
          hint="Comuna"
        />
        <MDTextView
          id="txtQualification"
          v-model="qualificationInput"
          @focus="selectQualification"
          hint="Calificación"
        />
        <MDButton
          text="Filtrar"
          @tap="filterWorkshopList"
          :isEnabled="isFilterBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>