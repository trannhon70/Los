import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImSigma } from 'react-icons/im';
import { AiOutlineLineChart } from 'react-icons/ai';
import { RiCarFill } from 'react-icons/ri';
import { FaWarehouse, FaUser } from 'react-icons/fa';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Carousel from 'views/pages/LOAN/widgets/Carousel';
import TableSticky from 'views/components/layout/TableSticky';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import ButtonBar from 'views/components/layout/ButtonBar';
import Collapse from '@mui/material/Collapse';
import {
  getIsCollapseActive,
  getLOANNormalCarousel,
  getLOANNormalCollaretalType,
  getToalCollateralValue,
  ValidateCollateralStorage
} from 'features/loan/normal/storage/collateralV2/selector';
import TableFull from './TableFull';
import Empty from 'views/components/layout/Empty';
import { CarouselOption } from 'views/pages/LOAN/widgets/Carousel/Item';
import { ETypeCollateral } from 'features/loan/normal/storage/collateralV2/case';
import useNotify from 'app/hooks/useNotify';
import ModalListCollateral from './ModalListCollateral';
import {
  addNewItemTypeCollatetal,
  postCollaterals,
  setTypeCollateral,
  updateCollaterals,
} from 'features/loan/normal/storage/collateralV2/actions';
import { formatNumber } from 'utils';
import useBackdrop from 'app/hooks/useBackdrop';
import { useNavigate, useParams } from 'react-router';
import { getLOANNormalLegalBorrowerUuid } from 'features/loan/normal/storage/income/selector';
import { ILOANURLParams } from 'types/models/loan';

const Collateral: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotify();
  const {showBackdrop} = useBackdrop()


  const carouselTotal: CarouselOption[] = [
    {
      quantity: 0,
      type: 'ALL',
      name: 'Tổng số TSBD',
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />,
      className: "bd-danger",
      sx: { '& .MuiBox-root>.mscb-carousel-quantity': { color: 'var(--mscb-danger)' } }
    }
  ];

  const LOANNormalToalCollateralValue = useSelector(getToalCollateralValue);

  const brwUuid = useSelector(getLOANNormalLegalBorrowerUuid);

  const LOANNormalCarousel = useSelector(getLOANNormalCarousel);
  const getData = useSelector(getLOANNormalCollaretalType)
  const [collateralType, setCollateralType] = useState<string>("");
  const [openModalListCollateral, setOpenModalListCollateral] = useState<boolean>(false);
  const isCollapsedItem = useSelector(getIsCollapseActive)
  const [carousels, setCarousels] = useState<CarouselOption[]>(LOANNormalCarousel.map(d => ({
      quantity: d.total,
      name: d.name,
      type: d.type,
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />,
    })
  ));
    
  // console.log("LOANNormalCarouselLOANNormalCarousel", LOANNormalCarousel);

  const validate = useSelector(ValidateCollateralStorage)
  useEffect(() => {
    let db = LOANNormalCarousel.map(ds => ({
      name: ds.name,
      quantity: ds.total,
      type: ds.type,
      icon: generaIconCarousel(ds.type),
      className: "",
    })).filter(
      f => f.quantity > 0
    );

    // TODO: tổng số lượng tài sản
    let totalQuantity = LOANNormalCarousel.reduce((pre, nex) => { return pre + nex.total }, 0)

    // TODO: danh sách carousel default
    setCarousels([...carouselTotal, ...db].map(c => {
      if (c.type === ETypeCollateral.ALL) {
        c.quantity = totalQuantity
      }
      return { ...c }
    }))
    return ()=>{
      //clean up 
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOANNormalCarousel])

  const generaIconCarousel = (type: string) => {
    switch (type) {
      case ETypeCollateral.ALL:
        return <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />;
      case ETypeCollateral.REST:
        return <FaWarehouse style={{ fontSize: '1.625rem', color: 'var(--mscb-primary)' }} />;
      case ETypeCollateral.RPRO:
        return <FaUser style={{ fontSize: '1.625rem', color: 'var(--mscb-primary)' }} />;
      case ETypeCollateral.STOC:
        return <AiOutlineLineChart style={{ fontSize: '1.625rem', color: 'var(--mscb-primary)' }} />;
      case ETypeCollateral.MEST:
        return <RiCarFill style={{ fontSize: '1.625rem', color: 'var(--mscb-primary)' }} />;
      default:
        return <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-primary)' }} />
    }
  }

  // TODO: Thêm mới tài sản, nếu đúng ở Tổng được thêm nhiều loại <=> chỉ thêm type đó
  const handleAddCollateral = () => {
    dispatch(addNewItemTypeCollatetal(''))
  }

  // const index0Type = useSelector(getTypeCollaterals)
  const onHandleSave = (next = false) => {
    if (isCollapsedItem) {
      if(!validate) return
      showBackdrop(true);
      // truyen type vao post de check
      if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
        dispatch(updateCollaterals({type: isCollapsedItem.type}))
      }
      else {
        dispatch(postCollaterals({type:isCollapsedItem.type}))
      }
    }
    else {
      return notify('Vui lòng chọn loại tài sản cần lưu', 'warning');
    }
  }

  // TODO: set type active item
  const onHandleChangeCollateralItemType = (type: string, uuidActive: string) => {
    setTimeout(() => {
      dispatch(setTypeCollateral(type, { uuidData: uuidActive }));
    }, 0.3)
  }

  const onHandleActveCarousel = (type: string) => {
    
    setCollateralType(type);
    setOpenModalListCollateral(!openModalListCollateral);
  }

  const onHandlecloseModalListCollateral = () => {
    setOpenModalListCollateral(!openModalListCollateral);
  }

  const handleBack = () =>{

    navigate(`/loan/normal/init/${params.id||'-'}/income/borrower/${brwUuid||'-'}/salary`);
  }

  return <Box>
    <Box className="mt-6">
      {/* <Box className="flex items-center" sx={SxCollateralCheck}>
        <FaInfoCircle className='ml-3 text-16 text-primary' />
        <span className="whitespace-no-wrap mr-2 ml-2 text-16 font-medium text-primary">
          Bỏ qua thông tin TSBĐ để đi luồng xử lý Nguyên tắc
        </span>
        <CollateralCheck />
      </Box> */}
      <Carousel
        current={0}
        items={carousels}
        onActiveType={(type) => onHandleActveCarousel(type)}
        totalMoney={formatNumber(LOANNormalToalCollateralValue.toString())}
      />
    </Box>
    <Box className="mt-6" sx={{
      "& .MuiTableContainer-root": {
        overflowX: 'hidden'
      }
    }}>
      <TableSticky sx={{ '& th, & td': { p: '12px' } }}>
        <TableHead>
          <TableRow>
            <TableCell width='3%'  align="center">STT</TableCell>
            <TableCell width='25%' align='left' className='pl-0'>TÀI SẢN BẢO ĐẢM</TableCell>
            <TableCell width='25%' align='left' className='pl-0'></TableCell>
            <TableCell width='35%' align='left' className='pl-0'></TableCell>

            <TableCell
              width='7% '
              className="pr-0 text-right py-2"
              sx={{ '& svg': { color: 'var(--mscb-danger)', } }}
            >
              <Box className="flex items-center justify-end mscb-pointer text-14" onClick={handleAddCollateral}>
                <AiOutlinePlusSquare style={{ fontSize: '1.5rem' }} className='text-primary' />
                <span className="text-14 whitespace-no-wrap ml-1 text-decor" style={{ color: "#747792" }}>
                  Thêm loại tài sản
                </span>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        {
          (() => {
            if (getData?.length === 0) {
              return (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Empty sx={{ minHeight: '400px' }}>
                        Không có dữ liệu hiển thị
                      </Empty>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )
            } else {
              return (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="p-0" sx={{ 
                      border: 'none',
                      
                   }}>
                      <Collapse in={true} unmountOnExit>
                        {
                          getData.map((item, index) => {
                            return (
                              <TableFull
                                key={index}
                                index={index + 1}
                                collateralData={item}
                                onChangeType={
                                  (value) => onHandleChangeCollateralItemType(value, item.uuidActiveData)
                                }
                              />
                            )
                          })}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )
            }
          })()
        }
      </TableSticky>
    </Box>

    <ButtonBar
      className="my-6"
      onSave={onHandleSave}
      onBack={handleBack}
      // onContinue={()=>{dispatch(autoFillRESTDepartment(''))}}
      // onDelete={()=>{dispatch(autoFillRESTMarket(''))}}
    />

    <ModalListCollateral
      type={collateralType}
      open={openModalListCollateral}
      onClose={onHandlecloseModalListCollateral}
    />

  </Box>
}

export default Collateral;

