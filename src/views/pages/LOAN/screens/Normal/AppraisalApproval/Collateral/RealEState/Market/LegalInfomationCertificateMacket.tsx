import { FC, useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import InputDate from "views/components/base/InputDate";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnChangeCollaretalCertificateMaketApproval,
  setOnChangeCollaretalCertificateMaketPersionListLegalDataApproval,
}
from "features/loan/normal/storageApproval/collateral/actions";
import { AiOutlineFileWord } from "react-icons/ai";
import { SxObjectListUser, SxOnjectListLandAssets } from "../../style";
import { IMaketCertificates } from "types/models/loan/normal/storage/CollaretalV2";
import ModalTableInfoLegal from "../../ModalTableInfoLegal";
import { Typography } from "@mui/material";
import {
  getInfoAllUserLegalApproval,
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreInfoLegalFromOwnerLegalApproval,
  getLOANormalStoreLandLegalItemActiveApproval,
  getLOANormalStoreLegalCertifiCateMaketPersionApproval,
  getLOANormalStoreLegalCertifiCateMaketPersionListLegalDataApproval,
  getLOANormalStoreLegalMaketCertificatesApproval,
  getLOANormalStoreLegalMaketCertificatesUuidActiveApproval
} from "features/loan/normal/storageApproval/collateral/selector";
import { setUuidAttachmentLegalApproval } from "features/loan/normal/storageApproval/collateral/actions";
import * as _ from 'lodash';
import {ILOANNormalDocument} from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
import {getListDeclareDataLegal} from "features/loan/normal/storage/legal/selectors";
import AttachmentModalDocs from "./AttachmentModalDocs";
import { ILOANNormalStorageLegalFile } from "types/models/loan/normal/storage/Legal";
export interface LegalInfomationCertificateMacketProps {
  uuIdSubType?: string;
  uuIdData?: string;
}
const LegalInfomationCertificateMacket: FC<LegalInfomationCertificateMacketProps> = (props) => {

  const { uuIdSubType, uuIdData } = props
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval(uuIdData ?? '', uuIdSubType ?? ""))
  const [openModalOwner, setOpenModalOwner] = useState(false);
  // const [openCertificateFile,setOpenCertificateFile] = useState<{open:string,}
  const dispatch = useDispatch()

  const listDeclareDataLegal = useSelector(getListDeclareDataLegal);
  const dataCerUuidActive = useSelector(getLOANormalStoreLegalMaketCertificatesUuidActiveApproval(uuIdData ?? '', uuIdSubType ?? ''));
  const dataCer = useSelector(getLOANormalStoreLegalMaketCertificatesApproval(uuIdData ?? '', uuIdSubType ?? ''));
  const dataCerPersionList = useSelector(getLOANormalStoreLegalCertifiCateMaketPersionApproval(uuIdData ?? '', uuIdSubType ?? '', dataCerUuidActive));
  const infoLegalFromOwner = useSelector(getLOANormalStoreInfoLegalFromOwnerLegalApproval(uuIdData ?? '', uuIdSubType ?? ''))
  const infoAllUserLegal = useSelector(getInfoAllUserLegalApproval);
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActiveApproval(uuIdData ?? '',uuIdSubType ?? ''));
  const [openAttachmentModalDocsModal,setOpenAttachmentModalDocsModal] = useState<{isOpen:boolean,uuid:string}>({isOpen:false,uuid:''});
  const activeCreOptionList = dataCer?.findIndex(ce => ce.uuid_maket_certificate === dataCerUuidActive);

  const countAttachFileCertificate = (docs:ILOANNormalDocument[]) =>{
    let count = 0;
    docs.forEach(doc =>{
      count += doc?.child_files?.filter(f=>!f?.uuid?.includes(PREFIX_LOCAL))?.length ?? 0;
    })
    return count;
  }
  
  const optionsCer: ObjectListOption[] = dataCer?.map((item, i) => ({
    label: <Typography sx={{fontSize:'14px !important',fontWeight:'500 !important', textTransform:'initial'}}>Giấy chứng nhận {i + 1}</Typography>,
    circle: <AiOutlineFileWord />,
    attachment:countAttachFileCertificate(item.documents ?? []),
    value: item
  })) ?? []

  
  const getCountAttachFileDeclareTypeWithUuid = (activeUuid:string | null | undefined)=> {
    if(!activeUuid) return 0;
    const documentList : ILOANNormalStorageLegalFile[] = _.get(listDeclareDataLegal.find(it=>it.person_uuid === activeUuid ),'documentList',[]);
    let count = 0;
    documentList.forEach(doc=>{
      const child_files = _.get(doc,'child_files',[]);
      count += (child_files.filter(f=>!f.uuid.includes(PREFIX_LOCAL)).length ?? 0);
    })
    return count;
  }

  const onChangeCre = (current: number) => {
    const currentActive = dataCer ? dataCer[current]?.uuid_maket_certificate ?? '' : "";
    dispatch(setOnChangeCollaretalCertificateMaketApproval(currentActive, {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: uuIdSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? ''
    }))
  }

  const onCloseModalOwner = () => {
    setOpenModalOwner(false);
  };

  const optionsCerUseListLegal: ObjectListOption[] =
  infoAllUserLegal?.filter(o1 => dataCerPersionList?.some(o2 => o1.uuid === o2.person_uuid))?.map((item, i) => ({
    label: item.full_name,
    attachment:getCountAttachFileDeclareTypeWithUuid(item.uuid)
    // circle: <AiOutlineFileWord />,
  })) ?? [];


  const onChangeDataPersionList = (value: string | number | null, key: keyof IMaketCertificates) => {
    dispatch(setOnChangeCollaretalCertificateMaketPersionListLegalDataApproval(value, {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: uuIdSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? '',
      uuidActiveCer: dataCerUuidActive,
      key
    }))
  }

  const dataUserListLegaDetails = useSelector(getLOANormalStoreLegalCertifiCateMaketPersionListLegalDataApproval(
    uuIdData ?? '',
    uuIdSubType ?? '',
    dataCerUuidActive
  ))

  const disabledCertificates =   itemActive?.has_certificate_maket === "N"

  useEffect(()=>{
    if(disabledCertificates){
      onChangeDataPersionList(null, 'certificate_name')
      onChangeDataPersionList(null, 'certificate_code')
      onChangeDataPersionList(null, 'issue_date')
      onChangeDataPersionList(null, 'place_of_issue')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[disabledCertificates])

  return (
    <Grid container spacing={2.5} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <ObjectList
          enableAdd={false}
          enableMenu={false}
          labelLength="Số lượng GCN: &nbsp;"
          current={activeCreOptionList}
          options={optionsCer}
          onChange={onChangeCre}
          onAttach={(index)=>{
            const uuidCert = _.get(optionsCer,[index,'value','uuid_maket_certificate'],'');
            if(!uuidCert) return;
            setOpenAttachmentModalDocsModal({isOpen:true,uuid:uuidCert});
          }}
          attachLabel="tập tin"
          sx={{...SxOnjectListLandAssets,"& .ObjectListLabel":{
            border:'1px solid var(--mscb-danger) !important'
          }}}

        />
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <CardInside
          title="I. Pháp lý chợ/ô sạp/TTTM"
          sx={{
            "& legend": {
              fontSize: '16px'
            }
          }}
        >
          <Grid container spacing={2.5} className="pl-4 pb-4">
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ObjectList
                avatar
                enableAdd={false}
                enableMenu={false}
                // onChange={onChangeCrePersionListLegal}
                labelLength="Người sở hữu: &nbsp; "
                current={activeCreOptionList}
                options={optionsCerUseListLegal}
                onAttach={(index)=>{
                  const data = infoAllUserLegal?.filter(o1 => dataCerPersionList?.some(o2 => o1.uuid === o2.person_uuid));
                  const person_uuid = _.get(data,[index,'uuid']);
                  if(!person_uuid) return;
                  dispatch(setUuidAttachmentLegalApproval(person_uuid));
                }}
                attachLabel="tập tin"
                sx={{...SxObjectListUser,
                  "& .attachBox":{
                    right:"32%",
                    bottom:"15px"
                  }
              }}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="1. Tên GCN"
                value={dataUserListLegaDetails?.certificate_name ?? ""}
                disabled
                required={!disabledCertificates}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="2. Số GCN"
                disabled
                required={!disabledCertificates}
                value={dataUserListLegaDetails?.certificate_code ?? ""}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="3. Ngày cấp"
                disabled
                value={dataUserListLegaDetails?.issue_date ?? null}
                required={!disabledCertificates}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="4. Nơi cấp"
                disabled
                value={dataUserListLegaDetails?.place_of_issue ?? ""}
                required={!disabledCertificates}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="5. Tên hợp đồng thuê/mua địa điểm KD"
                value={dataUserListLegaDetails?.contract_name ?? ""}
                required
                disabled
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="6. Số hợp đồng thuê/mua địa điểm KD"
                value={dataUserListLegaDetails?.contract_code ?? ""}
                required
                disabled
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="7. Ngày ký kết"
                value={(dataUserListLegaDetails?.contract_date) ?? null}
                required
                disabled
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="8. Bên cho thuê/mua địa điểm kinh doanh"
                value={dataUserListLegaDetails?.contract_unit ?? ""}
                required
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
         listDetail={dataCerPersionList}
      />
      {
        openAttachmentModalDocsModal.isOpen && <AttachmentModalDocs
        open={Boolean(openAttachmentModalDocsModal.isOpen)}
        onClose={() => setOpenAttachmentModalDocsModal({isOpen:false, uuid:''})}
        uuIdData={uuIdData}
        activeSubType={uuIdSubType}
        activeUuid={openAttachmentModalDocsModal.uuid}
        itemType={'market'}
        viewOnly
        />
      }
    </Grid>
  )
}

export default LegalInfomationCertificateMacket;

