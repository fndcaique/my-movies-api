import { validateSync } from 'class-validator';
import {
  FieldErrors,
  ValidatorFieldsInterface
} from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldErrors<PropsValidated> | null = null;
  validatedData: PropsValidated | null = null;

  validate(data: PropsValidated): boolean {
    const errors = validateSync(data as object);
    if (errors.length) {
      this.errors = errors.reduce<FieldErrors<PropsValidated>>((acc, item) => {
        acc[item.property as keyof PropsValidated] = Object.values(
          item.constraints!
        );
        return acc;
      }, {} as FieldErrors<PropsValidated>);
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}
