import { FC,useEffect,useState } from "react";
import Grid from "@mui/material/Grid";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListMenuItem,
  ObjectListOption,
} from "views/components/layout/ObjectList";
import InputDate from "views/components/base/InputDate";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollaretalCertificate,
  callRemoveCollaretalCertificatePerson,
  removeCollaretalCertificate,
  removeCollaretalCertificatePerson,
  setCollateralValidate,
  // removeCollaretalCertificatePerson,
  setOnChangeCollaretalCertificate,
  setOnChangeCollaretalCertificateUserListLegalData,
} from "features/loan/normal/storage/collateralV2/actions";
import {
  getInfoAllUserLegal,
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreColalteralLandCTXDGcnQshUuidActive,
  getLOANormalStoreInfoLegalFromOwnerLegal,
  getLOANormalStoreLegalCertifiCate,
  getLOANormalStoreLegalCertifiCateUseListLegal,
  getLOANormalStoreLegalCertifiCateUseListLegalData,
  // getLOANormalStoreLegalOwnerDetailLegalData,
  getLOANormalStoreDataItemActive,
  getTypeLand,
  getCollateralPriceCertUuid,
  getLOANormalStoreColalteralLandCTXDGcnQshData,
  getLOANormalStoreLandLegalItemActive,
  ValidateCollateralRestStorage
} from "features/loan/normal/storage/collateralV2/selector";
import {
  ICertificateLegalInfoData,
  ICertificateLegalInfoDataUserList,
  ILOANNormalCollateralV2StateFullInfoLegalOwners,
  IPerson,
  // IPerson
} from "types/models/loan/normal/storage/CollaretalV2";
import collateralStyle, {
  SxObjectListUser,
  SxOnjectListLandAssets
} from "./style";
import { EActionMenu, ETypeLandName } from "features/loan/normal/storage/collateralV2/case";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import ModalConfirm from "views/components/layout/ModalConfirm";
import { Box } from "@mui/material";
import useNotify from "app/hooks/useNotify";
import SelectCollateralCertifiedType from "views/components/widgets/SelectCollateralCertifiedType";
import { SxSelectDisiable } from "../../../Card/Initialize/Collateral/style";
import SelectCollateralCertificateType from "views/components/widgets/SelectCollateralCertificateType";
import ModalTableInfoLegal from "./ModalTableInfoLegal";
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import {getListDeclareDataLegal} from "features/loan/normal/storage/legal/selectors";
import { ILOANNormalStorageLegalFile } from "types/models/loan/normal/storage/Legal";
import * as _ from 'lodash';
import LegalAttachmentModal from "views/pages/LOAN/screens/Normal/Initialize/Legal/AttachmentModalServices";
import AttachmentModalDocs from "./AttachmentModalDocs";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
import ModalOwnerInfo from "./ModalOwnerInfo";
export interface LegalInfomationCertificateProps {
  activeSubType?: string;
  uuIdData?: string;
}

const LegalInfomationCertificate: FC<LegalInfomationCertificateProps> = (
  props
) => {
  
  
  const { activeSubType = "", uuIdData = ""} = props;
  const classes = collateralStyle();
  const dispatch = useDispatch();
  const notify = useNotify();
  const ruleDisabled = useSelector(getRuleDisbled)
  const validRest = useSelector(ValidateCollateralRestStorage);
  const dataCer = useSelector( getLOANormalStoreLegalCertifiCate(
    uuIdData,
    activeSubType
  ));
  const price_cert_uuid = useSelector(getCollateralPriceCertUuid(uuIdData))
  const SubTypeItemsActive = useSelector( getLoanNormalSubTypeItemsActive(
    uuIdData,
    activeSubType
  ));
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData ?? '',activeSubType ?? ''));

  const dataCerUseList = useSelector(getLOANormalStoreLegalCertifiCateUseListLegal(
      uuIdData,
      activeSubType,
      dataCer?.activeUUIDCertificate ?? ""
    )
  );

  const dataUserListLegaDetails = useSelector(
    getLOANormalStoreLegalCertifiCateUseListLegalData(
      uuIdData,
      activeSubType,
      dataCer?.activeUUIDCertificate ?? "",
    )
  );
  const infoLegalFromOwner = useSelector(getLOANormalStoreInfoLegalFromOwnerLegal(uuIdData ?? '', activeSubType ?? ''))
  const infoAllUserLegal = useSelector(getInfoAllUserLegal);
  // const infoHasAuthor = useSelector(getLOANormalStoreLegalOwnerDetailLegalData(uuIdData, activeSubType));
  const listDeclareDataLegal = useSelector(getListDeclareDataLegal);
  const getMessage = useNormalCollateralMessage()
  const TypeLand = useSelector(getTypeLand(uuIdData, activeSubType, SubTypeItemsActive ?? ""));

  const CTXDGcnQshUuidActive = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshUuidActive(uuIdData, activeSubType));

  const [ deleteIdCer, setDeleteIdCer ] = useState<ICertificateLegalInfoData | null>(null);
  const [ deleteIdUser, setDeleteIdUser ] = useState<IPerson | null>(null);

  const [ isDisiableInput, setIsDisiableInput ] = useState<boolean>(false);
  const [openModalOwner, setOpenModalOwner] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [infoUser, setInfoUser] = useState<ILOANNormalCollateralV2StateFullInfoLegalOwners[]>([]);
  const [position, setPosition] = useState<number>();
  const [typeInfo, setTypeInfo] = useState<string>();
  const [openDeclareAttachModal,setOpenDeclareAttachModal] = useState<{isOpen:boolean,uuid:string}>({isOpen:false,uuid:''});
  const [openAttachmentModalDocsModal,setOpenAttachmentModalDocsModal] = useState<{isOpen:boolean,value:string}>({isOpen:false,value:''});
  
  const ctxdGcnQshData = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshData(uuIdData,activeSubType))
  // const allUserLegalOptions = infoAllUserLegal?.filter(o1 => infoHasAuthor?.authorized_persons?.some(o2 => o1.uuid === o2.person_uuid)) ?? [];

  const curentInfoItem = useSelector(getLOANormalStoreDataItemActive(uuIdData, activeSubType));
  const optionsCerUseListLegal = infoAllUserLegal?.filter(o1 => dataUserListLegaDetails?.persons?.some(o2 => o1.uuid === o2.person_uuid)) ?? [];
  // console.log({optionsCerUseListLegal});
  useEffect(()=> {
    let isCheck: boolean = false;

    if(CTXDGcnQshUuidActive?.length === 0 && TypeLand === ETypeLandName.CTXD_GCN){
      isCheck = true;
    }

    if(dataCer?.activeUUIDCertificate?.length === 0){
      isCheck = true;
    }
    if(optionsCerUseListLegal?.length === 0){
      isCheck = true;
    }

    if(isCheck !== isDisiableInput){
      setIsDisiableInput(isCheck)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCer?.activeUUIDCertificate, optionsCerUseListLegal])


  const onAddCre = () => {
    if ((!CTXDGcnQshUuidActive || CTXDGcnQshUuidActive.length === 0) && TypeLand === ETypeLandName.CTXD_GCN){
      notify('Vui lòng chọn GCN QSH CTXD', 'warning');
    }else{
      dispatch(
        addCollaretalCertificate("", {
          uuidActiveData: uuIdData ?? "",
          uuidActiveSubtype: activeSubType ?? "",
          uuidActiveitems: SubTypeItemsActive ?? "",
        })
      );
    }
  };


  /**
   * Get uuid active certifiCate option list
   */
  const activeCreOptionList = dataCer?.dataCertificate?.findIndex(
    (ce) => ce.activeUUIDCertificateL === dataCer.activeUUIDCertificate
  ) ?? 0 ;

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

      currentActive && dispatch(
          setOnChangeCollaretalCertificate(currentActive, {
            uuidActiveData: uuIdData ?? "",
            uuidActiveSubtype: activeSubType ?? "",
            uuidActiveitems: SubTypeItemsActive ?? "",
          })
        );        

  };

   /**
   * Action menu close modal confirm delete certifiCate
   *
   */
  const onHandleCancelConfirmCer = () => setDeleteIdCer(null);

  /**
   * Action menu onject list certifiCate
   *
   */
  const onHandleClickMenuCer = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuCer = dataCer?.dataCertificate.find((cer, index) => index === position);
    if(optionsCer.length === 1){
      notify(" TSĐB phải ít nhất có 1 thông tin pháp lý giấy chứng nhận","warning");
    }else if(menu.value === EActionMenu.DELETE){
      dataMenuCer && setDeleteIdCer(dataMenuCer);
      console.log(dataMenuCer,'dataMenuCer')
    }
  }

  const onHandleConfirmCer = () =>{
    let uuidDelete = deleteIdCer?.activeUUIDCertificateL;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      dispatch(removeCollaretalCertificate(uuidDelete,{
        type: TypeLand,
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        price_cert_uuid: price_cert_uuid ?? "",
        price_cert_asset_uuid: curentInfoItem?.price_cert_asset_uuid ?? '',
        land_const_uuid: ctxdGcnQshData.find(i=>i.uuIdCtxdGcnQsh === CTXDGcnQshUuidActive)?.land_const_uuid ?? "",
        land_const_item_cert_uuid: dataCer?.dataCertificate.find(i => i.activeUUIDCertificateL === uuidDelete)?.land_const_item_cert_uuid ?? '',
        land_cert_uuid: dataCer?.dataCertificate.find(i => i.activeUUIDCertificateL === uuidDelete)?.land_cert_uuid ?? "",
      }))
    }
    onHandleCancelConfirmCer()
  }


  const onChangeDataUserList = (
    value: string | number | null,
    key: keyof ICertificateLegalInfoDataUserList
  ) => {
    dispatch(
      setOnChangeCollaretalCertificateUserListLegalData(value, {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveCer: dataCer?.activeUUIDCertificate ?? "",
        uuidActiceUseList: dataCerUseList?.activeUUIDUserListLegal ?? "",
        key,
      })
    );
  };

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


  /**
   * Action menu onject list certifiCate
   *
   */
  //  const onClickMenuUserLegal = (menu: ObjectListMenuItem, position: number) => {
  //   let dataMenuUserLegal = dataCerUseList?.persons.find((cer, index) => index === position);
  //   if(menu.value === EActionMenu.DELETE){
  //     dataMenuUserLegal && setDeleteIdUser(dataMenuUserLegal);
  //   }
  // }

  /**
   * Action menu close modal confirm delete user
   *
   */
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
        type: TypeLand,
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveCer: dataCer?.activeUUIDCertificate ?? "",
        price_cert_uuid: price_cert_uuid ??"",
        price_cert_asset_uuid: itemActive?.price_cert_asset_uuid ?? "",
        apart_owner_cert_uuid: "",
        apart_owner_cert_item_uuid: "",
        market_cert_uuid:  "",
        market_cert_item_uuid:  "",
        land_const_uuid: ctxdGcnQshData.find(i=>i.uuIdCtxdGcnQsh === CTXDGcnQshUuidActive)?.land_const_uuid ?? "",
        land_const_item_cert_uuid: dataCer?.dataCertificate.find(i => i.activeUUIDCertificateL === dataCer.activeUUIDCertificate)?.land_const_item_cert_uuid ?? '',
        land_const_item_cert_item_uuid: deleteIdUser?.land_const_item_cert_item_uuid ?? "",
        land_cert_uuid:  dataCer?.dataCertificate.find(i => i.activeUUIDCertificateL === dataCer.activeUUIDCertificate)?.land_cert_uuid ?? "",
        re_land_cert_item_uuid: deleteIdUser?.re_land_cert_item_uuid ?? "",
      }))

      // notify('Xóa người sở hữu thành công', 'success');
    }

    onHandleCancelConfirmUser()
  }

  // // set active vi tri dau tien check
  // useEffect(()=>{
  //   if(dataCer?.dataCertificate){
  //     dispatch(
  //       setOnChangeCollaretalCertificate(dataCer?.dataCertificate[0]?.activeUUIDCertificateL ?? '', {
  //         uuidActiveData: uuIdData ?? "",
  //         uuidActiveSubtype: activeSubType ?? "",
  //         uuidActiveitems: SubTypeItemsActive ?? "",
  //       })
  //     );
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[dataCer?.activeUUIDCertificate])

  const onAddCreUseListLegal = () => {
    if (!dataCer || dataCer.dataCertificate.length === 0) {
      notify('Vui lòng thêm giấy chứng nhận', 'warning');
      return;
    }else if (dataCer.activeUUIDCertificate.length === 0){
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

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onClickMenu = (menu: ObjectListMenuItem, position: number) => {
    if(menu.value === "1"){
      setOpenModal(true);
      setInfoUser(infoAllUserLegal?.filter(o1 => optionsCerUseListLegal.some(o2 => o1.uuid === o2.uuid)));
      setPosition(position)
      setTypeInfo("owner")
    }
    if(menu.value === "2"){
      let dataMenuPerson = dataUserListLegaDetails?.persons?.find((cer, index) => index === position);
      if(dataUserListLegaDetails?.persons?.length === 1){
        notify(" TSĐB phải ít nhất có 1 thông tin pháp lý giấy chứng nhận","warning");
      }else{
        dataMenuPerson && setDeleteIdUser(dataMenuPerson);
      }
    }
  }
  const dateRangeData = dataUserListLegaDetails?.dateRange
  // console.log(dataUserListLegaDetails,'dataUserListLegaDetails')
  const handleAttach = (index: number) => {
    if(validRest.valid){
      dispatch(setCollateralValidate({valid : true}))
      const value =  _.get(optionsCer,[index,'value','activeUUIDCertificateL'],'');
      if(!value) return;
      setOpenAttachmentModalDocsModal({isOpen:true,value});
    }
    else {
      dispatch(setCollateralValidate(validRest))
      notify(validRest.message ? validRest.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
    }  
  }
  
  // console.log({dataUserListLegaDetails});
  
  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.objectList}>
        <ObjectList
          menu={[
            {
              value: EActionMenu.DELETE,
              label: "Xóa",
            }
          ]}
          onClickMenu={onHandleClickMenuCer}
          labelLength="Số lượng GCN: &nbsp;"
          onAdd={onAddCre}
          onChange={onChangeCre}
          current={activeCreOptionList}
          options={optionsCer}
          sx={{...SxOnjectListLandAssets,"& .ObjectListLabel":{
            border:'1px solid var(--mscb-danger) !important'
          }}}
          attachLabel="tập tin"
          enableAdd={!ruleDisabled}
          enableMenu={!ruleDisabled}
          onAttach={handleAttach}

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
                enableAdd={!ruleDisabled}
                enableMenu={!ruleDisabled}
                avatar
                menu={[
                  // {
                  //   value: "1",
                  //   label: "Chi tiết",
                  // },
                  {
                    value: "2",
                    label: "Xóa",
                  }
                ]}
                onClickMenu={onClickMenu}
                onAdd={onAddCreUseListLegal}
                // onChange={onChangeCreUseListLegal}
                labelLength="Người sở hữu: &nbsp;"
                // current={activeCreOptionListUseLegal}
                options={optionsCerUseListLegal?.map((item, i) => ({
                  label: item.full_name,
                  attachment: getCountAttachFileDeclareTypeWithUuid(item.uuid)
                  // circle: <AiOutlineFileWord />,
                })) ?? []}
                sx={{...SxObjectListUser,
                  "& .attachBox":{
                    right:"32%",
                    bottom:"15px"
                  }
              }}
                attachLabel="tập tin"
                onAttach={(index)=>{
                  const currentData = _.get(optionsCerUseListLegal,[index]);
                  if(!currentData) return;
                  setOpenDeclareAttachModal({isOpen:true,uuid:currentData.uuid});
                }}
              />
            </Grid>
                {TypeLand !== ETypeLandName.LAND ?
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertificateType
                  label="1. Loại GCN quyền sử dụng đất"
                  onChange={(val) => {
                    onChangeDataUserList(val, "typeUseLand")
                    if(val !== "OTHER" && dataUserListLegaDetails?.typeGCN !== null){
                      onChangeDataUserList(null, "typeGCN")
                    }
                  }}
                  value={dataUserListLegaDetails?.typeUseLand ?? ""}
                  sx={ SxSelectDisiable }
                  disabled={isDisiableInput || ruleDisabled}
                  required
                  message={getMessage('typeUseLand',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
                />
              </Grid> :

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertifiedType
                  label="1. Loại GCN quyền sử dụng đất"
                  onChange={(val) => {
                    onChangeDataUserList(val, "typeUseLand")
                    if(val !== "OTHER" && dataUserListLegaDetails?.typeGCN !== null){
                      onChangeDataUserList(null, "typeGCN")
                    }
                  }}
                  value={dataUserListLegaDetails?.typeUseLand ?? ""}
                  sx={ SxSelectDisiable }
                  disabled={isDisiableInput || ruleDisabled}
                  required
                  message={getMessage('typeUseLand',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
                />
              </Grid>
              }

            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                placeholder="Nhập loại GCN quyền sử dụng đất khác"
                label="2. Loại GCN quyền sử dụng đất khác"
                onDebounce={(val) => onChangeDataUserList(val, "typeGCN")}
                value={dataUserListLegaDetails?.typeGCN ?? ""}
                disabled={((dataUserListLegaDetails?.typeUseLand ?? "") === "OTHER" ? false : true) || ruleDisabled}
                required={(dataUserListLegaDetails?.typeUseLand ?? "") === "OTHER" ? true : false}
                message={getMessage('typeGCN',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>

              <Input
              placeholder="Nhập số GCN/giấy tờ pháp lý"
                label="3. Số GCN/giấy tờ pháp lý"
                onDebounce={(val) =>
                  onChangeDataUserList(val, "numberGCNLegal")
                }
                value={dataUserListLegaDetails?.numberGCNLegal ?? ""}
                disabled={isDisiableInput || ruleDisabled}
                required
                message={getMessage('numberGCNLegal',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                placeholder="Nhập số vào sổ cấp GCN"
                label="4. Số vào sổ cấp GCN"
                onDebounce={(val) => onChangeDataUserList(val, "numberGCN")}
                value={dataUserListLegaDetails?.numberGCN ?? ""}
                disabled={isDisiableInput || ruleDisabled}
                // message={getMessage('numberGCN',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
                // required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="5. Ngày cấp"
                onChange={(val) => onChangeDataUserList(val, "dateRange")}
                value={dataUserListLegaDetails?.dateRange ?? null}
                disabled={isDisiableInput || ruleDisabled}
                required
                message={getMessage('issuedDate',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="6. Nơi cấp"
                placeholder="Nhập nơi cấp"
                onDebounce={(val) => onChangeDataUserList(val, "dateLocation")}
                value={dataUserListLegaDetails?.dateLocation ?? ""}
                disabled={isDisiableInput || ruleDisabled}
                required
                message={getMessage('place_of_issue',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
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
      <ModalOwnerInfo
        open={openModal}
        onClose={onCloseModal}
        infoUser={infoUser}
        position={position}
        typeInfo={typeInfo}
      />
      <ModalConfirm open={ deleteIdUser !== null } onClose={ onHandleCancelConfirmUser } onConfirm={ onHandleConfirmUser }>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa người sở hữu?
        </Box>
      </ModalConfirm>
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
      {openDeclareAttachModal.isOpen&&<LegalAttachmentModal
        open={Boolean(openDeclareAttachModal.isOpen)}
        onClose={() => setOpenDeclareAttachModal({isOpen:false,uuid:''})}
        uuidActive={openDeclareAttachModal.uuid ?? ''}
        viewOnly
      />}
      {openAttachmentModalDocsModal.isOpen && <AttachmentModalDocs
        open={Boolean(openAttachmentModalDocsModal.isOpen)}
        onClose={() => setOpenAttachmentModalDocsModal({isOpen:false,value:''})}
        activeSubType ={activeSubType}
        uuIdData={uuIdData}
        activeUuid={openAttachmentModalDocsModal.value ?? ''}
        typeLand={TypeLand}
        itemType={'land'}
      />}
    </Grid>
  );
};

export default LegalInfomationCertificate;
