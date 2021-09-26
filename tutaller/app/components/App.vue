<template>
    <Page>
        <TabView androidTabsPosition='bottom' tabBackgroundColor='@color/ns_primaryDark' selectedTabTextColor='white' tabTextColor='#a9a9a9' androidSelectedTabHighlightColor='@color/ns_primaryDark'>
            <TabViewItem title='Talleres' iconSource='res://outline_car_repair_white_36'>
                <Navigator defaultRoute='/WorkshopList'/>
            </TabViewItem>
            <TabViewItem title='Servicios' iconSource='res://outline_construction_white_36'>
                <Navigator defaultRoute='/WorkshopService'/>
            </TabViewItem>
            <TabViewItem title='Cuenta' iconSource='res://outline_person_white_36'>
                <Navigator defaultRoute='/AccountOptions'/>
            </TabViewItem>
        </TabView>
    </Page>
</template>