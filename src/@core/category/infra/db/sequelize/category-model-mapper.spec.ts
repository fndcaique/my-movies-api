import { Category } from '@core/category/domain';
import { LoadEntityError, UniqueEntityId } from '@core/common/domain';
import { setupSequelize } from '@core/common/infra';
import { CategoryModel } from './category-model';
import { CategoryModelMapper } from './category-model-mapper';

describe('CategoryModelMapper Integration Tests', () => {
  setupSequelize({ models: [CategoryModel] });

  it('should throw LoadEntityError when category is invalid', () => {
    const model = CategoryModel.build({
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
    } as any);
    try {
      CategoryModelMapper.toEntity(model);
      fail('The category is valid, but it needs throw a LoadEntityError');
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect((e as LoadEntityError).errors).toMatchObject({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be longer than or equal to 2 characters',
          'name must be shorter than or equal to 128 characters',
        ],
      });
    }
  });

  it('should throw a generic error', () => {
    const spyValidate = jest
      .spyOn(Category, 'validate')
      .mockImplementation(() => {
        throw new Error('Generic error');
      });
    const model = CategoryModel.build({
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
    } as any);
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(
      new Error('Generic error'),
    );
    expect(spyValidate).toHaveBeenCalledTimes(1);
    spyValidate.mockReset();
  });

  it('should convert a category model to a category entity', () => {
    const createdAt = new Date();
    const model = CategoryModel.build({
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
      name: 'name',
      description: 'description',
      is_active: true,
      created_at: createdAt,
    });

    const entity = CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toEqual(
      new Category(
        {
          name: 'name',
          description: 'description',
          isActive: true,
          createdAt,
        },
        new UniqueEntityId('01a8171e-6283-4940-a468-41c5c8f49be8'),
      ).toJSON(),
    );
  });
});
