<template>
  <Page>
    <ActionBar title="Añadir anuncio">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField
          v-model="adNameInput"
          hint="Nombre de tu anuncio"
          :error="adNameInputErr"
          @textChange="onAdNameTxtChange"
          maxLength="45"
        />
        <Label text="Sube un anuncio" textWrap="true" class="regular-text" />
        <FlexboxLayout flexDirection="column" class="image-container">
          <StackLayout>
            <Image :src="adImagePath" stretch="aspectFit" height='120'/>
          </StackLayout>
          <Label :text="adImageName + adImageExt" class="text-center" />
        </FlexboxLayout>
        <Label
          :text="adImageInputErr"
          textWrap="true"
          class="error-color regular-text"
        />
        <MDButton
          text="Selecciona una imagen en tu equipo"
          @tap="selectAdImage"
          class="outline-btn"
        />
        <Label
          text="Se recomienda que las dimensiones de la imagen para el banner publicitario sean de 728 x 90 píxeles."
          textWrap="true"
          class="regular-text"
        />
        <MDButton
          text="Subir"
          @tap="addWorkshopOfficeAd"
          :isEnabled="isAddAdBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>