import { FC } from "react"
import DetailTable from "../DetailsTable"

export interface BorrowerCICAppProps {
  dataPosition: string
}

const BorrowerCICApp: FC<BorrowerCICAppProps> = (props) => {
  return <>
    <DetailTable label='Người vay' dataPosition={props.dataPosition}/>
  </>
}
export default BorrowerCICApp