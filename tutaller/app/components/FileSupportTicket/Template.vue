<template>
  <Page>
    <ActionBar title="Contáctanos">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Información de contacto"
          textWrap="true"
          class="paragraph"
        />
        <MDTextView
          v-model="nameInput"
          hint="Nombre"
          :error="nameInputErr"
          @textChange="onNameTxtChange"
        />
        <MDTextView
          v-model="emailInput"
          keyboardType="email"
          hint="Dirección de correo electrónico"
          :error="emailInputErr"
          @textChange="onEmailTxtChange"
        />
        <Label text="Mensaje" textWrap="true" class="paragraph" />
        <MDTextView
          v-model="subjectInput"
          hint="Asunto"
          :error="subjectInputErr"
          @textChange="onSubjectTxtChange"
        />
        <MDTextView
          v-model="messageInput"
          hint="Mensaje"
          :error="messageInputErr"
          @textChange="onMessageTxtChange"
        />
        <MDButton
          text="Enviar"
          @tap="fileSupportTicket"
          :isEnabled="isFileSupportTicketBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>