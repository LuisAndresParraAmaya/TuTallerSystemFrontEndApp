<template>
  <Page>
    <ActionBar title="Filtrar postulaciones">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView v-model="workshopNameInput" hint="Nombre del taller" />
        <MDTextView
          id="txtPostulationStatus"
          v-model="postulationStatusInput"
          @focus="selectPostulationStatus"
          hint="Estado de postulación"
        />
        <Label
          text="Fecha de postulaciones"
          textWrap="true"
          class="regular-text font-bold"
        />
        <Label text="Desde" textWrap="true" class="regular-text" />
        <DatePickerField
          hintDate="Fecha"
          @dateChange="onFromPostulationDateChange"
        />
        <Label text="Hasta" textWrap="true" class="regular-text" />
        <DatePickerField
          hintDate="Fecha"
          @dateChange="onToPostulationDateChange"
        />
        <Label
          :text="toPostulationDateInputErr"
          textWrap="true"
          class="regular-text error-color"
        />
        <MDButton
          text="Filtrar"
          @tap="validateFormFilterWorkshopPostulationList"
          :isEnabled="isFilterBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>