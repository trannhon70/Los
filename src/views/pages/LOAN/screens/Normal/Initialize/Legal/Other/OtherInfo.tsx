import Grid from "@mui/material/Grid";
import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardInside from "views/components/layout/CardInside";
import TextArea from "views/components/base/TextArea";
import { sxCardInsideOther, SxTextAreaNote } from "../style";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import {
  getLoanLegalUseListActive,
  getLoanLegalUseListData,
  getDeclareLegalBorr,
  getBranchCodeUser,
  getdataLegal
} from "features/loan/normal/storage/legal/selectors";
import { setLegalOtherData } from "features/loan/normal/storage/legal/actions";
import { timestampToDate } from "utils/date";
import { APP_DATE_FORMAT } from "utils/constants";
import useStorage from "../useStorage";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";


const OtherInfo: FC = () => {

  const dispatch = useDispatch();
  const SCREEN = ELegalTypeScreen.OTHER;

  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN));
  const dataUseList = useSelector(getLoanLegalUseListData(SCREEN,activeUserListLegal));
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN));
  const ruleDisabled = useSelector(getRuleDisbled)

  const handleNoteChange = (note: string) => {
    dispatch(setLegalOtherData(note, {
      declare:SCREEN,
      key: "note",
      uuidActiveUser: activeUserListLegal
    }));
  }
  const dataName = useSelector(getBranchCodeUser)
  const { valueModify } = useStorage(SCREEN);
  const checkExistData = !!useSelector(getdataLegal(SCREEN)).info.find(x=>x.uuidActiveLocal === activeUserListLegal)?.other.note.length;

  return (
    <CardInside
      title="IV. Thông tin khác"
      sx={sxCardInsideOther}
    >
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12} style={{ position: "relative" }}>
          {dataUseList && <span
            style={{
              position: "absolute",
              right: 0,
            }}
          >
            <i style={{ fontSize: "12px", color: "#1825aa", }}>
              {`Cập nhật: ${checkExistData ? dataName?.full_name + ' - ' + timestampToDate(valueModify ?? 0, 'HH:mm ' + APP_DATE_FORMAT) : `-`}`}
            </i>
          </span>}
          <TextArea
            label="1. Ghi chú"
            sx={SxTextAreaNote}
            onDebounce={(val) => handleNoteChange(val)}
            value={dataUseList?.other.note ?? ""}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default OtherInfo;
