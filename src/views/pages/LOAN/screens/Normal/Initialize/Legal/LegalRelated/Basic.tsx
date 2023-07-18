import Grid from "@mui/material/Grid";
import { FC, useLayoutEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import SelectCustomerType from "views/components/widgets/SelectCustomerType";
import SelectRelationship from "views/components/widgets/SelectRelationship";
import { ILOANNormalStorageIdentity, ILOANNormalStorageLegalDeclareBasic } from "types/models/loan/normal/storage/Legal";
import { addLOANNormalStorageLegalDeclareIdentity, onChangeDataUseList } from "features/loan/normal/storage/legal/actions";
import {
  getDeclareLegalBorr,
  getLoanLegalUseListActive, 
  getLoanLegalUseListData } 
  from "features/loan/normal/storage/legal/selectors";
  import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
  import { SxSelectDisabled } from "../style";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { generateUUID } from "utils";
import useMasterData from "app/hooks/useMasterData";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";


const LegalRelatedBasic: FC = () => {

  const SCREEN = ELegalTypeScreen.LAW_RLT;
  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN))
  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN))
  const dataUseList = useSelector(getLoanLegalUseListData(SCREEN,activeUserListLegal))
  const ruleDisabled = useSelector(getRuleDisbled)

  const { register } = useMasterData();

  useLayoutEffect(() => {
    register("relationship", "N")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleFullNameChange = (
    value: string | number | null, 
    key : keyof ILOANNormalStorageLegalDeclareBasic
  ) => {
    dispatch(onChangeDataUseList(value, {declare:SCREEN,
      uuidActiveUser: activeUserListLegal,
      key:key
    }));
  }

  const handleChangeIdentityNum = (val: string) => {
    const idenStored = dataUseList?.identity ?? [];
    let updateIdentity: ILOANNormalStorageIdentity[] = [];
    if (idenStored.length === 0){
      updateIdentity.push({
        expiredDate: null,
        issuedDate: null,
        num: val,
        placeOfIssue: "",
        primaryFlag: true,
        type: "",
        uuid: generateUUID(),
        uuidRemote: ""
      })
    }
    else{
      updateIdentity = idenStored?.map(uiden => {
        uiden = {
          ...uiden,
          num: val
        }
        return uiden;
      })
    }


    dispatch(
      addLOANNormalStorageLegalDeclareIdentity(
        updateIdentity, 
        {
          declare : SCREEN,
          uuid_persion: activeUserListLegal
        }
      )
    );
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
          <SelectCustomerType
            label="1. Loại tổ chức/Cá nhân"
            onChange={(val)=>{handleFullNameChange(val,'customerType')}}
            value={dataUseList?.basic.customerType.toUpperCase()}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            sx={SxSelectDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="2. Tên tổ chức/Cá nhân"
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
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="3. Mã số thuế/CMND"
            required
            onDebounce={(val)=>{handleChangeIdentityNum(val)}}
            value={dataUseList?.identity[0]?.num ?? ""}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'numtax', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectRelationship
            label="4. Mối quan hệ với KH vay"
            required
            onChange={(val)=>{handleFullNameChange(val,'relationship')}}
            value={dataUseList?.basic.relationship}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'relationship', { position: dataUseList?.uuidActiveLocal ?? "" })}
            sx={SxSelectDisabled}
            otherValueFlag={"N"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="5. Số điện thoại liên lạc"
            type="number"
            // maxlength={10}
            onChange={(val)=>{handleFullNameChange(val,'mobile')}}
            value={dataUseList?.basic.mobile}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'mobile', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="6. Mã CIF trong CORE"
            type="number"
            onChange={(val)=>{handleFullNameChange(val,'cif')}}
            value={dataUseList?.basic.cif}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default LegalRelatedBasic;
