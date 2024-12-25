export const getValidationMessage = (key, data) =>
  data && data.errors && data.errors[key]
