import ClassValidatorFields from '@common/domain/validators/class-validator-fields';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { CreateCategoryProperties } from '../entities/category';

export class CategoryRules {
  @MaxLength(128)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(256)
  @IsString()
  @IsOptional()
  description: string | undefined | null;

  @IsBoolean()
  @IsOptional()
  isActive: boolean | undefined;

  @IsDate()
  @IsOptional()
  createdAt: Date | undefined;

  constructor(data: CreateCategoryProperties) {
    this.name = data.name;
    this.description = data.description;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CreateCategoryProperties): boolean {
    return super.validate(new CategoryRules(data ?? {}));
  }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
