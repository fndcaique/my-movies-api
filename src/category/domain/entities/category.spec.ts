import { } from 'crypto';
import UniqueEntityId from '../../../common/domain/value-objects/unique-entity-id.vo';
import { Category } from './category';
describe('Category Unit Tests', () => {
  test('constructor of category', () => {
    // AAA - Arrange Act Assert
    const allProps = {
      name: 'Some category',
      description: 'some description',
      isActive: true,
      createdAt: new Date(),
    };
    const uuid = '568c59bc-81ea-47e4-b288-4e95cabe5f6b';
    let category = new Category(allProps, new UniqueEntityId(uuid));
    expect(category.props).toEqual(allProps);
    expect(category.props.createdAt).toBeInstanceOf(Date);
    expect(category.id.value).toBe(uuid);
    expect(category.id instanceof UniqueEntityId).toBe(true);

    const othersProps = {
      name: 'Other category',
      description: 'Other description',
      isActive: false
    };
    category = new Category(othersProps);
    expect(category.props.name).toBe(othersProps.name);
    expect(category.props.description).toBe(othersProps.description);
    expect(category.props.isActive).toBe(false);
    expect(category.props.createdAt).toBeTruthy();
    expect(category.props.createdAt).toBeInstanceOf(Date);
    expect(category.id instanceof UniqueEntityId).toBe(true);

    const someProps = {
      name: 'Only name property',
    };
    category = new Category(someProps);
    expect(category.name).toEqual(someProps.name);
    expect(category.description).toBeFalsy();
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.id instanceof UniqueEntityId).toBe(true);
  });
});
