import InvalidUuidError from '../../errors/invalid-uuid.error';
import { isValidUUID } from '../utils/is-valid-uuid';
import UniqueEntityId from './unique-entity-id.vo';

describe('UniqueEntityId Unit Tests', () => {
  it('should throw error when uuid is invalid', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should accept an uuid passed in constructor', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const uuid = '01a8171e-6283-4940-a468-41c5c8f49be8';
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(isValidUUID(vo.value)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should generate an uuid when it is not passed in constructor', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const vo = new UniqueEntityId();
    expect(isValidUUID(vo.value)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
