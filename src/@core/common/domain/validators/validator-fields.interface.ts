// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldErrors = {
  [key: string]: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ValidatorFieldsInterface<PropsValidated = any> {
  errors: FieldErrors | null;
  validatedData: PropsValidated | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(data: PropsValidated): boolean;
}
