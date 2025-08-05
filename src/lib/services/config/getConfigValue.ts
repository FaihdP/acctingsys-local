import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import handleError from "@lib/util/error/handleError";
import { ConfigTags } from "./util/ConfigTags";
import Config from "@lib/db/schemas/config/Config";

export default async function getConfigValue(tag: ConfigTags) {
  try {
    return (await find<Config>(COLLECTIONS.CONFIGS, { tag })).data[0].value
  } catch (error) {
    throw handleError(error)
  }
}
