import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FC, Fragment, useEffect, useRef } from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import clsx from "clsx";
import CardProductGroupStyle from './style';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedLOANCardConfigProductCategory, fetchingLOANCardConfigProductCategory, getLOANCardConfigProductCategories } from 'features/loan/card/configs/products/category/selector';
import ProductGroup from 'views/pages/LOAN/widgets/ProductGroup';
import { ILOANProductCategory, TLOANProductChange } from 'types/models/loan';
import { getLOANCardStorageProductCategory, getLOANCardStorageProductCollateral, getLOANCardStorageProductDetail, getLOANCardStorageProductException, getLOANCardStorageProductPartnerCode, getLOANCardStorageProductPartnerProduct, getLOANCardStorageProductType } from 'features/loan/card/storage/products/selector';
import { saveLOANCardProduct, setLOANCardStorageProductCategory, setLOANCardStorageProductCollateral, setLOANCardStorageProductDetail, setLOANCardStorageProductException, setLOANCardStorageProductPartnerCode, setLOANCardStorageProductPartnerProduct, setLOANCardStorageProductType } from 'features/loan/card/storage/products/action';
import { fetchLOANCardConfigProductCategory } from 'features/loan/card/configs/actions';
import SelectCardCodePartnerCode, { SelectCardPartnerCodeRef } from 'views/pages/LOAN/widgets/SelectCardPartnerCode';
import SelectCardPartnerProduct, { SelectCardPartnerProductRef } from 'views/pages/LOAN/widgets/SelectCardPartnerProduct';
import { Divider } from '@mui/material';
import ButtonBar from 'views/components/layout/ButtonBar';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';

const Product: FC = () => {
  
  const classes = CardProductGroupStyle();
  const CardProductGroupClass = clsx(classes.root);
  const disabled = false;
  const { t } = useTranslation();

  const { showBackdrop } = useBackdrop();
  const dispatch = useDispatch();
  const notify = useNotify();

  const Categories = useSelector(getLOANCardConfigProductCategories);
  const CurrentCategory = useSelector(getLOANCardStorageProductCategory);
  const CurrentType = useSelector(getLOANCardStorageProductType);
  const CurrentProduct = useSelector(getLOANCardStorageProductDetail);

  const CurrentPartnerCode = useSelector(getLOANCardStorageProductPartnerCode);
  const CurrentPartnerProduct = useSelector(getLOANCardStorageProductPartnerProduct);
  const CurrentCollateral = useSelector(getLOANCardStorageProductCollateral);
  const CurrentException = useSelector(getLOANCardStorageProductException);

  const isFetchedCate = useSelector(fetchedLOANCardConfigProductCategory);
  const isFetchingCate = useSelector(fetchingLOANCardConfigProductCategory);

  const partnerCodeRef = useRef<SelectCardPartnerCodeRef>(null);
  const partnerProductRef = useRef<SelectCardPartnerProductRef>(null);
  const collateralRef = useRef<RadioRef>(null);
  const exceptRef = useRef<RadioRef>(null);

  useEffect(() => {
    !isFetchedCate
    && !isFetchingCate
    && dispatch(fetchLOANCardConfigProductCategory());
  })

  const changeLOANProduct = (value: string, reason: TLOANProductChange) => {
    switch(reason){
      case 'category':
        dispatch(setLOANCardStorageProductCategory(value));
        break;
      case 'type':
        dispatch(setLOANCardStorageProductType(value));
        break;
      case 'product':
        dispatch(setLOANCardStorageProductDetail(value));
        break;
    }
  }

  const changePartnerCode = (value: string) => {
    dispatch(setLOANCardStorageProductPartnerCode(value));
  }

  const changePartnerProduct = (value: string) => {
    dispatch(setLOANCardStorageProductPartnerProduct(value));
  }

  const changeCollateral = () => {
    dispatch(setLOANCardStorageProductCollateral(collateralRef.current?.getValue().value === 'yes'))
  }

  const changeExcept = () => {
    dispatch(setLOANCardStorageProductException(exceptRef.current?.getValue().value === 'yes'))
  }

  const categories: ILOANProductCategory[] = Categories.map(cate => {
    return {
      value: cate.product_category_id ?? '',
      label: cate.product_category_name,
      type: cate.loan_product_type_info_list.map(type => {
        return {
          value: type.product_type_id ?? '',
          label: type.product_type_name,
          product: type.loan_product_detail_info_list.map(pro => {
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
    if (!CurrentCategory){
      notify('Vui lòng chọn nhóm sản phẩm', 'error');
      return false;
    }

    if (!CurrentType){
      notify('Vui lòng chọn sản phẩm / chương trình', 'error');
      return false;
    }

    if (!CurrentProduct){
      notify('Vui lòng chọn chi tiết sản phẩm', 'error');
      return false;
    }

    return true;
  }

  const save = (next = false) => {
    if (!validate()) return;
    showBackdrop(true);
    dispatch(saveLOANCardProduct(next));
  }

  const onSave = () => {
    save();
  }

  const onContinue = () => {
    save(true);
  }

  return (
    <Fragment >
      <Grid container spacing={3} className={`${CardProductGroupClass} mt-0`}>
        <Grid item xl={8} className={`left-product`}>
        <ProductGroup
            categories={ categories }
            category={ CurrentCategory }
            type={ CurrentType }
            product={ CurrentProduct }
            onChange={ changeLOANProduct }
            disabled={ disabled }
        />
        </Grid>
        <Grid item sm={12} xl={4} className='pl-0 pt-0 right-product'>
          <Grid container>
            <Typography component="h3" className="text-primary text-14 font-medium mb-2 text-upercase w-full">
              B. Thông tin sản phẩm vay
            </Typography>
            <Grid item xs={12} className={`${classes.inputLabel} mb-3 label-product ${disabled ? 'disabled' : null}`}>
              <SelectCardCodePartnerCode
                ref={ partnerCodeRef }
                product={ CurrentProduct } 
                value={ CurrentPartnerCode } 
                onChange={ changePartnerCode } 
                disabled={ disabled }
              />
            </Grid>
            <Grid item xs={12} className={`${classes.inputLabel} mb-3 label-product ${disabled ? 'disabled' : null}`}>
              <SelectCardPartnerProduct 
                ref={ partnerProductRef }
                partner={ CurrentPartnerCode }
                value={ CurrentPartnerProduct }
                onChange={ changePartnerProduct }
                disabled={ disabled }
              />
            </Grid>
            <Typography component="h3" className="card-product-title text-15 mb-2 font-medium w-full">{`C. ${t('Loan.Card.Init.Product.Title.CollateralInfo')} `}</Typography>
            <Grid item className={`mb-0 label-product mscb-input w-full`}>
              <Radio 
                label={t('Loan.Card.Init.Product.Label.CollateralInfo')}
                variant="checkbox"
                options={[
                  {value: "yes", label: "Có", disabled, checked: CurrentCollateral },
                  {value: "no", label: "Không", disabled, checked: !CurrentCollateral }
                ]} 
                name="collateral" 
                onChange={ changeCollateral }
                ref={ collateralRef } 
              />
            </Grid>
            <Typography component="h3" className="card-product-title text-15 mb-2 font-medium w-full">{`D. ${t('Loan.Card.Init.Product.Title.FileInfo')} `}</Typography>
            <Grid item className={`mb-0 label-product mscb-input w-full`}>
              <Radio 
                label={t('Loan.Card.Init.Product.Label.FileInfo')}
                variant="checkbox" 
                options={[
                  { value: "yes", label: "Có", disabled, checked: CurrentException },
                  { value: "no", label: "Không", disabled, checked: !CurrentException }
                ]} 
                name="except" 
                ref={ exceptRef }
                onChange={ changeExcept }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider className="my-6" />
      <ButtonBar 
        disableBack 
        disableExit
        className="mb-6"
        onSave={ onSave }
        onContinue={ onContinue }
      />
    </Fragment>
  )
}

export default Product;