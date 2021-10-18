<template>
  <Page>
    <ActionBar title="Modificar perfil">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout
          rows="60%, *, auto"
          columns="73%, *, 30%"
          @tap="goToModifyAccountPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Información de tu cuenta"
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
          rows="60%, *, auto"
          columns="73%, *, 30%"
          @tap="goToModifyPasswordPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Cambia tu contraseña"
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
          rows="60%, *, auto"
          columns="73%, *, 30%"
          @tap="goToDeleteAccountPage"
        >
          <Image
            src.decode="font://&#xf007;"
            stretch="none"
            row="0"
            col="0"
            class="fas item-icon"
          />
          <Label
            text="Elimina tu cuenta"
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