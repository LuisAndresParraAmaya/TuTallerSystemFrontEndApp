<template>
  <Page>
    <ActionBar title="Abrir caso de disputa">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Asegurate de entregar información verídica al momento de abrir un caso de disputa, ya que nos pondremos en contacto con el administrador del taller automotriz al momento de resolverlo."
          textWrap="true"
          class="paragraph"
        />
        <MDTextView
          v-model="messageInput"
          hint="Mensaje"
          maxLength="255"
          :error="messageInputErr"
          @textChange="onMessageTxtChange"
        />
        <MDButton
          text="Enviar"
          @tap="fileWorkshopOfficeWorkDisputeCase"
          :isEnabled="isFileCaseBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>