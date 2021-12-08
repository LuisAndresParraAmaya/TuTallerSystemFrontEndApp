<template>
  <Page>
    <ActionBar title="Resolver caso">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="Debes responder a favor de una de las partes, la cual recibirá el dinero."
          textWrap="true"
          class="paragraph"
        />
        <MDTextView
          v-model="resolutionMessageInput"
          hint="Mensaje de resolución"
          :error="resolutionMessageInputErr"
          @textChange="onResolutionMessageTxtChange"
        />
        <GridLayout columns="*, *" rows="auto, auto">
          <MDButton
            text="A favor del taller"
            @tap="
              resolveWorkshopOfficeWorkDisputeCase('resolvedinfavorofoffice')
            "
            :isEnabled="isRespondBtnTappable"
            col="0"
            row="0"
            class="danger-color"
          />
          <MDButton
            text="A favor del cliente"
            @tap="
              resolveWorkshopOfficeWorkDisputeCase('resolvedinfavorofcustomer')
            "
            :isEnabled="isRespondBtnTappable"
            col="1"
            row="0"
          />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>