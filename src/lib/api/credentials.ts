import { invoke } from "@tauri-apps/api/tauri";

interface Credentials { 
  aws_access_key_id: string, 
  aws_secret_access_key: string
  aws_lambda_region: string, 
}

export async function getCredentials(): Promise<Credentials> {
  try {
    return await invoke('get_credentials');
  } catch (err) {
    throw (err as Error)
  }
}