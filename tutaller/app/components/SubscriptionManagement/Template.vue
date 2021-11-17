<template>
  <Page>
    <ActionBar title="Gestionar suscripciones" @loaded="onPageLoaded">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDButton
          v-if="
            userType == 1 //1 = admin
          "
          text="Ofertas"
          @tap="goToOfferListPage"
        />
        <template v-else>
        </template>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>