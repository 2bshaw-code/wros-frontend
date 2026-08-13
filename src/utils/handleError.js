export const handleError = (error) => {
  if (error.response) {
    return error.response.data?.error?.message || error.response.data?.message || error.response.statusText || 'An error occurred'
  }
  if (error.request) {
    return 'No response from server'
  }
  return error.message || 'An error occurred'
}
