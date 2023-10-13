import { deepFreeze, toSnakeCase } from './functions';

describe('Functions Unit Tests', () => {
  describe('deepFreeze', () => {
    it('should not freeze a primitive value', () => {
      const arrange = [
        { received: undefined, expected: typeof undefined },
        { received: null, expected: typeof null },
        { received: 0, expected: typeof 0 },
        { received: 1, expected: typeof 1 },
        { received: 9, expected: typeof 9 },
        { received: true, expected: typeof true },
        { received: false, expected: typeof false },
        { received: 'string', expected: typeof 'string' }
      ];

      arrange.forEach(({ received, expected }) => {
        const value = deepFreeze(received);
        expect(typeof value).toBe(expected);
      });
    });
    it('should be an immutable object', () => {
      const obj = deepFreeze({
        prop1: 'value1',
        deep: { prop2: 'value2', prop3: new Date() }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => ((obj as any).prop1 = 'xablau')).toThrow(
        /Cannot assign to read only property 'prop1' of object '#<Object>'/
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => ((obj as any).deep.prop2 = 'aaa')).toThrow(
        /Cannot assign to read only property 'prop2' of object '#<Object>'/
      );

      expect(obj.deep.prop3).toBeInstanceOf(Date);
    });
  });

  describe('toSnakeCase', () => {
    const arrange = [
      {
        input: 'someFunction',
        output: 'some_function'
      },
      {
        input: 'isActive',
        output: 'is_active'
      },
      {
        input: 'createdAt',
        output: 'created_at'
      },
      {
        input: 'SNAKE',
        output: '_s_n_a_k_e'
      }
    ];

    test.each(arrange)(
      'when input is $input the output must be $output',
      ({ input, output }) => {
        expect(toSnakeCase(input)).toBe(output);
      }
    );
  });
});
