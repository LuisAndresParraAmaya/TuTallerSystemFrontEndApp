<template>
  <Page @loaded="getWorkshopOfficeWorkTechnicalReport">
    <ActionBar title="Ficha técnica del vehículo">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Marca" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_brand
          "
          textWrap="true"
          class="paragraph"
        />
        <Label text="Modelo" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_model
          "
          textWrap="true"
          class="paragraph"
        />
        <Label text="Kilometraje" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_km +
            ' km'
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Placa patente única (PPU)"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_ppu
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Tipo de combustible"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_fuel_type
          "
          textWrap="true"
          class="paragraph"
        />
        <Label text="Color" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_color
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Número de motor"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_engine
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Número de chasis"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_chassis
          "
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="Descripción del vehículo"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="
            workshopOfficeWorkTechnicalReport.office_work_technical_report_description
          "
          textWrap="true"
          class="paragraph"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>