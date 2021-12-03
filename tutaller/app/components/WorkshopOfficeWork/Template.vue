<template>
  <Page @loaded="getWorkshopOfficeEmployeeList">
    <ActionBar :title="workshopOfficeWork.workshop_office_service_name">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <GridLayout rows="auto, *, auto">
      <template row="0">
        <StackLayout>
          <Label textWrap="true" class="paragraph">
            <FormattedString>
              <Label text="Taller: " class="font-bold" />
              <Label :text="workshopOfficeWork.workshop_name" />
            </FormattedString>
          </Label>
          <Label textWrap="true" class="paragraph">
            <FormattedString>
              <Span text.decode="&#xf041; " class="fas" />
              <Label
                :text="
                  workshopOfficeWork.workshop_office_address +
                  ', ' +
                  workshopOfficeWork.workshop_office_commune +
                  ', ' +
                  workshopOfficeWork.workshop_office_region
                "
              />
            </FormattedString>
          </Label>
          <Label textWrap="true" class="paragraph">
            <FormattedString>
              <Label text="Cliente: " class="font-bold" />
              <Label
                :text="
                  workshopOfficeWork.customer_name +
                  ' ' +
                  workshopOfficeWork.customer_last_name
                "
              />
            </FormattedString>
          </Label>
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
            :text="workshopOfficeWorkCurrentStatusDescription"
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
      <GridLayout rows="*" row="1">
        <ListView
          for="workshopOfficeWorkAdvance in workshopOfficeWorkAdvanceList"
          @itemTap="showWorkshopOfficeAdvance"
          row="0"
        >
          <v-template>
            <GridLayout rows="60%" columns="60%, *">
              <Image
                :src="
                  'http://10.0.2.2:8080/' + workshopOfficeWorkAdvance.image_name
                "
                stretch="aspectFit"
                row="0"
                col="0"
              />
              <Label
                :text="
                  workshopOfficeWorkAdvance.workshop_office_service_advance_description
                "
                row="0"
                col="1"
                class="caption-text"
              />
            </GridLayout>
          </v-template>
        </ListView>
        <MDFloatingActionButton
          src="res://outline_add_white_36"
          @tap="goToAddWorkshopOfficeWorkAdvancePage"
          row="0"
          class="fab-btn"
          :hidden="isGoToAddWorkshopOfficeWorkAdvancePageBtnHidden"
        />
      </GridLayout>
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