<template>
  <Page>
    <ActionBar title="Añadir servicio">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          v-model="serviceNameInput"
          hint="Nombre del servicio"
          maxLength="45"
          :error="serviceNameInputErr"
          @textChange="onServiceNameTxtChange"
        />
        <MDTextView
          v-model="servicePriceInput"
          hint="Precio del servicio"
          keyboardType="number"
          :error="servicePriceInputErr"
          @textChange="onServicePriceTxtChange"
        />
        <MDTextView
          v-model="serviceEstimatedTimeInput"
          hint="Tiempo estimado del servicio"
          maxLength="45"
          :error="serviceEstimatedTimeInputErr"
          @textChange="onServiceEstimatedTimeTxtChange"
        />
        <MDTextView
          v-model="serviceDescriptionInput"
          hint="Descripción del servicio"
          maxLength="99"
          :error="serviceDescriptionInputErr"
          @textChange="onServiceDescriptionTxtChange"
        />
        <MDButton text="Añadir" @tap="addWorkshopOfficeService" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>