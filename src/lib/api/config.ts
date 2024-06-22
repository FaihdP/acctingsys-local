import { LambdaClient, LambdaClientConfig } from "@aws-sdk/client-lambda";
import handleError from "@lib/util/error/error";
import { invoke } from "@tauri-apps/api/tauri";

interface Credentials { 
  aws_access_key_id: string, 
  aws_secret_access_key: string
  aws_lambda_region: string, 
}

async function getCredentials(): Promise<Credentials> {
  try {
    return await invoke('get_credentials');
  } catch (err) {
    console.error(err)
    throw (err as Error).message
  }
}

export async function getLambdaClient(): Promise<LambdaClient> {
  try {
    const { 
      aws_access_key_id, 
      aws_secret_access_key, 
      aws_lambda_region 
    } = await getCredentials()
    
    const lambdaClientConfig: LambdaClientConfig = {
      region: aws_lambda_region,
      credentials: {
        accessKeyId: aws_access_key_id,
        secretAccessKey: aws_secret_access_key
      }
    } as LambdaClientConfig
  
    return new LambdaClient(lambdaClientConfig)
  } catch (err) {
    throw handleError(err)
  }
}