import { LambdaClient, InvokeCommand, LambdaClientConfig, InvokeCommandInput } from "@aws-sdk/client-lambda";

const AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID'
const AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY'
const AWS_LAMBDA_REGION = 'AWS_LAMBDA_REGION'

export async function get(functionName: string, payLoad?: any) {
  try {
    const lambdaClient = new LambdaClient({
      region: AWS_LAMBDA_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
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