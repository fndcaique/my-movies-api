import { validateSync } from 'class-validator';
import {
  FieldErrors,
  ValidatorFieldsInterface
} from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldErrors | null = null;
  validatedData: PropsValidated | null = null;

  validate(data: PropsValidated): boolean {
    const errors = validateSync(data as object);
    if (errors.length) {
      this.errors = errors.reduce<FieldErrors>((acc, item) => {
        acc[item.property] = Object.values(item.constraints!);
        return acc;
      }, {} as FieldErrors);
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}
