import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsFileSize(maxSize: number, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isFileSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxSize],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value.size <= args.constraints[0];
        },
        defaultMessage(args: ValidationArguments) {
          return `File size should not exceed ${args.constraints[0]} bytes`;
        },
      },
    });
  };
}
