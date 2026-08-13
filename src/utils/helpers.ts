export const formatDate = (value?: string | number | Date) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(value)) : '—'

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
  if (typeof error === 'object' && error && 'response' in error) {
    const response = (error as { response?: { data?: { error?: { message?: string } } } }).response
    return response?.data?.error?.message || fallback
  }
  return error instanceof Error ? error.message : fallback
}