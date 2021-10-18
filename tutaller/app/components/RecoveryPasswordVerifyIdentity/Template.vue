<template>
<Page>
    <ActionBar title="Verifica tu identidad">
      <NavigationButton @tap='goToPreviousPage' android.systemIcon='@drawable/ic_menu_back'/>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label :text="'Si '+email+' coincide con la dirección de correo electrónico de tu cuenta, te enviaremos un código. '" textWrap="true" class='paragraph'/>
        <MDTextField v-model='sentCodeInput' hint='Escribe el código' keyboardType="number" :error='codeInputErr' @textChange='onCodeTxtChange'/>
        <MDButton text='Verificar' @tap='verifyCorrectCode' :isEnabled='isVerifyCodeBtnTappable'/>
      </StackLayout>
    </ScrollView>
</Page>
</template>

<script src='./Component.js'></script>