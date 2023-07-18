import { call, put, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, showAppBackdrop } from "features/app/store/slice";
import { getLOANNormalStorageCICSave } from "features/loan/normal/storage/cic/selectors";
import { fetchListDataHistoryLogs } from "features/loan/normal/storage/historyLogs/action";
import { getListPersonUUID } from "features/loan/normal/storage/legal/selectors";
import { getLOANNormalLOSuuid } from "features/loan/normal/storage/selectors";
import { select } from "redux-saga/effects";
import { IApiResponse } from "types";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import { ILOANNormalStorageCICState } from "types/models/loan/normal/storage/CIC";
import { ItypeAuto } from "types/models/loan/normal/storage/Legal";
import { IMasterData } from "types/models/master-data";
import { saveCICAPIAuto } from "./api";
import {
  AUTOFILLCIC
} from "./slice";

function* handleSaveAutoCIC(
  action: PayloadAction<boolean, string, { organ: string, position: string }>
) {
  try {
    if (action.meta.organ === "rating-review") {
      yield put(showAppBackdrop());
      yield put(
        notify(" Lưu thành công ", { options: { variant: "success" } })
      );
      yield put(closeAppBackdrop());
    } else {
      const los_uuid: string = yield select(getLOANNormalLOSuuid);
      const list_person: ItypeAuto[] = yield select(getListPersonUUID);
      const listCredit = [
        {
          name: "quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac",
          type: "other"
        },
        {
          name: "khoan-vay-hien-huu-tai-scb",
          type: "scb"
        }
      ]
      const params: [
        ILOANNormalStorageCICState,
        string[],
        string,
        IMasterData,
        ILOANNormalConfigState
      ] = yield select(getLOANNormalStorageCICSave);
      yield put(showAppBackdrop());
      for (let i in listCredit) {
        for (let u in list_person) {
          const r: IApiResponse<unknown> = yield call(saveCICAPIAuto, ...params,
            action.meta.position,
            list_person[u].los_uuid,
            list_person[u].declare_type,
            list_person[u].id_num,
            list_person[u].uuid_num,
            listCredit[i].name,
            listCredit[i].type,
            );
          if (r.success) {
            notify(" Lưu thành công ", { options: { variant: "success" } })
            yield put(fetchListDataHistoryLogs(los_uuid));
          }
        }
      }

      yield put(closeAppBackdrop());
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(closeAppBackdrop());
  }
}

export default function* devToolLOANNormalCICSaga() {
  yield takeEvery(AUTOFILLCIC.type, handleSaveAutoCIC);
}