import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CardInside from 'views/components/layout/CardInside';
import ObjectList, { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import Input from 'views/components/base/Input';
import {
  ILandOwner,
  ILOANNormalCollateralV2StateFullInfoLegalOwners
} from 'types/models/loan/normal/storage/CollaretalV2';
import {
  setCollaretalOwnerTypeApproval,
  setOnChangeCollaretalActiveHasAuthorApproval,
  setOnChangeCollaretalActiveOwnerApproval,
} from 'features/loan/normal/storageApproval/collateral/actions';
import {
  getInfoAllUserLegalApproval,
  getLoanNormalSubTypeItemID,
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreLandLegalItemActiveApproval,
  getLOANormalStoreLegalCertifiCateApproval,
  getLOANormalStoreLegalDepartmentCertificatesApproval,
  getLOANormalStoreLegalHasAuthorDetailApproval,
  getLOANormalStoreLegalMaketCertificatesApproval,
  getLOANormalStoreLegalOwnerDetailLegalDataApproval,
  getLOANormalStoreLegalOwnerLegalDataApproval,
  getTypeLandApproval
} from "features/loan/normal/storageApproval/collateral/selector";
import { SxObjectListUser, SxRadio } from "./style";
import ModalOwnerInfo from "./ModalOwnerInfo";
import ModalTableCoOwners from "./ModalTableCoOwners";
import ModalTableCoOwnersHasAuthorize from "./ModalTableCoOwnersHasAuthorize";
import CollateralCheck from "views/components/widgets/CollateralCheck";
import OwnerLegalCheck from "views/components/widgets/OwnerLegalCheck";
import { RadioRef } from "views/components/base/Radio";
import * as _ from 'lodash';
import { setUuidAttachmentLegalApproval } from "features/loan/normal/storageApproval/collateral/actions";
import { useLegalAttachmentHook } from "./AttachmentLegal";
import LegalAttachmentModal from "views/pages/LOAN/screens/Normal/Initialize/Legal/AttachmentModalServices";
import { ILOANNormalStorageLegalFile } from "types/models/loan/normal/storage/Legal";
import {getListDeclareDataLegal} from "features/loan/normal/storage/legal/selectors";
import { PREFIX_LOCAL } from "utils";
export interface ILegalInfomationOwnerProps {
  activeSubType?: string;
  uuIdData?: string;
  isFormLegalInfo?: boolean;
}

const LegalInfomationOwner: FunctionComponent<ILegalInfomationOwnerProps> = (props) => {

  const { activeSubType = "", uuIdData = "", isFormLegalInfo = true } = props;
  const dispatch = useDispatch();

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval(uuIdData ?? '', activeSubType ?? ""))
  const infoOwnerDetail = useSelector(getLOANormalStoreLegalOwnerDetailLegalDataApproval(uuIdData, activeSubType))
  const infoAllUserLegal = useSelector(getInfoAllUserLegalApproval)
  const infoOwner = useSelector(getLOANormalStoreLegalOwnerLegalDataApproval(uuIdData, activeSubType))
  const infoHasAuthor = useSelector(getLOANormalStoreLegalOwnerDetailLegalDataApproval(uuIdData, activeSubType));
  const infoHasAuthorDetail = useSelector(getLOANormalStoreLegalHasAuthorDetailApproval(uuIdData, activeSubType));
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActiveApproval(uuIdData,activeSubType ?? ''));
  const typeLand =  useSelector(getTypeLandApproval(uuIdData,activeSubType,itemActive?.activeUUID ?? ''));
  const typeItem = useSelector(getLoanNormalSubTypeItemID(uuIdData,activeSubType) ?? '')
  const dataCerMark = useSelector(getLOANormalStoreLegalMaketCertificatesApproval(uuIdData ?? '', activeSubType ?? '')) ?? [];
  const dataCerLand = useSelector(getLOANormalStoreLegalCertifiCateApproval(uuIdData ?? '', activeSubType ?? ''));
  const dataAPA = useSelector( getLOANormalStoreLegalDepartmentCertificatesApproval(uuIdData, activeSubType)) ?? [];
  const listDeclareDataLegal = useSelector(getListDeclareDataLegal);

  const [ownerWrapper, setOwnerWrapper] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalOwner, setOpenModalOwner] = useState(false);
  const [openModalHasAuthorize, setOpenModalHasAuthorize] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<ILOANNormalCollateralV2StateFullInfoLegalOwners[]>([]);
  const [position, setPosition] = useState<number>();
  const [ typeLandActive, setTypeLandActive ] = useState<string>(typeLand);
  const [typeInfo, setTypeInfo] = useState<string>();

  const [openDeclareAttachModal,setOpenDeclareAttachModal] = useState<{isOpen:boolean,uuid:string}>({isOpen:false,uuid:''});

  const ownerCheckRef = useRef<RadioRef>(null);

  const ownerActive =  infoOwner?.active ?? 0;
  const allUserLegalOptions = infoAllUserLegal?.filter(o1 => infoHasAuthor?.authorized_persons?.some(o2 => o1.uuid === o2.person_uuid)) ?? [];
  
  let listSelfOwner = infoAllUserLegal.filter(i => { return i.type === 'borrower' || i.type === 'marriage' });

  const {getCountAttachFileWithLegal_uuid}= useLegalAttachmentHook();
  useEffect(() => {
    if ( typeLandActive !== typeLand){
      setTypeLandActive(typeLand)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeLand])


  useEffect(() => {
    if (infoOwner?.owner_type === 'SELF'){
      onChangeCollateralOwnerType('SELF')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemActive?.activeUUID ])
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
  useEffect(() => {
    if ( typeLandActive !== typeLand){
      setTypeLandActive(typeLand)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeLand])
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
    if (flag) {
      if (value !== infoOwner?.owner_type) {
        if (typeItem?.id === 'MARK' && dataCerMark.length > 0) {
          setIsModalConfirm(!isModalConfirm);
        } else if (typeItem?.id === 'LAND' && dataCerLand !== undefined && dataCerLand.dataCertificate !== undefined && dataCerLand.dataCertificate.length > 0) {
          setIsModalConfirm(!isModalConfirm);
        } else if (typeItem?.id === 'APA' && dataAPA.length > 0) {
          setIsModalConfirm(!isModalConfirm);
        }else {
          dispatch(setCollaretalOwnerTypeApproval(value, {
            uuidActiveData: uuIdData,
            uuidActiveSubtype: activeSubType,
            uuidActiveitems: SubTypeItemsActive ?? '',
            objdataLegal: list,
            typeOwner: value,
          }))
        }
      }else {
        dispatch(setCollaretalOwnerTypeApproval(value, {
          uuidActiveData: uuIdData,
          uuidActiveSubtype: activeSubType,
          uuidActiveitems: SubTypeItemsActive ?? '',
          objdataLegal: list,
          typeOwner: value,
        }))
      }

    }
  }

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onClickMenu = (menu: ObjectListMenuItem, position: number) => {
    if (menu.value === '1') {
      setOpenModal(true)
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
          let thirdParty = infoAllUserLegal?.filter(o1 => infoOwner?.owner.some(o2 => o1.uuid === o2.person_uuid))
          return (
            setInfoUser(thirdParty),
            setPosition(position)
          )
        case 'SEPARATE_PROPERTY':
          let separate = infoAllUserLegal?.filter(o1 => infoOwner?.owner.some(o2 => o1.uuid === o2.person_uuid))
          return (
            setInfoUser(separate),
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
  }

  const onChangeList = (current: number) => {
    dispatch(setOnChangeCollaretalActiveOwnerApproval(current.toString(), {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: activeSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? ''
    }))
  }

  const onCloseModalOwner = () => {
    setOpenModalOwner(false);
  };

  const onCloseModalHasAuthorize = () => {
    setOpenModalHasAuthorize(false);
  };

  const onChangeListHasAuthor = (current: number) => {
    dispatch(setOnChangeCollaretalActiveHasAuthorApproval(current.toString(), {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: activeSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? ''
    }))
  }

  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <OwnerLegalCheck
          ref={ownerCheckRef}
          label="Đối tượng sở hữu tài sản"
          required
          disabled={true}
          value={infoOwner?.owner_type ?? ''}
          sx={SxRadio}
          listDesabled={infoAllUserLegal?.some(x => x.type === "marriage") === true ? [] :  ["SEPARATE_PROPERTY"] }
        />
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <ObjectList
          onClickMenu={onClickMenu}
          onChange={onChangeList}
          avatar
          // current={0}
          current={infoHasAuthor?.active ?? 0}
          enableAdd={false}
          enableMenu={true}
          menu={[{
            label: "Chi tiết",
            value: "1"
          }]}
          labelLength="Người sở hữu: &nbsp;"
          attachLabel="tập tin"
          options={infoOwner?.owner?.map(o => {
            return { 'label': o.full_name ?? null,attachment:getCountAttachFileWithLegal_uuid(o.person_uuid) }
          }) ?? []}
          onAttach={(index)=>{
            const person_uuid = _.get(infoOwner,['owner',index,'person_uuid']);
            if(!person_uuid) return;
            dispatch(setUuidAttachmentLegalApproval(person_uuid));
          }}
          sx={{...SxObjectListUser,
              "& .attachBox":{
                right:"30%",
                bottom:"10px"
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
                    value={infoOwnerDetail?.has_authorize}
                    disabled
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
                  /*   onClickMenu={onOpenModalAuthorize} */
                    className="pt-1"
                    enableAdd={false}
                    enableMenu={true}
                    onChange={onChangeListHasAuthor}
                    labelLength="Số lượng:"
                    attachLabel="tập tin"
                    current={infoHasAuthor?.active}
                    options={allUserLegalOptions?.map((item, i) => ({
                      label: item.full_name,
                      attachment:getCountAttachFileDeclareTypeWithUuid(item.uuid)
                    })) ?? []}
                    onAttach={(index:number)=>{
                      const currentData = _.get(allUserLegalOptions,[index]);
                      if(!currentData) return;
                      setOpenDeclareAttachModal({isOpen:true,uuid:currentData.uuid});
                    }}
                     menu={[{
                      label: "Chi tiết",
                      value: "2"
                    }]}
                    sx={{...SxObjectListUser,
                      "& .attachBox":{
                        right:"30%",
                        bottom:"10px"
                      }
                  }}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="2. Mối quan hệ giữa người được uỷ quyền với chủ tài sản"
                    required
                    disabled
                    value={infoHasAuthorDetail?.owner_relationship}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="3. Mối quan hệ giữa người được uỷ quyền với đối tượng vay"
                    required
                    disabled
                    value={infoHasAuthorDetail?.borrower_relationship}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Input
                    label="4. Hợp đồng ủy quyền"
                    required
                    value={infoHasAuthorDetail?.authorize_contract}
                    disabled
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
        {openDeclareAttachModal.isOpen && <LegalAttachmentModal
        open={Boolean(openDeclareAttachModal.isOpen)}
        onClose={() => setOpenDeclareAttachModal({isOpen:false,uuid:''})}
        uuidActive={openDeclareAttachModal.uuid ?? ''}
        viewOnly
      />}
    </Grid>
  )
}

export default LegalInfomationOwner;