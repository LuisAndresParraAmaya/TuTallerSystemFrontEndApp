<template>
  <Page>
    <ActionBar title="Pagar servicio">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Para que la reserva del servicio automotriz seleccionado sea efectiva, debes realizar el pago de este."
          textWrap="true"
          class="paragraph"
        />
        <MDButton text="Pagar en WebPay" @tap="payWorkshopService" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>