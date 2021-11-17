<template>
  <Page>
    <ActionBar :title="translateSubscriptionName(subscription.name)">
      <NavigationButton
        @tap="goToPreviousPage"
        android.systemIcon="@drawable/ic_menu_back"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Precio" textWrap="true" class="paragraph font-bold" />
        <Label class="paragraph">
          <FormattedString>
            <Span
              :text="'$' + subscription.price + ' CLP '"
              :class="{
                'text-line-through': subscription.offer_discount !== 0,
              }"
            />
            <!-- If the subscription plan has an active offer -->
            <Span
              v-if="subscription.offer_discount !== 0"
              :text="'$' + subscription.offer_price + ' CLP (en oferta)'"
            />
          </FormattedString>
        </Label>
        <Label
          text="Periodicidad"
          textWrap="true"
          class="paragraph font-bold"
        />
        <Label
          :text="translatePeriodicity(subscription.periodicity)"
          textWrap="true"
          class="paragraph"
        />
        <Label text="Descripción" textWrap="true" class="paragraph font-bold" />
        <Label class="paragraph" textWrap="true">
          <FormattedString>
            <Span text.decode="&#xf00c; " class="fas" />
            <Label
              text="Tu sucursal automotriz aparecerá dentro de las búsquedas que realizan nuestros usuarios"
            />
          </FormattedString>
        </Label>
        <Label class="paragraph" textWrap="true">
          <FormattedString>
            <Span text.decode="&#xf00c; " class="fas" />
            <Label
              text="Nuestros usuarios podrán ver el perfil de tu sucursal automotriz"
            />
          </FormattedString>
        </Label>
        <Label class="paragraph" textWrap="true">
          <FormattedString>
            <Span text.decode="&#xf00c; " class="fas" />
            <Label
              text="Podrás prestar los servicios automotrices de tu sucursal a nuestros usuarios"
            />
          </FormattedString>
        </Label>
        <Label class="paragraph" textWrap="true">
          <FormattedString>
            <Span text.decode="&#xf00c; " class="fas" />
            <Label
              text="Una vez que nuestros usuarios reciban los servicios automotrices de tu sucursal, estos podrán evaluarla entregandole una retroalimentación junto con una calificación que podría mejorar el posicionamiento de dicha sucursal dentro de las búsquedas"
            />
          </FormattedString>
        </Label>
        <Label class="paragraph" textWrap="true">
          <FormattedString>
            <Span text.decode="&#xf00c; " class="fas" />
            <Label
              text="Podrás pujar dinero para que tu sucursal automotriz se posicione dentro de nuestros espacios publicitarios"
            />
          </FormattedString>
        </Label>
        <MDButton
          text="Comprar ahora"
          @tap="paySubscription"
          :isEnabled="isPaySubscriptionBtnTappable"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script src='./Component.js'></script>