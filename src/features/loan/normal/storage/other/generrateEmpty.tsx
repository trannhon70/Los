import { generateUUID } from "utils"

export const generateEmptyException = () => {
  return {
    uuidRemote: generateUUID(),
    uuid: generateUUID(),
    exceptionId: 0,
    exceptionName: '',
    detailList: []
  }
}

export const generateEmptyExceptionDetail = (value: number) => {
  return {
    uuid: generateUUID(),
    uuidRemote: generateUUID(),
    exceptionId: value,
    exceptionDetailId: 0,
    exceptionDetailCode: '',
    exceptionDetailName: '',
    exceptionDetailDescription: '',
    exceptionRealityDescription: '',
    displayOrder: 0,
  }
}

export const generateEmptyRisk = () => {
  return {
    uuid: generateUUID(),
    uuidRemote: generateUUID(),
    riskInfo: "",
    measuresLimitRisk: "",
    displayOrder: 0,
  }
}