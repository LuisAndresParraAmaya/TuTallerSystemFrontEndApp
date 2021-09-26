<template>
<Page>
    <ActionBar title="Verifica tu identidad">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label :text="'Si '+email+' coincide con la dirección de correo electrónico de tu cuenta, te enviaremos un código. '" textWrap="true" />
        <MDTextField v-model='sentCodeInput' secure='true' hint='Escribe el código' :error='codeInputErr' @textChange='onCodeTxtChange'/>
        <MDButton text='Verificar' @tap='verifyCorrectCode' :isEnabled='isVerifyCodeBtnTappable'/>
      </StackLayout>
    </ScrollView>
</Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>