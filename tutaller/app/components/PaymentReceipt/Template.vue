<template>
  <Page>
    <ActionBar title="Acuso de recibo">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <StackLayout>
      <Label
        text="Nombre del ítem"
        textWrap="true"
        class="paragraph font-bold"
      />
      <Label
        :text="workshopOfficeService.workshop_office_service_name"
        textWrap="true"
        class="paragraph"
      />
      <Label text="Monto pagado" textWrap="true" class="paragraph font-bold" />
      <Label
        :text="'$ ' + workshopOfficeService.offer_price + ' CLP'"
        textWrap="true"
        class="paragraph"
      />
      <Label
        text="Método de pago"
        textWrap="true"
        class="paragraph font-bold"
      />
      <Label text="m.pago" textWrap="true" class="paragraph" />
      <Label
        text="Fecha y hora de pago"
        textWrap="true"
        class="paragraph font-bold"
      />
      <Label :text="new Date()" textWrap="true" class="paragraph" />
      <Label
        text="Para su seguridad, el pago será retenido hasta obtener una confirmación de que el servicio automotriz sea realizado en su totalidad por parte del técnico y por parte suya."
        textWrap="true"
        class="paragraph info-bg"
      />
      <MDButton
        text="Descargar recibo"
        @tap="downloadPaymentReceipt"
        class="outline-btn"
      />
      <MDButton
        text="Continuar"
        @tap="continueProcess"
        :isEnabled="isContinueBtnTappable"
      />
    </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>