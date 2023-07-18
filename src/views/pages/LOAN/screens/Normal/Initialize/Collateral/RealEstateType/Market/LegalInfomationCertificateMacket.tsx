import { FC, useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import InputDate from "views/components/base/InputDate";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollaretalCertificateMaket,
  setOnChangeCollaretalCertificateMaket,
  setOnChangeCollaretalCertificateMaketPersionListLegalData,
  removeCollaretalCertificateMarket,
  callRemoveCollaretalCertificatePerson,
}
  from "features/loan/normal/storage/collateralV2/actions";
import {
  getCollateralPriceCertUuid,
  getInfoAllUserLegal,
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreInfoLegalFromOwnerLegal,
  getLOANormalStoreLandLegalItemActive,
  getLOANormalStoreLegalCertifiCateMaketPersion,
  getLOANormalStoreLegalCertifiCateMaketPersionListLegalData,
  getLOANormalStoreLegalMaketCertificates,
  getLOANormalStoreLegalMaketCertificatesUuidActive
} from "features/loan/normal/storage/collateralV2/selector";
import { AiOutlineFileWord } from "react-icons/ai";
import { SxObjectListUser } from "../../style";
import { IMaketCertificates, IPerson } from "types/models/loan/normal/storage/CollaretalV2";
import ModalTableInfoLegal from "../../ModalTableInfoLegal";
import { Typography, Box } from "@mui/material";
import useNotify from "app/hooks/useNotify";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import { EActionMenu } from 'features/loan/normal/storage/income/case';
import { SxOnjectListLandAssets } from 'views/pages/LOAN/screens/Card/Initialize/Collateral/style';
import { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import ModalConfirm from 'views/components/layout/ModalConfirm';
export interface LegalInfomationCertificateMacketProps {
  uuIdSubType?: string;
  uuIdData?: string;
}
const LegalInfomationCertificateMacket: FC<LegalInfomationCertificateMacketProps> = (props) => {

  const { uuIdSubType, uuIdData } = props
  const notify = useNotify();
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData ?? '', uuIdSubType ?? ""))
  const [openModalOwner, setOpenModalOwner] = useState(false);
  const [deleteIdCer, setDeleteIdCer] = useState<IMaketCertificates | null>(null)
  const [ deleteIdUser, setDeleteIdUser ] = useState<IPerson | null>(null);
  const getMessage = useNormalCollateralMessage();
  const dispatch = useDispatch()

  const onAddCre = () => {
    dispatch(addCollaretalCertificateMaket('', {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: uuIdSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? ''
    }))
  }

  const dataCerUuidActive = useSelector(getLOANormalStoreLegalMaketCertificatesUuidActive(uuIdData ?? '', uuIdSubType ?? ''));
  const dataCer = useSelector(getLOANormalStoreLegalMaketCertificates(uuIdData ?? '', uuIdSubType ?? ''));
  const dataCerPersionList = useSelector(getLOANormalStoreLegalCertifiCateMaketPersion(uuIdData ?? '', uuIdSubType ?? '', dataCerUuidActive));
  const infoLegalFromOwner = useSelector(getLOANormalStoreInfoLegalFromOwnerLegal(uuIdData ?? '', uuIdSubType ?? ''))
  const infoAllUserLegal = useSelector(getInfoAllUserLegal);
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData ?? '',uuIdSubType ?? ''));
  const priceCertUuid = useSelector(getCollateralPriceCertUuid(uuIdData ?? ''))
  const activeCreOptionList = dataCer?.findIndex(ce => ce.uuid_maket_certificate === dataCerUuidActive);

  const optionsCer: ObjectListOption[] = dataCer?.map((item, i) => ({
    label: <Typography sx={{fontSize:'14px !important',fontWeight:'500 !important', textTransform:'initial'}}>Giấy chứng nhận {i + 1}</Typography>,
    circle: <AiOutlineFileWord />,
    attachment:10
  })) ?? []


  const onChangeCre = (current: number) => {
    const currentActive = dataCer ? dataCer[current]?.uuid_maket_certificate ?? '' : "";
    dispatch(setOnChangeCollaretalCertificateMaket(currentActive, {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: uuIdSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? ''
    }))
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

  const optionsCerUseListLegal: ObjectListOption[] =
  infoAllUserLegal?.filter(o1 => dataCerPersionList?.some(o2 => o1.uuid === o2.person_uuid))?.map((item, i) => ({
    label: item.full_name,
    attachment:1
    // circle: <AiOutlineFileWord />,
  })) ?? [];

  // const activeCreOptionListUseLegal = dataCerPersionList?.findIndex(ce => ce.person_uuid === dataCer?.find(d => d.uuid_maket_certificate === dataCerUuidActive)?.uuid_active_persion ?? "");

  // const onChangeCrePersionListLegal = (current: number) => {
  //   const currentActive = dataCerPersionList ? dataCerPersionList[current].person_uuid ?? '' : "";
  //   dispatch(setOnChangeCollaretalCertificateMaketPersionListLegal(currentActive, {
  //     uuidActiveData: uuIdData ?? '',
  //     uuidActiveSubtype: uuIdSubType ?? '',
  //     uuidActiveitems: SubTypeItemsActive ?? '',
  //     uuidActiveCer: dataCerUuidActive,
  //   }))
  // }

  const onChangeDataPersionList = (value: string | number | null, key: keyof IMaketCertificates) => {
    dispatch(setOnChangeCollaretalCertificateMaketPersionListLegalData(value, {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: uuIdSubType ?? '',
      uuidActiveitems: SubTypeItemsActive ?? '',
      uuidActiveCer: dataCerUuidActive,
      key
    }))
  }

  const dataUserListLegaDetails = useSelector(getLOANormalStoreLegalCertifiCateMaketPersionListLegalData(
    uuIdData ?? '',
    uuIdSubType ?? '',
    dataCerUuidActive
  ))
  const onHandleCancelConfirmCer = () => setDeleteIdCer(null);
  const onHandleConfirmCer = () =>{
    let uuidDelete = deleteIdCer?.uuid_maket_certificate;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      dispatch(removeCollaretalCertificateMarket(uuidDelete,{
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        price_cert_uuid: priceCertUuid ?? "", 
        price_cert_asset_uuid: itemActive?.price_cert_asset_uuid ?? "",
        market_cert_uuid: deleteIdCer?.market_cert_uuid ?? "",

      }))
      // notify('Xóa giấy chứng nhận thành công', 'success');
    }
    onHandleCancelConfirmCer()
  }

  const onHandleClickMenuCer = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuCer = dataCer?.find((cer, index) => index === position);
    if(menu.value === EActionMenu.DELETE){
      dataMenuCer && setDeleteIdCer(dataMenuCer);
    }
  }
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

  const onClickMenuUserLegal = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuUserLegal = dataCerPersionList?.find((cer, index) => index === position);
    if(menu.value === EActionMenu.DELETE){
      dataMenuUserLegal && setDeleteIdUser(dataMenuUserLegal);
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
        type:'',
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveCer: dataCerUuidActive ?? "",
        price_cert_uuid:  "",
        price_cert_asset_uuid: "",
        apart_owner_cert_uuid: "",
        apart_owner_cert_item_uuid: "",
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

  return (
    <Grid container spacing={2.5} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <ObjectList
          enableAdd={true}
          enableMenu={true}
          labelLength="Số lượng GCN: &nbsp;"
          current={activeCreOptionList}
          options={optionsCer}
          menu={[
            {
              value: EActionMenu.DELETE,
              label: "Xóa",
            }
          ]}
          onClickMenu={onHandleClickMenuCer}
          onAdd={onAddCre}
          onChange={onChangeCre}
          onAttach={(option)=>{
            console.log(option,'option');
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
                enableAdd={true}
                enableMenu={true}
                onAdd={onAddCreUseListLegal}
                menu={[
                  {
                    value: EActionMenu.DELETE,
                    label: "Xóa",
                  }
                ]}
                onClickMenu={onClickMenuUserLegal}
                // onChange={onChangeCrePersionListLegal}
                labelLength="Người sở hữu: &nbsp; "
                // current={activeCreOptionListUseLegal}
                options={optionsCerUseListLegal}
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
                placeholder="Nhập tên GCN"
                onDebounce={(val) => onChangeDataPersionList(val, 'certificate_name')}
                value={dataUserListLegaDetails?.certificate_name ?? ""}
                disabled= {disabledCertificates}
                required={!disabledCertificates}
                message={ getMessage('certificate_name', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="2. Số GCN"
                disabled= {disabledCertificates}
                required={!disabledCertificates}
                placeholder="Nhập số GCN"
                onDebounce={(val) => onChangeDataPersionList(val, 'certificate_code')}
                value={dataUserListLegaDetails?.certificate_code ?? ""}
                message={ getMessage('certificate_code', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}

              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="3. Ngày cấp"
                disabled= {disabledCertificates}
                onChange={(val) => onChangeDataPersionList(val, 'issue_date')}
                value={dataUserListLegaDetails?.issue_date ?? null}
                required={!disabledCertificates}
                message={ getMessage('date', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="4. Nơi cấp"
                disabled= {disabledCertificates}
                placeholder="Nhập nơi cấp"
                onDebounce={(val) => onChangeDataPersionList(val, 'place_of_issue')}
                value={dataUserListLegaDetails?.place_of_issue ?? ""}
                required={!disabledCertificates}
                message={ getMessage('place_of_issue', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="5. Tên hợp đồng thuê/mua địa điểm KD"
                placeholder="Nhập tên hợp đồng thuê/mua địa điểm KD"
                onDebounce={(val) => onChangeDataPersionList(val, 'contract_name')}
                value={dataUserListLegaDetails?.contract_name ?? ""}
                required
                message={ getMessage('contract_name', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="6. Số hợp đồng thuê/mua địa điểm KD"
                placeholder="Nhập số hợp đồng thuê/mua địa điểm KD"
                onDebounce={(val) => onChangeDataPersionList(val, 'contract_code')}
                value={dataUserListLegaDetails?.contract_code ?? ""}
                required
                message={ getMessage('contract_code', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="7. Ngày ký kết"
                onChange={(val) => onChangeDataPersionList(val, 'contract_date')}
                value={(dataUserListLegaDetails?.contract_date) ?? null}
                required
                message={ getMessage('contract_date', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="8. Bên cho thuê/mua địa điểm kinh doanh"
                placeholder="Nhập bên cho thuê/mua địa điểm kinh doanh"
                onDebounce={(val) => onChangeDataPersionList(val, 'contract_unit')}
                value={dataUserListLegaDetails?.contract_unit ?? ""}
                message={ getMessage('contract_unit', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_maket_certificate ?? ''})}
                required
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
         listDetail={dataCerPersionList}
      />
    </Grid>
  )
}

export default LegalInfomationCertificateMacket;

