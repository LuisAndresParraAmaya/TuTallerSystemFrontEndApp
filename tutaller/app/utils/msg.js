import { SnackBar } from "@nativescript-community/ui-material-snackbar";

//Shows a snackbar that tells the currently logged in user that they don't have the required privileges to do a certain action
export function showSnackBarInsufficientPrivileges() {
    const snackBar = new SnackBar()
    snackBar.simple('No dispones de los privilegios requeridos para realizar esta acción.')
}