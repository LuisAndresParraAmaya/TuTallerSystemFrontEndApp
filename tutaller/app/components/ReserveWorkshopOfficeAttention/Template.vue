<template>
  <Page>
    <ActionBar title="Reservar atención">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Horas disponibles" textWrap="true" class="paragraph font-bold" />
        <template
          v-for="workshopOfficeAttention in workshopOfficeAttentionList"
        >
          <Label
            :key="workshopOfficeAttention"
            :text="
              translateWeekDay(
                workshopOfficeAttention.workshop_office_attention_day
              ) +
              ' ' +
              formatTimeHM(
                workshopOfficeAttention.workshop_office_attention_aperture_time
              ) +
              ' - ' +
              formatTimeHM(
                workshopOfficeAttention.workshop_office_attention_departure_time
              )
            "
            textWrap="true"
            class="paragraph"
          >
          </Label>
        </template>
        <Label
          text="Fecha y hora de reserva"
          textWrap="true"
          class="paragraph font-bold"
        />
        <DatePickerField
          hint="Fecha de reserva"
          :minDate="new Date()"
          @dateChange="onReservedDateChange"
        />
        <TimePickerField
          hint="Hora de reserva"
          @timeChange="onReservedTimeChange"
        />
        <Label
          :text="reservedDatetimeErr"
          textWrap="true"
          class="regular-text error-color"
        />
        <MDButton text="Reservar" @tap="reserveAttention" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>