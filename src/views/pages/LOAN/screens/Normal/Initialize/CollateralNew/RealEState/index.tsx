import { Collapse, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import { deleleteSubItem, onChangeCollaretalProperty, setChildSubType, setSubType } from 'features/loan/normal/storage/collateralV2/actions';
import { ESubtypeRest } from 'features/loan/normal/storage/collateralV2/case';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalCollateralData, ISubtype, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import SelectTypeRealEstate from "views/components/widgets/SelectTypeRealEstate";
import TableClassificationInfo from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/RealEState/TableClassificationInfo';
import TableTotalValueAssets from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/RealEState/TableTotalValueAssets';
import collateralStyle, { SxSelectCollateralType } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import { TTypeCollateralChildRestMark, TypeCollateralChildRestAppa, TypeCollateralChildRestLand } from 'views/pages/LOAN/utils';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import Department from './Department/Department';
import Land from './Land/Land';
import Market from './Market/Market';
export interface IRealEstateProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const RealEstate: FC<IRealEstateProps> = (props) => {  

  const dispatch = useDispatch();
  const classes = collateralStyle()
  const { collateralData, subType } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const clickOpen = () => {
    setIsOpen(!isOpen);
  }
  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateralData && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateralData.uuidActiveData }));
  }
  const ruleDisabled = useSelector(getRuleDisbled)

  const handleChangeSubtype = (childType: string) => {
    let subTypeItem: string = "";
    if (TypeCollateralChildRestLand.indexOf(childType) >= 0) {
      subTypeItem = ESubtypeRest.LAND
    }
    else if (TypeCollateralChildRestAppa.indexOf(childType) >= 0) {
      subTypeItem = ESubtypeRest.APPA
    }
    else if (TTypeCollateralChildRestMark.indexOf(childType) >= 0) {
      subTypeItem = ESubtypeRest.MARK
    }
    dispatch(setSubType(subTypeItem, { uuidSubType: subType?.uuidActiveSubtype ?? "", uuidData: collateralData?.uuidActiveData ?? "" }));
    dispatch(setChildSubType(childType, {
      uuidSubType: subType?.uuidActiveSubtype ?? "", uuidData: collateralData?.uuidActiveData ?? "",
    }))
  };
  const onHandleDeleteSubType = () => {
    let uuidData = collateralData?.uuidActiveData;
    let uuidSubType = subType?.uuidActiveSubtype;

    if (uuidData && uuidSubType) {
      dispatch(deleleteSubItem(uuidSubType, { uuidData: uuidData }));
    }
  };

  return (
    <Fragment>
      <Table>
        <TableBody>
          <InfoReportCollaretalType
            collateralData={collateralData}
            onChangeValueCollateral={onHandleChangeKey}
          />
          <TableClassificationInfo
            onChangeValueCollateral={(value, key) => onHandleChangeKey(value, key)}
            collateralData={collateralData}
          />
          <TableTotalValueAssets
            onChangeValueCollateral={(value, key) => onHandleChangeKey(value, key)}
            collateralData={collateralData} />
        </TableBody>
      </Table>
      <Table sx={{
        tableLayout:'fixed'
      }}>
        <TableBody>
          <TableRow>
            <TableCell
              width="3%"
              sx={{ verticalAlign: "top", fontSize: "16px", border: "none" }}
            ></TableCell>
            <TableCell width='20%' sx={{
                paddingRight: '0px !important', 
                // paddingLeft: `${isOpen?'10px !important':'12px !important'}`,
                "& .colla-type":{
                  minWidth:"300px",
                  maxWidth:'300px',
                }
              }}>
              <SelectTypeRealEstate
                sx={SxSelectCollateralType}
                onChange={handleChangeSubtype}
                value={subType?.child_sub_type}
                disabled={ruleDisabled || !!subType?.child_sub_type}
                className={clsx(classes.typeRealEstate)}
              />
            </TableCell>
            {/* <TableCell className="pl-4"></TableCell>
            <TableCell className="pl-4"></TableCell> */}
            <TableCell
              className="text-right pr-0 py-2"
              sx={{ "& svg": { color: "var(--mscb-primary)" } }}
              width="77%"
            >
              {/* {
               (!subType?.id || ruleDisabled ) ? null : <IconButton
                  onClick={onHandleDeleteSubType}
                >
                  <IoTrashOutline style={{fontSize: '1.5rem'}}/>
                </IconButton> 
              } */}

              <IconButton sx={{
                '& svg': {
                  transition: 'all ease-in-out 0.3s',
                  ...(isOpen ? {} : { transform: 'rotate(-90deg)' })
                }
              }}
                onClick={clickOpen}
              >
                <BiChevronDownCircle style={{ fontSize: '1.5rem' }}/>
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
    </Fragment>
  )
}

export default RealEstate;