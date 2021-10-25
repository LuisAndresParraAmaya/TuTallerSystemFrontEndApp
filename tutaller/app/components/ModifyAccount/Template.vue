<template>
  <Page @loaded="onPageLoaded">
    <ActionBar title="Información de tu cuenta">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextField
          v-model="rutInput"
          hint="Rut"
          maxLength="10"
          isEnabled="false"
        />
        <MDTextField
          v-model="nameInput"
          hint="Nombre"
          maxLength="45"
          :error="nameInputErr"
          @textChange="onNameTxtChange"
        />
        <MDTextField
          v-model="lastNameInput"
          hint="Apellido"
          maxLength="45"
          :error="lastNameInputErr"
          @textChange="onLastNameTxtChange"
        />
        <MDTextField
          v-model="emailInput"
          keyboardType="email"
          hint="Correo electrónico"
          maxLength="45"
          :error="emailInputErr"
          @textChange="onEmailTxtChange"
        />
        <StackLayout orientation="horizontal">
          <MDTextField
            v-model="phoneInput"
            hint="Teléfono"
            keyboardType="phone"
            :error="phoneInputErr"
            @textChange="onPhoneTxtChange"
            maxLength="9"
            width="50%"
          />
          <MDTextField
            id="txtPhoneCountryCode"
            v-model="phoneCountryCodeInput"
            keyboardType="phone"
            hint="Código de país"
            :error="phoneCountryCodeInputErr"
            @textChange="onPhoneTxtChange"
            @focus="selectPhoneCountryCode"
            width="35%"
          />
        </StackLayout>
        <MDButton
          text="Actualizar datos"
          @tap="modifyProfile"
          :isEnabled="isModifyBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>