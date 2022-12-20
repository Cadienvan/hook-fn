import { DecoratorOptions, FunctionOptions } from './models';

export const defaultDecoratorOptions: DecoratorOptions = {
  before: () => {
    return;
  },
  after: () => {
    return;
  }
};

export const defaultFunctionOptions: FunctionOptions = {
  before: () => {
    return;
  },
  after: () => {
    return;
  }
};
