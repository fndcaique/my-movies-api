import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CategoryId } from 'src/core/category';
import { ClassValidatorFields } from '../../../common/domain/validators/class-validator-fields';
import { GenreConstructorProperties } from '../entities/genre';

export class GenreRules {
  @MaxLength(128)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  // @Distinct(())

  @IsArray()
  @IsInstance(CategoryId, { each: true })
  @IsOptional()
  categoriesId: Map<string, CategoryId> | undefined | null;

  @IsBoolean()
  @IsOptional()
  isActive: boolean | undefined;

  @IsDate()
  @IsOptional()
  createdAt: Date | undefined;

  constructor(data: GenreConstructorProperties) {
    this.name = data.name;
    this.categoriesId = data.categoriesId;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
  }
}

export class GenreValidator extends ClassValidatorFields<GenreRules> {
  validate(data: GenreConstructorProperties): boolean {
    return super.validate(
      new GenreRules(data ?? ({} as GenreConstructorProperties)),
    );
  }
}

export class GenreValidatorFactory {
  static create() {
    return new GenreValidator();
  }
}
