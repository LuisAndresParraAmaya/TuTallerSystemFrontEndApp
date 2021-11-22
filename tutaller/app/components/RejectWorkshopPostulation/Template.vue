<template>
  <Page>
      <ActionBar title='Rechazar postulación'>
        <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
      </ActionBar>
      <ScrollView>
        <StackLayout>
            <Label text="Ingresa la razón por la cual el taller no es apto para TuTaller" textWrap="true" class="paragraph"/>
            <MDTextView v-model='rejectReasonInput' hint='Razón de rechazo' :error='rejectReasonInputErr' @textChange='onRejectReasonTxtChange'/>
            <MDButton text="Rechazar" @tap="rejectWorkshopPostulation" :isEnabled='isRejectPostulationTappable' class='danger-color'/>
        </StackLayout>
      </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>