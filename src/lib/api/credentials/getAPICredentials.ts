import handleError from "@lib/util/error/handleError";
import { invoke } from "@tauri-apps/api/tauri";

interface APICredentials {
  api_key: string;
  api_url: string;
}

let cachedCredentials: APICredentials | null = null

export default async function getAPICredentials() {
  try {
    if (!cachedCredentials) cachedCredentials = await invoke<APICredentials>("get_api_credentials")
    return { API_KEY: cachedCredentials.api_key, API_URL: cachedCredentials.api_url }
  } catch (error) {
    throw handleError(error)
  }
}
