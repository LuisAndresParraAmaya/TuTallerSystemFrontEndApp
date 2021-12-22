<template>
  <Page>
    <ActionBar title="Crear cuenta">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          ref="txtRut"
          v-model="rutInput"
          hint="Rut"
          helper="Solo debe contener el guíon. Ej: 12345678-K"
          maxLength="10"
          :error="rutInputErr"
          @textChange="onRutTxtChange"
        />
        <MDTextView
          v-model="nameInput"
          hint="Nombre"
          maxLength="45"
          :error="nameInputErr"
          @textChange="onNameTxtChange"
        />
        <MDTextView
          v-model="lastNameInput"
          hint="Apellido"
          maxLength="45"
          :error="lastNameInputErr"
          @textChange="onLastNameTxtChange"
        />
        <MDTextView
          v-model="emailInput"
          keyboardType="email"
          hint="Correo electrónico"
          maxLength="45"
          :error="emailInputErr"
          @textChange="onEmailTxtChange"
        />
        <StackLayout orientation="horizontal">
          <MDTextView
            v-model="phoneInput"
            hint="Teléfono"
            keyboardType="phone"
            :error="phoneInputErr"
            @textChange="onPhoneTxtChange"
            maxLength="9"
            width="50%"
          />
          <MDTextView
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
        <MDTextField
          v-model="passwordInput"
          secure="true"
          hint="Contraseña"
          helper="Como mínimo debe contener 1 letra en minúscula, 1 letra en mayúscula, 1 número y debe ser de 8 caracteres."
          maxLength="65"
          :error="passwordInputErr"
          @textChange="onPasswordTxtChange"
        />
        <MDTextField
          v-model="confirmPasswordInput"
          secure="true"
          hint="Confirmar contraseña"
          maxLength="65"
          :error="confirmPasswordInputErr"
          @textChange="onConfirmPasswordTxtChange"
        />
        <MDButton
          text="Crear cuenta"
          @tap="createAccount"
          :isEnabled="isCreateAccountBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>