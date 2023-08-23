// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldErrors<T = any> = {
  [key in keyof T]: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface ValidatorFieldsInterface<PropsValidated = any> {
  errors: FieldErrors<PropsValidated> | null;
  validatedData: PropsValidated | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(data: PropsValidated): boolean;
}
