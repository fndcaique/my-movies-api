export type FieldErrors<T> = {
  [key in keyof T]: string[];
};

export default interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldErrors<PropsValidated> | null;
  validatedData: PropsValidated | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(data: PropsValidated): boolean;
}
