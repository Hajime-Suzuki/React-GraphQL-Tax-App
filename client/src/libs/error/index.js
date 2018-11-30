// TODO: check types
export const extractErrorMessage = e => {
  return (e.response && e.response.data) || e.message
}
