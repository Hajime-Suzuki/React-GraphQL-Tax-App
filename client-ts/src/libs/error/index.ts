import { AxiosError } from 'axios'
// TODO: check types
export const extractErrorMessage = (e: AxiosError) => {
  return (e.response && e.response.data) || e.message
}
