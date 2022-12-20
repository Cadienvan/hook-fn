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
export function hook(options: Partial<FunctionOptions>) {
  return function (fn: Function) {
    const context = {};
    const { before, after } = { ...defaultFunctionOptions, ...options };

    return function (...args: any[]) {
      before({ context, args });
      const result = fn(...args);
      after({
        context,
        args,
        result
      });
      return result;
    };
  };
}
