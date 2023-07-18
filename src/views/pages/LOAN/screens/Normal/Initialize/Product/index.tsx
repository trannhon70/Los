import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router";
import { Divider } from '@mui/material';
import { ILOANProductCategory, ILOANURLParams, TLOANProductChange } from 'types/models/loan';
import { getLOANNormalConfigProductCategories } from 'features/loan/normal/configs/product/category/selectors';
import { existLOANNormalData, getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import {
  fetchDataGuideState,
  saveLOANNormalProduct,
  setLOANNormalStorageProductCategory,
  setLOANNormalStorageProductCollateral,
  setLOANNormalStorageProductDetail,
  setLOANNormalStorageProductException,
  setLOANNormalStorageProductLinkProject,
  setLOANNormalStorageProductPartnerCode,
  setLOANNormalStorageProductPartnerProduct,
  setLOANNormalStorageProductType
} from 'features/loan/normal';
import {
  getLOANNormalStoragePartnerCode,
  getLOANNormalStorageProductCategory,
  getLOANNormalStorageProductCollateral,
  getLOANNormalStorageProductDetail,
  getLOANNormalStorageProductException,
  getLOANNormalStorageProductLinkProject,
  getLOANNormalStorageProductPartnerCode,
  getLOANNormalStorageProductPartnerProduct,
  getLOANNormalStorageProductType
} from 'features/loan/normal/storage/product/selectors';
import Radio, { RadioRef } from 'views/components/base/Radio';
import SelectNormalCodePartnerCode, { SelectNormalPartnerCodeRef } from 'views/pages/LOAN/widgets/SelectNormalPartnerCode';
import SelectNormalPartnerProduct, { SelectNormalPartnerProductRef } from 'views/pages/LOAN/widgets/SelectNormalPartnerProduct';
import Grid from '@mui/material/Grid';
import ProductGroup from 'views/pages/LOAN/widgets/ProductGroup';
import Label from 'views/components/base/Label';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import { checkRoleButtonBar, getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import RadioCheck from 'views/components/widgets/RadioCheck';

const Product: FC = () => {

  const Categories = useSelector(getLOANNormalConfigProductCategories);
  const CurrentCategory = useSelector(getLOANNormalStorageProductCategory);
  const CurrentType = useSelector(getLOANNormalStorageProductType);
  const CurrentProduct = useSelector(getLOANNormalStorageProductDetail);
  const CurrentPartnerCode = useSelector(getLOANNormalStorageProductPartnerCode);
  const CurrentPartnerProduct = useSelector(getLOANNormalStorageProductPartnerProduct);
  const CurrentCollateral = useSelector(getLOANNormalStorageProductCollateral);
  const CurrentLinkProject = useSelector(getLOANNormalStorageProductLinkProject);
  const CurrentException = useSelector(getLOANNormalStorageProductException);
  const checkProductLength = useSelector(getLOANNormalStoragePartnerCode(CurrentProduct));
  const disabled = useSelector(existLOANNormalData);
  const params = useParams() as ILOANURLParams;
  const ruleDisabled = useSelector(getRuleDisbled)
  const existData = useSelector(existLOANNormalData);

  const currentStateGuide = useSelector(checkRoleButtonBar)

  const { showBackdrop } = useBackdrop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useNotify();
  const los_id = useSelector(getLOANNormalLOSId)

  const partnerCodeRef = useRef<SelectNormalPartnerCodeRef>(null);
  const partnerProductRef = useRef<SelectNormalPartnerProductRef>(null);
  const collateralRef = useRef<RadioRef>(null);
  const exceptRef = useRef<RadioRef>(null);
  const [ validPartnerCode, setValidPartnerCode ] = useState<boolean>(true);
  const [ validPartnerProduct, setValidPartnerProduct ] = useState<boolean>(true);

  const changeLOANProduct = (value: string, reason: TLOANProductChange) => {
    switch (reason) {
      case 'category':
        dispatch(setLOANNormalStorageProductCategory(value));
        dispatch(setLOANNormalStorageProductLinkProject("N"))
        break;
      case 'type':
        dispatch(setLOANNormalStorageProductType(value));
        dispatch(setLOANNormalStorageProductLinkProject("N"))
        break;
      case 'product':
        dispatch(setLOANNormalStorageProductDetail(value));
        break;
    }
  }

  useEffect(()=>{
    if (checkProductLength) {
      dispatch(setLOANNormalStorageProductLinkProject("Y"))
    } else {
      dispatch(setLOANNormalStorageProductLinkProject("N"))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkProductLength,CurrentProduct])

  useEffect(()=>{
    if(los_id !== ''){
      ruleDisabled 
      && params.id !== "-" 
      && params.stage === "init" 
      && dispatch(fetchDataGuideState({los_id, position:ETypeButtonBarRole.PRODUCT_GROUP}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[los_id])

  const changePartnerCode = (value: string) => {
    dispatch(setLOANNormalStorageProductPartnerCode(value));
  }

  const changePartnerProduct = (value: string) => {
    dispatch(setLOANNormalStorageProductPartnerProduct(value));
  }

  const changeCollateral = () => {
    dispatch(setLOANNormalStorageProductCollateral(collateralRef.current?.getValue().value === 'yes'))
  }
  const changeLinkProject = (value: string) => {
    dispatch(setLOANNormalStorageProductLinkProject(value))
    if(value === 'N'){
      changePartnerCode('')
      changePartnerProduct('')
    }
  }

  const changeExcept = () => {
    dispatch(setLOANNormalStorageProductException(exceptRef.current?.getValue().value === 'yes'))
  }


  const categories: ILOANProductCategory[] = Categories.map((cate:any) => {
    return {
      value: cate.product_category_id ?? '',
      label: cate.product_category_name,
      type: cate.loan_product_type_info_list.map((type:any) => {
        return {
          value: type.product_type_id ?? '',
          label: type.product_type_name,
          product: type.loan_product_detail_info_list.map((pro:any) => {
            return {
              value: pro.product_detail_id ?? '',
              label: pro.product_detail_name
            }
          })
        }
      })
    }
  });

  const validate = (): boolean => {
    if (!CurrentCategory) {
      notify('Vui lòng chọn nhóm sản phẩm', 'error');
      return false;
    }

    if (!CurrentType) {
      notify('Vui lòng chọn sản phẩm / chương trình', 'error');
      return false;
    }

    if (!CurrentProduct) {
      notify('Vui lòng chọn chi tiết sản phẩm', 'error');
      return false;
    }
    if(CurrentLinkProject === 'Y'){
      if(!CurrentPartnerCode){
        notify('Lưu thất bại, vui lòng kiểm tra lại', 'error');
        setValidPartnerCode(false)
        return false;
      }else{
        setValidPartnerCode(true)
      }
      if(!CurrentPartnerProduct){
        notify('Lưu thất bại, vui lòng kiểm tra lại', 'error');
        setValidPartnerProduct(false)
        return false;
      }else{
        setValidPartnerProduct(true)
      }
      

    }

    return true;
  }

  const save = (next = false) => {
    if (!validate()) return;
    showBackdrop(true);
    dispatch(saveLOANNormalProduct(next));
  }

  const onSave = () => {
    save();
  }

  const onContinue = () => {
    disabled ? navigate(`/loan/normal/init/${params.id}/legal/borrower`) : save(true);
  }
  
  const onExit = () => {
    navigate("/");
  };

  const onSaveMenu = (val: string) => {
    switch (val) {
      case 'save':
        onSave();
        break;
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ title: "", position: ETypeButtonBarRole.PRODUCT_GROUP }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ title: "", position: ETypeButtonBarRole.PRODUCT_GROUP }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position: ETypeButtonBarRole.PRODUCT_GROUP }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: "", position: ETypeButtonBarRole.PRODUCT_GROUP }));
        break;
    }
  }


  const checkHidenSave = (): boolean => {
    if (currentStateGuide?.current_state_group === "INITIALIZER") {
      return false;
    }
    if (currentStateGuide === undefined) {
      return true;
    }
    return false
  }


  return <Fragment>
    <div>
      <Grid container spacing={4}>
        <Grid item xl={8} md={12} lg={12} className="pr-8">
          <ProductGroup
            categories={categories}
            category={CurrentCategory}
            type={CurrentType}
            product={CurrentProduct}
            onChange={changeLOANProduct}
            disabled={disabled}
          />
        </Grid>
        <Grid item xl={4} lg={12} className="relative">
          <div className="absolute left bottom" style={{
            width: 0,
            top: '30px',
            borderLeft: '1px solid #d5d5d5'
          }} />
          <Label bold color="#071180" className="block mb-2 text-15">
            B. Thông tin sản phẩm vay
          </Label>
          <Grid container spacing={4}>
            <Grid item xl={12}>
              <RadioCheck
                label="I. Dự án liên kết"
                onChange={changeLinkProject}
                disabled={disabled}
                value={CurrentLinkProject}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xl={6} sx={{
              ".MuiFormControl-root":{
                height:"unset !important"
              }
            }}>
              <SelectNormalCodePartnerCode
                ref={partnerCodeRef}
                product={CurrentProduct}
                value={CurrentPartnerCode}
                onChange={changePartnerCode}
                disabled={(CurrentLinkProject === "N" ? true : false) || disabled}
                message={validPartnerCode ? '' : 'Vui chọn mã đối tác'}
              />
            </Grid>
            <Grid item xl={6} sx={{
              ".MuiFormControl-root":{
                height:"unset !important"
              }
            }}>
              <SelectNormalPartnerProduct
                ref={partnerProductRef}
                partner={CurrentPartnerCode}
                value={CurrentPartnerProduct}
                onChange={changePartnerProduct}
                disabled={(CurrentLinkProject === "N" ? true : false) || disabled}
                message={validPartnerProduct ? '' : 'Vui lòng chọn sản phẩm theo đối tác '}
              />
            </Grid>
          </Grid>
          <Label bold color="#071180" className="block mb-2 mt-1">
            C. Thông tin tài sản bảo đảm
          </Label>
          <div className="mscb-form-row mscb-radio">
            <Radio
              label="Tài sản bảo đảm"
              required
              variant="checkbox"
              options={[
                { value: "yes", label: "Có", disabled, checked: CurrentCollateral },
                { value: "no", label: "Không", disabled, checked: !CurrentCollateral },
              ]}
              name="collateral"
              onChange={changeCollateral}
              ref={collateralRef}
            />

          </div>
          <Label bold color="#071180" className="block mb-2 mt-1">
            D. Thông tin về tính ngoại lệ của hồ sơ
          </Label>
          <div className="mscb-form-row mscb-radio">
            <Radio
              label="Tính ngoại lệ của hồ sơ"
              variant="checkbox"
              options={[
                { value: "yes", label: "Có", disabled, checked: CurrentException },
                { value: "no", label: "Không", disabled, checked: !CurrentException },
              ]}
              name="except"
              ref={exceptRef}
              onChange={changeExcept}
            />
          </div>
        </Grid>
      </Grid>
    </div>
    <Divider className="my-6" />
    <ButtonBarRole
      className="mb-6"
      onSave={onSave}
      onBack={onExit}
      onExit={onExit}
      isApply={true}
      hideDelete={false}
      hideContinue={false}
      hideSave={checkHidenSave()}
      onBtnMenu={(val) => onSaveMenu(val)}
      onContinue={onContinue}
      positionCode={ETypeButtonBarRole.PRODUCT_GROUP}
    />
  </Fragment>

}

export default Product;