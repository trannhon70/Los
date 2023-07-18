import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from "@mui/material/Grid";
import CardInside from "views/components/layout/CardInside";
import Input from "views/components/base/Input";
import SelectRelationship from "views/components/widgets/SelectRelationship";
import { ILOANNormalStorageLegalDeclareBasic } from "types/models/loan/normal/storage/Legal";
import { onChangeDataUseList } from "features/loan/normal/storage/legal/actions";
import {
  getDeclareLegalBorr,
  getLoanLegalUseListActive, 
  getLoanLegalUseListData } 
  from "features/loan/normal/storage/legal/selectors";
import { SxSelectDisabled } from "../style";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";


const ContactBasic: FC = () => {
  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  const SCREEN = ELegalTypeScreen.REALTED;

  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN));
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN));
  const dataUseList = useSelector(getLoanLegalUseListData(SCREEN,activeUserListLegal));
  const ruleDisabled = useSelector(getRuleDisbled)


  const handleFullNameChange = (
    value: string | number | null, 
    key : keyof ILOANNormalStorageLegalDeclareBasic
  ) => {
    dispatch(onChangeDataUseList(value, {declare:SCREEN,
      uuidActiveUser:activeUserListLegal,
      key:key
    }));
  }
 

  return (
    <CardInside
      title="I. Thông tin cơ bản"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="1. Họ và tên người liên hệ"
            required
            sx={{
              "& input": {
                textTransform: "uppercase",
              },
            }}
            onDebounce={(val)=>{handleFullNameChange(val,'fullname')}}
            value={dataUseList?.basic.fullname.toUpperCase()}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'fullname', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectRelationship
            label="2. Mối quan hệ với KH vay"
            required
            onChange={(val)=>{handleFullNameChange(val,'relationship')}}
            value={dataUseList?.basic.relationship}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            sx={SxSelectDisabled}
            message={getMessage(SCREEN, 'relationship', { position: dataUseList?.uuidActiveLocal ?? "" })}
            otherValueFlag={"N"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="3. Số điện thoại liên lạc"
            type="number"
            required
            onDebounce={(val)=>{handleFullNameChange(val,'mobile')}}
            value={dataUseList?.basic.mobile}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'mobile', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            maxlength={100}
            label="4. Email"
            sx={{
              "& input": {
                textTransform: "lowercase",
              },
            }}
            onDebounce={(val)=>{handleFullNameChange(val,'email')}}
            value={dataUseList?.basic.email}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'email',{ position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default ContactBasic;
