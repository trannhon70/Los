import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useNotify from 'app/hooks/useNotify';
import { showAppBackdrop } from 'features/app/store/slice';
import { addNewItemTypeCollatetal, postCollaterals, setTypeCollateral, updateCollaterals } from 'features/loan/normal/storage/collateralV2/actions';
import { ETypeCollateral } from 'features/loan/normal/storage/collateralV2/case';
import {
  getIsCollapseActive,
  getLOANNormalCarousel,
  getLOANNormalCollaretalType
} from 'features/loan/normal/storage/collateralV2/selector';
import { FC, useEffect, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { ImSigma } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import Empty from 'views/components/layout/Empty';
import TableSticky from 'views/components/layout/TableSticky';
import Carousel from 'views/pages/LOAN/widgets/Carousel';
import { CarouselOption } from 'views/pages/LOAN/widgets/Carousel/Item';
import ModalListCollateral from './ModalListCollateral';
import TableFull from './TableFull';

const Collateral: FC = () => {

  const dispatch = useDispatch();
  const notify = useNotify();

  const carouselTotal: CarouselOption[] = [
    {
      quantity: 0,
      type: 'ALL',
      name: 'Tổng số tài sản bảo đảm',
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />,
      className: "bd-danger",
      sx: { '& .MuiBox-root>.mscb-carousel-quantity': { color: 'var(--mscb-danger)' } }
    }
  ];

  const LOANNormalCarousel = useSelector(getLOANNormalCarousel);
  const getData = useSelector(getLOANNormalCollaretalType)

  // const getDataTypeActive = useSelector(getTypeActive)
  const isCollapsedItem = useSelector(getIsCollapseActive)
  const [carousels, setCarousels] = useState<CarouselOption[]>(LOANNormalCarousel.map(d => ({
    quantity: d.total,
    name: d.name,
    type: d.type,
    icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />,
  })
  ));

  const [collateralType, setCollateralType] = useState<string>("");
  const [openModalListCollateral, setOpenModalListCollateral] = useState<boolean>(false);

  useEffect(() => {
    let db = LOANNormalCarousel.map(ds => ({
      name: ds.name,
      quantity: ds.total,
      type: ds.type,
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />,
      className: "",
    }));

    // TODO: tổng số lượng tài sản
    let totalQuantity = LOANNormalCarousel.reduce((pre, nex) => { return pre + nex.total }, 0)

    // TODO: danh sách carousel default
    setCarousels([...carouselTotal, ...db].map(c => {
      if (c.type === ETypeCollateral.ALL) {
        c.quantity = totalQuantity
      }
      return { ...c }
    }))

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOANNormalCarousel])



  // TODO: Thêm mới tài sản, nếu đúng ở Tổng được thêm nhiều loại <=> chỉ thêm type đó
  const handleAddCollateral = () => {
    dispatch(addNewItemTypeCollatetal(''))
  }

  // const index0Type = useSelector(getTypeCollaterals)
  const onHandleSave = (next = false) => {
    if (isCollapsedItem) {
      showAppBackdrop(true);
      // truyen type vao post de check
      if (isCollapsedItem.isSaved) {
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
    dispatch(setTypeCollateral(type, { uuidData: uuidActive }));
  }

  const onHandleActveCarousel = (type: string) => {
    setCollateralType(type);
    setOpenModalListCollateral(true);
  }

  const onHandlecloseModalListCollateral = () => {
    setOpenModalListCollateral(false);
  }

  return <Box>
    <Box className="mt-6">
      <Carousel
        current={0}
        items={carousels}
        onActiveType={(type) => onHandleActveCarousel(type)}
      />
    </Box>
    <Box className="mt-6">
      <TableSticky sx={{ '& th, & td': { p: '12px' } }}>
        <TableHead>
          <TableRow>
            <TableCell width={'3%'}>STT</TableCell>
            <TableCell width={'20%'} align='left'>TÀI SẢN BẢO ĐẢM</TableCell>
            <TableCell
              width="140px"
              className="pr-0 text-right py-2"
              sx={{ '& svg': { color: 'var(--mscb-danger)', } }}
            >
              <Box className="flex items-center justify-end mscb-pointer text-14" >
                <Button className='btn-danger  rounded-0' onClick={handleAddCollateral}>Bảng tính LTV</Button>
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
                    <TableCell colSpan={4} className="p-0" sx={{ border: 'none' }}>
                      <Collapse in={true} sx={{ width: '100%' }}>
                        {getData.map((item, index) => {
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

    <ModalListCollateral
      type={collateralType}
      open={openModalListCollateral}
      onClose={onHandlecloseModalListCollateral}
    />
  </Box>
}

export default Collateral;