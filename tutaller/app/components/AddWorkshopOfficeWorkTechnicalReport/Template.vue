<template>
  <Page>
    <ActionBar title="Realizar ficha técnica">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Lleva a cabo la ficha técnica del vehículo del cliente"
          textWrap="true"
          class="paragraph"
        />
        <MDTextView
          v-model="brandInput"
          hint="Marca"
          maxLength="45"
          :error="brandInputErr"
          @textChange="onBrandTxtChange"
        />
        <MDTextView
          v-model="modelInput"
          hint="Modelo"
          maxLength="45"
          :error="modelInputErr"
          @textChange="onModelTxtChange"
        />
        <MDTextView
          v-model="kmInput"
          hint="Kilometraje"
          keyboardType="number"
          maxLength="10"
          :error="kmInputErr"
          @textChange="onKmTxtChange"
        />
        <MDTextView
          v-model="ppuInput"
          hint="Placa patente única (PPU)"
          maxLength="10"
          :error="ppuInputErr"
          @textChange="onPpuTxtChange"
        />
        <MDTextView
          v-model="fuelTypeInput"
          hint="Tipo de combustible"
          maxLength="45"
          :error="fuelTypeInputErr"
          @textChange="onFuelTypeTxtChange"
        />
        <MDTextView
          v-model="colorInput"
          hint="Color"
          maxLength="45"
          :error="colorInputErr"
          @textChange="onColorTxtChange"
        />
        <MDTextView
          v-model="engineInput"
          hint="Número de motor"
          maxLength="45"
          :error="engineInputErr"
          @textChange="onEngineTxtChange"
        />
        <MDTextView
          v-model="chassisInput"
          hint="Número de chasis"
          maxLength="45"
          :error="chassisInputErr"
          @textChange="onChassisTxtChange"
        />
        <MDTextView
          v-model="descriptionInput"
          hint="Descripción del vehículo"
          maxLength="580"
          :error="descriptionInputErr"
          @textChange="onDescriptionTxtChange"
        />
        <MDButton
          text="Añadir ficha técnica"
          @tap="addWorkshopOfficeWorkTechnicalReport"
          :isEnabled="isAddTechnicalReportBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>