import { FC, Fragment } from "react";
import DetailsTable from "../DetailsTable";

export interface MarriageProps {
  dataPosition: string
}

const Marriage: FC<MarriageProps> = (props) => {
  return <Fragment>
    <DetailsTable label='Người hôn phối' dataPosition={props.dataPosition} />
  </Fragment>
}
export default Marriage;