<template>
  <Page>
    <ActionBar title="Evalúa el servicio">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Por favor, al evaluar el servicio asegurate de ser honesto, de esta forma nos estarás ayudando a mejorar TuTaller." textWrap="true" />
        <Label text="Califica el servicio" textWrap="true" />
        <MDTextField v-model='calificationInput' keyboardInput='number' hint="1 a 5 estrellas"/>
        <Label text="Escribe una reseña" textWrap="true" />
        <MDTextView v-model='reviewInput' hint="Escribe una reseña"/>
        <MDButton text="Cancelar" @tap="cancelWorkshopServiceEvaluation" />
        <MDButton text="Enviar" @tap="evaluateWorkshopService" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>