import { Grid } from "@mui/material";
import {
  addCollaretalCertificateDepartment,
  callRemoveCollaretalCertificatePerson,
  removeCollaretalCertificateDepartment,
  removeCollaretalCertificatePerson,
  setOnChangeCollaretalCertificateDepartment,
  setOnChangeCollaretalCertificateDepartmentListLegalData,
} from "features/loan/normal/storage/collateralV2/actions";
import {
  getCollateralPriceCertUuid,
  getInfoAllUserLegal,
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreInfoLegalFromOwnerLegal,
  getLOANormalStoreLandLegalItemActive,
  getLOANormalStoreLegalCertifiCateDepartmentPersionListLegalData,
  getLOANormalStoreLegalCertifiCateDepartmentPerson,
  getLOANormalStoreLegalDepartment,
  getLOANormalStoreLegalDepartmentCertificates,
  getLOANormalStoreLegalDepartmentCertificatesUuidActive,
} from "features/loan/normal/storage/collateralV2/selector";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IDepartmentCertificateLegal,
  IPerson,
  IPersonCertificateLegal,
} from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListMenuItem,
  ObjectListOption,
} from "views/components/layout/ObjectList";
import SelectCollateralCertifiedType from "views/components/widgets/SelectCollateralCertifiedType";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { SxObjectListUser, SxSelectDisiable } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { Box } from "@mui/system";
import useNotify from "app/hooks/useNotify";
import ModalTableInfoLegal from "../../../ModalTableInfoLegal";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import { SxOnjectListLandAssets } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import LegalAttachmentModal from "views/pages/LOAN/screens/Normal/Initialize/Legal/AttachmentModalServices";
import * as _ from 'lodash';
import AttachmentModalDocs from "../../../AttachmentModalDocs";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { useLegalAttachmentHook } from "views/pages/LOAN/screens/Normal/AppraisalApproval/Collateral/AttachmentLegal";
// import ModalTableCoOwners from "../../../ModalTableCoOwners";

export interface CertificateLegaIInfoProps {
  uuIdSubType?: string;
  uuIdData?: string;
}

const CertificateLegaIInfo: FC<CertificateLegaIInfoProps> = (props) => {

  const { uuIdSubType = "", uuIdData = "" } = props;
  
  const dispatch = useDispatch();
  const notify = useNotify();

  const getMessage =  useNormalCollateralMessage();
  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuIdData, uuIdSubType)
  );
  const priceCertUuid = useSelector(getCollateralPriceCertUuid(uuIdData))
  const dataCerUuidActive = useSelector(
    getLOANormalStoreLegalDepartmentCertificatesUuidActive(
      uuIdData,
      uuIdSubType
    )
  );

  const dataCer = useSelector(
    getLOANormalStoreLegalDepartmentCertificates(
      uuIdData,
      uuIdSubType
    )
  );

  const dataCerPersionList = useSelector(
    getLOANormalStoreLegalCertifiCateDepartmentPerson(
      uuIdData,
      uuIdSubType,
      dataCerUuidActive
    )
  );
  
  const activeCreOptionList = dataCer?.findIndex(
    (ce) => ce.uuid_certificate_legal === dataCerUuidActive
  );
  const infoLegalFromOwner = useSelector(getLOANormalStoreInfoLegalFromOwnerLegal(uuIdData ?? '', uuIdSubType ?? ''))
  const infoAllUserLegal = useSelector(getInfoAllUserLegal);
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData ?? '',uuIdSubType ?? ''));
  const [ disabledInputDepartmentCer, setDisabledInputDepartmentCer ] = useState<boolean>(false);
  const [ deleteIdCer, setDeleteIdCer ] = useState<IDepartmentCertificateLegal | null>(null);
  const [openModalOwner, setOpenModalOwner] = useState(false);
  const [ deleteIdUser, setDeleteIdUser ] = useState<IPerson | null>(null);
  const [openDeclareAttachModal,setOpenDeclareAttachModal] = useState<{isOpen:boolean, uuid:string}>({isOpen:false,uuid:''});
  const [openAttachmentModalDocsModal,setOpenAttachmentModalDocsModal] = useState<{isOpen:boolean,uuid:string}>({isOpen:false,uuid:''});



  /* const getCountAttachFileDeclareTypeWithUuid = (activeUuid:string | null | undefined)=> {
    if(!activeUuid) return 0;
    const documentList : ILOANNormalStorageLegalFile[] = _.get(listDeclareDataLegal.find(it=>it.person_uuid === activeUuid ),'documentList',[]);
    let count = 0;
    documentList.forEach(doc=>{
      const child_files = _.get(doc,'child_files',[]);
      count += (child_files.filter(f=>!f.uuid.includes(PREFIX_LOCAL)).length ?? 0);
    })
    return count;
  }
 */
  const onAddCre = () => {
    dispatch(
      addCollaretalCertificateDepartment("", {
        uuidActiveData: uuIdData,
        uuidActiveSubtype: uuIdSubType,
        uuidActiveitems: SubTypeItemsActive,
      })
    );
  };

  const onChangeCre = (current: number) => {
    const currentActive = dataCer
      ? dataCer[current]?.uuid_certificate_legal
      : "";
    dispatch(
      setOnChangeCollaretalCertificateDepartment(currentActive, {
        uuidActiveData: uuIdData,
        uuidActiveSubtype: uuIdSubType,
        uuidActiveitems: SubTypeItemsActive,
      })
    );
  };
  const {getCountAttachFileWithLegal_uuid}= useLegalAttachmentHook();

  const countAttachFileCertificate = (docs:ILOANNormalDocument[])=>{
    let count = 0;
    docs.forEach(doc=>{
      count += doc?.child_files?.filter(f=>!f?.uuid?.includes(PREFIX_LOCAL))?.length ?? 0;
    });
    return count;
  }

  const optionsCer: ObjectListOption[] =
    dataCer?.map((item, i) => ({
      label: `${Department?.has_certificate ==='Y' ? 'Giấy chứng nhận' : 'Hợp đồng'} ${i + 1}`,
      circle: <BsFillFileEarmarkFill />,
      attachment:countAttachFileCertificate(item.documents),
      value:item,
    })) ?? [];

  // const optionsCerUseListLegal = infoAllUserLegal?.filter(o1 => dataCerPersionList?.persons?.some(o2 => o1.uuid === o2.person_uuid)) ?? [];


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
      setOnChangeCollaretalCertificateDepartmentListLegalData(value, {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveCer: dataCerUuidActive,
        key,
      })
    );
  };

  const dataUserListLegaDetails = useSelector(
    getLOANormalStoreLegalCertifiCateDepartmentPersionListLegalData(
      uuIdData ?? "",
      uuIdSubType ?? "",
      dataCerUuidActive
    )
  );

  const Department = useSelector(getLOANormalStoreLegalDepartment(uuIdData, uuIdSubType));
  
  const onHandleClickMenuDepartmentCer = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuCer = dataCer?.find((cer, index) => index === position);
    if(optionsCer.length === 1){
      notify(" TSĐB phải ít nhất có 1 thông tin pháp lý giấy chứng nhận","warning");
    }else if(menu.value === EActionMenu.DELETE){
      dataMenuCer && setDeleteIdCer(dataMenuCer);
    }
  }
  const ruleDisabled = useSelector(getRuleDisbled) 
  /**
   * Action menu close modal confirm delete certifiCate
   *
   */
  const onHandleCancelConfirmCer = () => setDeleteIdCer(null);

  /**
   * Action menu success delete certifiCate
   *
   */
  const onHandleConfirmCer = () =>{
    let uuidDelete = deleteIdCer?.uuid_certificate_legal ?? "";
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      dispatch(
        removeCollaretalCertificateDepartment(uuidDelete, {
          uuidActiveData: uuIdData,
          uuidActiveSubtype: uuIdSubType,
          uuidActiveitems: SubTypeItemsActive,
          price_cert_uuid: priceCertUuid ?? "",
          price_cert_asset_uuid: itemActive?.price_cert_asset_uuid ?? "",
          apart_owner_cert_uuid: deleteIdCer?.apart_owner_cert_uuid ?? ""
        })
      );
      // notify('Xóa giấy chứng nhận thành công', 'success');
    }
    onHandleCancelConfirmCer()
  }


  const onAddCreUseListLegal = () => {
    if (!dataCer || dataCer.length === 0) {
      notify('Vui lòng thêm giấy chứng nhận', 'warning');
      return;
    }else if (dataCerUuidActive.length === 0){
      notify('Vui lòng chọn giấy chứng nhận', 'warning');
      return;
    }
    else{
      setOpenModalOwner(true)
    }
  }
  const onCloseModalOwner = () => {
    setOpenModalOwner(false);
  };

  const onClickMenuUserLegal = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuUserLegal = dataCerPersionList?.persons?.find((cer, index) => index === position);
    if(menu.value === EActionMenu.DELETE){
      if(optionsCerUseListLegal?.length <= 1){
        notify('GCN phải có ít nhất 1 người sỡ hữu', 'error');
      }else{
        dataMenuUserLegal && setDeleteIdUser(dataMenuUserLegal);
      }
    }
  }

  const onHandleCancelConfirmUser = () => setDeleteIdUser(null);

  /**
   * Action menu success delete user
   *
   */
  const onHandleConfirmUser = () => {
    let uuidDelete = deleteIdUser?.person_uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      dispatch(callRemoveCollaretalCertificatePerson(uuidDelete,{
        type:'apartment',
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveCer: dataCerUuidActive ?? "",
        price_cert_uuid: priceCertUuid ?? "",
        price_cert_asset_uuid: itemActive?.price_cert_asset_uuid ?? "",
        apart_owner_cert_uuid: dataCer?.find(i => i.uuid_certificate_legal === dataCerUuidActive)?.apart_owner_cert_uuid ?? "",
        apart_owner_cert_item_uuid: deleteIdUser?.apart_owner_cert_item_uuid ?? "",
        market_cert_uuid: "",
        market_cert_item_uuid: "",
        land_const_uuid: "",
        land_const_item_cert_uuid: "",
        land_const_item_cert_item_uuid: "",
        land_cert_uuid: "",
        re_land_cert_item_uuid: "",
      }))

      // notify('Xóa người sở hữu thành công', 'success');
    }

    onHandleCancelConfirmUser()
  }
    useEffect(() => {
    /**
     * Check uuid Department Cer is emty
     */
    let isCheck = dataCerUuidActive?.length > 0 ? false : true;
    if(optionsCerUseListLegal.length === 0){
      isCheck = true
    }
    if(disabledInputDepartmentCer !== isCheck) {
      setDisabledInputDepartmentCer(isCheck)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCerUuidActive, optionsCerUseListLegal])
  return (
    <>
      <Grid container spacing={3} className="pt-6">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ObjectList
            enableAdd={!ruleDisabled}
            enableMenu={!ruleDisabled}
            menu={[
              {
                value: EActionMenu.DELETE,
                label: "Xóa",
              }
            ]}
            labelLength={`Số lượng ${Department?.has_certificate ==='Y'?"GCN: ":'HĐ: '}`}
            onAdd={onAddCre}
            onChange={onChangeCre}
            current={activeCreOptionList}
            onClickMenu={onHandleClickMenuDepartmentCer}
            options={dataCer?.map((item, i) => ({
              label: `${Department?.has_certificate ==='Y' ? 'Giấy chứng nhận' : 'Hợp đồng'} ${i + 1}`,
              circle: <BsFillFileEarmarkFill />,
              attachment:countAttachFileCertificate(item.documents),
              value:item,
            })) ?? []}
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
                  enableAdd={!ruleDisabled}
                  enableMenu={!ruleDisabled}
                  onAdd={onAddCreUseListLegal}
                  menu={[
                    {
                      value: EActionMenu.DELETE,
                      label: "Xóa",
                    }
                  ]}
                  onClickMenu={onClickMenuUserLegal}
                  // onChange={onChangeCreUseListLegal}
                  labelLength="Người sở hữu: &nbsp;"
                  // current={activeCreOptionListUseLegal}
                 
                  sx={{...SxObjectListUser,
                    "& .attachBox":{
                      right:"30%",
                      bottom:"10px"
                    }
                }}
                 options={optionsCerUseListLegal}
                  attachLabel="tập tin"
                  onAttach={(index)=>{
                    const data = infoAllUserLegal?.filter(o1 => dataCerPersionList?.persons?.some(o2 => o1.uuid === o2.person_uuid));
                    const person_uuid = _.get(data,[index,'uuid']);
                    if(!person_uuid) return;
                    setOpenDeclareAttachModal({isOpen:true,uuid: String(person_uuid)});
                  }}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertifiedType
                  // placeholder=""
                  label="1. Loại GCN"
                  onChange={(val) =>{
                    if(Department?.has_certificate === "Y"){
                      onChangeDataUserList(val, "other_certificate_type")
                      if(val !=='OTHER' && dataUserListLegaDetails?.other_certificate_type_other !== null){
                        onChangeDataUserList(null, "other_certificate_type_other")
                      }
                    }
                   }
                  }
                  value={dataUserListLegaDetails?.other_certificate_type ?? ""}
                  disabled={(disabledInputDepartmentCer ||  Department?.has_certificate ==='N') || ruleDisabled}
                  required
                  sx={SxSelectDisiable}
                  message={ getMessage('other_certificate_type', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="2. Loại GCN khác"
                  placeholder="Nhập loại GCN khác"
                  onDebounce={(val) =>
                    onChangeDataUserList(val, "other_certificate_type_other")
                  }
                  value={dataUserListLegaDetails?.other_certificate_type_other}
                  disabled={(dataUserListLegaDetails?.other_certificate_type === "OTHER" ? false : true ) || ruleDisabled}
                  required={dataUserListLegaDetails?.other_certificate_type === "OTHER" ? true : false}
                  message={ getMessage('other_certificate_type_other', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="3. Số GCN"
                  placeholder="Nhập số GCN"
                  onDebounce={(val) =>
                    onChangeDataUserList(val, "certificate_code")
                  }
                  value={dataUserListLegaDetails?.certificate_code}
                  disabled={(disabledInputDepartmentCer ||  Department?.has_certificate ==='N') || ruleDisabled}
                  required
                  message={ getMessage('certificate_code', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="4. Số vào sổ cấp GCN"
                  placeholder="Nhập số vào sổ cấp GCN"
                  onDebounce={(val) =>
                    onChangeDataUserList(val, "certificate_no")
                  }
                  value={dataUserListLegaDetails?.certificate_no?.toString()}
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N' || ruleDisabled}
                  // message={ getMessage('certificate_no', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <InputDate
                  label="5. Ngày cấp"
                  onChange={(val) => onChangeDataUserList(val, "issue_date")}
                  value={(dataUserListLegaDetails?.issue_date)}
                  required
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N' || ruleDisabled}
                  message={ getMessage('date', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="6. Nơi cấp"
                  placeholder="Nhập nơi cấp"
                  onDebounce={(val) =>
                    onChangeDataUserList(val, "place_of_issue")
                  }
                  value={dataUserListLegaDetails?.place_of_issue}
                  required
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N' || ruleDisabled}
                  message={ getMessage('place_of_issue', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="7. Loại hợp đồng"
                  placeholder="Nhập loại hợp đồng"
                  onDebounce={(val) =>
                    onChangeDataUserList(val, "contract_number_type")
                  }
                  value={dataUserListLegaDetails?.contract_number_type}
                  required={Department?.has_certificate==='N'}
                  disabled={disabledInputDepartmentCer  ||  Department?.has_certificate==='Y' || ruleDisabled}
                  message={ getMessage('contract_number_type', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="8. Số hợp đồng"
                  placeholder="Nhập số hợp đồng"
                  onDebounce={(val) =>
                    onChangeDataUserList(val, "contract_number")
                  }
                  value={dataUserListLegaDetails?.contract_number}
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='Y' || ruleDisabled}
                  required={Department?.has_certificate==='N'}
                  message={ getMessage('contract_number', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <InputDate
                  label="9. Ngày hợp đồng"
                  onChange={(val) => onChangeDataUserList(val, "contract_date")}
                  value={(dataUserListLegaDetails?.contract_date ?? 0)}
                  required={Department?.has_certificate==='N'}
                  disabled={disabledInputDepartmentCer  ||  Department?.has_certificate ==='Y' || ruleDisabled}
                  message={ getMessage('contract_date', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>

        <ModalConfirm open={ deleteIdCer !== null } onClose={ onHandleCancelConfirmCer } onConfirm={ onHandleConfirmCer }>
          <Box className="text-18 font-medium text-primary text-center">
            Bạn có chắc chắn muốn xóa giấy chứng nhận?
          </Box>
        </ModalConfirm>
        <ModalConfirm open={ deleteIdUser !== null } onClose={ onHandleCancelConfirmUser } onConfirm={ onHandleConfirmUser }>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa người sở hữu?
        </Box>
      </ModalConfirm>
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
        {openDeclareAttachModal.isOpen && <LegalAttachmentModal
          open={Boolean(openDeclareAttachModal.isOpen)}
          onClose={() => setOpenDeclareAttachModal({isOpen:false,uuid:''})}
          uuidActive={openDeclareAttachModal.uuid ?? ''}
          viewOnly
        />}
         {openAttachmentModalDocsModal.isOpen && <AttachmentModalDocs
          open={Boolean(openAttachmentModalDocsModal.isOpen)}
          onClose={() => setOpenAttachmentModalDocsModal({isOpen:false,uuid:''})}
          uuIdData={uuIdData}
          activeSubType={uuIdSubType}
          activeUuid={openAttachmentModalDocsModal.uuid}
          itemType={'department'}
        />}
      </Grid>
    </>
  );
};

export default CertificateLegaIInfo;
