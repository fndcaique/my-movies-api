export type FieldErrors = {
  [field: string]: string[];
};

export default interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(data: any): boolean;
}
