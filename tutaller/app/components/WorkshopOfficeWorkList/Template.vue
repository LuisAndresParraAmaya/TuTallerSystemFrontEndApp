<template>
  <Page @loaded="getWorkshopOfficeWorkList">
    <ActionBar title="Servicios automotrices" />
    <GridLayout rows="*" cols="*">
      <Label
        v-if="workshopOfficeWorkList == ''"
        text="Cuando se te conceda la prestación de un servicio automotriz, podrás interactuar con el desde aquí y ver todos los avances respectivos."
        textWrap="true"
        class="paragraph text-center h-middle"
        row="0"
        col="0"
      />
      <ListView
        v-else
        for="workshopOfficeWork in workshopOfficeWorkList"
        @itemTap="showWorkshopOfficeWork"
        row="0"
        col="0"
      >
        <v-template>
          <GridLayout rows="*, *" columns="60%, *, auto">
            <Image
              src="res://outline_car_repair_black_36"
              stretch="aspectFit"
              row="0"
              col="0"
              rowSpan="2"
            />
            <Label
              :text="workshopOfficeWork.workshop_office_service_name"
              row="0"
              col="1"
              class="title-text"
            />
            <Label
              :text="workshopOfficeWork.workshop_name"
              row="1"
              col="1"
              class="caption-text"
            />
            <Label
              :text="
                translateWorkStatus(
                  workshopOfficeWork.workshop_office_work_status
                )
              "
              row="0"
              col="2"
              rowSpan="2"
              class="caption-text"
            />
          </GridLayout>
        </v-template>
      </ListView>
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>