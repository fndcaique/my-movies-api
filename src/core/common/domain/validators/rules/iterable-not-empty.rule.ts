import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { checkIsIterable } from '../../utils/iterable';

export function IterableNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: any) {
    registerDecorator({
      name: 'IterableNotEmpty',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            value && checkIsIterable(value) && Array.from(value).length > 0
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be empty`;
        },
      },
    });
  };
}
