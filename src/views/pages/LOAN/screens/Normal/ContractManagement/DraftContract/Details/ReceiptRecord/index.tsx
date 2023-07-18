import { FC } from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import CollateralCommon from "../CollateralCommon";

const ReceiptRecord: FC = () => {
  return <>
    <CollateralCommon
      labelTitle1='biên bản giao nhận'
      labelInputItem1='1. Số hợp đồng thế chấp'
      labelInputItem2='2. Mã biên bản giao nhận'
      labelTitle2='Tài sản bảo đảm của biên bản giao nhận'
      labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
      labelObjList='Số lượng biên bản giao nhận'
      options={[
        { label: 'Biên bản giao nhận 1', circle: <FaHandHoldingUsd /> },
        { label: 'Biên bản giao nhận 2', circle: <FaHandHoldingUsd /> }
      ]}
    />
  </>
}
export default ReceiptRecord;