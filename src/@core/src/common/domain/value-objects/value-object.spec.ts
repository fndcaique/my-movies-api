import { ValueObject } from './value-object';

class StubValueObject extends ValueObject {}

describe('ValueObject Uni Tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('String value');
    expect(vo.value).toBe('String value');

    vo = new StubValueObject({ prop: 'prop value' });
    expect(vo.value).toEqual({ prop: 'prop value' });
  });

  it('should convert to an string', () => {
    const date = new Date();
    const arrange = [
      { received: undefined, expected: 'undefined' },
      { received: null, expected: 'null' },
      { received: '', expected: '' },
      { received: 0, expected: '0' },
      { received: 1, expected: '1' },
      { received: 7, expected: '7' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: date, expected: date.toString() },
      {
        received: { prop: 'value' },
        expected: JSON.stringify({ prop: 'value' })
      }
    ];

    arrange.forEach(({ received, expected }) => {
      const vo = new StubValueObject(received);

      expect(`${vo + ''}`).toBe(expected);
    });
  });

  it('should be an immutable value object', () => {
    const vo = new StubValueObject({
      prop1: 'value1',
      deep: { prop2: 'value2', prop3: new Date() }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => ((vo as any).value.prop1 = 'xablau')).toThrow(
      /Cannot assign to read only property 'prop1' of object '#<Object>'/
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => ((vo as any).value.deep.prop2 = 'aaa')).toThrow(
      /Cannot assign to read only property 'prop2' of object '#<Object>'/
    );

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
