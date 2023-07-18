import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from "@mui/material/Grid";
import CardInside from "views/components/layout/CardInside";
import TextArea from "views/components/base/TextArea";
import {
  getDeclareLegalBorr,
  getLoanLegalUseListActive,
  getLoanLegalUseListData 
} 
  from "features/loan/normal/storage/legal/selectors";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import { setLegalOtherData } from "features/loan/normal/storage/legal/actions";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";


const LegalRelatedOther: FC = () => {

  const dispatch = useDispatch();
  const SCREEN = ELegalTypeScreen.LAW_RLT;

  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN))
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN))
  const dataUseList = useSelector(getLoanLegalUseListData(SCREEN, activeUserListLegal))
  const ruleDisabled = useSelector(getRuleDisbled)


  const handleNoteChange = (note: string) => {
    dispatch(setLegalOtherData(note, { 
      declare:SCREEN, 
      key: "note",
      uuidActiveUser: activeUserListLegal
    }));
  }

  return (
    <CardInside
      title="III. Thông tin khác"
      classBody="p-6 h-full"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextArea
            label="1. Ghi chú"
            onChange={(val) => handleNoteChange(val)}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal  || ruleDisabled}
            value={dataUseList?.other.note ?? ""}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default LegalRelatedOther;
