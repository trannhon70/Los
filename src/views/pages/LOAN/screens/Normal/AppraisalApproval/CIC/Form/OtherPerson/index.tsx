import { FC, Fragment } from "react";
import DetailsTable from "../DetailsTable";
import UserList from "../User";

export interface OtherPersonProps {
  dataPosition: string
}

const OtherPerson: FC<OtherPersonProps> = (props) => {
  return <Fragment>
    <UserList userName='đối tượng khác' additional/>
    <DetailsTable 
      additional
      label='Đối tượng khác' 
      dataPosition={props.dataPosition}
      />
  </Fragment>
}
export default OtherPerson;