<template>
  <Page>
    <ActionBar title="Postular taller">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          v-model="workshopNameInput"
          hint="Nombre del taller"
          :error="workshopNameInputErr"
          @textChange="onWorkshopNameTxtChange"
          maxLength="45"
        />
        <StackLayout orientation="horizontal">
          <MDTextView
            v-model="workshopPhoneInput"
            keyboardType="phone"
            hint="Número de teléfono del taller"
            :error="workshopPhoneInputErr"
            @textChange="onWorkshopPhoneTxtChange"
            maxLength="9"
            width="50%"
          />
          <MDTextView
            id="txtPhoneCountryCode"
            v-model="workshopPhoneCountryCodeInput"
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
          hint="Descripción del taller"
          :error="workshopDescriptionInputErr"
          @textChange="onWorkshopDescriptionTxtChange"
          maxLength="580"
        />
        <MDTextView
          v-model="workshopBusinessNameInput"
          hint="Razón social del taller"
          :error="workshopBusinessNameInputErr"
          @textChange="onWorkshopBusinessNameTxtChange"
          maxLength="100"
        />
        <MDTextView
          v-model="workshopPostulationMessage"
          hint="Mensaje"
          :error="workshopPostulationMessageErr"
          @textChange="onWorkshopPostulationMessageTxtChange"
          maxLength="99"
        />
        <Label
          text="Sube la foto de la parte delantera de tu cédula de identidad/pasaporte"
          textWrap="true"
          class="regular-text"
        />
        <FlexboxLayout flexDirection="column" class="image-container">
          <StackLayout>
            <Image :src="imagePath" stretch="aspectFit" height="120" />
          </StackLayout>
          <Label :text="imageName + imageExt" class="text-center" />
        </FlexboxLayout>
        <Label
          :text="imageInputErr"
          textWrap="true"
          class="error-color regular-text"
        />
        <MDButton
          text="Selecciona una imagen en tu equipo"
          @tap="selectImage"
          class="outline-btn"
        />
        <MDButton
          text="Enviar postulación"
          @tap="sendPostulation"
          :isEnabled="isSendBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>