<template>
  <Page @loaded="getWorkshopOfficeEmployeeList">
    <ActionBar title="Servicios automotrices">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *, auto" cols="*">
      <template row="0" col="0">
        <StackLayout>
          <GridLayout
            rows="auto"
            :columns="milestoneProgressCols"
            class="paragraph"
          >
            <template
              v-for="(
                workshopOfficeMilestone, index
              ) in workshopOfficeMilestoneList"
            >
              <Progress
                :key="workshopOfficeMilestone"
                value="100"
                :class="{
                  'milestone-progress inactive-color':
                    workshopOfficeMilestone.workshop_office_work_milestone_status ==
                    'pending',
                  'milestone-progress ok-color':
                    workshopOfficeMilestone.workshop_office_work_milestone_status ==
                      'working' || 'completed',
                }"
                row="0"
                :col="index"
              />
            </template>
          </GridLayout>
          <Label
            :text="
              workshopOfficeCurrentMilestone.workshop_office_work_milestone_description
            "
            textWrap="true"
            class="paragraph"
          />
          <MDButton
            text="Ver ficha técnica"
            @tap="goToWorkshopOfficeWorkTechnicalReport"
            class="outline-btn"
            :hidden="isShowTechnicalReportBtnHidden"
          />
          <Label text="Avances" textWrap="true" class="paragraph font-bold" />
        </StackLayout>
      </template>
      <ListView
        for="workAdvance in workAdvanceList"
        @itemTap="showWorkshopOfficeAdvance"
        row="1"
        col="0"
      >
        <v-template>
          <GridLayout rows="60%" columns="60%, *">
            <Image
              src="http://10.0.2.2:8080/img"
              stretch="aspectFit"
              row="0"
              col="0"
            />
            <Label
              :text="workAdvance.workshop_office_service_advance_description"
              row="0"
              col="1"
              class="caption-text"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <MDButton
        :text="doServiceActionBtnText"
        @tap="doServiceAction"
        row="2"
        col="0"
        :hidden="isDoServiceActionBtnHidden"
      />
    </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>