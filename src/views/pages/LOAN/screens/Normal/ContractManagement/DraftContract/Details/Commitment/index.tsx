import { FC } from "react";
import { FaHandHoldingUsd } from 'react-icons/fa';
import CollateralCommon from "../CollateralCommon";

const Commitment: FC = () => {
  return <>
    <CollateralCommon
      labelTitle1='Cam kết công trình xây dựng'
      labelInputItem1='1. Số hợp đồng thế chấp/Phụ lục hợp đồng thế chấp'
      labelInputItem2='2. Mã cam kết công trình xây dựng'
      labelTitle2='Tài sản bảo đảm của cam kết công trình xây dựng'
      labelAmoutUnit='Tổng giá trị định giá tài sản (VND):'
      labelObjList='Số lượng cam kết CTXD'
      options={[
        { label: 'Cam kết CTXD 1', circle: <FaHandHoldingUsd /> },
        { label: 'Cam kết CTXD 2', circle: <FaHandHoldingUsd /> }
      ]}
    />
  </>
}
export default Commitment;