import { 
  InvokeCommand, 
  InvokeCommandInput 
} from "@aws-sdk/client-lambda";
import { getLambdaClient } from "./config";
import handleError from "@lib/util/error/handleError";

export async function get(functionName: string, payLoad?: any): Promise<object | null> {
  try {
    const lambdaClient = await getLambdaClient()
    const invokeCommandOptions: InvokeCommandInput = { FunctionName: functionName }
    if (payLoad) invokeCommandOptions.Payload = payLoad
  
    const { Payload } = await lambdaClient.send(new InvokeCommand(invokeCommandOptions));

    return Payload ? Buffer.from(Payload).toJSON() : null
  } catch (err) {
    throw handleError(err)
  }
}