<template>
  <Page>
    <ActionBar title="Sucursal">
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
          @tap="goToModifyWorkshopOfficePage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Información de la sucursal"
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
          @tap="goToWorkshopOfficeServiceListPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Servicios automotrices"
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
          @tap="goToWorkshopOfficeEmployeeListPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label text="Empleados" class="title-text" row="0" col="1" />
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
          @tap="goToMyWorkshopOfficeSubscriptionList"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label text="Subscripción" class="title-text" row="0" col="1" />
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
          @tap="goToMyWorkshopOfficeAdList"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Anuncios Publicitarios"
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
          @tap="goToOfferListPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Ofertas"
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