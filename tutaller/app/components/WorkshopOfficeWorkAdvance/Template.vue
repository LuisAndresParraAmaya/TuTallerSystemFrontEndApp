<template>
  <Page>
    <ActionBar title="Avance">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Image src="http://10.0.2.2:8080/img" stretch="aspectFit" />
        <Label
          :text="workshopOfficeWorkAdvance.workshop_office_service_advance_description"
          textWrap="true"
          class="paragraph"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>