import { FC, Fragment } from "react"
import { FaHandHoldingUsd } from "react-icons/fa";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { contractDraft, detailsDraft, registerDraft, stageName } from "views/pages/LOAN/utils";
import MainForm from "../../LegalDraft/MainForm";
import CollateralCommon from "../CollateralCommon";

const RegisterForm: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const current = registerDraft.indexOf(params['*'].split('/')[0]);

  const beforeChange = (_: number, next: number) => {
    const stepNext = registerDraft[next]
    switch (next) {
      case 0:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[1]}/${stepNext}`);
        break;
      case 1:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[1]}/${stepNext}`);
        break;
      case 2:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[1]}/${stepNext}`);
        break;
      case 3:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[1]}/${stepNext}`);
        break;
      default:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${detailsDraft[1]}/${stepNext}`);
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
          label: "Sửa đổi bất động sản",
          hasSub: false,
        },
        {
          node: "3",
          label: "Động sản",
          hasSub: false,
        },
        {
          node: "4",
          label: "Thay đổi động sản",
          hasSub: false,
        },
        {
          node: "5",
          label: "Sửa chữa sai xót động sản",
          hasSub: false,
        },
      ]}
      sx={{
        '&.step-child': {
          '& .MuiTabs-flexContainer': {
            justifyContent: "center",
            transform: "translateX(-10%)",
          },
        }
      }}
    >

      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='đơn đăng ký bất động sản'
            labelInputItem1='1. Số hợp đồng thế chấp/Phụ lục hợp đồng thế chấp'
            labelInputItem2='2. Mã đơn đăng ký'
            labelTitle2='Tài sản bảo đảm của đơn đăng ký'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng ĐĐK BĐS'
            options={[
              { label: 'ĐĐK BĐS 1', circle: <FaHandHoldingUsd /> },
              { label: 'ĐĐK BĐS 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='đơn đăng ký sửa đổi bất động sản'
            labelInputItem1='1. Mã đơn đăng ký bất động sản'
            labelInputItem2='2. Mã đơn đăng ký sửa đổi/Bổ sung'
            labelTitle2='Tài sản bảo đảm của đơn đăng ký'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng ĐĐK sửa đổi BĐS'
            options={[
              { label: 'ĐĐK sửa đổi BĐS 1', circle: <FaHandHoldingUsd /> },
              { label: 'ĐĐK sửa đổi BĐS 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='đơn đăng ký động sản'
            labelInputItem1='1. Số hợp đồng thế chấp/Phụ lục hợp đồng thế chấp'
            labelInputItem2='2. Mã đơn đăng ký'
            labelTitle2='Tài sản bảo đảm của đơn đăng ký'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng ĐĐK ĐS'
            options={[
              { label: 'ĐĐK động sản 1', circle: <FaHandHoldingUsd /> },
              { label: 'ĐĐK động sản 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='đơn đăng ký thay đổi động sản'
            labelInputItem1='1. Mã đơn đăng ký động sản'
            labelInputItem2='2. Mã đơn đăng ký sửa đổi động sản'
            labelTitle2='Tài sản bảo đảm của đơn đăng ký'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng ĐĐK thay đổi ĐS'
            options={[
              { label: 'ĐĐK thay đổi ĐS 1', circle: <FaHandHoldingUsd /> },
              { label: 'ĐĐK thay đổi ĐS 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        } />
      </Routes>
      <Routes>
        <Route path=":declare" element={
          <CollateralCommon
            labelTitle1='đơn đăng ký sửa chữa sai xót động sản'
            labelInputItem1='1. Mã đơn đăng ký động sản'
            labelInputItem2='2. Mã đơn đăng ký sửa chữa sai sót'
            labelTitle2='Tài sản bảo đảm của đơn đăng ký'
            labelAmoutUnit='Tổng số lượng tài sản thế chấp:'
            labelObjList='Số lượng ĐĐK sửa chữa sai sót động sản'
            options={[
              { label: 'Đơn đăng ký 1', circle: <FaHandHoldingUsd /> },
              { label: 'Đơn đăng ký 2', circle: <FaHandHoldingUsd /> }
            ]}
          />
        }
        />
      </Routes>
    </Steps>
  </Fragment>
}
export default RegisterForm