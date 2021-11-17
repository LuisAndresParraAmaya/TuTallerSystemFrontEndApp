<template>
  <Page>
    <ActionBar title="Añadir oferta">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          v-model="nameInput"
          hint="Nombre de la oferta"
          :error="nameInputErr"
          @textChange="onNameTxtChange"
        />
        <MDTextView
          v-model="discountInput"
          keyboardType="number"
          hint="Descuento"
          maxLength="3"
          :error="discountInputErr"
          @textChange="onDiscountTxtChange"
        />
        <Label
          text="Fecha y hora en que la oferta ya no será valida"
          textWrap="true"
          class="regular-text"
        />
        <DatePickerField
          hint="Fecha de expiración"
          :minDate="new Date()"
          @dateChange="onValidUntilDateChange"
        />
        <TimePickerField hint="Hora de expiración" @timeChange="onValidUntilTimeChange" />
        <Label
          :text="validUntilErr"
          textWrap="true"
          class="regular-text error-color"
        />
        <MDButton
          text="Continuar"
          @tap="addOffer"
          :isEnabled="isAddOfferBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>