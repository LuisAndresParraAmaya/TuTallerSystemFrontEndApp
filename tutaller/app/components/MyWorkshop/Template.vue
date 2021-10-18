<template>
  <Page>
    <ActionBar :title="myWorkshop.workshop_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout
          rows="60%"
          columns="73%, *, 30%"
          @tap="goToModifyMyWorkshopPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Información del taller"
            class="title-text"
            row="0"
            col="1"
          />
          <Image
            src.decode="font://&#xf105;"
            stretch="none"
            row="0"
            col="2"
            class="fas caption-text"
          />
        </GridLayout>
        <GridLayout
          rows="60%"
          columns="73%, *, 30%"
          @tap="goToMyWorkshopOfficeListPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Ver sucursales"
            class="title-text"
            row="0"
            col="1"
          />
          <Image
            src.decode="font://&#xf105;"
            stretch="none"
            row="0"
            col="2"
            class="fas caption-text"
          />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>