import { FC, Fragment, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import { ILOANNormalCollateralData, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { Collapse, IconButton } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import SelectTypeRealEstate from "views/components/widgets/SelectTypeRealEstate";
import { BiChevronDownCircle } from 'react-icons/bi';
import Department from './Department/Department';
import Market from './Market/Market';
import Land from './Land/Land';
import { SxCollateralQSH } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import collateralStyle from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style'; 
import clsx from 'clsx';
import TableClassificationInfo from './TableClassificationInfo';
import TableTotalValueAssets from './TableTotalValueAssets';
import TableInfoReportCollaretalType from '../TableInfoReportCollaretalType';
import AppraisalResult from '../AppraisalResult';
export interface IRealEstateProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const RealEstate: FC<IRealEstateProps> = (props) => { 

  const classes = collateralStyle()
  const { collateralData, subType } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const clickOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Fragment>
      <Table>
        <TableBody>
          <TableInfoReportCollaretalType
            collateralData={collateralData}
          />
          <TableClassificationInfo
            collateralData={collateralData}
          />
          <TableTotalValueAssets
            collateralData={collateralData} />
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              width="3%"
              sx={{ verticalAlign: "top", fontSize: "16px", border: "none" }}
            ></TableCell>
            <TableCell width='20%' sx={{
                paddingRight: '0px !important', 
                paddingLeft: `${isOpen?'10px !important':'12px !important'}`,
                "& .colla-type":{

                  minWidth:"300px",
                  maxWidth:'300px',
                }
              }}>
              <SelectTypeRealEstate
                sx={SxCollateralQSH}
                value={subType?.child_id}
                disabled={true}
                className={clsx(classes.typeRealEstate)}
              />
            </TableCell>
            <TableCell
              className="text-right pr-0 py-2"
              sx={{ "& svg": { color: "var(--mscb-primary)" } }}
            >
              <IconButton sx={{
                '& svg': {
                  transition: 'all ease-in-out 0.3s',
                  ...(isOpen ? {} : { transform: 'rotate(180deg)' })
                }
              }}
                onClick={clickOpen}
              >
                <BiChevronDownCircle style={{ fontSize: '1rem' }} size="24px" />
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={6} className="p-0" >
              <Collapse unmountOnExit={true} timeout={1000} in={isOpen} sx={{
                border: 'none',
                "& .MuiCollapse-wrapper": {
                  "& .MuiCollapse-wrapperInner": {
                    paddingLeft: "0"
                  }
                }
              }}>
                {
                  subType?.id === "LAND" ? <Land collateralData={collateralData} subType={subType} /> :
                    subType?.id === "APPA" ? <Department collateralData={collateralData} subType={subType} idx={1} /> :
                      subType?.id === "MARK" ? <Market collateralData={collateralData} subType={subType} /> : null
                }
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <AppraisalResult uuidData={collateralData?.uuidActiveData ?? ""}/> */}
    </Fragment>
  )
}

export default RealEstate;