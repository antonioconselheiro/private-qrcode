import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ConfirmKeyValidator {
  static getValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const isValid = group.get('key')?.value === group.get('confirmKey')?.value
      return isValid ? null : { confirmKey: true };
    };
  }
}