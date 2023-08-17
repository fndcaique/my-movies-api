import UniqueEntityId from '../../../common/domain/value-objects/unique-entity-id.vo';
import { Category } from './category';
describe('Category Unit Tests', () => {
  test('constructor of category', () => {
    // AAA - Arrange Act Assert
    const allProps = {
      name: 'Some category',
      description: 'some description',
      isActive: true,
      createdAt: new Date()
    };
    const uuid = '568c59bc-81ea-47e4-b288-4e95cabe5f6b';
    let category = new Category(allProps, new UniqueEntityId(uuid));
    expect(category.props).toEqual(allProps);
    expect(category.props.createdAt).toBeInstanceOf(Date);
    expect(category.uniqueEntityId.value).toBe(uuid);
    expect(category.uniqueEntityId instanceof UniqueEntityId).toBe(true);

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
    expect(category.uniqueEntityId instanceof UniqueEntityId).toBe(true);

    const someProps = {
      name: 'Only name property'
    };
    category = new Category(someProps);
    expect(category.name).toEqual(someProps.name);
    expect(category.description).toBeFalsy();
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.uniqueEntityId instanceof UniqueEntityId).toBe(true);
  });

  it('should update the name and description properties', () => {
    const category = new Category({ name: 'name 1', description: 'desc 1' });
    category.update('name 2');
    expect(category.name).toBe('name 2');
    expect(category.description).toBeUndefined();

    category.update('name 3', 'desc 3');
    expect(category.name).toBe('name 3');
    expect(category.description).toBe('desc 3');
  });

  it('should toggle the isActivate property', () => {
    let category = new Category({ name: 'name 1' });
    expect(category.isActive).toBe(true);
    category.deactivate();
    expect(category.isActive).toBe(false);
    category.activate();
    expect(category.isActive).toBe(true);

    category = new Category({ name: 'name 1', isActive: false });
    expect(category.isActive).toBe(false);
    category.activate();
    expect(category.isActive).toBe(true);
    category.deactivate();
    expect(category.isActive).toBe(false);
  });
});
