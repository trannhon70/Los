import { FC, Fragment } from "react";
import DetailsTable from "../DetailsTable";
import UserList from "../User";
export interface CoBorrowerProps {
  dataPosition: string
}

const CoBorrower: FC<CoBorrowerProps> = (props) => {
  return <Fragment>
  <UserList userName='người đồng vay' />
  <DetailsTable label='Người đồng vay' dataPosition={props.dataPosition}/>
</Fragment>
}
export default CoBorrower;