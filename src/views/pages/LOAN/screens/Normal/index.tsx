import { FC, Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { updateDocumentTitle } from 'utils';
import { stageName } from 'views/pages/LOAN/utils';
import StepArrow from 'views/components/layout/StepArrow';
import Customer from 'views/includes/Customer';
import Initialize from './Initialize';
import AppraisalApproval from './AppraisalApproval';
import ContractManagement from './ContractManagement';
import RegSecurityMeasures from './RegSecurityMeasures';
import CreateDisbursement from 'views/pages/Disbursement/CreateDisbursement';
import { useDispatch } from 'react-redux';
import { setTitlePage } from 'features/app/store/slice';

const LOANNormal: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const current = stageName.indexOf(params.stage);
  const dispatch = useDispatch();

  useEffect(() => {
    current === 0 && updateDocumentTitle('Khởi tạo hồ sơ tín dụng')
    dispatch( setTitlePage("hồ sơ tín dụng"));
  });


  const handleChange = (_: number, next: number) => {
    const tabMenu = stageName[next];
    switch (tabMenu) {
      case 'init':
        navigate(`/loan/normal/init/${params.id}/product`);
        break;
      case 'appraisal-approval':
        navigate(`/loan/normal/appraisal-approval/${params.id}/cic-app/main/borrower`);
        break;
      case 'contract-management':
        navigate(`/loan/normal/contract-management/${params.id}/initialize-editor/legal/borrower`);
        break;
      case 'reg-security-measures':
        navigate(`/loan/normal/reg-security-measures/${params.id}/collateral-info`);
        break;
      case 'disbursement':
        navigate(`/loan/normal/disbursement/${params.id}/initialize-disbursement/base-info`);
        break;
      default:
        navigate(`/loan/normal/init/${params.id}/product`);
        break;
    }
    return true;
  }
  return <Fragment>
    <Customer />
    <StepArrow
      className="mt-8 shadow"
      circle={['I', 'II', 'III', 'IV', 'V', 'VI']}
      current={!!~current ? current : 0}
      beforeChange={handleChange}
      tabs={[
        'Khởi tạo hồ sơ',
        'Thẩm định - phê duyệt',
        'Quản lý hợp đồng',
        'Đăng ký biện pháp đảm bảo',
        'Giải ngân khoản vay',
        'Quản lý hồ sơ'
      ]}
    >
      < Initialize />
      < AppraisalApproval />
      < ContractManagement />
      < RegSecurityMeasures />
      < CreateDisbursement />
    </StepArrow>
  </Fragment>

}

export default LOANNormal;