import { Box, Grid } from "@mui/material";
import {
  addLandGcnQsh,
  deleteLandGcnQsh,
  removeLandAsset,
  setCollaretalAssessmentInfomation,
  setCollateralValidate,
  setUuidActiveLandGcnQsh,
} from "features/loan/normal/storage/collateralV2/actions";
import {
  EActionMenu,
  ECheckType,
  ETypeLand,
} from "features/loan/normal/storage/collateralV2/case";
import {
  getLOANormalStoreColalteralLandAssessment,
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex,
  getLOANormalStoreColalteralLandCTXDGcnQshData,
  getCollateralPriceCertUuid,
  getLOANormalStoreDataItemActive,
  ValidateCollateralRestStorage,
} from "features/loan/normal/storage/collateralV2/selector";
import { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { MdHomeWork } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Checkbox, { CheckboxRef } from "views/components/base/Checkbox";
import HorizontalList from "views/components/layout/HorizontalList";
import {
  ObjectListMenuItem,
  ObjectListOption,
} from "views/components/layout/ObjectList";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import ButtonAttachFile from "views/components/base/ButtonAttachFile";
import AttachmentCTXDGCN from "./AttachmentCTXDGCN";
import * as _ from "lodash";
import { getCountAttachment } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import ModalConfirm from "views/components/layout/ModalConfirm";
import useNotify from "app/hooks/useNotify";
export interface IActionTypeLand {
  currentType?: number;
  uuidActiveData?: string;
  uuIdSubType?: string;
}

const ActionTypeLand: FunctionComponent<IActionTypeLand> = (props) => {
  const { currentType = 0, uuidActiveData = "", uuIdSubType = "" } = props;
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbled);
  const notify  = useNotify()
  const price_cert_uuid = useSelector(getCollateralPriceCertUuid(uuidActiveData))
  const validRest = useSelector(ValidateCollateralRestStorage);
  const curentItem = useSelector(getLOANormalStoreDataItemActive(uuidActiveData, uuIdSubType));
  const ctxdGcnQshData = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshData(uuidActiveData,uuIdSubType))
  const [openAttachModal, setOpenAttachModal] = useState<{
    open: boolean;
    uuid: string;
  }>({ open: false, uuid: "" });
  const [currentTypeDefault, setCurrentTypeDefault] =
    useState<number>(currentType);
  const  [isModalDelete , setIsModalDelete] = useState<boolean>(false)
  const  [isModalDeleteType , setIsModalDeleteType] = useState<boolean>(false)
  const  [isModalDeleteTypeGCN , setIsModalDeleteTypeGCN] = useState<boolean>(false)


  const  [currPositionDelete , setCurrPositionDelete] = useState<number>()


  useEffect(() => {
    if (currentTypeDefault !== currentType) {
      setCurrentTypeDefault(currentType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  const checkBoxTypeInfoRef = useRef<CheckboxRef>(null);
  const checkBoxTypeInfoRefGCN = useRef<CheckboxRef>(null);


  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuidActiveData, uuIdSubType ?? "")
  );
  const dataItems = useSelector(
    getLOANormalStoreColalteralLandAssessment(
      uuidActiveData,
      uuIdSubType ?? "",
      SubTypeItemsActive ?? ""
    )
  );
  
  const LandCTXDGcnQshCurrentIndex = useSelector(
    getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex(
      uuidActiveData,
      uuIdSubType ?? ""
    )
  );
  const LandCTXDGcnQshData = useSelector(
    getLOANormalStoreColalteralLandCTXDGcnQshData(
      uuidActiveData,
      uuIdSubType ?? ""
    )
  );
  const currentCTXDGCNDocument =LandCTXDGcnQshCurrentIndex !== undefined
  ? _.get(
      LandCTXDGcnQshData,
      [LandCTXDGcnQshCurrentIndex, "documents"],
      []
    )
  : [];
  const handleConfirmDeleteType = () => {
    const checkBoxTypeInfoValue = checkBoxTypeInfoRef.current?.getValue() ?? [];

    // eslint-disable-next-line array-callback-return
    checkBoxTypeInfoValue.map((ti) => {
        dispatch(
          setCollaretalAssessmentInfomation(ti.checked ? "Y" : "N", {
            uuid: uuidActiveData,
            uuidActive: uuIdSubType,
            key: "has_land_asset",
          })
        );
        dispatch(removeLandAsset(
          ECheckType.CTXD_LAND,{
            uuidData: uuidActiveData,
            uuidSubType: uuIdSubType,
            uuidItems: SubTypeItemsActive,
            price_cert_uuid: price_cert_uuid ?? "", 
            price_cert_asset_uuid: curentItem?.price_cert_asset_uuid ?? "",
            land_const_uuid : curentItem?.ctxd_land?.ctx_land_wrapper?.land_const_uuid ?? "",
          }
        ))
     
    });
    setIsModalDeleteType(false)

  };
  const handleChangeCheckBoxCTXD = () => {
    const checkBoxTypeInfoValue = checkBoxTypeInfoRef.current?.getValue() ?? [];
    // eslint-disable-next-line array-callback-return
    checkBoxTypeInfoValue.map((ti) => {

        if(ti.checked === false && dataItems?.has_land_asset === "Y"){
          setIsModalDeleteType(!isModalDeleteType)
        }else{
          dispatch(
            setCollaretalAssessmentInfomation(ti.checked ? "Y" : "N", {
              uuid: uuidActiveData,
              uuidActive: uuIdSubType,
              key: "has_land_asset",
            })
          );
        }
    });
  };
  const handleChangeCheckBoxCTXDGCN = () => {
    const checkBoxTypeInfoValue = checkBoxTypeInfoRefGCN.current?.getValue() ?? [];
    // eslint-disable-next-line array-callback-return
    checkBoxTypeInfoValue.map((ti) => {

        if(ti.checked === false && dataItems?.has_certificated_land_asset === "Y"){
          setIsModalDeleteTypeGCN(!isModalDeleteTypeGCN)
        }else{
          dispatch(
            setCollaretalAssessmentInfomation(ti.checked ? "Y" : "N", {
              uuid: uuidActiveData,
              uuidActive: uuIdSubType,
              key: "has_certificated_land_asset",
            })
          );
        }
    });
  };
  const handleConfirmCheckboxCTXDGCN = () =>{
    dispatch(
      setCollaretalAssessmentInfomation("N", {
        uuid: uuidActiveData,
        uuidActive: uuIdSubType,
        key: "has_certificated_land_asset",
      })
    );

    for(let [index, i] of LandCTXDGcnQshData.entries()){
      dispatch(
        deleteLandGcnQsh(i.uuIdCtxdGcnQsh, {
          uuidData: uuidActiveData,
          uuidSubType: uuIdSubType,
          price_cert_uuid: price_cert_uuid ?? "", 
          price_cert_asset_uuid: curentItem?.price_cert_asset_uuid ?? "",
          land_const_uuid: i.land_const_uuid ?? "",
          isNoti: index + 1 === LandCTXDGcnQshData.length ? true : false
        })
      );
    }
    setIsModalDeleteTypeGCN(false)

  }
  const onHandleAddCtxdOfGcnQsh = () => {
    dispatch(
      addLandGcnQsh("", { uuidData: uuidActiveData, uuidSubType: uuIdSubType })
    );
  };

  const optionsLandCTXDGcnQsh: ObjectListOption[] = LandCTXDGcnQshData
    ? LandCTXDGcnQshData.map((d, i) => ({
        label: `GCN QSH CTXD ${i + 1}`,
        circle: <MdHomeWork />,
      }))
    : [];

  const onHandleChangeCtxdOfGcnQsh = (current: number) => {
    const currentActive =
      LandCTXDGcnQshData && LandCTXDGcnQshData[current].uuIdCtxdGcnQsh;
    currentActive &&
      dispatch(
        setUuidActiveLandGcnQsh(currentActive, {
          uuidData: uuidActiveData,
          uuidSubType: uuIdSubType,
        })
      );
  };

  const onHandleClickMenuCtxdOfGcnQsh = (
    menu: ObjectListMenuItem,
    position: number
  ) => {

    if (menu.value === EActionMenu.DELETE) {
      if(LandCTXDGcnQshData?.length === 1){
        notify('Phải có ít nhất 1 GCN QSH CTXD','warning')
      }else{
        handleOpenModalDelete()
        setCurrPositionDelete(position)
      }
    }
  };
  const handleOpenModalDelete = () =>{
    setIsModalDelete(!isModalDelete)
  }

  const handleOpenModalDeleteType = () =>{
    const checkboxData = checkBoxTypeInfoRef?.current?.getValue().map(i=>({
      value:i.value,
      checked: dataItems?.has_land_asset === "N" ? true : false 
    }))
    checkboxData 
    && checkBoxTypeInfoRef.current?.setCheckbox(checkboxData) 
    setIsModalDeleteType(!isModalDeleteType)
  }
  const handleConfirmDelete = () =>{
    let _landCTXDGQsh = LandCTXDGcnQshData?.find(
      (cl, index) => index === currPositionDelete
    );
    _landCTXDGQsh && dispatch(
      deleteLandGcnQsh(_landCTXDGQsh.uuIdCtxdGcnQsh, {
        uuidData: uuidActiveData,
        uuidSubType: uuIdSubType,
        price_cert_uuid: price_cert_uuid ?? "", 
        price_cert_asset_uuid: curentItem?.price_cert_asset_uuid ?? "",
        land_const_uuid: ctxdGcnQshData.find((i,idx)=>idx === LandCTXDGcnQshCurrentIndex)?.land_const_uuid ?? "",
        isNoti: true
      })
    );
    handleOpenModalDelete()
  }
  const handleOpenModalDeleteTypeGCN = () =>{
    const checkboxData = checkBoxTypeInfoRefGCN?.current?.getValue().map(i=>({
      value:i.value,
      checked: dataItems?.has_certificated_land_asset === "N" ? true : false 
    }))
    checkboxData 
    && checkBoxTypeInfoRefGCN.current?.setCheckbox(checkboxData) 
    setIsModalDeleteTypeGCN(false)
  }

  const handleAttach = () => {
    if(validRest.valid){
      dispatch(setCollateralValidate({valid : true}))
      setOpenAttachModal({ uuid: "", open: true });
    }
    else {
      dispatch(setCollateralValidate(validRest))
      notify(validRest.message ? validRest.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
    }  
  }

  return (
    <>
      {(() => {
        if (currentTypeDefault === ETypeLand.LAND) {
          return (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box className="flex items-center">
                <span className="text-14 font-medium text-secondary pr-5">
                  Chọn loại tài sản khai báo thông tin
                </span>
                <Checkbox
                  ref={checkBoxTypeInfoRef}
                  disabled={(dataItems ? false : true) || ruleDisabled}
                  onChange={()=>{
                    handleChangeCheckBoxCTXD()
                  }}
                  options={[
                    {
                      label: "CTXD trên đất",
                      value: ECheckType.CTXD_LAND,
                      checked: dataItems
                        ? dataItems?.has_land_asset === "Y"
                          ? true
                          : false
                        : false,
                    }
                    
                  ]}
                />
                <Checkbox
                  ref={checkBoxTypeInfoRefGCN}
                  disabled={(dataItems ? false : true) || ruleDisabled}
                  onChange={()=>{
                    handleChangeCheckBoxCTXDGCN()
                  }}
                  options={[
                    {
                      label: "CTXD GCN riêng",
                      value: ECheckType.CTXD_GCN,
                      checked: dataItems
                        ? dataItems?.has_certificated_land_asset === "Y"
                          ? true
                          : false
                        : false,
                    },
                  ]}
                />
              </Box>
              <ModalConfirm
                open={isModalDeleteType}
                children="Bạn có chắc chắn muốn xóa thông tin CTXD trên đất?"
                labelConfirm="Xác nhận"
                labelCancel="Hủy"
                onClose={handleOpenModalDeleteType}
                onConfirm={handleConfirmDeleteType}
              />
               <ModalConfirm
                open={isModalDeleteTypeGCN}
                children="Bạn có chắc chắn muốn xóa thông tin CTXD có GCN QSH riêng?"
                labelConfirm="Xác nhận"
                labelCancel="Hủy"
                onClose={handleOpenModalDeleteTypeGCN}
                onConfirm={handleConfirmCheckboxCTXDGCN}
              />
            </Grid>
          );
        }

        if (currentTypeDefault === ETypeLand.CTXD_GCN) {
          return (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <HorizontalList
              className="mb-2"
                menu={[
                  {
                    label: "Xóa",
                    value: EActionMenu.DELETE,
                  },
                ]}
                enableAdd={!ruleDisabled}
                enableMenu={!ruleDisabled}
                onAdd={onHandleAddCtxdOfGcnQsh}
                current={LandCTXDGcnQshCurrentIndex}
                options={optionsLandCTXDGcnQsh}
                onChange={onHandleChangeCtxdOfGcnQsh}
                onClickMenu={onHandleClickMenuCtxdOfGcnQsh}
              />
              {optionsLandCTXDGcnQsh.length > 0 && (
                <ButtonAttachFile
                  onClick={handleAttach}
                  attachment={getCountAttachment(currentCTXDGCNDocument)}
                />
              )}
            </Grid>
          );
        }
      })()}

      <Fragment>
        {openAttachModal.open && (
          <AttachmentCTXDGCN
            open={openAttachModal.open}
            onClose={() => setOpenAttachModal({ uuid: "", open: false })}
            data={currentCTXDGCNDocument}
            masterData={{
              uuid: uuidActiveData,
              uuidActive: uuIdSubType,
            }}
            onChange={(newData) => {
              dispatch(
                setCollaretalAssessmentInfomation(newData, {
                  uuid: uuidActiveData,
                  uuidActive: uuIdSubType,
                  key: "documents",
                })
              );
            }}
          />
        )}
        <ModalConfirm
          open={isModalDelete}
          children="Bạn có chắc chắn muốn xóa GCN QSH CTXD này"
          labelConfirm="Xác nhận"
          labelCancel="Hủy"
          onClose={handleOpenModalDelete}
          onConfirm={handleConfirmDelete}
        />

      </Fragment>
    </>
  );
};

export default ActionTypeLand;
