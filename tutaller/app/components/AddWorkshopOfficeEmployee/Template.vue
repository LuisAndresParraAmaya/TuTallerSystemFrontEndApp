<template>
  <Page>
    <ActionBar title="Añadir empleado">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          v-model="rutInput"
          hint="Rut del empleado"
          helper="Solo debe contener el guíon. Ej: 12345678-K"
          maxLength="10"
          :error="rutInputErr"
          @textChange="onRutTxtChange"
        />
        <MDTextView
          id="txtSpecialization"
          v-model="specializationInput"
          hint="Especialización del empleado"
          :error="specializationInputErr"
          @textChange="onSpecializationTxtChange"
          maxLength="45"
        />
        <MDTextView
          v-model="experienceInput"
          hint="Experiencia del empleado"
          :error="experienceInputErr"
          @textChange="onExperienceTxtChange"
          maxLength="45"
        />
        <MDButton text="Añadir empleado" @tap="addWorkshopOfficeEmployees" :isEnabled='isAddEmployeeBtnTappable' />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>