<template>
  <Page>
        <ActionBar title='TuTaller'/>
        <StackLayout>
            <SearchBar id="sbarWorkshop" hint="Buscar Taller" text="" clear="onClear" submit="onSubmit" />
            <ListView for="item in items" height='150' @itemTap="onItemTap">
              <v-template>
                <StackLayout>
                  <Label :text="item.text" />
                </StackLayout>
              </v-template>
            </ListView>
            <MDFloatingActionButton src='res://baseline_filter_list_white_36' class='fab'/>
        </StackLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>