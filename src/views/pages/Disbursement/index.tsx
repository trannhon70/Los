import { FC } from "react"
import { Route, Routes } from "react-router"
import CreateDisbursement from "./CreateDisbursement"
import ListRecord from "./ListRecord"
import MainDisbursement from "./MainDisbursement"

const Disbursement: FC = () => {
  return <>
    <Routes>
      <Route path="/" element={<MainDisbursement />} />
      <Route path="list-record-disbursement" element={<ListRecord />} />
      <Route path="disbursement/loan/normal/disbursement/0010304202100000001/initialize-disbursement/base-info" element={<CreateDisbursement />} />
    </Routes></>
}
export default Disbursement