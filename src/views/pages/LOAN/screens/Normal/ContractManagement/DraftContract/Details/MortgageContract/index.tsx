import { FC, Fragment } from "react"
import { FaHandHoldingUsd } from "react-icons/fa";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { contractDraft, detailsDraft, stageName } from "views/pages/LOAN/utils";
import MainForm from "../../LegalDraft/MainForm";
import CollateralCommon from "../CollateralCommon";

const MortgageContract: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const current = contractDraft.indexOf(params['*'].split('/')[0]);

  const beforeChange = (_: number, next: number) => {
    const stepNext = contractDraft[next]
    switch (next) {
      case 0:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[0]}/${stepNext}`);
        break;
      case 1:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[0]}/${stepNext}`);
        break;
      case 2:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[0]}/${stepNext}`);
        break;
      case 3:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[0]}/${stepNext}`);
        break;
      default:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[0]}/${stepNext}`);
        break;
    }


    return true;
  }
  return <Fragment>
    <Steps
      className="step-child"
      current={!!~current ? current : 0}
      onChange={beforeChange}
      alternative
      steps={[
        {
          node: "1",
          label: "Bất động sản",
          hasSub: false,
        },
        {
          node: "2",
          label: "Sạp chợ",
          hasSub: false,
        },
        {
          node: "3",
          label: "Tài sản hình thành trong tương lai",
          hasSub: false,
        },
        {
          node: "4",
          label: "Phụ lục",
          hasSub: false,
        },
      ]}
      sx={{
        '&.step-child': {
          '& .MuiTabs-flexContainer': {
            justifyContent: "center",
            transform: "translateX(-22%)",
          },
        }
      }}
    >

      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='Hợp đồng thế chấp bất động sản'
            labelInputItem1='1. Tên hợp đồng thế chấp'
            labelInputItem2='2. Tên hợp đồng thế chấp khác'
            labelInputItem3='3. Số hợp đồng thế chấp'
            labelTitle2='Tài sản bảo đảm của hợp đồng'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng HĐTC BĐS'
            options={[
              { label: 'HĐTC BĐS 1', circle: <FaHandHoldingUsd /> },
              { label: 'HĐTC BĐS 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='Hợp đồng thế chấp sạp chợ'
            labelInputItem1='1. Số hợp đồng thế chấp'
            labelInputItem2='2. Mã biên bản giao nhận'
            labelTitle2='Tài sản bảo đảm của hợp đồng'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng HĐTC sạp chợ'
            options={[
              { label: 'HĐTC Sạp chợ 1', circle: <FaHandHoldingUsd /> },
              { label: 'HĐTC Sạp chợ 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='Hợp đồng thế chấp tài sản hình thành trong tương lai'
            labelInputItem1='1. Số hợp đồng thế chấp'
            labelTitle2='Tài sản bảo đảm của hợp đồng'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng HĐTC TSHTTTL'
            options={[
              { label: 'HĐTC TSHTTTL 1', circle: <FaHandHoldingUsd /> },
              { label: 'HĐTC TSHTTTL 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='phụ lục Hợp đồng thế chấp'
            labelInputItem1='1. Số hợp đồng thế chấp'
            labelInputItem2='2. Số phụ lục hợp đồng thế chấp'
            labelInputItem3='3. Tên phụ lục hợp đồng thế chấp'
            labelInputItem4='4. Tên phụ lục hợp đồng thế chấp khác'
            labelTitle2='Tài sản bảo đảm của hợp đồng'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng phụ lục HĐTC'
            options={[
              { label: 'Phụ lục HĐTC 1', circle: <FaHandHoldingUsd /> },
              { label: 'Phụ lục HĐTC 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
    </Steps>
  </Fragment>
}
export default MortgageContract