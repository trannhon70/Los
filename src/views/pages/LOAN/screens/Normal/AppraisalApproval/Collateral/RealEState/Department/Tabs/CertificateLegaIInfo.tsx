import { Grid } from "@mui/material";
import {
  setOnChangeCollaretalCertificateDepartmentApproval,
  setOnChangeCollaretalCertificateDepartmentListLegalDataApproval,
} from "features/loan/normal/storageApproval/collateral/actions";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IPersonCertificateLegal,
} from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListOption,
} from "views/components/layout/ObjectList";
import SelectCollateralCertifiedType from "views/components/widgets/SelectCollateralCertifiedType";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { SxObjectListUser, SxSelectDisiable } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import ModalTableInfoLegal from "../../../ModalTableInfoLegal";
import { SxOnjectListLandAssets } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import {
  getInfoAllUserLegalApproval,
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreInfoLegalFromOwnerLegalApproval,
  getLOANormalStoreLegalCertifiCateDepartmentPersonApproval,
  getLOANormalStoreLegalDepartmentApproval,
  getLOANormalStoreLegalDepartmentCertificatesApproval,
  getLOANormalStoreLegalDepartmentCertificatesUuidActiveApproval,
  getLOANormalStoreLegalCertifiCateDepartmentPersionListLegalData
} from "features/loan/normal/storageApproval/collateral/selector";
import { setUuidAttachmentLegalApproval } from "features/loan/normal/storageApproval/collateral/actions";
import * as _ from 'lodash';
import { useLegalAttachmentHook } from "../../../AttachmentLegal";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
// import LegalAttachmentModal from "views/pages/LOAN/screens/Normal/Initialize/Legal/AttachmentModalServices";
import AttachmentModalDocs from "./AttachmentModalDocs";
export interface CertificateLegaIInfoProps {
  uuIdSubType?: string;
  uuIdData?: string;
}

const CertificateLegaIInfo: FC<CertificateLegaIInfoProps> = (props) => {

  const { uuIdSubType = "", uuIdData = "" } = props;
  const dispatch = useDispatch();
  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActiveApproval(uuIdData, uuIdSubType)
  );

  const dataCerUuidActive = useSelector(
    getLOANormalStoreLegalDepartmentCertificatesUuidActiveApproval(
      uuIdData,
      uuIdSubType
    )
  );

  const dataCer = useSelector(
    getLOANormalStoreLegalDepartmentCertificatesApproval(
      uuIdData,
      uuIdSubType
    )
  );
  

  const dataCerPersionList = useSelector(
    getLOANormalStoreLegalCertifiCateDepartmentPersonApproval(
      uuIdData,
      uuIdSubType,
      dataCerUuidActive
    )
  );

  const activeCreOptionList = dataCer?.findIndex(
    (ce) => ce.uuid_certificate_legal === dataCerUuidActive
  );

  const infoLegalFromOwner = useSelector(getLOANormalStoreInfoLegalFromOwnerLegalApproval(uuIdData ?? '', uuIdSubType ?? ''))
  const infoAllUserLegal = useSelector(getInfoAllUserLegalApproval);
  const dataUserListLegaDetails = useSelector(
    getLOANormalStoreLegalCertifiCateDepartmentPersionListLegalData(
      uuIdData ?? "",
      uuIdSubType ?? "",
      dataCerUuidActive
    )
  );
  const Department = useSelector(getLOANormalStoreLegalDepartmentApproval(uuIdData, uuIdSubType));

  const [ openModalOwner, setOpenModalOwner ] = useState(false);
  const {getCountAttachFileWithLegal_uuid}= useLegalAttachmentHook();
  const onChangeCre = (current: number) => {
    const currentActive = dataCer
      ? dataCer[current]?.uuid_certificate_legal
      : "";
    dispatch(
      setOnChangeCollaretalCertificateDepartmentApproval(currentActive, {
        uuidActiveData: uuIdData,
        uuidActiveSubtype: uuIdSubType,
        uuidActiveitems: SubTypeItemsActive,
      })
    );
  };
  const [openAttachmentModalDocsModal,setOpenAttachmentModalDocsModal] = useState<{isOpen:boolean,uuid:string}>({isOpen:false,uuid:''});
  const [ disabledInputDepartmentCer, setDisabledInputDepartmentCer ] = useState<boolean>(false);
  const countAttachFileCertificate = (docs:ILOANNormalDocument[])=>{
    let count = 0;
    docs.forEach(doc=>{
      count += doc?.child_files?.filter(f=>!f?.uuid?.includes(PREFIX_LOCAL))?.length ?? 0;
    });
    return count;
  }

  const optionsCer: ObjectListOption[] =
    dataCer?.map((item, i) => ({
      label: `Giấy chứng nhận ${i + 1}`,
      circle: <BsFillFileEarmarkFill />,
      attachment: countAttachFileCertificate(item.documents),
      value: item,
    })) ?? [];


  const optionsCerUseListLegal: ObjectListOption[] =
    infoAllUserLegal?.filter(o1 => dataCerPersionList?.persons?.some(o2 => o1.uuid === o2.person_uuid))?.map((item, i) => ({
      label: item.full_name,
      attachment:getCountAttachFileWithLegal_uuid(item.uuid),
    })) ?? [];

  const onChangeDataUserList = (
    value: string | number | null,
    key: keyof IPersonCertificateLegal
  ) => {
    dispatch(
      setOnChangeCollaretalCertificateDepartmentListLegalDataApproval(value, {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveCer: dataCerUuidActive,
        key,
      })
    );
  };

  const onCloseModalOwner = () => {
    setOpenModalOwner(false);
  };
  useEffect(() => {
    /**
     * Check uuid Department Cer is emty
     */
    let isCheck = dataCerUuidActive?.length > 0 ? false : true;
    if(disabledInputDepartmentCer !== isCheck) {
      setDisabledInputDepartmentCer(isCheck)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCerUuidActive])
  const disabled = Department?.has_certificate ==='N'

  useEffect(()=>{
    if(disabled){
      onChangeDataUserList(null,'other_certificate_type')
      onChangeDataUserList(null,'other_certificate_type_other')
      onChangeDataUserList(null,'certificate_code')
      onChangeDataUserList(null,'certificate_no')
      onChangeDataUserList(null,'issue_date')
      onChangeDataUserList(null,'place_of_issue')
    }else{
      onChangeDataUserList(null,'contract_number_type')
      onChangeDataUserList(null,'contract_number')
      onChangeDataUserList(null,'contract_date')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[disabled])
  
  return (
    <>
      <Grid container spacing={3} className="pt-6">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ObjectList
            enableAdd={false}
            enableMenu={false}
            labelLength="Số lượng GCN: &nbsp;"
            onChange={onChangeCre}
            current={activeCreOptionList}
            options={optionsCer}
            sx={{...SxOnjectListLandAssets,"& .ObjectListLabel":{
              border:'1px solid var(--mscb-danger) !important'
            }}}
            attachLabel="tập tin"
            onAttach={(index)=>{
              const uuidCert = _.get(optionsCer,[index,'value','uuid_certificate_legal'],'');
              if(!uuidCert) return;
              setOpenAttachmentModalDocsModal({isOpen:true,uuid:uuidCert});
            }}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <CardInside
            title="I. Thông tin giấy chứng nhận"
            sx={{
              "& legend": {
                fontSize: "16px",
              },
            }}
          >
            <Grid container spacing={3} className="pl-4 pb-4">
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <ObjectList
                  avatar
                  enableAdd={false}
                  enableMenu={false}
                  labelLength="Người sở hữu: &nbsp;"
                  // current={activeCreOptionListUseLegal}
                  options={optionsCerUseListLegal}
                  onAttach={(index)=>{
                    const data = infoAllUserLegal?.filter(o1 => dataCerPersionList?.persons?.some(o2 => o1.uuid === o2.person_uuid));
                    const person_uuid = _.get(data,[index,'uuid']);
                    if(!person_uuid) return;
                    
                    dispatch(setUuidAttachmentLegalApproval(person_uuid));
                  }}
                  sx={{...SxObjectListUser,
                    "& .attachBox":{
                      right:"30%",
                      bottom:"10px"
                    }
                }}
                  attachLabel="tập tin"
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertifiedType
                  label="1. Loại GCN"
                  value={dataUserListLegaDetails?.other_certificate_type}
                  disabled
                  required
                  sx={SxSelectDisiable}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="2. Loại GCN khác"
                  value={dataUserListLegaDetails?.other_certificate_type_other}
                  disabled
                  required={dataUserListLegaDetails?.other_certificate_type === "OTHER" ? true : false}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="3. Số GCN"
                  value={dataUserListLegaDetails?.certificate_code}
                  disabled
                  required
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="4. Số vào sổ cấp GCN"
                  value={dataUserListLegaDetails?.certificate_no?.toString()}
                  disabled
                  required
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <InputDate
                  label="5. Ngày cấp"
                  value={(dataUserListLegaDetails?.issue_date)}
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="6. Nơi cấp"
                  value={dataUserListLegaDetails?.place_of_issue}
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="7. Loại hợp đồng"
                  value={dataUserListLegaDetails?.contract_number_type}
                  required={Department?.has_certificate==='N'}
                  disabled
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="8. Số hợp đồng"
                  value={dataUserListLegaDetails?.contract_number}
                  disabled
                  required={Department?.has_certificate==='N'}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <InputDate
                  label="9. Ngày hợp đồng"
                  value={(dataUserListLegaDetails?.contract_date ?? 0)}
                  required={Department?.has_certificate==='N'}
                  disabled
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>

        <ModalTableInfoLegal
          open={openModalOwner}
          onClose={onCloseModalOwner}
          activeSubType={uuIdSubType}
          uuIdData={uuIdData}
          uuidActiveitems={SubTypeItemsActive}
          uuidActiveCer={dataCerUuidActive}
          listInfo={
            infoAllUserLegal?.filter(o1 => infoLegalFromOwner?.some(o2 => o1.uuid === o2))
          }
          listDetail={dataUserListLegaDetails?.persons}
        />
          {openAttachmentModalDocsModal.isOpen && <AttachmentModalDocs
          open={Boolean(openAttachmentModalDocsModal.isOpen)}
          onClose={() => setOpenAttachmentModalDocsModal({isOpen:false,uuid:''})}
          uuIdData={uuIdData}
          activeSubType={uuIdSubType}
          activeUuid={openAttachmentModalDocsModal.uuid}
          itemType={'department'}
          viewOnly
        />
        }
      </Grid>
    </>
  );
};

export default CertificateLegaIInfo;
