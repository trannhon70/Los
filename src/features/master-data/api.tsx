import { formatPath } from "utils"
import { apiGet } from "utils/api"

export const apiMasterData = <T,>(path: string, ...params: (string | number)[]) => {
  // console.log('>>>>>>>> apiMasterData >>>>> path', path)
  return apiGet<T[]>(formatPath(path, ...params));
}