<template>
  <Page>
    <ActionBar title="Añadir avance">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField
          v-model="descriptionInput"
          hint="Descripción"
          :error="descriptionInputErr"
          @textChange="onDescriptionTxtChange"
          maxLength="255"
        />
        <Label
          text="Sube una imagen del avance"
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
          text="Subir"
          @tap="addWorkshopOfficeWorkAdvance"
          :isEnabled="isAddAdvanceBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>