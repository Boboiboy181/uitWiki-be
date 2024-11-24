import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsFileType(fileType: string, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isFileType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [fileType],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const allowedType = args.constraints[0];
          return value.mimetype === allowedType;
        },
        defaultMessage(args: ValidationArguments) {
          return `File type must be ${args.constraints[0]}`;
        },
      },
    });
  };
}
