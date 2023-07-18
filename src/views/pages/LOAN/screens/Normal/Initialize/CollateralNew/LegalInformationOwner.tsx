import Grid from '@mui/material/Grid';
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import {
  removeCollaretalHasAuthor,
  removeCollaretalOwner,
  setCollaretalCertificate,
  setCollaretalInfoOwnerHasAuthorize,
  setCollaretalOwnerType,
  setCollateralValidate,
  setOnChangeCollaretalActiveHasAuthor,
  setOnChangeCollaretalActiveOwner,
  setOnChangeCollaretalDetailHasAuthor
} from 'features/loan/normal/storage/collateralV2/actions';
import {
  getCollateralPriceCertUuid, getInfoAllUserLegal, getIsCollapseActive, getLoanNormalSubTypeItemID,
  getLoanNormalSubTypeItemsActive, getLOANormalStoreColalteralLandCTXDGcnQshData,
  getLOANormalStoreColalteralLandCTXDGcnQshUuidActive, getLOANormalStoreLandLegalItemActive,
  getLOANormalStoreLegalCertifiCate,
  getLOANormalStoreLegalCertifiCateDepartmentPersionListLegalData,
  getLOANormalStoreLegalCertifiCateUseListLegalData,
  getLOANormalStoreLegalDepartmentCertificates,
  getLOANormalStoreLegalDepartmentCertificatesUuidActive,
  getLOANormalStoreLegalHasAuthorDetail,
  getLOANormalStoreLegalMaketCertificates,
  getLOANormalStoreLegalOwnerDetailLegalData,
  // getLOANormalStoreLegalOwnerLegalData,
  getTypeLand, ValidateCollateralRestStorage, ValidateCollateralStorage
} from "features/loan/normal/storage/collateralV2/selector";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ICertificateLegalInfoData, IInfoAuthorize, ILandOwner, ILOANNormalCollateralData, ILOANNormalCollateralV2StateFullInfoLegalOwners, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, { ObjectListMenuItem, ObjectListOption } from 'views/components/layout/ObjectList';
import CollateralCheck from "views/components/widgets/CollateralCheck";
import OwnerLegalCheck from "views/components/widgets/OwnerLegalCheck";
import ModalOwnerInfo from "./ModalOwnerInfo";
import ModalTableCoOwners from "./ModalTableCoOwners";
import ModalTableCoOwnersHasAuthorize from "./ModalTableCoOwnersHasAuthorize";
import { SxObjectListUser, SxRadio } from "./style";
// import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
// import { Box } from "@mui/system";
// import useNotify from "app/hooks/useNotify";
import { Box } from "@mui/material";
import useNotify from "app/hooks/useNotify";
import { getListDeclareDataLegal } from "features/loan/normal/storage/legal/selectors";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import * as _ from 'lodash';
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import { ILOANNormalStorageLegalFile } from "types/models/loan/normal/storage/Legal";
import { PREFIX_LOCAL } from "utils";
import { RadioRef } from "views/components/base/Radio";
import LegalAttachmentModal from "views/pages/LOAN/screens/Normal/Initialize/Legal/AttachmentModalServices";
import AttachmentModalAuthorize from "./AttachmentModalAuthorize";
import useStorageCollateral from "./useStorageCollateral";
import { getLOANormalStoreDataItemActive } from 'features/loan/normal/storageApproval/collateral/selector';
import { ETypeLandName } from 'features/loan/normal/storage/collateralV2/case';
import { BsFillFileEarmarkFill } from 'react-icons/bs';
export interface ILegalInformationOwnerProps {
  activeSubType?: string;
  uuIdData?: string;
  isFormLegalInfo?: boolean;
}

const LegalInformationOwner: FunctionComponent<ILegalInformationOwnerProps> = (props) => {

  const { activeSubType = "", uuIdData = "", isFormLegalInfo = true } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const dispatch = useDispatch();
  const notify = useNotify();
  const { infoOwner,LandCTXDGcnQshCurrentIndex, SubTypeItems, dataItems } = useStorageCollateral("ALL",uuIdData,activeSubType);
  const dataActive = infoOwner?.active ?? 0
  const getMessage = useNormalCollateralMessage();
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData ?? '', activeSubType ?? ""))
  const infoOwnerDetail = useSelector(getLOANormalStoreLegalOwnerDetailLegalData(uuIdData, activeSubType))
  const infoAllUserLegal = useSelector(getInfoAllUserLegal)
  const infoHasAuthor = useSelector(getLOANormalStoreLegalOwnerDetailLegalData(uuIdData, activeSubType));
  const infoHasAuthorDetail = useSelector(getLOANormalStoreLegalHasAuthorDetail(uuIdData, activeSubType));
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData,activeSubType ?? ''));
  const typeLand =  useSelector(getTypeLand(uuIdData,activeSubType,itemActive?.activeUUID ?? ''));
  const typeItem = useSelector(getLoanNormalSubTypeItemID(uuIdData,activeSubType) ?? '')
  const dataCerMark = useSelector(getLOANormalStoreLegalMaketCertificates(uuIdData ?? '', activeSubType ?? '')) ?? [];
  const dataCerLand = useSelector(getLOANormalStoreLegalCertifiCate(uuIdData ?? '', activeSubType ?? ''));
  const dataAPA = useSelector( getLOANormalStoreLegalDepartmentCertificates(uuIdData, activeSubType)) ?? [];
  const listDeclareDataLegal = useSelector(getListDeclareDataLegal);
  const priceCertUuid = useSelector(getCollateralPriceCertUuid(uuIdData))
  const ctxdGcnQshData = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshData(uuIdData,activeSubType))
  const CTXDGcnQshUuidActive = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshUuidActive(uuIdData, activeSubType));
  const activeCollapsed = useSelector(getIsCollapseActive)
  const valid = useSelector(ValidateCollateralStorage);
  const validRest = useSelector(ValidateCollateralRestStorage);
  //QSDĐ là đất và / hoặc nhà riêng lẻ
  const dataCer = useSelector( getLOANormalStoreLegalCertifiCate(
    uuIdData,
    activeSubType
  ));

  const dataUserListLegaDetails = useSelector(
    getLOANormalStoreLegalCertifiCateUseListLegalData(
      uuIdData,
      activeSubType,
      dataCer?.activeUUIDCertificate ?? "",
    )
  );

  const curentInfoItem = useSelector(getLOANormalStoreDataItemActive(uuIdData, activeSubType));
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
  };
  const optionsCer: ObjectListOption[] =
    dataCer?.dataCertificate?.map((item, i) => ({
      label: `Giấy chứng nhận ${i + 1}`,
      circle: <BsFillFileEarmarkFill />,
      attachment:getCountCertAttachFile(item?.activeUUIDCertificateL ?? ''),
      value:item
    })) ?? [];

 
  //data quyền sở hửu căn chung cư
  const apartmentOwnership = useSelector(
    getLOANormalStoreLegalDepartmentCertificates(
      uuIdData,
      activeSubType
    )
  );
  
  // const existLegalOwnerFull = useSelector(checkExistCollateralOwner(priceCertUuid ?? ""))
  const [ownerWrapper, setOwnerWrapper] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalOwner, setOpenModalOwner] = useState(false);
  const [openModalHasAuthorize, setOpenModalHasAuthorize] = useState(false);
  //
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  //
  const [infoUser, setInfoUser] = useState<ILOANNormalCollateralV2StateFullInfoLegalOwners[]>([]);
  const [ listOwner, setListOwner] = useState<ILandOwner[]>([]);
  const [position, setPosition] = useState<number>();
  const [typeInfo, setTypeInfo] = useState<string>();
  const [ typeLandActive, setTypeLandActive ] = useState<string>(typeLand);
  const [ deleteIdUser, setDeleteIdUser ] = useState<IInfoAuthorize | null>(null);
  const [ deleteIdOwner, setDeleteIdOwner ] = useState<ILandOwner | null>(null);

  const ownerCheckRef = useRef<RadioRef>(null);
  const [openDeclareAttachModal,setOpenDeclareAttachModal] = useState<{isOpen:boolean,uuid:string}>({isOpen:false,uuid:''});
  const [openAuthorizeAttachModal,setOpenAuthorizeAttachModal] = useState<{isOpen:boolean,uuid:string}>({isOpen:false,uuid:''});

  const ownerActive =  infoOwner?.active ?? 0;
  let listSelfOwner = infoAllUserLegal.filter(i => { return i.type === 'borrower' || i.type === 'marriage' });
  
  const allUserLegalOptions: ILOANNormalCollateralV2StateFullInfoLegalOwners[] = []

  infoHasAuthor?.authorized_persons.forEach(per => {
    const newInfo = infoAllUserLegal.find(e => e.uuid === per.person_uuid)
    if(newInfo) {
      allUserLegalOptions.push(newInfo)
    } 
  });
  
  const allUserLegalInfoOwner: ILOANNormalCollateralV2StateFullInfoLegalOwners[] = [];
  
  infoOwner?.owner.forEach(per => {
    const newInfo = infoAllUserLegal.find(e => e.uuid === per.person_uuid)
    if(newInfo) {
      allUserLegalInfoOwner.push(newInfo)
    } 
  });
  
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

  const getCountAttachFileAuthorizeTypeWithUuid = (activeUuid:string | null | undefined)=> {
    if(!activeUuid) return 0;
    const documentList : ILOANNormalDocument[] = _.get(infoHasAuthor?.authorized_persons.find(it=>it.person_uuid === activeUuid ),'documents',[]);
    let count = 0;
    documentList.forEach(doc=>{
      const child_files = _.get(doc,'child_files',[]);
      count += (child_files?.filter(f => !f?.uuid?.includes(PREFIX_LOCAL)).length ?? 0);
    })
    return count;
  }

  useEffect(() => {
    if ( typeLandActive !== typeLand){
      setTypeLandActive(typeLand)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeLand])


  useEffect(() => {
    // && existLegalOwnerFull === false
    if (infoOwner?.owner_type === 'SELF' ){
      onChangeCollateralOwnerType('SELF')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemActive?.activeUUID,LandCTXDGcnQshCurrentIndex ])


  const onChangeCollateralOwnerType = (value: string) => {
    let flag = false;
    let list :ILandOwner[] = [];
    if (value !== ownerWrapper) {
      setOwnerWrapper(value)
    }
    switch (value) {
      case 'SELF':
        flag = true;
        list = listSelfOwner.map(o => {
          return {
            full_name: o.full_name,
            authorized_persons: [],
            has_authorize: "N",
            person_uuid: o.uuid,
            active: 0,
            type: o.type,
          }
        })
        break;
      case 'CO_BORROWER':
        flag = true;
        list = [];
        break;
      case 'THIRD_PARTY':
        flag = true;
        list = []
        break;
      case 'SEPARATE_PROPERTY':
        flag = true;
        list = [];
        break;
    }
    setListOwner(list)
    if (flag) {
      
      if(
        //data QSDĐ là đất và / hoặc nhà riêng lẻ
        !optionsCer.length
        && !dataUserListLegaDetails?.typeUseLand
        && !dataUserListLegaDetails?.typeGCN
        && !dataUserListLegaDetails?.numberGCNLegal
        && !dataUserListLegaDetails?.numberGCN
        && !dataUserListLegaDetails?.dateRange
        && !dataUserListLegaDetails?.dateLocation
        //data quyền sở hữu căn chung cư
        && !apartmentOwnership?.length
        //data thông tin chứng khoán
        // && !SubTypeItems.map((item)=>{return item?.typeCollateral})
        //data dây chuyền sản xuất(máy móc thiết bị)
        && !dataItems?.typeCollateral
        && dataItems?.count === null 
        && !dataItems?.status 
        && dataItems?.year === null
        && dataItems?.quantity === null
      ){
          setIsModalConfirm(isModalConfirm);
          dispatch(setCollaretalOwnerType(value, {
            uuidActiveData: uuIdData,
            uuidActiveSubtype: activeSubType,
            uuidActiveitems: SubTypeItemsActive ?? '',
            objdataLegal: list,
            typeOwner: value,
          }))
      }
      else if (value !== infoOwner?.owner_type) {
        setIsModalConfirm(!isModalConfirm);
      }
      else {
        dispatch(setCollaretalOwnerType(value, {
          uuidActiveData: uuIdData,
          uuidActiveSubtype: activeSubType,
          uuidActiveitems: SubTypeItemsActive ?? '',
          objdataLegal: list,
          typeOwner: value,
        }))
      }

    }
    // if (flag) {
    //   if (value !== infoOwner?.owner_type) {
    //     setIsModalConfirm(!isModalConfirm);
        
    //     // if (typeItem?.id === 'MARK' && dataCerMark.length > 0) {
    //     //   setIsModalConfirm(!isModalConfirm);
    //     // } else if (typeItem?.id === 'LAND' && dataCerLand !== undefined && dataCerLand.dataCertificate !== undefined && dataCerLand.dataCertificate.length > 0) {
    //     //   setIsModalConfirm(!isModalConfirm);
    //     // } else if (typeItem?.id === 'APPA' && dataAPA.length > 0) {
    //     //   setIsModalConfirm(!isModalConfirm);
    //     // }else {
    //     //   dispatch(setCollaretalOwnerType(value, {
    //     //     uuidActiveData: uuIdData,
    //     //     uuidActiveSubtype: activeSubType,
    //     //     uuidActiveitems: SubTypeItemsActive ?? '',
    //     //     objdataLegal: list,
    //     //     typeOwner: value,
    //     //   }))
    //     // }
    //   }else {
    //     dispatch(setCollaretalOwnerType(value, {
    //       uuidActiveData: uuIdData,
    //       uuidActiveSubtype: activeSubType,
    //       uuidActiveitems: SubTypeItemsActive ?? '',
    //       objdataLegal: list,
    //       typeOwner: value,
    //     }))
    //   }

    // }
  }

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onClickMenu = (menu: ObjectListMenuItem, position: number) => {
    if (menu.value === '1') {
      setOpenModal(true)
      setTypeInfo("owner")
      switch (infoOwner?.owner_type ) {
        case 'SELF':
          return (
            setInfoUser(listSelfOwner),
            setPosition(position)
          )
        case 'CO_BORROWER':
          let coBr = infoAllUserLegal?.filter(o1 => infoOwner?.owner.some(o2 => o1.uuid === o2.person_uuid));
          return (
            setInfoUser(coBr),
            setPosition(position)
          )
        case 'THIRD_PARTY':
          return (
            setInfoUser(infoAllUserLegal?.filter(o1 => infoOwner?.owner.some(o2 => o1.uuid === o2.person_uuid))),
            setPosition(position)
          )
        case 'SEPARATE_PROPERTY':
          return (
            setInfoUser(infoAllUserLegal?.filter(o1 => infoOwner?.owner.some(o2 => o1.uuid === o2.person_uuid))),
            setPosition(position)
          )
      }
    }
    if(menu.value === "2"){
      setOpenModal(true);
      setInfoUser(infoAllUserLegal?.filter(o1 => allUserLegalOptions.some(o2 => o1.uuid === o2.uuid)));
      setPosition(position)
      setTypeInfo("hasAuthor")
    }
    if(menu.value === "3" || menu.value === "4"){
      // Xóa người sỡ hữu
      onClickMenuUserLegal(menu,position)
    }
  }

  const onChangeList = (current: number) => {
    // const currentAcive =  infoOwner?.owner[current].person_uuid ?? '';
    dispatch(setOnChangeCollaretalActiveOwner(current.toString(), {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: activeSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? ''
    }))
  }

  const onChangeHasAuthorize = (value: string) => {
     dispatch(setCollaretalInfoOwnerHasAuthorize(value, {
      uuidActiveData: uuIdData,
      uuidActiveSubtype: activeSubType,
      uuidActiveitems: SubTypeItemsActive ?? '',
    }));

  }

  const onAddOwner = () => {
    if(SubTypeItems.length <= 0){
      return
    }else {
      setOpenModalOwner(true)
    }
  }
  const onCloseModalOwner = () => {
    setOpenModalOwner(false);
  };

  const onAddHasAuthorize = () => {
    infoOwnerDetail?.has_authorize ==='Y' && setOpenModalHasAuthorize(true)
  }
  const onCloseModalHasAuthorize = () => {
    setOpenModalHasAuthorize(false);
  };

  const onChangeListHasAuthor = (current: number) => {

    dispatch(setOnChangeCollaretalActiveHasAuthor(current.toString(), {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: activeSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? ''
    }))
  }

  const onChangeDetailHasAuthor = (value: string | number | null, key: keyof IInfoAuthorize) => {
    dispatch(setOnChangeCollaretalDetailHasAuthor(value, { uuidActiveData: uuIdData, uuidActiveSubtype: activeSubType, key }))
  }
  const onHandleCancelConfirm = () => {
    ownerCheckRef.current?.setValue(infoOwner?.owner_type ?? '')
    setIsModalConfirm(!isModalConfirm);
  }
  ///
  const onHandleConfirm = () => {
    dispatch(setCollaretalOwnerType(ownerWrapper, {
      uuidActiveData: uuIdData,
      uuidActiveSubtype: activeSubType,
      uuidActiveitems: SubTypeItemsActive ?? '',
      objdataLegal: listOwner,
      typeOwner: ownerWrapper,
    }))

    dispatch(setCollaretalCertificate('',{
      uuidActiveData: uuIdData,
      uuidActiveSubtype: activeSubType,
      uuidActiveitems: SubTypeItemsActive ?? '',
    }))
    setIsModalConfirm(!isModalConfirm);
  }

  const onClickMenuUserLegal = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuUserLegal = infoHasAuthor?.authorized_persons.find((cer, index) => index === position);
    if(menu.value === "3"){
      if(activeCollapsed?.type !== "REST" && itemActive){
        setDeleteIdOwner(itemActive?.owner_wrapper.owner[position])
      }else{
        infoHasAuthor && setDeleteIdOwner(infoHasAuthor)
      }
    }
    if(menu.value === "4"){
      dataMenuUserLegal && setDeleteIdUser(dataMenuUserLegal);
    }
  }

  const onHandleCancelConfirmUser = () => {
    setDeleteIdUser(null);
  }
  
  const onHandleCancelConfirmOwner = () => {
    setDeleteIdOwner(null);
  }
  /**
   * Action menu success delete user
   *
   */
  const getOwnerUuid = ()=>{
    const activeGCNQSH = ctxdGcnQshData.find(i => i.uuIdCtxdGcnQsh === CTXDGcnQshUuidActive)
    let owner_uuid = ""
    switch (typeLand) {
      case 'CTXD_GCN':
        return owner_uuid = activeGCNQSH?.land_legal_information_owner.owner[activeGCNQSH.land_legal_information_owner.active]?.owner_uuid ?? ""
      case 'LAND':
        return owner_uuid = itemActive?.land.land_legal_information_owner.owner[itemActive?.land.land_legal_information_owner.active]?.owner_uuid ?? ""
    }
    return owner_uuid
  }
  // xoa ng uy quyen
  const onHandleConfirmUser = () => {
    let uuidDelete = deleteIdUser?.person_uuid;
    const activeGCNQSH = ctxdGcnQshData.find(i=>i.uuIdCtxdGcnQsh === CTXDGcnQshUuidActive)
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      dispatch(removeCollaretalHasAuthor(uuidDelete,{
        type:typeLand,
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        price_cert_uuid: priceCertUuid ?? "", 
        price_cert_asset_uuid: itemActive?.price_cert_asset_uuid ?? "",
        land_const_uuid: activeGCNQSH?.land_const_uuid ?? "",
        owner_uuid: getOwnerUuid(), 
        owner_auth_uuid : deleteIdUser?.owner_auth_uuid ??  "",
      }))
    }
    onHandleCancelConfirmUser()
  }
  const onHandleConfirmOwner = () => {
    let uuidDelete = deleteIdOwner?.person_uuid
    
    const activeGCNQSH = ctxdGcnQshData.find(i=>i.uuIdCtxdGcnQsh === CTXDGcnQshUuidActive)
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{

      dispatch(removeCollaretalOwner(uuidDelete,{
        type: activeCollapsed?.type !== "REST" ? activeCollapsed?.type ?? "" :
          (activeCollapsed.sub_type[0]?.id !== "LAND" && activeCollapsed.sub_type[0]?.id !== "CTXD_LAND")
            ? activeCollapsed.sub_type[0]?.id : typeLand,
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        price_cert_uuid: priceCertUuid ?? "", 
        price_cert_asset_uuid: itemActive?.price_cert_asset_uuid ?? "",
        land_const_uuid: activeGCNQSH?.land_const_uuid ?? "",
        owner_uuid: deleteIdOwner?.owner_uuid ?? ""
      }))
    }
    onHandleCancelConfirmOwner()
  }
  const type = typeItem && typeItem?.id === "LAND" ? typeLandActive : "Other"
  
  const checkEnableAddOwner = () => {
    if(infoOwner?.owner_type === "SELF"){
      return false
    }
    return true
  }
  const handleAttach = (index: number) => {
    if((activeCollapsed?.type === "REST" && validRest.valid) || (activeCollapsed?.type !== "REST" && valid?.valid)){
      dispatch(setCollateralValidate({valid : true}))
      const currentData = _.get(allUserLegalOptions,[index]);
      if(!currentData) return;
        setOpenAuthorizeAttachModal({isOpen:true,uuid:currentData.uuid});
    
    }
    else{
      if(activeCollapsed?.type === "REST" && !validRest.valid){
        dispatch(setCollateralValidate(validRest))
        notify(validRest.message ? validRest.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
      }
      else if(valid && activeCollapsed?.type !== "REST" && !valid?.valid){
        dispatch(setCollateralValidate(valid))
        notify(valid.message ? valid.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
      }
    }
  }

  
  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <OwnerLegalCheck
          ref={ownerCheckRef}
          label="Đối tượng sở hữu tài sản"
          required
          disabled={ruleDisabled || SubTypeItems.length <= 0 ? true : false}
          value={infoOwner?.owner_type ?? ''}
          sx={SxRadio}
          onChange={onChangeCollateralOwnerType}
          listDesabled={infoAllUserLegal?.some(x => x.type === "marriage") === true ? [] :  ["SEPARATE_PROPERTY"] }
        />
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <ObjectList
          onClickMenu={onClickMenu}
          onChange={onChangeList}
          onAdd={onAddOwner}
          avatar
          current={dataActive}
          enableAdd={checkEnableAddOwner() && !ruleDisabled }
          enableMenu={true || !ruleDisabled}
          menu={(infoOwner?.owner_type !== 'SELF') && !ruleDisabled ? [
            {
              label: "Chi tiết",
              value: "1"
            },
            {
              label: "Xóa",
              value: "3"
            }] : [{
              label: "Chi tiết",
              value: "1"
            }]}
          labelLength="Người sở hữu: &nbsp;"
          attachLabel="tập tin"
          options={allUserLegalInfoOwner?.map(o => {
            return { 'label': o.full_name ?? null,attachment:getCountAttachFileDeclareTypeWithUuid(o?.uuid) }
          }) ?? []}
          onAttach={(idx:number)=>{
            const currentData = _.get(infoOwner,['owner',idx]);
            if(!currentData) return;
            setOpenDeclareAttachModal({isOpen:true,uuid:currentData.person_uuid});
          }}
          sx={{...SxObjectListUser,
              "& .attachBox":{
                right:"32%",
                bottom:"15px"
              }
          }}

        />
      </Grid>
      {
        isFormLegalInfo ?
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <CardInside
              title="I. Pháp lý uỷ quyền của đất"
              sx={{
                "& legend": {
                  fontSize: '16px'
                }
              }}
            >
              <Grid container spacing={3} className="pl-4 pb-4">
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <CollateralCheck
                    label="Có văn bản ủy quyền hay không"
                    required
                    onChange={onChangeHasAuthorize}
                    value={infoOwnerDetail?.has_authorize ?? "N"}
                    disabled={(infoOwner?.owner !== undefined && infoOwner?.owner.length > 0  ? false : true) || ruleDisabled }
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{
                  "& .title-owner": {
                    color: 'var(--mscb-secondary)',
                    fontWeight: 500,
                  }
                }}>
                  <span className="title-owner font-medium" >1. Thông tin người được ủy quyền</span>
                  <ObjectList
                    avatar
                    className="pt-1"
                    enableAdd={!ruleDisabled}
                    enableMenu={true}
                    onAdd={onAddHasAuthorize}
                    onChange={onChangeListHasAuthor}
                    labelLength="Số lượng:"
                    onClickMenu={onClickMenu}
                    menu={[{
                      label: "Chi tiết",
                      value: "2",
                    },
                    {
                      label: "Xóa",
                      value: "4",
                    }]}
                    attachLabel="tập tin"
                    
                    current={infoHasAuthor?.active ?? 0}
                    options={allUserLegalOptions?.map((item, i) => ({
                      label: item.full_name,
                      attachment: getCountAttachFileAuthorizeTypeWithUuid(item.uuid)
                    })) ?? []}
                    onAttach={handleAttach}
                    sx={{...SxObjectListUser,
                      "& .attachBox":{
                        right:"32%",
                        bottom:"15px"
                      }
                  }}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="2. Mối quan hệ giữa người được uỷ quyền với chủ tài sản"
                    required
                    disabled={(() => {
                      if (infoHasAuthor?.authorized_persons === undefined ) return true;
                      if (infoHasAuthor.authorized_persons.length > 0 ) return false;
                      return true;
                    })() || ruleDisabled}
                    onDebounce={(val) => onChangeDetailHasAuthor(val, "owner_relationship")}
                    value={infoHasAuthorDetail?.owner_relationship}
                    message={getMessage('owner_relationship', {
                      position: itemActive?.activeUUID ?? '',
                      activeOwner: infoOwner?.active ?? '',
                      activeAuthor: infoHasAuthor?.active ?? '',
                      type  
                    })}

                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="3. Mối quan hệ giữa người được uỷ quyền với đối tượng vay"
                    required
                    disabled={(() => {
                      if (infoHasAuthor?.authorized_persons === undefined ) return true;
                      if (infoHasAuthor.authorized_persons.length > 0 ) return false;
                      return true;
                    })() || ruleDisabled}
                    value={infoHasAuthorDetail?.borrower_relationship}
                    onDebounce={(val) => onChangeDetailHasAuthor(val, "borrower_relationship")}
                    message={ getMessage('borrower_relationship', {
                      position: itemActive?.activeUUID ?? '',
                       activeOwner: infoOwner?.active ?? '',
                       activeAuthor :infoHasAuthor?.active ?? '',
                       type
                    })}

                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Input
                    label="4. Hợp đồng ủy quyền"
                    required
                    value={infoHasAuthorDetail?.authorize_contract}
                    onDebounce={(val) => onChangeDetailHasAuthor(val, "authorize_contract")}
                    disabled={(() => {
                      if (infoHasAuthor?.authorized_persons === undefined ) return true;
                      if (infoHasAuthor.authorized_persons.length > 0 ) return false;
                      return true;
                    })() || ruleDisabled}
                    message={getMessage('authorize_contract', {
                      position: itemActive?.activeUUID ?? '',
                      activeOwner: infoOwner?.active ?? '',
                      activeAuthor: infoHasAuthor?.active ?? '',
                      type
                    })}

                  />
                </Grid>
              </Grid>
            </CardInside>
          </Grid>
          : null
      }
      <ModalOwnerInfo
        open={openModal}
        onClose={onCloseModal}
        infoUser={infoUser}
        position={position}
        typeInfo={typeInfo}
      />
      <ModalTableCoOwners
        open={openModalOwner}
        onClose={onCloseModalOwner}
        activeSubType={activeSubType}
        uuIdData={uuIdData}
        type={infoOwner?.owner_type}
        listInfo={infoOwner?.owner ?? []}
      />
      <ModalTableCoOwnersHasAuthorize
        open={openModalHasAuthorize}
        onClose={onCloseModalHasAuthorize}
        active={infoOwner?.owner[ownerActive]?.person_uuid}
        activeSubType={activeSubType}
        uuIdData={uuIdData}
        key='ModalTableCoOwnersHasAuthorize'
      />
      <ModalConfirm
        open={isModalConfirm}
        children="Khi thay đổi đối tượng sở hữu sẽ phải nhập lại thông tin pháp lý GCN !."
        labelConfirm="Xác nhận"
        labelCancel="Hủy"
        onClose={onHandleCancelConfirm}
        onConfirm={onHandleConfirm}
      />
      <ModalConfirm open={deleteIdUser !== null} onClose={onHandleCancelConfirmUser} onConfirm={onHandleConfirmUser}>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa người được ủy quyền?
        </Box>
      </ModalConfirm>
      <ModalConfirm open={deleteIdOwner !== null} onClose={onHandleCancelConfirmOwner} onConfirm={onHandleConfirmOwner}>
        <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa đối tượng sở hữu?
        </Box>
      </ModalConfirm>
      {openDeclareAttachModal.isOpen && <LegalAttachmentModal
        open={Boolean(openDeclareAttachModal.isOpen)}
        onClose={() => setOpenDeclareAttachModal({isOpen:false,uuid:''})}
        uuidActive={openDeclareAttachModal.uuid ?? ''}
        viewOnly
      />}
      {
        openAuthorizeAttachModal.isOpen && <AttachmentModalAuthorize
        data={infoHasAuthorDetail?.documents}
        open={Boolean(openAuthorizeAttachModal.isOpen)}
        onClose={() => setOpenAuthorizeAttachModal({isOpen:false,uuid:''})}
        extraData={{ uuidActiveData: uuIdData, uuidActiveSubtype: activeSubType, key: "documents"}}
      />
      }

    </Grid>
  )
}

export default LegalInformationOwner;