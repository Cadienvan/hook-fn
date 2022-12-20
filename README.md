# What is it?

This is an implementation (usable both as a decorator and as a higher-order function) that can be used to hook into a function execution and allows you to do something before and after such execution.  
It can be used both with `sync` and `async` functions.

# How do I install it?

You can install it by using the following command:

```bash
npm install hook-fn
```

# How do I use it?

## As a decorator

```typescript
import { Hook } from 'hook-fn';

class MyClass {
  @Hook({
    before: (context, args, target, propertyKey, descriptor) => {
      console.log('Before');
    },
    after: (context, args, target, propertyKey, descriptor, result) => {
      console.log('After');
    },
  })
  public myMethod(): void {
    console.log('Hello World!');
  }
}
```

## As a higher-order function

```js
import { hook } from 'hook-fn';

const testFn = function (str) {
  return str;
};

const mockFn = hook({
    before: (context, args) => {
      console.log('Before');
  },
    after: (context, args, result) => {
    console.log('After');
  }
});

const mockedTestFn = mockFn(testFn);

mockedTestFn('hello world');
```

## A consideration about async functions

Please, consider the `after` function will be executed after the `async` function is called, without waiting for it to resolve or reject.  
If you want to execute something after the `async` function is resolved or rejected, you can use the `then` or `catch` methods of the returned promise.

```js
import { hook } from 'hook-fn';

const testFn = async function (str) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str);
    }, 1000);
  });
};

const mockFn = hook({
  before: (context, args) => {
    console.log('Before');
  },
  after: (context, args, result) => {
    result.then((res) => {
      console.log('After');
    });
  }
});

const mockedTestFn = mockFn(testFn);

mockedTestFn('hello world');
```

# How does it work?

## Decorator
The decorator will provide two functions to be executed before and after the method to which it is applied.  
It expects an object with the following properties:  
- `before`: A function to be executed before the method to which it is applied. It will be called with the following parameters:
  - `context`: The context of the method to which it is applied
  - `args`: The arguments passed to the method to which it is applied
  - `target`: The method to which it is applied
  - `propertyKey`: The name of the method to which it is applied
  - `descriptor`: The descriptor of the method to which it is applied.
- `after`: A function to be executed after the method to which it is applied. It will be called with the following parameters:
  - `context`: The context of the method to which it is applied
  - `args`: The arguments passed to the method to which it is applied
  - `target`: The method to which it is applied
  - `propertyKey`: The name of the method to which it is applied
  - `descriptor`: The descriptor of the method to which it is applied.
  - `result`: The result of the method to which it is applied. If the method is `async`, it will be a `Promise`.


## Higher-order function

The higher-order function will provide two functions to be executed before and after the method to which it is applied.  
It expects an object with the following properties:
- `before`: A function to be executed before the method to which it is applied. It will be called with the following parameters:
  - `context`: The context of the method to which it is applied
  - `args`: The arguments passed to the method to which it is applied
- `after`: A function to be executed after the method to which it is applied. It will be called with the following parameters:
  - `context`: The context of the method to which it is applied
  - `args`: The arguments passed to the method to which it is applied
  - `result`: The result of the method to which it is applied. If the method is `async`, it will be a `Promise`.

# Other Info

## Why didn't we use `bind` in the Hook `context` passed to the `before` and `after` functions?

We could have used `bind` to provide the context to the functions, but we prefered not to do so because it would have needed the developers using our library to know about the context of the method to which it is applied and the implications of using `bind` in such a way.

# Tests

You can run the tests by using the following command:

```bash
npm test
```