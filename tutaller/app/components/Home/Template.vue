<template>
  <Page>
        <ActionBar title='TuTaller'/>
        <GridLayout rows="*, auto" class='home-pane'>
                <StackLayout row="0">
                    <SearchBar id="sbarWorkshop" hint="Buscar Taller" text="" clear="onClear" submit="onSubmit" />
                    <Button text='Filtrar taller' @tap='filterWorkshop'/>
                    <Button text="Crear Cuenta" @tap="goToCreateAccountPage" class="btn"/>
                    <Button text="Iniciar Sesión" @tap="goToLoginPage" class="btn"/>
                    <Button text="Modificar Perfil" @tap="goToModifyProfilePage" class="btn"/>
                </StackLayout>
                <MDBottomNavigationBar activeColor="yellow" inactiveColor="white" backgroundColor="black" @tabSelected="onBottomNavigationTabSelected" row="1">
                    <MDBottomNavigationTab title="Talleres" />
                    <MDBottomNavigationTab title="Servicios"/>
                    <MDBottomNavigationTab title="Cuenta"/>
                </MDBottomNavigationBar>
        </GridLayout>
  </Page>
</template>

<script src='./Component.js'></script>
<style src='./Style.css'></style>