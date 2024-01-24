import { FormGroup, ValidationErrors } from "@angular/forms";

export class ConfirmKeyValidator {
  static getValidator(): (group: FormGroup) => ValidationErrors | null {
    return (group: FormGroup): ValidationErrors | null => {
      const isValid = group.get('key')?.value === group.get('confirmKey')?.value
      return isValid ? null : { confirmKey: true };
    };
  }
}