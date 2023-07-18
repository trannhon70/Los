import { RootState } from "types"

export const getLOANNormalProfileDocument = (state: RootState) => {
    return state.LOANNormal.storage.profileDocument.data
  }

  export const getLOANNormalProfileDocumentCustomerInfo = (state: RootState) => {
    return state.LOANNormal.storage.profileDocument.customerInfo
  }

export const getLOANNormalProfileDocumentStructure = (state: RootState) =>{
  return state.LOANNormal.storage.profileDocument.structure
}

export const getLOANNormalProfileDocumentGetFile = (state: RootState) =>{
  return state.LOANNormal.storage.profileDocument.getFile
}

export const getDocumentStructureFilesPage = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.page

export const getDocumentStructureFilesLimit = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.limit

export const getDocumentStructureFilesFetched = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.fetched

export const getDocumentStructureFilesFetching = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.fetching

export const getDocumentStructureFilesTotalPage = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.total_page

export const getDocumentStructureFilesTotalItem = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.total_item

export const getDocumentStructureFilesLos_id = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.los_id

export const getDocumentStructureFilesName = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.name

export const getDocumentStructureDocumentId = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.document_type_id

export const getDocumentStructureDateStart = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.date_start

export const getDocumentStructureDateEnd = (state: RootState) => state.LOANNormal.storage.profileDocument.getFilePage.date_end





export const getLOANNormalCurrentFile = (state: RootState) => state.LOANNormal.storage.profileDocument.currentFile
export const getLOANNormalDocumentBreadScrumb = (state: RootState) => state.LOANNormal.storage.profileDocument.breadcrumb
