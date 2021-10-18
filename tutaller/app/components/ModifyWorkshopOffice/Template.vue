<template>
  <Page @loaded="fillWorkshopOfficeActualInfo">
    <ActionBar title="Información de la sucursal">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <MDTextView
          id="txtRegion"
          v-model="regionInput"
          hint="Región de la sucursal"
          :error="regionInputErr"
          @focus="selectRegion"
          @textChange="onRegionTxtChange"
        />
        <MDTextView
          id="txtCommune"
          v-model="communeInput"
          hint="Comuna de la sucursal"
          @focus="selectCommune"
          :error="communeInputErr"
          @textChange="onCommuneTxtChange"
        />
        <MDTextView
          v-model="addressInput"
          hint="Dirección de la sucursal"
          :error="addressInputErr"
          @textChange="onAddressTxtChange"
          maxLength="45"
        />
        <StackLayout orientation="horizontal">
          <MDTextView
            v-model="phoneInput"
            hint="Teléfono de la sucursal"
            keyboardType="phone"
            :error="phoneInputErr"
            @textChange="onPhoneTxtChange"
            maxLength="9"
            width="50%"
          />
          <MDTextView
            id="txtPhoneCountryCode"
            v-model="phoneCountryCodeInput"
            keyboardType="phone"
            hint="Código de país"
            :error="phoneCountryCodeInputErr"
            @textChange="onPhoneTxtChange"
            @focus="selectPhoneCountryCode"
            width="35%"
          />
        </StackLayout>

        <Label
          text="Horario de atención de sucursal"
          textWrap="true"
          class="regular-text"
        />

        <GridLayout columns="*, auto" rows="auto">
          <Label
            text="Lunes"
            textWrap="true"
            col="0"
            row="0"
            class="regular-text"
          />
          <Switch
            id="switchMonday"
            @checkedChange="onMondaySwitchChange"
            col="1"
            row="0"
          />
        </GridLayout>
        <GridLayout
          columns="*, auto, *"
          rows="auto, auto, auto"
          :hidden="!isMondayChecked"
        >
          <TimePickerField
            :time="mondayApertureTime"
            hint="Hora de apertura"
            @timeChange="onMondayApertureTimeChange"
            col="0"
            row="0"
          />
          <Label text="-" textWrap="true" col="1" row="0" />
          <TimePickerField
            :time="mondayDepartureTime"
            hint="Hora de cierre"
            @timeChange="onMondayDepartureTimeChange"
            col="2"
            row="0"
          />
        </GridLayout>
        <Label
          :text="mondayInputErr"
          textWrap="true"
          class="regular-text error-color"
        />

        <GridLayout columns="*, auto" rows="auto">
          <Label
            text="Martes"
            textWrap="true"
            col="0"
            row="0"
            class="regular-text"
          />
          <Switch
            id="switchTuesday"
            @checkedChange="onTuesdaySwitchChange"
            col="1"
            row="0"
          />
        </GridLayout>
        <GridLayout
          columns="*, auto, *"
          rows="auto, auto, auto"
          :hidden="!isTuesdayChecked"
        >
          <TimePickerField
            :time="tuesdayApertureTime"
            hint="Hora de apertura"
            @timeChange="onTuesdayApertureTimeChange"
            col="0"
            row="0"
          />
          <Label text="-" textWrap="true" col="1" row="0" />
          <TimePickerField
            :time="tuesdayDepartureTime"
            hint="Hora de cierre"
            @timeChange="onTuesdayDepartureTimeChange"
            col="2"
            row="0"
          />
        </GridLayout>
        <Label
          :text="tuesdayInputErr"
          textWrap="true"
          class="regular-text error-color"
        />

        <GridLayout columns="*, auto" rows="auto">
          <Label
            text="Miercoles"
            textWrap="true"
            col="0"
            row="0"
            class="regular-text"
          />
          <Switch
            id='switchWednesday'
            @checkedChange="onWednesdaySwitchChange"
            col="1"
            row="0"
          />
        </GridLayout>
        <GridLayout
          columns="*, auto, *"
          rows="auto, auto, auto"
          :hidden="!isWednesdayChecked"
        >
          <TimePickerField
            :time="wednesdayApertureTime"
            hint="Hora de apertura"
            @timeChange="onWednesdayApertureTimeChange"
            col="0"
            row="0"
          />
          <Label text="-" textWrap="true" col="1" row="0" />
          <TimePickerField
            :time="wednesdayDepartureTime"
            hint="Hora de cierre"
            @timeChange="onWednesdayDepartureTimeChange"
            col="2"
            row="0"
          />
        </GridLayout>
        <Label
          :text="wednesdayInputErr"
          textWrap="true"
          class="regular-text error-color"
        />

        <GridLayout columns="*, auto" rows="auto">
          <Label
            text="Jueves"
            textWrap="true"
            col="0"
            row="0"
            class="regular-text"
          />
          <Switch
            id='switchThursday'
            @checkedChange="onThursdaySwitchChange"
            col="1"
            row="0"
          />
        </GridLayout>
        <GridLayout
          columns="*, auto, *"
          rows="auto, auto, auto"
          :hidden="!isThursdayChecked"
        >
          <TimePickerField
            :time="thursdayApertureTime"
            hint="Hora de apertura"
            @timeChange="onThursdayApertureTimeChange"
            col="0"
            row="0"
          />
          <Label text="-" textWrap="true" col="1" row="0" />
          <TimePickerField
            :time="thursdayDepartureTime"
            hint="Hora de cierre"
            @timeChange="onThursdayDepartureTimeChange"
            col="2"
            row="0"
          />
        </GridLayout>
        <Label
          :text="thursdayInputErr"
          textWrap="true"
          class="regular-text error-color"
        />

        <GridLayout columns="*, auto" rows="auto">
          <Label
            text="Viernes"
            textWrap="true"
            col="0"
            row="0"
            class="regular-text"
          />
          <Switch
            id='switchFriday'
            @checkedChange="onFridaySwitchChange"
            col="1"
            row="0"
          />
        </GridLayout>
        <GridLayout
          columns="*, auto, *"
          rows="auto, auto, auto"
          :hidden="!isFridayChecked"
        >
          <TimePickerField
            :time="fridayApertureTime"
            hint="Hora de apertura"
            @timeChange="onFridayApertureTimeChange"
            col="0"
            row="0"
          />
          <Label text="-" textWrap="true" col="1" row="0" />
          <TimePickerField
            :time="fridayDepartureTime"
            hint="Hora de cierre"
            @timeChange="onFridayDepartureTimeChange"
            col="2"
            row="0"
          />
        </GridLayout>
        <Label
          :text="fridayInputErr"
          textWrap="true"
          class="regular-text error-color"
        />

        <GridLayout columns="*, auto" rows="auto">
          <Label
            text="Sábado"
            textWrap="true"
            col="0"
            row="0"
            class="regular-text"
          />
          <Switch
            id='switchSaturday'
            @checkedChange="onSaturdaySwitchChange"
            col="1"
            row="0"
          />
        </GridLayout>
        <GridLayout
          columns="*, auto, *"
          rows="auto, auto, auto"
          :hidden="!isSaturdayChecked"
        >
          <TimePickerField
            :time="saturdayApertureTime"
            hint="Hora de apertura"
            @timeChange="onSaturdayApertureTimeChange"
            col="0"
            row="0"
          />
          <Label text="-" textWrap="true" col="1" row="0" />
          <TimePickerField
            :time="saturdayDepartureTime"
            hint="Hora de cierre"
            @timeChange="onSaturdayDepartureTimeChange"
            col="2"
            row="0"
          />
        </GridLayout>
        <Label
          :text="saturdayInputErr"
          textWrap="true"
          class="regular-text error-color"
        />

        <GridLayout columns="*, auto" rows="auto">
          <Label
            text="Domingo"
            textWrap="true"
            col="0"
            row="0"
            class="regular-text"
          />
          <Switch
            id='switchSunday'
            @checkedChange="onSundaySwitchChange"
            col="1"
            row="0"
          />
        </GridLayout>
        <GridLayout
          columns="*, auto, *"
          rows="auto, auto, auto"
          :hidden="!isSundayChecked"
        >
          <TimePickerField
            :time="sundayApertureTime"
            hint="Hora de apertura"
            @timeChange="onSundayApertureTimeChange"
            col="0"
            row="0"
          />
          <Label text="-" textWrap="true" col="1" row="0" />
          <TimePickerField
            :time="sundayDepartureTime"
            hint="Hora de cierre"
            @timeChange="onSundayDepartureTimeChange"
            col="2"
            row="0"
          />
        </GridLayout>
        <Label
          :text="sundayInputErr"
          textWrap="true"
          class="regular-text error-color"
        />

        <MDButton
          text="Modificar sucursal"
          @tap="modifyWorkshopOffice"
          :isEnabled="isModifyWorkshopOfficeBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>