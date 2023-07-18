import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from 'app/hooks/useNotify';
import { showAppBackdrop } from 'features/app/store/slice';
import {
  deleteAllCollateral,
  onChangeCollaretalProperty,
  setCollapseType
} from 'features/loan/normal/storage/collateralV2/actions';
import { ETypeCollateral } from 'features/loan/normal/storage/collateralV2/case';
import { getDataFullCollType, getLOANNormalCollapseType, getLoanNormalSubType } from 'features/loan/normal/storage/collateralV2/selector';
import { FC, Fragment, useEffect, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalCollateralData, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { intToRoman } from 'utils';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
import SelectCollateralType from 'views/components/widgets/SelectCollateralType';
import SelectRealEstateStatus from 'views/components/widgets/SelectRealEstateStatus';
import DepositsType from './DepositsType';
import GoodsType from './GoodsType';
import MachineType from './MachineType';
import OtherType from './OtherType';
import PropertyType from './PropertyType';
import RealEstateType from './RealEstateType';
import TableRightToUseLand from './RealEstateType/TableRightToUseMain';
import StockType from './StockType';
import {
  SxCollateralCheckTableFull,
  SxCollateralType,
  SxRealEstateStatus
} from './style';
import TransportType from './TransportType';
export interface ITableFullProps {
  index: number
  onChangeType?(type: string): void;
  collateralData?: ILOANNormalCollateralData;
}

// TODO: Table main form
const TableFull: FC<ITableFullProps> = (props) => {

  const { onChangeType, collateralData, index } = props;
  const dispatch = useDispatch();
  const notify = useNotify();
  const getMessage = useNormalCollateralMessage();
  const uuidActiveData = collateralData?.uuidActiveData ?? "";


  const LoanNormalSubType = useSelector(getLoanNormalSubType(uuidActiveData));
  const CollapseType = useSelector(getLOANNormalCollapseType(uuidActiveData));
  const dataCollateral = useSelector(getDataFullCollType)

  const [collateralType, setCollateralType] = useState<string>(collateralData?.type ?? "");
  const [ isType, setIsType ] = useState<boolean>(false);
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);

  const toggleTable = () =>{
    if(!isType){
      notify('Vui lòng chọn loại tài sản', 'warning');
      return;
    }
    dispatch(setCollapseType(index - 1))

  }

  const onHandleChangeKey = (value: string | number | null, key: keyof ILOANNormalCollateralData) => {
    collateralData && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateralData.uuidActiveData }));
  }

  const onHandleDeleteConlateral = () => {
    setIsModalConfirm(!isModalConfirm);
  }

  const onHandleCancelConfirm = () => {
      setIsModalConfirm(!isModalConfirm);
  }

  const onHandleConfirm = () =>{
    collateralData && dispatch(deleteAllCollateral({
      cert_uuid:collateralData.price_cert_uuid,
      uuid:collateralData.uuidActiveData
    },{key:""})) && collateralData.price_cert_uuid && dispatch(showAppBackdrop())

    setIsModalConfirm(!isModalConfirm);

    // dispatch(setCollapseType(index - 1))
    
  }


  const generateLayout = () => {
    switch (collateralType) {
      case ETypeCollateral.RPRO:
        return (
          <PropertyType collateralData={collateralData} />
        )
      case ETypeCollateral.GODS:
        return (
          <GoodsType collateralData={collateralData} />
        )
      case ETypeCollateral.STOC:
        return (
          <StockType collateralData={collateralData} />
        )
      case ETypeCollateral.DEVI:
        return (
          <MachineType collateralData={collateralData} />
        )
      case ETypeCollateral.MEST:
        return (
          <TransportType collateralData={collateralData} />
        )
      case ETypeCollateral.BALC:
        return (
          <DepositsType collateralData={collateralData} />
        )
      case ETypeCollateral.OTHE:
        return (
          <OtherType collateralData={collateralData} />
        )
      case ETypeCollateral.REST:
        return (
          <RealEstateType collateralData={collateralData} />
        )
    }
  }
  
  // TODO: layout quyền sở hữu :: sub_type
  const generateLayoutOwnership = (key: number, subType: ISubtype) => {
    switch (collateralType) {
      case ETypeCollateral.REST:
        return (
          <TableRightToUseLand
            keyIndex={key.toString()}
            type={collateralData?.type}
            subTypeData={subType}
            collateral={collateralData}
          />
        )
    }
  }

  // TODO: layout trạng thái tài sản
  const generateLayoutStatusCollateral = () => {
    if (collateralType.length === 0) {
      return <Fragment>
        <TableCell width='25%'></TableCell>
        <TableCell width='35%'></TableCell>

      </Fragment>
    } else if (collateralType === ETypeCollateral.REST) {
      return (
        <Fragment>
          <TableCell  width='25%' sx={{
              "& .estate-status":{
                "& .MuiInput-root": {
                  width: "200px!important",
                }
              },
          }}>
            <SelectRealEstateStatus
              label="Trạng thái bất động sản"
              required
              className='estate-status'
              sx={SxRealEstateStatus}
              onChange={(val) => { onHandleChangeKey(val, 'status') }}
              value={collateralData?.status}
              message={getMessage('status',{position:collateralData?.uuidActiveData ?? ''})}
            />
          </TableCell>
          <TableCell  width='35%' sx={{
            "& .colla-check":{
                "& .MuiFormGroup-row":{
                  flexWrap:"nowrap !important"
                }
            }
          }}>
            <CollateralCheck
              label="Tài sản hợp khối"
              required
              sx={SxCollateralCheckTableFull}
              onChange={(val) => { onHandleChangeKey(val, 'is_compactness') }}
              value={collateralData?.is_compactness}
              className="colla-check"
            />
          </TableCell>
        </Fragment>

      )
    } else {
      return (
        <Fragment>
          <TableCell width='50%' sx={{paddingLeft:'0px !important'}}>
            <CollateralCheck
              label="Báo cáo/Chứng thư thẩm định giá gồm nhiều tài sản"
              required
              sx={SxCollateralCheckTableFull}
              onChange={(val) => { onHandleChangeKey(val, 'is_compactness') }}
              value={collateralData?.is_compactness}
            />
          </TableCell>
          <TableCell width="10%"></TableCell>
        </Fragment>
      )
    }
  }

  // TODO: Change Type Collateral Item => props
  const onChangeCollaretalType = (type: string) => {
    onChangeType && onChangeType(type);
    if (collateralType !== type) {
      setCollateralType(type);
    }
  }

  useEffect(() => {
    if (collateralData) {
      setCollateralType(collateralData?.type);
      collateralData?.type?.length > 0 && setIsType(true);
    }

    return ()=>{
      //clean up 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralData])

  return (
    <Fragment>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              // rowSpan={2}
              align='center'
              width={'3%'}
            >
            { intToRoman(index) }
            </TableCell>
            <TableCell width='25%' sx={{
                paddingLeft:collateralData?.type?'12px':'10px',
                "& .colla-type":{
                  minWidth:"245px",
                  maxWidth:'245px',
                  '&.Mui-disabled': {
                    color: "#1825aa"
                  }
                }
              }}>
              <SelectCollateralType 
                className='colla-type '
                disabled={collateralType.length > 0 ? true : false}
                onChange={(value) => onChangeCollaretalType(value)}
                sx={SxCollateralType}
                value={collateralData?.type}
              />
            </TableCell>
              {
                generateLayoutStatusCollateral()
              }
            <TableCell
              className="text-right pr-0 py-2"
              width="7%"
              sx={{ '& svg': { color: 'var(--mscb-primary)' } }}
            >
              <Box>
                <IconButton onClick={onHandleDeleteConlateral}>
                  <IoTrashOutline style={{ fontSize: '1.5rem' }} />
                </IconButton>
                {CollapseType ? null : <IconButton onClick={toggleTable}>
                  <BiChevronDownCircle style={{ fontSize: '1.5rem' }} />
                </IconButton>}
              </Box>
            </TableCell>
          </TableRow>
          {
            CollapseType?           
            <TableRow>
            <TableCell colSpan={5} className="p-0" sx={{ border: 'none',
              // "& .tableFull-collapse":{
              //   "& .MuiCollapse-wrapperInner":{
              //     paddingLeft:"3%"
              //   }
              // }
              }}
            >
              <Collapse  className='tableFull-collapse' in={CollapseType} unmountOnExit>
                {CollapseType?generateLayout():null}
              </Collapse>
            </TableCell>
          </TableRow>: null
          }
          {
            LoanNormalSubType &&
            <Fragment >
              {CollapseType? generateLayoutOwnership(1, LoanNormalSubType[0]) : null}
            </Fragment>
          }

        </TableBody>
      </Table>

      <ModalConfirm
        open={isModalConfirm}
        children="Bạn có chắc chắn muốn xóa tài sản này"
        labelConfirm="Xác nhận"
        labelCancel="Hủy"
        onClose={onHandleCancelConfirm}
        onConfirm={onHandleConfirm}
      />

    </Fragment>
  )
}

export default TableFull;