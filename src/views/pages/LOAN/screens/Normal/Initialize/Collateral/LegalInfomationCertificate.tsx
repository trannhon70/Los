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
  getTypeLand
} from "features/loan/normal/storage/collateralV2/selector";
import {
  ICertificateLegalInfoData,
  ICertificateLegalInfoDataUserList,
  IPerson
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
  const dataCer = useSelector( getLOANormalStoreLegalCertifiCate(
    uuIdData,
    activeSubType
  ));

  const SubTypeItemsActive = useSelector( getLoanNormalSubTypeItemsActive(
    uuIdData,
    activeSubType
  ));

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
  const getMessage = useNormalCollateralMessage()
  const TypeLand = useSelector(getTypeLand(uuIdData, activeSubType, SubTypeItemsActive ?? ""));

  const CTXDGcnQshUuidActive = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshUuidActive(uuIdData, activeSubType));

  const [ deleteIdCer, setDeleteIdCer ] = useState<ICertificateLegalInfoData | null>(null);
  const [ deleteIdUser, setDeleteIdUser ] = useState<IPerson | null>(null);

  const [ isDisiableInput, setIsDisiableInput ] = useState<boolean>(false);
  const [openModalOwner, setOpenModalOwner] = useState(false);


  useEffect(()=> {
    let isCheck: boolean = false;

    if(CTXDGcnQshUuidActive?.length === 0 && TypeLand === ETypeLandName.CTXD_GCN){
      isCheck = true;
    }

    if(dataCer?.activeUUIDCertificate?.length === 0){
      isCheck = true;
    }

    if(isCheck !== isDisiableInput){
      setIsDisiableInput(isCheck)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCer?.activeUUIDCertificate])


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
  );

  /**
   * option data opject certifiCate
   *
   */
  const optionsCer: ObjectListOption[] =
    dataCer?.dataCertificate?.map((item, i) => ({
      label: `Giấy chứng nhận ${i + 1}`,
      circle: <BsFillFileEarmarkFill />,
      attachment:10
    })) ?? [];

  const onChangeCre = (current: number) => {
    const currentActive =
      dataCer?.dataCertificate[current].activeUUIDCertificateL ?? "";
    dispatch(
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
    if(menu.value === EActionMenu.DELETE){
      dataMenuCer && setDeleteIdCer(dataMenuCer);
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
        price_cert_uuid: "",
        price_cert_asset_uuid: "",
        land_const_uuid: "",
        land_const_item_cert_uuid: '',
        land_cert_uuid: ''
      }))
      notify('Xóa giấy chứng nhận thành công', 'success');
    }
    onHandleCancelConfirmCer()
  }

  const optionsCerUseListLegal: ObjectListOption[] =
  infoAllUserLegal?.filter(o1 => dataUserListLegaDetails?.persons?.some(o2 => o1.uuid === o2.person_uuid))?.map((item, i) => ({
    label: item.full_name,
    attachment:1
    // circle: <AiOutlineFileWord />,
  })) ?? [];


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


  /**
   * Action menu onject list certifiCate
   *
   */
   const onClickMenuUserLegal = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuUserLegal = dataCerUseList?.persons.find((cer, index) => index === position);
    if(menu.value === EActionMenu.DELETE){
      dataMenuUserLegal && setDeleteIdUser(dataMenuUserLegal);
    }
  }

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
        type:'',
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: activeSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveCer: dataCer?.activeUUIDCertificate ?? "",
        price_cert_uuid: "",
        price_cert_asset_uuid: "",
        apart_owner_cert_uuid: "",
        apart_owner_cert_item_uuid:  "",
        market_cert_uuid: "",
        market_cert_item_uuid: "",
        land_const_uuid: "",
        land_const_item_cert_uuid: "",
        land_const_item_cert_item_uuid: "",
        land_cert_uuid: "",
        re_land_cert_item_uuid: "",
      }))

      notify('Xóa người sở hữu thành công', 'success');
    }

    onHandleCancelConfirmUser()
  }

  // set active vi tri dau tien check
  useEffect(()=>{
    if(dataCer?.dataCertificate){
      dispatch(
        setOnChangeCollaretalCertificate(dataCer?.dataCertificate[0]?.activeUUIDCertificateL ?? '', {
          uuidActiveData: uuIdData ?? "",
          uuidActiveSubtype: activeSubType ?? "",
          uuidActiveitems: SubTypeItemsActive ?? "",
        })
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
  const uploadFile = ( ) =>{

  }
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
          onAttach={(index)=>{
            // upload fui
            console.log(index,'indexxxxxx');

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
                enableAdd={!ruleDisabled}
                enableMenu={!ruleDisabled}
                avatar
                menu={[
                  {
                    value: EActionMenu.DELETE,
                    label: "Xóa",
                  }
                ]}
                onClickMenu={onClickMenuUserLegal}
                onAdd={onAddCreUseListLegal}
                // onChange={onChangeCreUseListLegal}
                labelLength="Người sở hữu: &nbsp;"
                // current={activeCreOptionListUseLegal}
                options={optionsCerUseListLegal}
                sx={{...SxObjectListUser,
                  "& .attachBox":{
                    right:"30%",
                    bottom:"10px"
                  }
              }}
                attachLabel="tập tin"
              />
            </Grid>
                {TypeLand !== ETypeLandName.LAND ?
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertificateType
                  label="1. Loại GCN quyền sử dụng đất"
                  onChange={(val) => {
                    onChangeDataUserList(val, "typeUseLand")
                    if(val !== "OTHER"){
                      onChangeDataUserList('', "typeGCN")
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
                    if(val !== "OTHER"){
                      onChangeDataUserList('', "typeGCN")
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
                value={dataUserListLegaDetails?.typeGCN}
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
                value={dataUserListLegaDetails?.numberGCNLegal}
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
                value={dataUserListLegaDetails?.numberGCN}
                disabled={isDisiableInput || ruleDisabled}
                message={getMessage('numberGCN',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="5. Ngày cấp"
                onChange={(val) => onChangeDataUserList(val, "dateRange")}
                value={(dataUserListLegaDetails?.dateRange)}
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
                value={dataUserListLegaDetails?.dateLocation}
                disabled={isDisiableInput || ruleDisabled}
                required
                message={getMessage('placeOfIssue',{position:SubTypeItemsActive ?? '',type: TypeLand, active: dataCerUseList?.activeUUIDCertificateL ?? ''})}
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
        activeSubType={activeSubType}
        uuIdData={uuIdData}
        uuidActiveitems={SubTypeItemsActive}
        uuidActiveCer={dataCer?.activeUUIDCertificate}
        listInfo={
          infoAllUserLegal?.filter(o1 => infoLegalFromOwner?.some(o2 => o1.uuid === o2))
        }
        listDetail={dataUserListLegaDetails?.persons}
      />
    </Grid>
  );
};

export default LegalInfomationCertificate;
