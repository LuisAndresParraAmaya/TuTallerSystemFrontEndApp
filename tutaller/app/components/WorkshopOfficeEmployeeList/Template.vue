<template>
  <Page @loaded="getWorkshopOfficeEmployeeList">
    <ActionBar title="Empleados">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView
        for="myWorkshopOfficeEmployee in myWorkshopOfficeEmployeeList"
        @itemTap="showMyWorkshopOfficeEmployee"
        row="1"
      >
        <v-template>
          <GridLayout rows="*, *, *" columns="60%, *, auto">
            <Image
              src="res://outline_car_repair_black_36"
              stretch="aspectFit"
              row="0"
              col="0"
              rowSpan="3"
            />
            <Label
              :text="
                myWorkshopOfficeEmployee.user_name +
                ' ' +
                myWorkshopOfficeEmployee.user_last_name
              "
              row="0"
              col="1"
              class="title-text"
            />
            <Label
              :text="
                myWorkshopOfficeEmployee.workshop_office_employee_specialization
              "
              row="1"
              col="1"
              class="caption-text"
            />
            <Label
              :text="
                myWorkshopOfficeEmployee.workshop_office_employee_experience
              "
              row="2"
              col="1"
              class="caption-text"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <MDFloatingActionButton
        v-show="
          actualFrame == 'accountNav' && userType == 3 //3 = workshop administrator
        "
        src="res://outline_add_white_36"
        @tap="goToAddWorkshopOfficeEmployeePage"
        row="1"
        class="fab-btn"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>