<template>
  <Page @loaded="getItemList">
    <ActionBar title="Añadir oferta a">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="*, auto" columns="*">
      <Label
        v-if="itemList.length <= 1"
        :text="itemListNotFoundMsg"
        textWrap="true"
        row="0"
        col="0"
        class="paragraph text-center h-middle"
      />
      <ListView
        v-else
        for="item in itemList"
        @itemTap="showSubscription"
        row="0"
        col="0"
      >
        <v-template if="$index == 0">
          <GridLayout rows="*" columns="60%, *">
            <check-box
              :checked="item.isChecked"
              @checkedChange="onItemListCheckBoxChange($event, $index, item.id)"
              row="0"
              col="0"
            />
            <Label :text="item.name" row="0" col="1" class="title-text" />
          </GridLayout>
        </v-template>
        <v-template>
          <GridLayout rows="*" columns="25%, 60%, *">
            <check-box
              :checked="item.isChecked"
              @checkedChange="onItemListCheckBoxChange($event, $index, item.id)"
              row="0"
              col="1"
            />
            <Label :text="item.name" row="0" col="2" class="title-text" />
          </GridLayout>
        </v-template>
      </ListView>
      <MDButton
        text="Activar oferta"
        @tap="activateOffer"
        :isEnabled="isActivateOfferBtnTappable"
        row="1"
        col="0"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>