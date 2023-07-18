import { formatPath } from "utils"
import { apiPost } from "utils/api"
import { API_LOAN_STATE_GUIDE } from "../APIPathsS2"

export const fetchStorageGuide = (los_id: string,position:string) => {
    const body = {
        partition: {
          last_log: {},
          roles: {},
          interceptor: {},
          prev_allocate: {}
        }
      }
    return apiPost<any>(formatPath(API_LOAN_STATE_GUIDE, los_id,position), body)
}

export const fetchGuide = (los_id: string,position:string) => {
  const body = {
      partition: {
        guide: {},
        roles:{}
        // last_log: {},
      }
    }
  return apiPost<any>(formatPath(API_LOAN_STATE_GUIDE, los_id,position), body)
}