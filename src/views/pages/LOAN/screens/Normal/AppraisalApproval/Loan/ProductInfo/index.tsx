import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useApprovalLOANMessage from 'app/hooks/useApprovalLOANMessage';
import useMasterData from 'app/hooks/useMasterData';
import clsx from "clsx";
import { getLOANNormalConfigProductCategories } from 'features/loan/normal/configs/product/category/selectors';
import { onChangeProgramData } from 'features/loan/normal/storageApproval/loan/action';
import { getLOANApprovalLOANProgram } from 'features/loan/normal/storageApproval/loan/selectors';
import { getLOANApprovalProduct } from 'features/loan/normal/storageApproval/selectors';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANProductCategory } from 'types/models/loan';
import { ILoanProgram } from 'types/models/loan/normal/storageApproval/LoanInfoForm';
import Input from 'views/components/base/Input';
import Select from 'views/components/base/Select';
import SelectCapitalNeed from 'views/components/widgets/SelectCapitalNeed';
import ProductGroup from 'views/pages/LOAN/widgets/ProductGroup';
import CardLoanProductStyle from './style';

const ProductInfo: FC = () => {

  const classes = CardLoanProductStyle();
  const getMessage = useApprovalLOANMessage();
  const dispatch = useDispatch();
  const disabled = false;
  const Categories = useSelector(getLOANNormalConfigProductCategories);
  const ApprovalProduct = useSelector(getLOANApprovalProduct);
  const LoanProgram = useSelector(getLOANApprovalLOANProgram);
  const CardLoanProductClass = clsx(classes.root);
  const { TypeTermLoan, register } = useMasterData()

  useEffect(() => {
    register('typeTermLoan')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ruleDisabled = useSelector(getRuleDisbledReappraise)
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


  const onChangeProductProgramData = (value: string | number | null, key: keyof ILoanProgram) => {
    dispatch(onChangeProgramData(value, { key: key }))
  }

  return (
    <Grid container columnSpacing="20" rowSpacing="20" className={`${CardLoanProductClass} pt-5 mt-0`}>
      <Grid item xl={8} className={`left-product`}>
        <ProductGroup
          categories={categories}
          category={ApprovalProduct?.category_info ?? ""}
          type={ApprovalProduct?.type_info ?? ""}
          product={ApprovalProduct?.detail_info ?? ""}
          disabled
        />
      </Grid>
      <Grid item sm={12} xl={4} className='pl-0 pt-0 right-product'>
        <Typography component="h3" className="text-primary text-15 mb-2 font-medium text-upercase w-full">
          B. Thông tin vay
        </Typography>
        <Grid container rowSpacing="20" columnSpacing="20">
          <Grid item xl={6} md={12} xs={12} className={`${classes.inputLabel} label-product ${disabled ? 'disabled' : null}`}>
            <Input
              label="1. Loại hình cho vay"
              disabled
              value={TypeTermLoan.find(i => i.code === LoanProgram.loan_term_info)?.name}
            />
          </Grid>
          <Grid item xl={6} md={12} xs={12} className={`${classes.inputLabel} label-product ${disabled ? 'disabled' : null}`}>
            <Input
              label="2. Loại hồ sơ"
              disabled
              value={LoanProgram.profile_type}
            />
          </Grid>
          <Grid item xl={12} md={12} xs={12} className={`${classes.inputLabel} label-product ${disabled ? 'disabled' : null}`}>
            <Select
              label="3. Khách hàng hiện hữu"
              options={[
                { value: "Y", label: "Yes" },
                { value: "N", label: "No" }
              ]}
              value={LoanProgram?.existing_customers ?? "Y"}
              disabled={ruleDisabled}
              onChange={(val) => onChangeProductProgramData(val, 'existing_customers')}
            />
          </Grid>
          <Grid item xl={12} md={12} xs={12} className={`${classes.checkboxLabel} label-product ${disabled ? 'disabled' : null}`}>
            <Input
              label="4. Mục đích sử dụng vốn vay thực tế"
              onDebounce={(val) => onChangeProductProgramData(val, 'actual_purpose_using_loan')}
              value={LoanProgram.actual_purpose_using_loan ?? ""}
              disabled={ruleDisabled}
              // disabled
              message={getMessage('emptyBasic', { fildName: 'actual_purpose_using_loan' })}

            />
          </Grid>
          <Grid item xl={12} md={12} xs={12} className={`${classes.checkboxLabel} label-product ${disabled ? 'disabled' : null}`}>
            <SelectCapitalNeed
              label="5. Bảng phân tích đánh giá phương án, nhu cầu vốn"
              onChange={(val) => onChangeProductProgramData(val, 'evaluation_analysis_table')}
              value={LoanProgram.evaluation_analysis_table ?? ""}
              disabled={ruleDisabled}
              required
              message={getMessage('emptyBasic', { fildName: 'evaluation_analysis_table' })}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductInfo;