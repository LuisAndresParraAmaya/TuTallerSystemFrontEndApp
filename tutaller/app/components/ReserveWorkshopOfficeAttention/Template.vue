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
        <Label
          text="Horario de atención"
          textWrap="true"
          class="paragraph font-bold"
        />
        <DatePickerField hint="Fecha de reserva" :minDate="new Date()" @dateChange="onReservedDateChange" />
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