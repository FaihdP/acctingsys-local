import handleError from "@lib/util/error/handleError"
import getAPICredentials from "../credentials/getAPICredentials"

export default async function get(url: string) {
  const { API_KEY, API_URL } = await getAPICredentials()

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    }
  }
  
  try {
    const response = await fetch(`${API_URL}${url}`, request)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `POST ${API_URL}${url}`)
    }
    return await response.json()
  } catch (error) {
    throw handleError(error)
  }
} 