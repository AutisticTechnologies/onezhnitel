export const MAXIMUM_SIZE_IN_MIBIBYTES: number = 25
export const MAXIMUM_DURATION_IN_SECONDS: number = 60

export interface SuccessValidationResult {
  success: true
}

export enum ValidationErrorCode {
  TooBig,
  TooLong,
}

export interface FailedValidationResult {
  success: false
  code: ValidationErrorCode
}

export type ValidationResult =
  | SuccessValidationResult
  | FailedValidationResult

// TODO(synzr): make the values configurable
export default function validate(
  durationInSeconds: number,
  sizeInBytes: number,
): boolean | ValidationErrorCode {
  const maximumSizeInBytes = MAXIMUM_SIZE_IN_MIBIBYTES * 1000 * 1000
  if (sizeInBytes > maximumSizeInBytes) {
    return ValidationErrorCode.TooBig
  }
  if (durationInSeconds > MAXIMUM_DURATION_IN_SECONDS) {
    return ValidationErrorCode.TooLong
  }
  return true
}
