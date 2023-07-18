import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CardInside from 'views/components/layout/CardInside';
import ObjectList, { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import Input from 'views/components/base/Input';
import { IInfoAuthorize, ILandOwner, ILOANNormalCollateralV2StateFullInfoLegalOwners } from 'types/models/loan/normal/storage/CollaretalV2';
import {
  removeCollaretalHasAuthor,
  setCollaretalCertificate,
  setCollaretalInfoOwnerHasAuthorize,
  setCollaretalOwnerType,
  setOnChangeCollaretalActiveHasAuthor,
  setOnChangeCollaretalActiveOwner,
  setOnChangeCollaretalDetailHasAuthor
} from 'features/loan/normal/storage/collateralV2/actions';
import {
  getInfoAllUserLegal,
  getLoanNormalSubTypeItemID,
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreLandLegalItemActive,
  getLOANormalStoreLegalCertifiCate,
  getLOANormalStoreLegalDepartmentCertificates,
  getLOANormalStoreLegalHasAuthorDetail,
  getLOANormalStoreLegalMaketCertificates,
  getLOANormalStoreLegalOwnerDetailLegalData,
  getLOANormalStoreLegalOwnerLegalData,
  getTypeLand
} from "features/loan/normal/storage/collateralV2/selector";
import { SxObjectListUser, SxRadio } from "./style";
import ModalOwnerInfo from "./ModalOwnerInfo";
import ModalTableCoOwners from "./ModalTableCoOwners";
import ModalTableCoOwnersHasAuthorize from "./ModalTableCoOwnersHasAuthorize";
import CollateralCheck from "views/components/widgets/CollateralCheck";
import OwnerLegalCheck from "views/components/widgets/OwnerLegalCheck";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import { Box } from "@mui/system";
import useNotify from "app/hooks/useNotify";
import { RadioRef } from "views/components/base/Radio";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface ILegalInfomationOwnerProps {
  activeSubType?: string;
  uuIdData?: string;
  isFormLegalInfo?: boolean;
}

const LegalInfomationOwner: FunctionComponent<ILegalInfomationOwnerProps> = (props) => {

  const { activeSubType = "", uuIdData = "", isFormLegalInfo = true } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const dispatch = useDispatch();
  const notify = useNotify();

  const getMessage = useNormalCollateralMessage();
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData ?? '', activeSubType ?? ""))
  const infoOwnerDetail = useSelector(getLOANormalStoreLegalOwnerDetailLegalData(uuIdData, activeSubType))
  const infoAllUserLegal = useSelector(getInfoAllUserLegal)
  const infoOwner = useSelector(getLOANormalStoreLegalOwnerLegalData(uuIdData, activeSubType))
  const infoHasAuthor = useSelector(getLOANormalStoreLegalOwnerDetailLegalData(uuIdData, activeSubType));
  const infoHasAuthorDetail = useSelector(getLOANormalStoreLegalHasAuthorDetail(uuIdData, activeSubType));
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData,activeSubType ?? ''));
  const typeLand =  useSelector(getTypeLand(uuIdData,activeSubType,itemActive?.activeUUID ?? ''));
  const typeItem = useSelector(getLoanNormalSubTypeItemID(uuIdData,activeSubType) ?? '')
  const dataCerMark = useSelector(getLOANormalStoreLegalMaketCertificates(uuIdData ?? '', activeSubType ?? '')) ?? [];
  const dataCerLand = useSelector(getLOANormalStoreLegalCertifiCate(uuIdData ?? '', activeSubType ?? ''));
  const dataAPA = useSelector( getLOANormalStoreLegalDepartmentCertificates(uuIdData, activeSubType)) ?? [];

  const [ownerWrapper, setOwnerWrapper] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalOwner, setOpenModalOwner] = useState(false);
  const [openModalHasAuthorize, setOpenModalHasAuthorize] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<ILOANNormalCollateralV2StateFullInfoLegalOwners[]>([]);
  const [ listOwner, setListOwner] = useState<ILandOwner[]>([]);
  const [position, setPosition] = useState<number>();
  const [ typeLandActive, setTypeLandActive ] = useState<string>(typeLand);
  const [ deleteIdUser, setDeleteIdUser ] = useState<IInfoAuthorize | null>(null);
  const ownerCheckRef = useRef<RadioRef>(null);
  const ownerActive =  infoOwner?.active ?? 0;
  let listSelfOwner = infoAllUserLegal.filter(i => { return i.type === 'borrower' || i.type === 'marriage' });

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
      if (value !== infoOwner?.owner_type) {
        if (typeItem?.id === 'MARK' && dataCerMark.length > 0) {
          setIsModalConfirm(!isModalConfirm);
        } else if (typeItem?.id === 'LAND' && dataCerLand !== undefined && dataCerLand.dataCertificate !== undefined && dataCerLand.dataCertificate.length > 0) {
          setIsModalConfirm(!isModalConfirm);
        } else if (typeItem?.id === 'APA' && dataAPA.length > 0) {
          setIsModalConfirm(!isModalConfirm);
        }else {
          dispatch(setCollaretalOwnerType(value, {
            uuidActiveData: uuIdData,
            uuidActiveSubtype: activeSubType,
            uuidActiveitems: SubTypeItemsActive ?? '',
            objdataLegal: list,
            typeOwner: value,
          }))
        }
      }else {
        dispatch(setCollaretalOwnerType(value, {
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
  }

  const onChangeList = (current: number) => {
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
    setOpenModalOwner(true)
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
    if(menu.value === EActionMenu.DELETE){
      dataMenuUserLegal && setDeleteIdUser(dataMenuUserLegal);
    }
  }

  const onHandleCancelConfirmUser = () => {

    setDeleteIdUser(null);

  }
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
      dispatch(removeCollaretalHasAuthor(uuidDelete,{
        type: typeLand,
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        price_cert_uuid: "", 
        price_cert_asset_uuid: "",
        land_const_uuid: "",
        owner_uuid: "", 
        owner_auth_uuid : "",
      }))
      notify('Xóa người được ủy quyền thành công', 'success');
    }
    onHandleCancelConfirmUser()
  }

  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <OwnerLegalCheck
          ref={ownerCheckRef}
          label="Đối tượng sở hữu tài sản"
          required
          disabled={ruleDisabled}
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
          current={0}
          enableAdd={(infoOwner?.owner_type === 'SELF' ? false : true) || !ruleDisabled}
          enableMenu={true || !ruleDisabled}
          menu={[{
            label: "Chi tiết",
            value: "1"
          }]}
          labelLength="Người sở hữu: &nbsp;"
          attachLabel="tập tin"
          options={infoOwner?.owner?.map(o => {
            return { 'label': o.full_name ?? null,attachment:1 }
          }) ?? []}
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
                    onChange={onChangeHasAuthorize}
                    value={infoOwnerDetail?.has_authorize}
                    disabled={(infoOwner?.owner !== undefined && infoOwner?.owner.length > 0  ? false : true) || ruleDisabled }
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <span className='font-medium'>1. Thông tin người được ủy quyền</span>

                  <ObjectList
                    className="pt-1"
                    enableAdd={true}
                    enableMenu={true}
                    onAdd={onAddHasAuthorize}
                    onChange={onChangeListHasAuthor}
                    labelLength="Số lượng:"
                    onClickMenu={onClickMenuUserLegal}
                    menu={[{
                      label: "Xóa",
                      value: EActionMenu.DELETE,
                    }]}
                    attachLabel="tập tin"
                    current={infoHasAuthor?.active}
                    options={ infoAllUserLegal?.filter(o1 => infoHasAuthor?.authorized_persons?.some(o2 => o1.uuid === o2.person_uuid))?.map((item, i) => ({
                      label: item.full_name,
                      attachment:1
                      // circle: <AiOutlineFileWord />,
                    })) ?? []}

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
                      type: typeLandActive ? typeLandActive : "other"

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
                       type: typeLandActive ? typeLandActive : "other"
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
                      type: typeLandActive ? typeLandActive : "other"
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
    </Grid>
  )
}

export default LegalInfomationOwner;