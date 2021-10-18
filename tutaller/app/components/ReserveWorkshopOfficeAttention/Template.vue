<template>
  <Page>
    <ActionBar title="Reservar atención">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
          <DatePickerField hintDate="Fecha"/>
          <TimePickerField hintTime="Hora"/>
        <MDButton text="Reservar" @tap="reserveAttention" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>