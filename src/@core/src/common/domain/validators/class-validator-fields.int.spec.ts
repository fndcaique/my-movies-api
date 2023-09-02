/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { ClassValidatorFields } from './class-validator-fields';

class StubRules {
  @MaxLength(128)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsOptional()
  description: string | undefined | null;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe('ClassValidatorFields Integration Tests', () => {
  it('should validate with errors', () => {
    const validator = new StubClassValidatorFields();
    expect(validator.validate(null as any)).toBe(false);
    expect(validator.errors).toEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be longer than or equal to 2 characters',
        'name must be shorter than or equal to 128 characters'
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints'
      ]
    });
  });

  it('should validate without errors', () => {
    const validator = new StubClassValidatorFields();
    expect(
      validator.validate({ name: 'name', price: 1.5, description: 'desc' })
    ).toBe(true);
    expect(validator.validatedData).toEqual({
      name: 'name',
      price: 1.5,
      description: 'desc'
    });
  });
});
