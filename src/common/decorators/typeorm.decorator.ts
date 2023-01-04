import { Column, ColumnOptions, Index } from 'typeorm';

export function ColumnString(options?: ColumnOptions): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    Column({
      ...options,
      nullable: options?.nullable || false,
      length: options?.length || 255,
    })(target, propertyKey);
  };
}

export function ColumnDate(options?: ColumnOptions): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    Column({
      ...options,
      nullable: options?.nullable || false,
      type: 'timestamptz',
    })(target, propertyKey);
  };
}

export function UniqueWithSoftDelete(
  softDeletePropertyKey = 'deleted_at',
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    Index({ unique: true, where: `${softDeletePropertyKey} is null` })(
      target,
      propertyKey,
    );
  };
}
