import { Transform, TransformFnParams } from 'class-transformer';

/**
 * @description Trim decorator to trim string values before validation
 * @returns {PropertyDecorator}
 * */

export function Trim(): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    Transform(({ value }: TransformFnParams) => {
      if (typeof value === 'string') {
        return value.trim();
      }
      return value;
    })(target, propertyKey);
  };
}
