import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNotify from 'app/hooks/useNotify';
import { ETypeCollateral } from 'features/loan/normal/storage/collateralV2/case';
import { getLOANNormalCollapseType, getLoanNormalSubType } from 'features/loan/normal/storage/collateralV2/selector';
import { FC, Fragment, useEffect, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalCollateralData } from 'types/models/loan/normal/storage/CollaretalV2';
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

  const LoanNormalSubType = useSelector(getLoanNormalSubType(collateralData?.type ?? ""));

  const CollapseType = useSelector(getLOANNormalCollapseType(collateralData?.uuidActiveData ?? ""));

  const [collateralType, setCollateralType] = useState<string>(collateralData?.type ?? "");
  const [isType, setIsType] = useState<boolean>(false);
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);



  const toggleTable = () => {
    if (!isType) {
      notify('Vui lòng chọn loại tài sản', 'warning');
      return;
    }
    // dispatch(setCollapseType(collateralData?.uuidActiveData ?? ""));
  }

  const onHandleChangeKey = (value: string | number | null, key: keyof ILOANNormalCollateralData) => {
    // collateralData && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateralData.uuidActiveData }));
  }

  const onHandleDeleteConlateral = () => {
    setIsModalConfirm(!isModalConfirm);

  }
  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  }
  const onHandleConfirm = () => {

    setIsModalConfirm(!isModalConfirm);
  }

  const generateLayout = () => {

    switch (collateralType) {
      case ETypeCollateral.RPRO:
        return (
          <PropertyType />
        )
      case ETypeCollateral.GODS:
        return (
          <GoodsType />
        )
      case ETypeCollateral.STOC:
        return (
          <StockType />
        )
      case ETypeCollateral.DEVI:
        return (
          <MachineType />
        )
      case ETypeCollateral.MEST:
        return (
          <TransportType />
        )
      case ETypeCollateral.BALC:
        return (
          <DepositsType />
        )
      case ETypeCollateral.OTHE:
        return (
          <OtherType />
        )
      case ETypeCollateral.REST:
        return (
          <RealEstateType />
        )
    }
  }

  // TODO: layout quyền sở hữu :: sub_type
  const generateLayoutOwnership = (key: number, type: string) => {
    if (type === ETypeCollateral.REST){
      return (
        <TableRightToUseLand
        />
      )
    }
  }

  // TODO: layout trạng thái tài sản
  const generateLayoutStatusCollateral = () => {
    if (collateralType.length === 0) {
      return;
    } else if (collateralType === ETypeCollateral.REST) {
      return (
        <Fragment>
          <TableCell>
            <SelectRealEstateStatus
              label="Trạng thái bất động sản"
              required
              className="flex-row items-center"
              sx={SxRealEstateStatus}
              onChange={(val) => { onHandleChangeKey(val, 'status') }}
            />
          </TableCell>
          <TableCell className="pl-4">
            <CollateralCheck
              label="Tài sản hợp khối"
              required
              sx={SxCollateralCheckTableFull}
              onChange={(val) => { onHandleChangeKey(val, 'is_compactness') }}
            />
          </TableCell>
        </Fragment>

      )
    } else {
      return (
        <TableCell>
          <CollateralCheck
            label="Báo cáo/Chứng thư thẩm định giá gồm nhiều tài sản"
            required
            sx={SxCollateralCheckTableFull}
            onChange={(val) => { onHandleChangeKey(val, 'valuation_id') }}
          />
        </TableCell>
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralData])
  return (
    <Fragment>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              rowSpan={2}
              align='center'
              width={'3%'}
              sx={{
                verticalAlign: 'top',
                fontSize: '16px',
                border: 'none',
                lineHeight: '2',
                paddingRight: '0 !important'
              }}
            >
              {intToRoman(index)}
            </TableCell>
            <TableCell width={'20%'}>
              <SelectCollateralType
                disabled={collateralType.length > 0 ? true : false}
                onChange={(value) => onChangeCollaretalType(value)}
                sx={SxCollateralType}
              />
            </TableCell>
            {
              generateLayoutStatusCollateral()
            }
            <TableCell
              className="text-right pr-0 py-2"
              width="140px"
              sx={{ '& svg': { color: 'var(--mscb-primary)' } }}
            >
              <Box>
                {/* <IconButton onClick={onAddSubItems}>
                  <GoDiffAdded style={{ fontSize: '1rem' }} />
                </IconButton> */}
                <IconButton onClick={onHandleDeleteConlateral}>
                  <IoTrashOutline style={{ fontSize: '1.5rem' }} />
                </IconButton>
                <IconButton onClick={toggleTable}>
                  <BiChevronDownCircle style={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="p-0" sx={{ border: 'none' }}>
              <Collapse in={CollapseType}>
                {generateLayout()}
              </Collapse>
            </TableCell>
          </TableRow>

          {/* Layout quyền sở hữu */}
          {
            <Fragment key={1}>
              {CollapseType ? generateLayoutOwnership(index + 1, collateralType) : null}
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