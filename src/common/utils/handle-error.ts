import { isAxiosError } from 'axios'

export const getErrorMessage = (error: unknown) => {
  let errorMessage = '' // e.response ? e.response.data.errorMessages.message : e.message
  if (isAxiosError<ServerError>(error)) {
    // case_1 есть поле response, case_2 нет поля response
    // case_2                                // case_3
    errorMessage = error.response
      ? error.response.data.errorMessages[0].message
      : error.message
  } else {
    // case_3
    errorMessage = (error as Error).message
  }
  return errorMessage
}

type ServerError = {
  errorMessages: Array<{
    message: string
    field: string
  }>
}