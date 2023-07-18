import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListOption,
} from "views/components/layout/ObjectList";
import InputDate from "views/components/base/InputDate";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnChangeCollaretalCertificateApproval,
} from "features/loan/normal/storageApproval/collateral/actions";
import {
  getInfoAllUserLegalApproval,
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreColalteralLandCTXDGcnQshUuidActiveAproval,
  getLOANormalStoreDataItemActive,
  getLOANormalStoreInfoLegalFromOwnerLegalApproval,
  getLOANormalStoreLegalCertifiCateApproval,
  getLOANormalStoreLegalCertifiCateUseListLegalDataApproval,
  getTypeLandApproval,
} from "features/loan/normal/storageApproval/collateral/selector";
import collateralStyle, {
  SxObjectListUser,
  SxOnjectListLandAssets
} from "./style";
import { ETypeLandName } from "features/loan/normal/storage/collateralV2/case";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import SelectCollateralCertifiedType from "views/components/widgets/SelectCollateralCertifiedType";
import { SxSelectDisiable } from "../../../Card/Initialize/Collateral/style";
import SelectCollateralCertificateType from "views/components/widgets/SelectCollateralCertificateType";
import ModalTableInfoLegal from "./ModalTableInfoLegal";
import * as _ from 'lodash';
import { setUuidAttachmentLegalApproval } from "features/loan/normal/storageApproval/collateral/actions";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import {useLegalAttachmentHook}  from './AttachmentLegal';
import {
  ICertificateLegalInfoData,
  // IPerson
} from "types/models/loan/normal/storage/CollaretalV2";
import { PREFIX_LOCAL } from "utils";
import AttachmentModalDocs from "./AttachmentModalDocs";
export interface LegalInfomationCertificateProps {
  activeSubType?: string;
  uuIdData?: string;
}

const LegalInfomationCertificate: FC<LegalInfomationCertificateProps> = (
  props
) => {

  const { activeSubType = "", uuIdData = "" } = props;
  const classes = collateralStyle();
  const dispatch = useDispatch();
  const dataCer = useSelector(getLOANormalStoreLegalCertifiCateApproval(
    uuIdData,
    activeSubType
  ));

  
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval(
    uuIdData,
    activeSubType
  ));


  const dataUserListLegaDetails = useSelector(
    getLOANormalStoreLegalCertifiCateUseListLegalDataApproval(
      uuIdData,
      activeSubType,
      dataCer?.activeUUIDCertificate ?? "",
    )
  );
  const [openAttachmentModalDocsModal,setOpenAttachmentModalDocsModal] = useState<{isOpen:boolean,value:string}>({isOpen:false,value:''});
  const infoLegalFromOwner = useSelector(getLOANormalStoreInfoLegalFromOwnerLegalApproval(uuIdData ?? '', activeSubType ?? ''))
  const infoAllUserLegal = useSelector(getInfoAllUserLegalApproval);
  const TypeLand = useSelector(getTypeLandApproval(uuIdData, activeSubType, SubTypeItemsActive ?? ""));
  const curentInfoItem = useSelector(getLOANormalStoreDataItemActive(uuIdData, activeSubType));
  const CTXDGcnQshUuidActive = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshUuidActiveAproval(uuIdData, activeSubType));


  const [isDisiableInput, setIsDisiableInput] = useState<boolean>(false);
  const [openModalOwner, setOpenModalOwner] = useState(false);

  const {getCountAttachFileWithLegal_uuid}= useLegalAttachmentHook();

  useEffect(() => {
    let isCheck: boolean = false;

    if (CTXDGcnQshUuidActive?.length === 0 && TypeLand === ETypeLandName.CTXD_GCN) {
      isCheck = true;
    }

    if (dataCer?.activeUUIDCertificate?.length === 0) {
      isCheck = true;
    }

    if (isCheck !== isDisiableInput) {
      setIsDisiableInput(isCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCer?.activeUUIDCertificate])


  /**
   * Get uuid active certifiCate option list
   */
  const activeCreOptionList = dataCer?.dataCertificate?.findIndex(
    (ce) => ce.activeUUIDCertificateL === dataCer.activeUUIDCertificate
  );

  /**
   * option data opject certifiCate
   *
   */
   const getCountCertAttachFile = (cert_uuid:string)=>{
    const getDoc = ()=>{
      const type_land = curentInfoItem?.type_land;
      const find = (item:ICertificateLegalInfoData)=>item.activeUUIDCertificateL === cert_uuid;
      switch(type_land){
        case ETypeLandName.LAND:{
          const exist = _.get(curentInfoItem,'land.certificate_legal_info.dataCertificate',[]).find(find);
          return _.get(exist,'documents',[]) as ILOANNormalDocument[];
        }
        case ETypeLandName.CTXD_GCN:{
          let cgqd_uuid_active = _.get(curentInfoItem,'ctxd_gcn_qsh.activeUuIdCtxdGcnQsh','');
          const ctxd_gcn_qsh = curentInfoItem?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd=>cgqd.uuIdCtxdGcnQsh === cgqd_uuid_active);
          const exist = _.get(ctxd_gcn_qsh,'certificate_legal_info.dataCertificate',[]).find(find);
          return _.get(exist,'documents',[]) as ILOANNormalDocument[];
        }
        default: return [] as ILOANNormalDocument[];
      }
    };
    const documents =getDoc();
    let count = 0;
    documents.forEach(doc=>{
      count += doc?.child_files?.filter(f=>!f?.uuid?.includes(PREFIX_LOCAL))?.length ?? 0;
    })
    return count;
  }
  const optionsCer: ObjectListOption[] =
    dataCer?.dataCertificate?.map((item, i) => ({
      label: `Giấy chứng nhận ${i + 1}`,
      circle: <BsFillFileEarmarkFill />,
      attachment:getCountCertAttachFile(item?.activeUUIDCertificateL ?? ''),
      value:item
    })) ?? [];

  const onChangeCre = (current: number) => {

    const currentActive =
      dataCer?.dataCertificate[current].activeUUIDCertificateL ?? "";
      console.log(currentActive,'currentActive');
      
    dispatch(
      setOnChangeCollaretalCertificateApproval(currentActive, {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
      })
    );
  };

  const optionsCerUseListLegal: ObjectListOption[] =
    infoAllUserLegal?.filter(o1 => dataUserListLegaDetails?.persons?.some(o2 => o1.uuid === o2.person_uuid))?.map((item, i) => ({
      label: item.full_name,
      attachment: getCountAttachFileWithLegal_uuid(item.uuid)
      // circle: <AiOutlineFileWord />,
    })) ?? [];

  const activeHasUser = infoAllUserLegal?.filter(
    o1 => dataUserListLegaDetails?.persons?.some(o2 => o1.uuid === o2.person_uuid))
    .findIndex(d => d.uuid === dataUserListLegaDetails?.activeUUIDUserListLegal
  );


  useEffect(() => {
    if (dataCer?.dataCertificate) {
      dispatch(
        setOnChangeCollaretalCertificateApproval(dataCer?.dataCertificate[0]?.activeUUIDCertificateL ?? '', {
          uuidActiveData: uuIdData ?? "",
          uuidActiveSubtype: activeSubType ?? "",
          uuidActiveitems: SubTypeItemsActive ?? "",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCloseModalOwner = () => {
    setOpenModalOwner(false);
  };


  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.objectList}>
        <ObjectList
          labelLength="Số lượng GCN: &nbsp;"
          onChange={onChangeCre}
          current={activeCreOptionList}
          options={optionsCer}
          sx={{
            ...SxOnjectListLandAssets, "& .ObjectListLabel": {
              border: '1px solid var(--mscb-danger) !important'
            }
          }}
          attachLabel="tập tin"
          enableAdd={false}
          enableMenu={false}
          onAttach={(index)=>{
            const value =  _.get(optionsCer,[index,'value','activeUUIDCertificateL'],'');
            if(!value) return;
            setOpenAttachmentModalDocsModal({isOpen:true,value});
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
                enableAdd={false}
                enableMenu={false}
                avatar
                labelLength="Người sở hữu: &nbsp;"
                options={optionsCerUseListLegal}
                current={activeHasUser}
                onAttach={(index)=>{
                  const data = infoAllUserLegal?.filter(o1 => dataUserListLegaDetails?.persons?.some(o2 => o1.uuid === o2.person_uuid)) ?? [];
                  const person_uuid = _.get(data,[index,'uuid']);
                  if(!person_uuid) return;
                  dispatch(setUuidAttachmentLegalApproval(person_uuid));
                }}
                sx={{
                  ...SxObjectListUser,
                  "& .attachBox": {
                    right: "30%",
                    bottom: "10px"
                  }
                }}
                attachLabel="tập tin"
              />
            </Grid>
            {TypeLand !== ETypeLandName.LAND ?
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertificateType
                  label="1. Loại GCN quyền sử dụng đất"
                  value={dataUserListLegaDetails?.typeUseLand ?? ""}
                  sx={SxSelectDisiable}
                  disabled
                  required
                />
              </Grid> :

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertifiedType
                  label="1. Loại GCN quyền sử dụng đất"
                  value={dataUserListLegaDetails?.typeUseLand ?? ""}
                  sx={SxSelectDisiable}
                  disabled
                  required
                />
              </Grid>
            }

            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                placeholder="Nhập loại GCN quyền sử dụng đất khác"
                label="2. Loại GCN quyền sử dụng đất khác"
                value={dataUserListLegaDetails?.typeGCN}
                disabled
                required={(dataUserListLegaDetails?.typeUseLand ?? "") === "OTHER" ? true : false}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                placeholder="Nhập số GCN/giấy tờ pháp lý"
                label="3. Số GCN/giấy tờ pháp lý"
                value={dataUserListLegaDetails?.numberGCNLegal}
                disabled
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                placeholder="Nhập số vào sổ cấp GCN"
                label="4. Số vào sổ cấp GCN"
                value={dataUserListLegaDetails?.numberGCN}
                disabled
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="5. Ngày cấp"
                value={(dataUserListLegaDetails?.dateRange)}
                disabled
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="6. Nơi cấp"
                placeholder="Nhập nơi cấp"
                value={dataUserListLegaDetails?.dateLocation}
                disabled
                required
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>

      <ModalTableInfoLegal
        open={openModalOwner}
        onClose={onCloseModalOwner}
        activeSubType={activeSubType}
        uuIdData={uuIdData}
        uuidActiveitems={SubTypeItemsActive}
        uuidActiveCer={dataCer?.activeUUIDCertificate}
        listInfo={
          infoAllUserLegal?.filter(o1 => infoLegalFromOwner?.some(o2 => o1.uuid === o2))
        }
        listDetail={dataUserListLegaDetails?.persons}
      />
       {openAttachmentModalDocsModal.isOpen && <AttachmentModalDocs
        open={Boolean(openAttachmentModalDocsModal.isOpen)}
        onClose={() => setOpenAttachmentModalDocsModal({isOpen:false,value:''})}
        activeSubType ={activeSubType}
        uuIdData={uuIdData}
        activeUuid={openAttachmentModalDocsModal.value ?? ''}
        typeLand={TypeLand}
        itemType={'land'}
        viewOnly
      />}
    </Grid>
  );
};

export default LegalInfomationCertificate;
