<template>
  <Page>
    <ActionBar title="Finalizar servicio">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label
          text="La sucursal automotriz ha confirmado que ha finalizado el servicio que te han prestado. Sin embargo, requerimos de tu confirmación para finalizarlo definitivamente y así enviarles el dinero que has pagado."
          textWrap="true"
          class="paragraph"
        />
        <Label
          text="En el caso de que se haya presentado un problema que afectara negativamente a la calidad del servicio prestado por parte de la sucursal automotriz, entonces puedes abrir un caso de disputa con el fin de que los administradores de TuTaller evalúen la posibilidad de devolverte tu dinero."
          textWrap="true"
          class="paragraph"
        />
        <MDButton
          text="Abrir caso de disputa"
          @tap="goToFileWorkshopOfficeWorkDisputeCasePage"
          class="outline-btn"
        />
        <MDButton
          text="Confirmar finalización del servicio"
          @tap="completeWorkshopOfficeWork"
          :isEnabled="isCompleteBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>