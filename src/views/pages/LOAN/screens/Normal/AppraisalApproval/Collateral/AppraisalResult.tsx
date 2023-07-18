import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useApprovalCollarteralMessage from "app/hooks/useApprovalCollarteralMessage";
import {
  onChangeDataAccept,
  onChangeDataAcceptCurrent
} from "features/loan/normal/storageApproval/collateral/actions";
import { ETypeValidateCollateralApproval } from "features/loan/normal/storageApproval/collateral/case";
import { getLOANNormalApprovalData } from "features/loan/normal/storageApproval/collateral/selector";
import { FC, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalApprovalAccept } from "types/models/loan/normal/storageApproval/Collateral";
import Input from "views/components/base/Input";
import Radio, { RadioRef } from "views/components/base/Radio";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
export interface IAppraisalResultProps {
  uuidData?: string;
}

const AppraisalResult: FC<IAppraisalResultProps> = (props) => {
  const { uuidData } = props
  const dispatch = useDispatch();
  const appRef = useRef<RadioRef>(null);
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const getMessage = useApprovalCollarteralMessage();

  const onChangeDataAppraisal = (value: string | number | null, key: keyof ILOANNormalApprovalAccept) => {
    dispatch(onChangeDataAccept(value, { key: key, uuiddata: uuidData ?? "" }));
  }

  const changeTypeApp = () => {
    dispatch(onChangeDataAcceptCurrent(appRef.current?.getValue().value === "Y" ?? "", { uuiddata: uuidData ?? "" }));
  }

  const dataApp = useSelector(getLOANNormalApprovalData(uuidData ?? ""));
  // console.log("dataApp",dataApp)
  return <Fragment>
    <Box className='flex'>
      <Box width={'5%'}></Box>
      <Box width={'15%'} className='pt-3 text-danger' >
        <Typography className='font-medium'>
          KẾT QUẢ THẨM ĐỊNH
        </Typography>
      </Box>
      <Box width={'80%'} className="pl-6 pt-3">
        <Grid container spacing={3} >
          <Grid item xl={3} lg={3} md={12}>
            <Typography component="h3" className="text-14 mb-2 font-medium w-full">
              1. Đề xuất nhận tài sản bảo đảm
            </Typography>
            <Radio
              variant="checkbox"
              name="loanPremier"
              onChange={changeTypeApp}
              ref={appRef}
              disabled={ruleDisabled}
              options={[
                { value: "Y", label: "Đồng ý" , checked:dataApp?.is_accept },
                { value: "N", label: "Không đồng ý" ,checked:!dataApp?.is_accept},
              ]}
            />
          </Grid>
          <Grid item xl={9} lg={9} md={12}>
            <Input
              label="2. Lý do"
              onDebounce={(val)=>onChangeDataAppraisal(val,'reason')}
              value={dataApp?.reason}
              required={!dataApp?.is_accept} 
              disabled={ruleDisabled}
              message={getMessage('reason', { position: dataApp?.uuidActiveData ?? "", type: ETypeValidateCollateralApproval.COLLATEAL_DETAIL })}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
    <Divider className='mt-5' />
  </Fragment >
}
export default AppraisalResult;