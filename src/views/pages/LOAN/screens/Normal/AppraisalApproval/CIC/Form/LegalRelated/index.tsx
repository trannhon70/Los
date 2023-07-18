import { FC, Fragment } from "react";
import DetailsTable from "../DetailsTable";
import UserList from "../User";

export interface LegalRelatedProps {
  dataPosition: string
}

const LegalRelated: FC<LegalRelatedProps> = (props) => {
  return <Fragment>
    <UserList userName='người liên quan theo quy định của Pháp luật' additional/>
    <DetailsTable additional label='Người liên quan theo quy định của Pháp luật' dataPosition={props.dataPosition} />
  </Fragment>
}
export default LegalRelated;