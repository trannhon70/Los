import { FC, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import ProductGroup from 'views/pages/LOAN/widgets/ProductGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getLOANNormalConfigProductCategories } from 'features/loan/normal/configs/product/category/selectors';
import { ILOANProductCategory } from 'types/models/loan';
import {
  getLOANNormalStorageProductCategory,
  getLOANNormalStorageProductDetail,
  getLOANNormalStorageProductType
} from 'features/loan/normal/storage/product/selectors';
import Label from 'views/components/base/Label';
import SelectProductLOANPurpose from 'views/components/widgets/SelectProductLOANPurpose';
import SelectLOANPurpose from 'views/components/widgets/SelectLOANPurpose';
import TextArea from 'views/components/base/TextArea';
import { ILOANNormalStorageLOANProduct } from 'types/models/loan/normal/storage/LOAN';
import { getLOANNormalStorageLOANProduct } from 'features/loan/normal/storage/loan/selectors';
import { setLOANNormalStorageLOANProduct } from 'features/loan/normal/storage/loan/actions';
import SelectProductCategoryLOAN from 'views/components/widgets/SelectProductCategoryLOAN';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { SxSelectDisabled, SxTextAreaDisabled } from '../Legal/style';

const LOANProduct: FC = () => {

  const dispatch = useDispatch();
  const getMessage = useNormalLoanMessage();
  const Categories = useSelector(getLOANNormalConfigProductCategories);
  const CurrentCategory = useSelector(getLOANNormalStorageProductCategory);
  const CurrentType = useSelector(getLOANNormalStorageProductType);
  const CurrentProduct = useSelector(getLOANNormalStorageProductDetail);
  const LOANProduct = useSelector(getLOANNormalStorageLOANProduct);
  const ruleDisabled = useSelector(getRuleDisbled)


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

  const changeProduct = (name: keyof ILOANNormalStorageLOANProduct) => (value: string) => {
    dispatch(setLOANNormalStorageLOANProduct(value, name))
  }

  return <Fragment>
    <div className="pt-6">
      <Grid container>
        <Grid item xl={ 8 } lg={ 12 } className="px-10">
          <ProductGroup
            categories={ categories }
            category={ CurrentCategory }
            type={ CurrentType }
            product={ CurrentProduct }
            disabled
          />
        </Grid>
        <Grid item xl={ 4 } lg={ 12 } className="relative px-10">
          <div className="absolute left bottom" style={{
            width: 0,
            top: '0px',
            borderLeft: '1px solid #d5d5d5'
          }} />
          <Label bold color="#071180" className="block mb-3">
            B. Thông tin vay
          </Label>
          <div className="mscb-form-row">
            <SelectProductCategoryLOAN
              label="1. Loại hình cho vay"
              onChange={ changeProduct('loanType') }
              value={ LOANProduct.loanType }
              required
              message={ getMessage('product', 'loanType') }
              disabled={ ruleDisabled }
            />
          </div>
          <div className="mscb-form-row">
            <SelectProductLOANPurpose
              label="2. Mục đích vay theo SP"
              onChange={ changeProduct('productPurpose') }
              value={ LOANProduct.productPurpose }
              required
              message={ getMessage('product', 'productPurpose') }
              disabled={ ruleDisabled }
            />
          </div>
          <div className="mscb-form-row">
            <SelectLOANPurpose
              label="3. Mục đích vay (theo CORE)"
              onChange={ changeProduct('corePurpose') }
              value={ LOANProduct.corePurpose }
              required
              message={ getMessage('product', 'corePurpose') }
              disabled={ ruleDisabled }
            />
          </div>
          <div className="mscb-form-row">
            <TextArea
              label="4. Mục đích sử dụng vốn vay thực tế"
              onDebounce={ changeProduct('realPurpose') }
              value={ LOANProduct.realPurpose }
              required
              message={ getMessage('product', 'realPurpose') }
              disabled={ ruleDisabled }
              sx={SxTextAreaDisabled}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  </Fragment>

}

export default LOANProduct;