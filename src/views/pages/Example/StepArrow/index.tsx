import { FC } from 'react';
import StepArrow from 'views/components/layout/StepArrow';

const ExampleStepArrow: FC = () => {

  return <StepArrow
    circle={[ 'I', 'II', 'III', 'IV', 'V', 'VI' ]}
    tabs={[
      'Khởi tạo hồ sơ',
      'Thẩm định - phê duyệt',
      'Quản lý hợp đồng',
      'Đăng ký biện pháp đảm bảo',
      'Giải ngân khoản vay',
      'Quản lý hồ sơ'
    ]}
  >
    <div>Step Arrow 1</div>
    <div>Step Arrow 2</div>
    <div>Step Arrow 3</div>
    <div>Step Arrow 4</div>
    <div>Step Arrow 5</div>
    <div>Step Arrow 6</div>
  </StepArrow>

}

export default ExampleStepArrow;