import ApiResponse from '@server/models/ApiResponse'

export const sendRequest = async <T>(
  api: string,
  method: MethodType,
  body?: any
): Promise<{
  message: string
  data?: T
  isSuccess: boolean
}> => {
  const response = await fetch(cleanUrl(`${process.env.REACT_APP_SERVER_BASE_URL}/api/${api}`), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = 'Unable to send request, ' + response.statusText
    console.error(message)

    return { message, isSuccess: false }
  }

  const { message, data, isSuccess } = (await response.json()) as ApiResponse<T>

  return { message, data, isSuccess }
}

/**
 * Cleans URL string
 *
 * @example
 * // returns "https://example.com"
 * cleanUrl("https:////example.com//");
 *
 * // returns "https://example.com/example/example"
 * cleanUrl("https://example.com//example/example//");
 *
 * @param url URL to clean
 * @returns Cleaned URL string
 */
export const cleanUrl = (url: string): string => url.replace(/([^:])(\/\/+)/g, '$1/')

export enum MethodType {
  GET = 'GET',
  POST = 'POST',
}
