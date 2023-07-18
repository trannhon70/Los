import { FC, Fragment } from "react";
import DetailsTable from "../DetailsTable";
import UserList from "../User";
export interface CoPayerProps {
  dataPosition: string
}

const CoPayer: FC<CoPayerProps> = (props) => {
  return <Fragment>
    <UserList userName='người đồng trả nợ' />
    <DetailsTable label='Người đồng trả nợ' dataPosition={props.dataPosition}/>
  </Fragment>
}
export default CoPayer;