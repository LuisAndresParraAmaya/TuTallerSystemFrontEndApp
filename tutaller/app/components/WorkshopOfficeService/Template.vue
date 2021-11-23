<template>
  <Page>
    <ActionBar :title="workshopOfficeService.workshop_office_service_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Precio" textWrap="true" class="paragraph font-bold" />
        <Label class="paragraph">
          <FormattedString>
            <Span
              :text="
                '$' +
                workshopOfficeService.workshop_office_service_price +
                ' CLP '
              "
              :class="{
                'text-line-through': workshopOfficeService.offer_discount !== 0,
              }"
            />
            <!-- If the service has an active offer -->
            <Span
              v-if="workshopOfficeService.offer_discount !== 0"
              :text="
                '$' + workshopOfficeService.offer_price + ' CLP (en oferta)'
              "
            />
          </FormattedString>
        </Label>
        <Label
          text="Tiempo estimado"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="workshopOfficeService.workshop_office_service_estimated_time"
          textWrap="true"
          class="paragraph"
        />
        <Label text="Descripción" textWrap="true" class="paragraph font-bold" />
        <Label
          :text="workshopOfficeService.workshop_office_service_description"
          textWrap="true"
          class="paragraph"
        />
        <MDButton
          v-show="actualFrame == 'navigator'"
          text="Solicitar"
          @tap="requestWorkshopService"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>