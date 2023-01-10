import { defaultDecoratorOptions, defaultFunctionOptions } from './defaults';
import { DecoratorOptions, FunctionOptions } from './models';

export function Hook(options: Partial<DecoratorOptions>) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const context = {};
    const originalMethod = descriptor.value;
    const { before, after } = { ...defaultDecoratorOptions, ...options };

    descriptor.value = function (...args: any[]) {
      before({ context, args, target, propertyKey, descriptor });
      const result = originalMethod.apply(this, args);
      after({ context, args, target, propertyKey, descriptor, result });
      return result;
    };

    return descriptor;
  };
}

// Create a function which can wrap any function and provide the same functionality as the Hookable decorator
export function hook<T extends (...args: any[]) => unknown | Promise<unknown>>(
  options: Partial<FunctionOptions>
) {
  return function (fn: T): (...args: Parameters<T>) => ReturnType<T> {
    const context = {};
    const { before, after } = { ...defaultFunctionOptions, ...options };

    return function (...args: Parameters<T>): ReturnType<T> {
      before({ context, args });
      const result = fn(...args);
      after({
        context,
        args,
        result
      });
      return result as ReturnType<T>;
    };
  };
}
