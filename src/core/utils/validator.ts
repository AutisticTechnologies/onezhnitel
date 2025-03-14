export const MAXIMUM_SIZE_IN_MIBIBYTES: number = 25
export const MAXIMUM_DURATION_IN_SECONDS: number = 60

interface SuccessValidationResult {
  success: true
}

export enum ValidationErrorCode {
  TooBig,
  TooLong,
}

interface FailedValidationResult {
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
): ValidationResult {
  const maximumSizeInBytes = MAXIMUM_SIZE_IN_MIBIBYTES * 1000 * 1000

  if (sizeInBytes > maximumSizeInBytes) {
    return { success: false, code: ValidationErrorCode.TooBig }
  }
  if (durationInSeconds > MAXIMUM_DURATION_IN_SECONDS) {
    return { success: false, code: ValidationErrorCode.TooLong }
  }

  return { success: true }
}
