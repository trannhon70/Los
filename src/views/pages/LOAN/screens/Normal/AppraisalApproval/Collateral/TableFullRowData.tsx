import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import SelectCollateralType from 'views/components/widgets/SelectCollateralType';
import { BiChevronDownCircle } from 'react-icons/bi';
import { ILOANNormalCollateralData, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { intToRoman } from 'utils';
import { SxCollateralCheckTableFull, SxCollateralType, SxRealEstateStatus } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import useStorageCollateral from './useStorageCollateral';
import { Collapse } from '@mui/material';
import SelectRealEstateStatus from 'views/components/widgets/SelectRealEstateStatus';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
import Transport from './Transport/Transport';
import Machine from './Machine/Machine';
import Goods from './Goods/Goods';
import Deposit from './Deposit/Deposit';
import Other from './Other/Other';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import RealEstate from './RealEState';
import Propertytype from './PropertyType/Propertytype';
import { setCollapseTypeApproval } from 'features/loan/normal/storageApproval/collateral/actions';
import Stock from './Stock/Stock';

export interface TableFullRowDataProps {
  index: number;
  collateralData?: ILOANNormalCollateralData;
}

const TableFullRowData: FC<TableFullRowDataProps> = (props) => {

  const { collateralData, index } = props;
  const dispatch = useDispatch();
  const uuidActiveData = collateralData?.uuidActiveData ?? "";
  const { CollapseType, LoanNormalSubType } = useStorageCollateral("ALL", uuidActiveData)
  const [isCollapseType, setIsCollapseType] = useState<boolean>(CollapseType ?? false);
  const getMessage = useNormalCollateralMessage();

  useEffect(() => {
    if (isCollapseType !== CollapseType && CollapseType) {
      setIsCollapseType(CollapseType);
    }
    return () => {
      setIsCollapseType(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CollapseType])

  const toggleTable = () => {
    dispatch(setCollapseTypeApproval(collateralData?.uuidActiveData ?? ""))
  }

  const generateType = (type: string, loan: ISubtype, index: number) => {
    switch (type) {
      case "REST":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <RealEstate subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
      case "MEST":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <Transport subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
      case "DEVI":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <Machine subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
      case "GODS":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <Goods subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
      case "RPRO":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <Propertytype subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
      case "STOC":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <Stock subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
      case "BALC":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <Deposit subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
      case "OTHE":
        return <TableRow key={index}>
          <TableCell colSpan={5} className="p-0">
            <Collapse className='tableFull-collapse' in={isCollapseType} unmountOnExit={true} timeout={1000}>
              <Other subType={loan} collateralData={collateralData} />
            </Collapse>
          </TableCell>
        </TableRow>
    }
  }

  return (
    <Table key={index}>
      <TableBody>
        <TableRow key={index}>
          <TableCell
            align='center'
            width={'3%'}
            sx={{ fontSize: '18px', color: '#353535' }}
          >
            {intToRoman(index)}
          </TableCell>
          <TableCell width='25%' sx={{
            paddingLeft: collateralData?.type ? '12px' : '10px',
            "& .colla-type": {
              minWidth: "245px",
              maxWidth: '245px',
              '&.Mui-disabled': {
                color: "#1825aa"
              }
            }
          }}>
            <SelectCollateralType
              className='colla-type'
              disabled={true}
              sx={SxCollateralType}
              value={collateralData?.type}
            />
          </TableCell>
          {
            collateralData?.type === "REST" ? <>
              <TableCell width='30%'
                sx={{
                  paddingLeft: "0 !important",
                  "& .MuiFormLabel-root": {
                    width: "50% !important",
                    marginBottom: 'unset !important'
                  },
                  "& .MuiTextField-root": {
                    width: "50% !important",
                    "& .MuiInput-root": {
                      width: "100% !important",
                    }
                  }
                }}
              >
                <SelectRealEstateStatus
                  label="Trạng thái bất động sản"
                  required
                  className='estate-status'
                  sx={SxRealEstateStatus}
                  disabled={true}
                  value={collateralData?.status}
                  message={getMessage('status', { position: collateralData?.uuidActiveData ?? '' })}
                />
              </TableCell>
              <TableCell width='30%' sx={{
                "& .colla-check": {
                  "& .MuiFormGroup-row": {
                    flexWrap: "nowrap !important"
                  }
                }
              }}>
                <CollateralCheck
                  label="Tài sản hợp khối"
                  required
                  sx={SxCollateralCheckTableFull}
                  disabled={true}
                  value={collateralData?.is_compactness}
                  className="colla-check"
                />
              </TableCell> </> : collateralData?.type === "" ? <TableCell></TableCell> :
              <TableCell width='60%' sx={{ paddingLeft: '0px !important' }}>
                <CollateralCheck
                  label="Báo cáo/Chứng thư thẩm định giá gồm nhiều tài sản"
                  required
                  disabled={true}
                  sx={SxCollateralCheckTableFull}
                  value={collateralData?.is_compactness}
                />
              </TableCell>
          }
          <TableCell
            className="text-right pr-0 py-2"
            width="10%"
            sx={{ '& svg': { color: 'var(--mscb-primary)' } }}
          >
            <Box>
              {<IconButton onClick={toggleTable} sx={{
                '& svg': {
                  transition: 'all ease-in-out 0.3s',
                  ...(CollapseType ? {} : { transform: 'rotate(-90deg)' })
                }
              }}>
                <BiChevronDownCircle style={{ fontSize: '1rem' }} size="24px" />
              </IconButton>}
            </Box>
          </TableCell>
        </TableRow>
        {
          LoanNormalSubType?.map((loan, index) => {
            return <>
              {
                generateType(collateralData?.type ?? "", loan, index)
              }
            </>
          })
        }
      </TableBody>
    </Table>
  )
}

export default TableFullRowData;
