import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatch(formObj: AbstractControl): null | ValidationErrors {
    let password = formObj.value.password;
    let rePassword = formObj.value.rePassword;
    if (password == rePassword) {
        return null
    } else {
        return { passwordMisMatch: true }
    }

}