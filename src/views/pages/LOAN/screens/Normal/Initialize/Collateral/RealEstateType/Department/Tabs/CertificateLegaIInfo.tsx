import { Grid } from "@mui/material";
import {
  addCollaretalCertificateDepartment,
  callRemoveCollaretalCertificatePerson,
  removeCollaretalCertificateDepartment,
  setOnChangeCollaretalCertificateDepartment,
  setOnChangeCollaretalCertificateDepartmentListLegalData,
} from "features/loan/normal/storage/collateralV2/actions";
import {
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
import { SxOnjectListLandAssets } from "views/pages/LOAN/screens/Card/Initialize/Collateral/style";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { SxObjectListUser, SxSelectDisiable } from "../../../style";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { Box } from "@mui/system";
import useNotify from "app/hooks/useNotify";
import ModalTableInfoLegal from "../../../ModalTableInfoLegal";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
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

  const optionsCer: ObjectListOption[] =
    dataCer?.map((item, i) => ({
      label: `Giấy chứng nhận ${i + 1}`,
      circle: <BsFillFileEarmarkFill />,
      attachment:10
    })) ?? [];

  const optionsCerUseListLegal: ObjectListOption[] =
    infoAllUserLegal?.filter(o1 => dataCerPersionList?.persons?.some(o2 => o1.uuid === o2.person_uuid))?.map((item, i) => ({
      label: item.full_name,
      attachment:1
      // circle: <AiOutlineFileWord />,
    })) ?? [];

  // const activeCreOptionListUseLegal = dataCerPersionList?.persons.findIndex(
  //   (item) => item.uuid_active_person === dataCerPersionList.uuid_active_person
  // );

  // const onChangeCreUseListLegal = (current: number) => { // data legal
  //   const currentActive =
  //     dataCerPersionList?.persons[current].uuid_active_person ?? "";
  //   dispatch(
  //     setOnChangeCollaretalCertificatDepartmentListLegal(currentActive, {
  //       uuidActiveData: uuIdData ?? "",
  //       uuidActiveSubtype: uuIdSubType ?? "",
  //       uuidActiveitems: SubTypeItemsActive ?? "",
  //       uuidActiveCer: dataCerPersionList?.uuid_certificate_legal ?? "",
  //     })
  //   );
  // };

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
    if(menu.value === EActionMenu.DELETE){
      dataMenuCer && setDeleteIdCer(dataMenuCer);
    }
  }

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
          price_cert_uuid: "",
          price_cert_asset_uuid: "",
          apart_owner_cert_uuid: "",
        })
      );
      notify('Xóa giấy chứng nhận thành công', 'success');
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

  const onClickMenuUserLegal = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuUserLegal = dataCerPersionList?.persons?.find((cer, index) => index === position);
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
        price_cert_asset_uuid:  "",
        apart_owner_cert_uuid:  "",
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
    <>
      <Grid container spacing={3} className="pt-6">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ObjectList
            enableAdd={true}
            enableMenu
            menu={[
              {
                value: EActionMenu.DELETE,
                label: "Xóa",
              }
            ]}
            labelLength="Số lượng GCN: &nbsp;"
            onAdd={onAddCre}
            onChange={onChangeCre}
            current={activeCreOptionList}
            onClickMenu={onHandleClickMenuDepartmentCer}
            options={optionsCer}
            sx={{...SxOnjectListLandAssets,"& .ObjectListLabel":{
              border:'1px solid var(--mscb-danger) !important'
            }}}
            attachLabel="tập tin"
            onAttach={(option)=>{
              console.log(option,'option');
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
                  // onChange={onChangeCreUseListLegal}
                  labelLength="Người sở hữu &nbsp;"
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
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCollateralCertifiedType
                  // placeholder=""
                  label="1. Loại GCN"
                  onChange={(val) =>{
                    onChangeDataUserList(val, "other_certificate_type")
                    if(val !=='OTHER'){
                      onChangeDataUserList(null, "other_certificate_type_other")
                    }
                   }
                  }
                  value={dataUserListLegaDetails?.other_certificate_type}
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N'}
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
                  disabled={dataUserListLegaDetails?.other_certificate_type === "OTHER" ? false : true }
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
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N'}
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
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N'}
                  required
                  message={ getMessage('certificate_no', {position: itemActive?.activeUUID ?? '', active: dataUserListLegaDetails?.uuid_certificate_legal ?? ''})}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <InputDate
                  label="5. Ngày cấp"
                  onChange={(val) => onChangeDataUserList(val, "issue_date")}
                  value={(dataUserListLegaDetails?.issue_date)}
                  required
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N'}
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
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='N'}
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
                  disabled={disabledInputDepartmentCer  ||  Department?.has_certificate==='Y'}
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
                  disabled={disabledInputDepartmentCer ||  Department?.has_certificate ==='Y'}
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
                  disabled={disabledInputDepartmentCer  ||  Department?.has_certificate ==='Y'}
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
      </Grid>
    </>
  );
};

export default CertificateLegaIInfo;
