<template>
  <Page>
    <TabView
      androidTabsPosition="bottom"
      tabBackgroundColor="@color/ns_primaryDark"
      selectedTabTextColor="white"
      tabTextColor="#a9a9a9"
      androidSelectedTabHighlightColor="@color/ns_primaryDark"
    >
      <TabViewItem
        title="Talleres"
        iconSource="res://outline_car_repair_white_36"
      >
        <Navigator defaultRoute="/WorkshopOfficeList" />
      </TabViewItem>
      <TabViewItem
        title="Servicios"
        iconSource="res://outline_construction_white_36"
      >
        <Navigator id="serviceNav" defaultRoute="/WorkshopOfficeWorkList"/>
      </TabViewItem>
      <TabViewItem title="Cuenta" iconSource="res://outline_person_white_36">
        <Navigator id="accountNav" defaultRoute="/AccountOptions" />
      </TabViewItem>
    </TabView>
  </Page>
</template>