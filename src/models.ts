export type FunctionOptions = {
  before: FunctionBeforeHook;
  after: FunctionAfterHook;
};

type FunctionBeforeHookInput = {
  context: any;
  args: any[];
};

type FunctionBeforeHook = ({ context, args }: FunctionBeforeHookInput) => void;

type FunctionAfterHookInput = {
  context: any;
  args: any[];
  result: any;
};

type FunctionAfterHook = ({
  context,
  args,
  result
}: FunctionAfterHookInput) => void;

type DecoratorMetadata = {
  target: any;
  propertyKey: string;
  descriptor: PropertyDescriptor;
};

export type DecoratorOptions = {
  before: DecoratorBeforeHook;
  after: DecoratorAfterHook;
};

type DecoratorBeforeHookInput = FunctionBeforeHookInput & DecoratorMetadata;

type DecoratorBeforeHook = ({
  context,
  args,
  target,
  propertyKey,
  descriptor
}: DecoratorBeforeHookInput) => void;

type DecoratorAfterHookInput = FunctionAfterHookInput & DecoratorMetadata;

type DecoratorAfterHook = ({
  context,
  args,
  target,
  propertyKey,
  descriptor,
  result
}: DecoratorAfterHookInput) => void;
