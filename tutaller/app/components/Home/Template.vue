<template>
  <Page>
        <ActionBar title='TuTaller'/>
        <GridLayout rows="*, auto" class='home-pane'>
                <StackLayout row="0">
                    <SearchBar id="sbarWorkshop" hint="Buscar Taller" text="" clear="onClear" submit="onSubmit" />
                    <Button text="Crear Cuenta" @tap="goToCreateAccountPage" />
                    <Button text="Iniciar Sesión" @tap="goToLoginPage" />
                </StackLayout>
                <MDBottomNavigationBar activeColor="red" inactiveColor="black" backgroundColor="white" @tabSelected="onBottomNavigationTabSelected" row="1">
                    <MDBottomNavigationTab title="Talleres" />
                    <MDBottomNavigationTab title="Servicios"/>
                    <MDBottomNavigationTab title="Cuenta" />
                </MDBottomNavigationBar>
        </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>