import { Collapse } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useBackdrop from 'app/hooks/useBackdrop';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from 'app/hooks/useNotify';
import { showAppBackdrop } from 'features/app/store/slice';
import { deleteAllCollateral, onChangeCollaretalProperty, postCollaterals, setCollapseType, setTypeCollateral, updateCollaterals } from 'features/loan/normal/storage/collateralV2/actions';
import { getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
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
import { SxCollateralCheckTableFull, SxCollateralType, SxRealEstateStatus } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import Deposit from './Deposit/Deposit';
import Goods from './Goods/Goods';
import Machine from './Machine/Machine';
import Other from './Other/Other';
import Propertytype from './PropertyType/Propertytype';
import RealEstate from './RealEState';
import Stock from './Stock/Stock';
import Transport from './Transport/Transport';
import useStorageCollateral from './useStorageCollateral';

export interface TableFullRowDataProps {
  index: number;
  collateralData?: ILOANNormalCollateralData;
}

const TableFullRowData: FC<TableFullRowDataProps> = (props) => {

  const { collateralData, index } = props;
  const dispatch = useDispatch();
  const notify = useNotify();
  const { showBackdrop } = useBackdrop();
  const uuidActiveData = collateralData?.uuidActiveData ?? "";

  const { CollapseType, LoanNormalSubType, SubTypeItems } = useStorageCollateral("ALL", uuidActiveData, collateralData?.uuidActiveSubtype)
  const [isCollapseType, setIsCollapseType] = useState<boolean>(CollapseType ?? false);
  const [isType, setIsType] = useState<boolean>(false);
  const [collateralType, setCollateralType] = useState<string>(collateralData?.type ?? "");
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);

  const getMessage = useNormalCollateralMessage();
  const ruleDisabled = useSelector(getRuleDisbled)
  const isCollapsedItem = useSelector(getIsCollapseActive);

  const onChangeCollaretalType = (value: string) => {
    dispatch(setTypeCollateral(value, { uuidData: uuidActiveData }))
  }
  useEffect(() => {
    if (isCollapseType !== CollapseType && CollapseType) {
      setIsCollapseType(CollapseType);
    }
    return () => {
      setIsCollapseType(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CollapseType])

  useEffect(() => {
    if (collateralData) {
      setCollateralType(collateralData?.type);
      collateralData?.type?.length > 0 && setIsType(true);
    }

    return () => {
      //clean up 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralData])


  const onHandleConfirm = () => {
    collateralData && dispatch(deleteAllCollateral({
      cert_uuid: collateralData.price_cert_uuid,
      uuid: collateralData.uuidActiveData
    },{key:""})) && collateralData.price_cert_uuid && dispatch(showAppBackdrop())

    setIsModalConfirm(!isModalConfirm);

    // dispatch(setCollapseType(dataCollateral.data[0]?.uuidActiveData ?? ''))

  }
  const onHandleDeleteConlateral = () => {
    setIsModalConfirm(!isModalConfirm);
  }
  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  }

  const onHandleChangeKey = (value: string | number | null, key: keyof ILOANNormalCollateralData) => {
    // if(SubTypeItems.length > 1){
    //   notify('Vui lòng chọn loại tài sản', 'warning');
    //   return;
    // }
    // else {
      collateralData && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateralData.uuidActiveData }));
    // }
  }
  const toggleTable = () => {
    // console.log({CollapseType});
    // console.log({index});
    if (!isType) {
      notify('Vui lòng chọn loại tài sản', 'warning');
      return;
    }
    else {
      if (isCollapsedItem && !ruleDisabled) {
        showBackdrop(true);
        if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
          dispatch(updateCollaterals({type: isCollapsedItem.type, collapseIndex: index - 1}))
        }
        else {
          dispatch(postCollaterals({type:isCollapsedItem.type, collapseIndex: index - 1}))
        }
      }
      else {
        dispatch(setCollapseType(index - 1))
      }
    }
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
      default :
        return null
    }
  }
  return (
    <Fragment>
      <Table>
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
                disabled={collateralType.length > 0 ? true : false}
                onChange={(value) => onChangeCollaretalType(value)}
                sx={SxCollateralType}
                value={collateralData?.type ?? ""}
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
                    disabled={ruleDisabled}
                    onChange={(val) => { onHandleChangeKey(val, 'status') }}
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
                    disabled={ruleDisabled || SubTypeItems.length > 1}
                    onChange={(val) => { onHandleChangeKey(val, 'is_compactness') }}
                    value={collateralData?.is_compactness}
                    className="colla-check"
                  />
                </TableCell> </> : collateralData?.type === "" ? <TableCell></TableCell> :
                <TableCell width='60%' sx={{ paddingLeft: '0px !important' }}>
                  <CollateralCheck
                    label="Báo cáo/Chứng thư thẩm định giá gồm nhiều tài sản"
                    required
                    disabled={ruleDisabled || SubTypeItems.length > 1}
                    sx={SxCollateralCheckTableFull}
                    onChange={(val) => { onHandleChangeKey(val, 'is_compactness') }}
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
                {
                  !ruleDisabled ? <IconButton onClick={onHandleDeleteConlateral} >
                    <IoTrashOutline style={{fontSize: '1.5rem'}}/>
                  </IconButton> : null
                }
                {<IconButton onClick={toggleTable} sx={{
                  '& svg': {
                    transition: 'all ease-in-out 0.3s',
                    ...(CollapseType ? {} : { transform: 'rotate(-90deg)' })
                  }
                }}>
                  <BiChevronDownCircle style={{ fontSize: '1.5rem' }} size="24px" />
                </IconButton>}
              </Box>
            </TableCell>
          </TableRow>
          {
            LoanNormalSubType?.map((loan, index) => {
              return generateType(collateralData?.type ?? "", loan, index)
            })
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

export default TableFullRowData;
