import handleError from "@lib/util/error/handleError"
import getAPICredentials from "../credentials/getAPICredentials"

export default async function post(url: string, data: any, options = { headers: {} }) {
  const { headers, ...restOptions } = options
  const { API_KEY, API_URL } = await getAPICredentials()

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...headers,
    },
    body: JSON.stringify(data),
    ...restOptions,
  }

  try {
    const response = await fetch(`${API_URL}${url}`, request)
    return await response.json()
  } catch (error) {
    throw handleError(error)
  }
} 