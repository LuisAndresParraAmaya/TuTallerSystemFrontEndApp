<template>
  <Page>
    <ActionBar title="Información del taller">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          v-model="workshopNameInput"
          hint="Nombre"
          :error="workshopNameInputErr"
          @textChange="onWorkshopNameTxtChange"
        />
        <StackLayout orientation="horizontal">
          <MDTextView
            v-model="workshopPhoneInput"
            hint="Número de teléfono"
            keyboardInput="phone"
            :error="workshopPhoneInputErr"
            @textChange="onWorkshopPhoneTxtChange"
            maxLength="9"
            width="50%"
          />
          <MDTextView
            id="txtPhoneCountryCode"
            v-model="phoneCountryCodeInput"
            keyboardType="phone"
            hint="Código de país"
            :error="workshopPhoneCountryCodeInputErr"
            @textChange="onWorkshopPhoneTxtChange"
            @focus="selectPhoneCountryCode"
            width="35%"
          />
        </StackLayout>
        <MDTextView
          v-model="workshopDescriptionInput"
          hint="Descripción"
          :error="workshopDescriptionInputErr"
          @textChange="onWorkshopDescriptionTxtChange"
        />
        <MDButton
          text="Actualizar datos"
          @tap="modifyMyWorkshop"
          :isEnabled="isModifyBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>