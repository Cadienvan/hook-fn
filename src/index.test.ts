import { hook, Hook } from '.';

let contextChecker = '';
class MockClass {
  @Hook({
    before: ({ context, args }) => {
      context.foo = 'bar';
      args[0] = args[0].toUpperCase();
    },
    after: ({ context }) => {
      contextChecker = context.foo;
    }
  })
  public mockMethod(str: string): string {
    return str;
  }
}

const mockInstance = new MockClass();

it('should execute the argument modification in the before function', () => {
  expect(mockInstance.mockMethod('hello world')).toBe('HELLO WORLD');
});

it('should execute the context modification in the after function', () => {
  expect(contextChecker).toBe('bar');
});

it('should do nothing if Hookable has no before or after functions indicated', () => {
  class MockClass {
    @Hook({})
    public mockMethod(str: string): string {
      return str;
    }
  }

  const mockInstance = new MockClass();

  expect(mockInstance.mockMethod('hello world')).toBe('hello world');
});

it('should check the hookable function behaves in the same way as the decorator', () => {
  const testFn = function (str: string): string {
    return str;
  };
  const mockFn = hook({
    before: ({ context, args }) => {
      context.foo = 'bar2';
      args[0] = args[0].toUpperCase();
    },
    after: ({ context }) => {
      contextChecker = context.foo;
    }
  });

  const result = mockFn(testFn)('hello world');

  expect(result).toBe('HELLO WORLD');
  expect(contextChecker).toBe('bar2');
});

it('should do nothing if hookable has no before or after functions indicated', () => {
  const testFn = function (str: string): string {
    return str;
  };
  const mockFn = hook({});

  const result = mockFn(testFn)('hello world');

  expect(result).toBe('hello world');
});
