import { LambdaClient, InvokeCommand, LambdaClientConfig, InvokeCommandInput } from "@aws-sdk/client-lambda";
import { getCredentials } from "./credentials";

export async function get(functionName: string, payLoad?: any) {
  try {
    const { 
      aws_access_key_id, 
      aws_secret_access_key, 
      aws_lambda_region 
    } = await getCredentials()
    
    const lambdaClient = new LambdaClient({
      region: aws_lambda_region,
      credentials: {
        accessKeyId: aws_access_key_id,
        secretAccessKey: aws_secret_access_key
      }
    } as LambdaClientConfig)
  
    const invokeCommandOptions: InvokeCommandInput = {
      FunctionName: functionName
    }

    if (payLoad) invokeCommandOptions.Payload = payLoad
  
    const { Payload } = await lambdaClient.send(new InvokeCommand(invokeCommandOptions));
    let result;
    if (Payload) {
      result = Buffer.from(Payload).toString();
      console.log(result);
      return result
    }
  } catch (err) {
    console.error(err)
  }
}