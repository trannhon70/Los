import { PayloadAction } from "@reduxjs/toolkit";
import {
  closeAppBackdrop,
  notify,
  setAppNavigate,
  showAppBackdrop
} from "features/app/store/slice";
import { getMasterData } from "features/master-data/selectors";
import _ from "lodash";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IUser } from "types/models/Account";
import { ILOANNormalProduct } from "types/models/loan/normal/configs/Product";
import {
  CUSTOM_KEY_FILE,
  IBusinessHouseholdInfo,
  ICapitalNeedLoanPlanInfo,
  IFinancialAnalysisInfo,
  ILOANNormalChildfile,
  ILOANNormalDocumentInfoList,
  ILOANNormalLOANUpload,
  ILOANNormalStorageLOANState,
  ILOANNormalStorageLoanValidate,
  IProductLoanProgramInfo
} from "types/models/loan/normal/storage/LOAN";
import { IUploadFile } from "types/models/loan/normal/storage/Upload";
import { IStateStorageGuide } from "types/models/loan/normal/storageGuide";
import { IMasterData } from "types/models/master-data";
import { PREFIX_LOCAL } from "utils";
import { stepsLOAN } from "views/pages/LOAN/utils";
import { checkRoleButtonBar, getRuleDisbled } from "../../storageGuide/selector";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import { getBranchCodeUser, isCheckExistLoanDataProduct } from "../legal/selectors";
import { getLOANNormalLOSuuid } from "../selectors";
import {
  clearStorageDelete,
  deleteLOANNormalStorage,
  handleContinueLoan, mappingLOANDataFileAlterUpload,
  removeAllLOANNormalStorageLOANParentDoc,
  removeLOANNormalStorageLOANDoc,
  removeLOANNormalStorageLOANFile,
  removeLOANNormalStorageLOANParentDoc,
  saveLOANNormalStorageLOANModalAttachFile,
  saveLoanProduct,
  setLOANNormalStorageLoanValidate,
  updateAPIStorageLOANBusinessLegal,
  updateAPIStorageLOANFinance,
  updateAPIStorageLOANNeededPlan,
  updateAPIStorageLOANProductAPI
} from "./actions";
import { deleteLOAN, postLOAN, saveFileLOAN } from "./api";
import {
  getLOANNormalStorageLOAN,
  getLOANNormalStorageProduct,
  getLOANNormalStorageUuid,
  validateLOANNormalStorageLoanFinance,
  validateLOANNormalStorageLoanLegalBussiness,
  validateLOANNormalStorageLoanNeededPlan,
  validateLOANNormalStorageLoanProduct
} from "./selectors";
interface IUploadFileLOAN extends IUploadFile {
  custom_keys: CUSTOM_KEY_FILE;
}

function* handleSaveLOANProduct(action: PayloadAction<string>) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    yield put(setLOANNormalStorageLoanValidate({ valid: true }));
    const storage: ILOANNormalStorageLOANState = yield select(
      getLOANNormalStorageLOAN
    );
    const master: IMasterData = yield select(getMasterData);
    const loanProductValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanProduct
    );
    const neededPlanValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanNeededPlan
    );
    const businessLegalValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanLegalBussiness
    );
    const financeValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanFinance
    );

    const product: ILOANNormalProduct = yield select(
      getLOANNormalStorageProduct
    );
    const uuid: string = yield select(getLOANNormalStorageUuid);
    switch (action.payload) {
      case "product":
        if (loanProductValidate.valid) {
          const r: IApiResponse<unknown> = yield call(
            postLOAN,
            storage,
            master,
            product,
            uuid,
            action.payload
          );
          if (r.success) {
            yield put(
              updateAPIStorageLOANProductAPI(
                r.data as IProductLoanProgramInfo,
                uuid as string
              )
            );
            yield put(
              notify("Lưu thành công", { options: { variant: "success" } })
            );
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(closeAppBackdrop());
          } else {
            yield put(closeAppBackdrop());
            yield put(
              notify(r.errors[0].detail, { options: { variant: "error" } })
            );
          }
        } else {
          yield put(closeAppBackdrop());
          yield put(setLOANNormalStorageLoanValidate(loanProductValidate));
          yield put(
            setAppNavigate(
              `/loan/normal/init/${uuid}/loan/${loanProductValidate.declare}`
            )
          );
        }
        break;
      case "need-and-plan":
        if (neededPlanValidate.valid) {
          const r: IApiResponse<unknown> = yield call(
            postLOAN,
            storage,
            master,
            product,
            uuid,
            action.payload
          );
          if (r.success) {
            yield put(
              updateAPIStorageLOANNeededPlan(
                r.data as ICapitalNeedLoanPlanInfo,
                uuid as string
              )
            );
            yield put(
              notify("Lưu thành công", { options: { variant: "success" } })
            );
            yield put(closeAppBackdrop());
            yield put(fetchListDataHistoryLogs(los_uuid));
          } else {
            yield put(closeAppBackdrop());
            yield put(
              notify(r.errors[0].detail, { options: { variant: "error" } })
            );
          }
        } else {
          yield put(closeAppBackdrop());
          yield put(setLOANNormalStorageLoanValidate(neededPlanValidate));
          yield put(
            setAppNavigate(
              `/loan/normal/init/${uuid}/loan/${neededPlanValidate.declare}`
            )
          );

          if (neededPlanValidate.role === "compare") {
            yield put(
              notify("Số tiền gốc dự kiến trả mỗi kỳ không hợp lệ", {
                options: { variant: "error" },
              })
            );
          } else {
            yield put(
              notify(
                "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.",
                { options: { variant: "error" } }
              )
            );
          }
        }
        break;
      case "business/household-legal":
        if (businessLegalValidate.valid) {
          const r: IApiResponse<unknown> = yield call(
            postLOAN,
            storage,
            master,
            product,
            uuid,
            action.payload
          );
          if (r.success) {
            yield put(
              updateAPIStorageLOANBusinessLegal(
                r.data as IBusinessHouseholdInfo,
                uuid as string
              )
            );
            yield put(
              notify("Lưu thành công", { options: { variant: "success" } })
            );
            yield put(closeAppBackdrop());
            yield put(fetchListDataHistoryLogs(los_uuid));
          } else {
            yield put(closeAppBackdrop());
            yield put(
              notify(r.errors[0].detail, { options: { variant: "error" } })
            );
          }
        } else {
          yield put(closeAppBackdrop());
          yield put(setLOANNormalStorageLoanValidate(businessLegalValidate));
          yield put(
            setAppNavigate(
              `/loan/normal/init/${uuid}/loan/${businessLegalValidate.declare}`
            )
          );
          if (businessLegalValidate.role === "warehouse") {
            yield put(
              notify("Vui lòng nhập đủ thông tin kho hàng hoặc bỏ trống", {
                options: { variant: "error" },
              })
            );
          } else {
            yield put(
              notify(
                "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.",
                { options: { variant: "error" } }
              )
            );
          }
        }
        break;
      case "business/finance-analysis":
        if (financeValidate.valid) {
          const r: IApiResponse<unknown> = yield call(
            postLOAN,
            storage,
            master,
            product,
            uuid,
            action.payload
          );
          if (r.success) {
            yield put(
              updateAPIStorageLOANFinance(
                r.data as IFinancialAnalysisInfo,
                uuid as string
              )
            );
            yield put(
              notify("Lưu thành công", { options: { variant: "success" } })
            );
            yield put(closeAppBackdrop());
            yield put(fetchListDataHistoryLogs(los_uuid));
          } else {
            yield put(closeAppBackdrop());
            yield put(
              notify(r.errors[0].detail, { options: { variant: "error" } })
            );
          }
        } else {
          yield put(closeAppBackdrop());
          yield put(setLOANNormalStorageLoanValidate(financeValidate));
          yield put(
            setAppNavigate(
              `/loan/normal/init/${uuid}/loan/${financeValidate.declare}`
            )
          );
          if (financeValidate.role === "compare") {
            yield put(
              notify(
                "Giá trị Tổng Nguồn Vốn không bằng Tổng Tài Sản trong một kỳ, vui lòng kiểm tra lại",
                { options: { variant: "error" } }
              )
            );
          } else {
            yield put(
              notify(
                "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.",
                { options: { variant: "error" } }
              )
            );
          }
        }
        break;
    }
  } catch (e) {
    console.log(e);
  }
}

function* handleSaveContinueLoan(action: PayloadAction<number, string, { stepName: string, uuid: string }>) {
  try {
    yield put(showAppBackdrop());

    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const ruleDisabled: boolean = yield select(getRuleDisbled);

    yield put(setLOANNormalStorageLoanValidate({ valid: true }));
    const storage: ILOANNormalStorageLOANState = yield select(
      getLOANNormalStorageLOAN
    );
    const master: IMasterData = yield select(getMasterData);
    const loanProductValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanProduct
    );
    const neededPlanValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanNeededPlan
    );
    const businessLegalValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanLegalBussiness
    );
    const financeValidate: ILOANNormalStorageLoanValidate = yield select(
      validateLOANNormalStorageLoanFinance
    );

    const product: ILOANNormalProduct = yield select(
      getLOANNormalStorageProduct
    );
    const uuid: string = yield select(getLOANNormalStorageUuid);
    switch (action.meta.stepName) {
      case "product":
        if (ruleDisabled) {
          yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);
          yield put(closeAppBackdrop());
        } else {
          if (loanProductValidate.valid) {
            const r: IApiResponse<unknown> = yield call(
              postLOAN,
              storage,
              master,
              product,
              uuid,
              action.meta.stepName
            );
            if (r.success) {
              yield put(
                updateAPIStorageLOANProductAPI(
                  r.data as IProductLoanProgramInfo,
                  uuid as string
                )
              );
              yield put(
                notify("Lưu thành công", { options: { variant: "success" } })
              );
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);

              yield put(closeAppBackdrop());
            } else {
              yield put(closeAppBackdrop());
              yield put(
                notify(r.errors[0].detail, { options: { variant: "error" } })
              );
            }
          } else {
            yield put(closeAppBackdrop());
            yield put(setLOANNormalStorageLoanValidate(loanProductValidate));
            yield put(
              setAppNavigate(
                `/loan/normal/init/${uuid}/loan/${loanProductValidate.declare}`
              )
            );
          }
        }

        break;
      case "need-and-plan":
        if (ruleDisabled) {
          yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);
          yield put(closeAppBackdrop());
        } else {
          if (neededPlanValidate.valid) {
            const r: IApiResponse<unknown> = yield call(
              postLOAN,
              storage,
              master,
              product,
              uuid,
              action.meta.stepName
            );
            if (r.success) {
              yield put(
                updateAPIStorageLOANNeededPlan(
                  r.data as ICapitalNeedLoanPlanInfo,
                  uuid as string
                )
              );
              yield put(
                notify("Lưu thành công", { options: { variant: "success" } })
              );
              yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);

              yield put(closeAppBackdrop());
              yield put(fetchListDataHistoryLogs(los_uuid));
            } else {
              yield put(closeAppBackdrop());
              yield put(
                notify(r.errors[0].detail, { options: { variant: "error" } })
              );
            }
          } else {
            yield put(closeAppBackdrop());
            yield put(setLOANNormalStorageLoanValidate(neededPlanValidate));
            yield put(
              setAppNavigate(
                `/loan/normal/init/${uuid}/loan/${neededPlanValidate.declare}`
              )
            );

            if (neededPlanValidate.role === "compare") {
              yield put(
                notify("Số tiền gốc dự kiến trả mỗi kỳ không hợp lệ", {
                  options: { variant: "error" },
                })
              );
            } else {
              yield put(
                notify(
                  "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.",
                  { options: { variant: "error" } }
                )
              );
            }
          }
        }
        break;
      case "business/household-legal":
        if (ruleDisabled) {
          yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);
          yield put(closeAppBackdrop());
        } else {
          if (businessLegalValidate.valid) {
            const r: IApiResponse<unknown> = yield call(
              postLOAN,
              storage,
              master,
              product,
              uuid,
              action.meta.stepName
            );
            if (r.success) {
              yield put(
                updateAPIStorageLOANBusinessLegal(
                  r.data as IBusinessHouseholdInfo,
                  uuid as string
                )

              );
              yield put(
                notify("Lưu thành công", { options: { variant: "success" } })
              );
              yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);

              yield put(closeAppBackdrop());
              yield put(fetchListDataHistoryLogs(los_uuid));
            } else {
              yield put(closeAppBackdrop());
              yield put(
                notify(r.errors[0].detail, { options: { variant: "error" } })
              );
            }
          } else {
            yield put(closeAppBackdrop());
            yield put(setLOANNormalStorageLoanValidate(businessLegalValidate));
            yield put(
              setAppNavigate(
                `/loan/normal/init/${uuid}/loan/${businessLegalValidate.declare}`
              )
            );
            if (businessLegalValidate.role === "warehouse") {
              yield put(
                notify("Vui lòng nhập đủ thông tin kho hàng hoặc bỏ trống", {
                  options: { variant: "error" },
                })
              );
            } else {
              yield put(
                notify(
                  "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.",
                  { options: { variant: "error" } }
                )
              );
            }
          }
        }
        break;
      case "business/finance-analysis":
        if (ruleDisabled) {
          yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);
          yield put(closeAppBackdrop());
        } else {
          if (financeValidate.valid) {
            const r: IApiResponse<unknown> = yield call(
              postLOAN,
              storage,
              master,
              product,
              uuid,
              action.meta.stepName
            );
            if (r.success) {
              yield put(
                updateAPIStorageLOANFinance(
                  r.data as IFinancialAnalysisInfo,
                  uuid as string
                )
              );
              yield put(
                notify("Lưu thành công", { options: { variant: "success" } })
              );
              yield callFuncSetNavigate(action.payload, action.meta.stepName, action.meta.uuid);

              yield put(closeAppBackdrop());
              yield put(fetchListDataHistoryLogs(los_uuid));
            } else {
              yield put(closeAppBackdrop());
              yield put(
                notify(r.errors[0].detail, { options: { variant: "error" } })
              );
            }
          } else {
            yield put(closeAppBackdrop());
            yield put(setLOANNormalStorageLoanValidate(financeValidate));
            yield put(
              setAppNavigate(
                `/loan/normal/init/${uuid}/loan/${financeValidate.declare}`
              )
            );
            if (financeValidate.role === "compare") {
              yield put(
                notify(
                  "Giá trị Tổng Nguồn Vốn không bằng Tổng Tài Sản trong một kỳ, vui lòng kiểm tra lại",
                  { options: { variant: "error" } }
                )
              );
            } else {
              yield put(
                notify(
                  "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.",
                  { options: { variant: "error" } }
                )
              );
            }
          }
        }
        break;
    }
  } catch (e) {
    console.log(e);
  }

}

function* callFuncSetNavigate(current: number, stepName: string, uuid: string) {
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  const ruleDisabled: boolean = yield select(getRuleDisbled);
  const isCheckLoanDataProduct: boolean = yield select(isCheckExistLoanDataProduct);
  const currentStateGuide: IStateStorageGuide | undefined = yield select(checkRoleButtonBar);

  if (!ruleDisabled) {
    if (isCheckLoanDataProduct && stepName === "need-and-plan") {
      yield put(setAppNavigate(
        `/loan/normal/init/${los_uuid}/income/borrower/${uuid}/salary`
      ))
      return;
    }
    if (current + 1 === 3 && stepName === "business/finance-analysis") {
      yield put(setAppNavigate(
        `/loan/normal/init/${los_uuid}/income/borrower/${uuid}/salary`
      ))
      return;
    }
    yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/loan/${stepsLOAN[current + 1]}`))
  } else {
    if (current + 1 === 3 && stepName === "business/finance-analysis") {
      yield put(setAppNavigate(
        `/loan/normal/init/${los_uuid}/income/borrower/${uuid}/salary`
      ))
    } else {
      yield put(setAppNavigate(
        `/loan/normal/init/${los_uuid}/loan/${stepsLOAN[current + 1]}`
      ))
    }
  }
}

function* handleDeleteLOAN(action: PayloadAction<string>) {
  try {
    const uuid: string = yield select(getLOANNormalStorageUuid);
    const r: IApiResponse<unknown> = yield call(
      deleteLOAN,
      action.payload,
      uuid
    );
    if (r.success) {
      // clear storage
      yield put(clearStorageDelete(action.payload));
      yield put(notify("Xóa thành công", { options: { variant: "success" } }));
    } else {
      yield put(notify(r.errors[0].detail, { options: { variant: "error" } }));
    }
  } catch (e) { }
}
function spliceIntoChunks(arr: {
  parent_id: string | number | null;
  doc_id: string | number | null;
  fileData: any;
}[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}
function* uploadMultiLOAN(listFilesUpload: {
  parent_id: string | number | null;
  doc_id: string | number | null;
  fileData: any;
}[], payload: ILOANNormalLOANUpload) {
  const arrayFile = [...listFilesUpload];
  const listFilesUploadFinal: ILOANNormalChildfile[] = []

  const listChunkArray = spliceIntoChunks(arrayFile, 10);
  const custom_keys: { [key: number | string]: CUSTOM_KEY_FILE } = {};
  yield* listChunkArray.map(function* (attachFile) {
    let fileIndex = 0;
    let formDataFile = new FormData();
    yield* attachFile.map(function* (file) {
      const { parent_id = null, doc_id = null } = file;
      const fileData = file.fileData;
      try {
        const resBuf = yield call(fetch, fileData.file_upload);
        const buf = yield resBuf.arrayBuffer();
        const file: File = new File([buf], fileData.name, {
          type: fileData.content_type,
        });
        yield _.set(custom_keys, [fileIndex], {
          parent_id,
          doc_id,
          local_id: fileData.uuid,
          description: fileData.description,
        });
        yield fileIndex++;
        yield formDataFile.append("files", file);
      } catch (error) {
        console.log("error FETCH FILE", error);
      }
    });
    yield formDataFile.append("custom_keys", JSON.stringify(custom_keys));
    try {
      const r: IApiResponse<IUploadFileLOAN[]> = yield call(
        saveFileLOAN,
        formDataFile
      );
      const dataResponse: IUploadFileLOAN[] | null = r?.data ?? [];
      if (dataResponse?.length === 0) return;
      const user: IUser | undefined = yield select(getBranchCodeUser);
      const dataUploadDocument: ILOANNormalChildfile[] = dataResponse.map(
        (file) => {
          const result: ILOANNormalChildfile = {
            ...file,
            created_at: Number(file.created_at ?? 0),
            created_by: _.get(user, "full_name", ""),
            name: decodeURI(file.name),
            file_upload: null,
            description: file.custom_keys.description
          };
          return result;
        }
      );
      listFilesUploadFinal.push(...dataUploadDocument)
      // yield put(
      //   mappingDataLOANNormalStorageLOANModalAttachFile(dataUploadDocument)
      // );
    } catch (error) {
      console.log("error handle upload file", error);
      yield put(notify("Lưu thất bại", { options: { variant: "error" } }));
    }
  })
  yield updateDocumentListAfterUpload(listFilesUploadFinal, payload)
}
export function* handleUpLoadFileAttach(
  action: PayloadAction<ILOANNormalLOANUpload>
) {
  // if (action.payload.dataFile.length === 0) return;
  const listFilesUpload: {
    parent_id: string | number | null;
    doc_id: string | number | null;
    fileData: any;
  }[] = [];
  action.payload.dataFile.forEach((doc) => {
    if (doc.document_group.length === 0) return;
    doc.document_group.forEach((childDoc) => {
      childDoc?.child_files?.forEach((item) => {
        if (
          item.uuid?.includes(PREFIX_LOCAL)
        ) {
          listFilesUpload.push({
            parent_id: doc.document_id ?? "",
            doc_id: childDoc.document_id ?? "",
            fileData: item,
          });
        }
      });
    });
  });
  if (listFilesUpload.length === 0) {
    yield updateDocumentListAfterUpload([], action.payload)
  }

  yield uploadMultiLOAN(listFilesUpload, action.payload)
}

function* updateDocumentListAfterUpload(fileListAfterUpload: ILOANNormalChildfile[], documentList: ILOANNormalLOANUpload){
  const newChildFileList: ILOANNormalDocumentInfoList[] = documentList.dataFile.map(parentDoc => {
    return {
      ...parentDoc,
      document_group: parentDoc.document_group.map(doc => {
        return {
          ...doc,
          child_files: doc.child_files?.map(file => {
            const newFileUpload = fileListAfterUpload.find(e => e.custom_keys?.local_id === file.uuid)

            if(newFileUpload) return {...newFileUpload}
            else return {...file}
          }) ?? []
        }
      })
    }
  })

  yield put(mappingLOANDataFileAlterUpload(newChildFileList))
}

function* handleSaveNeedForPlan(needSyncData = true) {
  const storage: ILOANNormalStorageLOANState = yield select(
    getLOANNormalStorageLOAN
  );
  const master: IMasterData = yield select(getMasterData);
  const product: ILOANNormalProduct = yield select(getLOANNormalStorageProduct);
  const uuid: string = yield select(getLOANNormalStorageUuid);
  try {
    const r: IApiResponse<unknown> = yield call(
      postLOAN,
      storage,
      master,
      product,
      uuid,
      "need-and-plan"
    );
    if (r.success) {
      if (needSyncData) {
        yield put(
          updateAPIStorageLOANNeededPlan(
            r.data as ICapitalNeedLoanPlanInfo,
            uuid as string
          )
        );
        yield put(notify("Lưu thành công", { options: { variant: "success" } }));
      }
      else {
        yield put(notify("Xóa thành công", { options: { variant: "success" } }));
      }
      yield put(closeAppBackdrop());
    } else {
      yield put(closeAppBackdrop());
      yield put(notify(r.errors[0].detail, { options: { variant: "error" } }));
    }
  } catch (error) {
    yield put(closeAppBackdrop());
    yield put(notify("Lưu thất bại", { options: { variant: "error" } }));
  }
}

function* handleSaveNeedForPlanFile(isDelete = false) {
  const storage: ILOANNormalStorageLOANState = yield select(
    getLOANNormalStorageLOAN
  );
  const master: IMasterData = yield select(getMasterData);
  const product: ILOANNormalProduct = yield select(getLOANNormalStorageProduct);
  const uuid: string = yield select(getLOANNormalStorageUuid);
  try {
    const r: IApiResponse<unknown> = yield call(
      postLOAN,
      storage,
      master,
      product,
      uuid,
      "need-and-plan"
    );
    if (r.success) {
        yield put(
          updateAPIStorageLOANNeededPlan(
            r.data as ICapitalNeedLoanPlanInfo,
            uuid as string
          )
        );

      if(isDelete){
        yield put(notify("Xóa thành công", { options: { variant: "success" } }));
      }
      else {
        yield put(notify("Lưu thành công", { options: { variant: "success" } }));
      }
      yield put(closeAppBackdrop());
    } else {
      yield put(closeAppBackdrop());
      console.log(r.errors[0].detail)
    }
  } catch (error) {
    yield put(closeAppBackdrop());
    if(isDelete){
      yield put(notify("Xóa thất bại", { options: { variant: "error" } }));
    }
    else {
      yield put(notify("Lưu thất bại", { options: { variant: "error" } }));
    }
  }
}

function* handleSaveLOANNormalStorageLOANModalAttachFile(
  action: PayloadAction<ILOANNormalLOANUpload>
) {
  yield put(showAppBackdrop());
  yield handleUpLoadFileAttach(action);
  yield handleSaveNeedForPlanFile(action.payload.isDelete);
  yield put(closeAppBackdrop());
}

function* handleRemoveLOANDocument(action: PayloadAction<string>) {
  yield put(showAppBackdrop());

  if (action?.payload?.includes(PREFIX_LOCAL)) return;
  yield handleSaveNeedForPlan(false);
  yield put(closeAppBackdrop());

}
export default function* storageLOANSaga() {
  yield takeEvery(saveLoanProduct.type, handleSaveLOANProduct);
  yield takeEvery(deleteLOANNormalStorage.type, handleDeleteLOAN);
  yield takeEvery(
    removeAllLOANNormalStorageLOANParentDoc.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    removeLOANNormalStorageLOANParentDoc.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    removeLOANNormalStorageLOANDoc.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    removeLOANNormalStorageLOANFile.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    saveLOANNormalStorageLOANModalAttachFile.type,
    handleSaveLOANNormalStorageLOANModalAttachFile
  );
  yield takeEvery(handleContinueLoan.type, handleSaveContinueLoan);
}
