import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import { setScrollToBottom } from 'features/app/store/slice';
import { fetchDataGuideState } from 'features/loan/normal';
import {
  addNewItemTypeCollatetal, postCollaterals, postCollateralsIgnore, updateCollaterals
} from 'features/loan/normal/storage/collateralV2/actions';
import { ETypeCollateral } from 'features/loan/normal/storage/collateralV2/case';
import { getCountCollateralData, getIsCollapseActive, getIsCollateralStoreFull, getToalCollateralValue, ValidateCollateralStorage } from 'features/loan/normal/storage/collateralV2/selector';
import { checkHasCollateralProduct } from 'features/loan/normal/storage/product/selectors';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import { generateTypeParams } from 'features/loan/normal/storageGuide/generateTypeStateGuide';
import { checkRoleButtonBar, getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FaInfoCircle, FaUser, FaWarehouse } from 'react-icons/fa';
import { ImSigma } from 'react-icons/im';
import { RiCarFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { formatNumber } from 'utils';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import Empty from 'views/components/layout/Empty';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TableSticky from 'views/components/layout/TableSticky';
import CollateralCheck, { CollateralCheckRef } from 'views/components/widgets/CollateralCheck';
import { generaterNameCollateral } from 'views/pages/LOAN/utils';
import Carousel from 'views/pages/LOAN/widgets/Carousel';
import { CarouselOption } from 'views/pages/LOAN/widgets/Carousel/Item';
import ModalListCollateral from '../CollateralNew/ModalListCollateral';
import TableFullRowData from './TableFullRowData';
import useStorageCollateral from './useStorageCollateral';


const CollateralNew: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showBackdrop } = useBackdrop();
  const notify = useNotify();
  const { getdataType, LOANNormalCarousel, dataIgnore } = useStorageCollateral("ALL");
  const isCollateral = useSelector(getIsCollateralStoreFull)
  const isCollapsedItem = useSelector(getIsCollapseActive);
  const LOANNormalToalCollateralValue1 = useSelector(getToalCollateralValue);
  const checkHasCollProduct = useSelector(checkHasCollateralProduct)
  const validate = useSelector(ValidateCollateralStorage)
  const collateralCount = useSelector(getCountCollateralData)
  const los_id = useSelector(getLOANNormalLOSId)
  const [dataIgnoreLocal, setDataIgnoreLocal] = useState<string | null>(null)
  const [openModalListCollateral, setOpenModalListCollateral] = useState<boolean>(false);
  const collateralCheckRef = useRef<CollateralCheckRef>(null)
  const carouselTotal: CarouselOption[] = [
    {
      quantity: 0,
      type: 'ALL',
      name: 'Tổng số TSBD',
      icon: <ImSigma style={{ fontSize: '1.125rem', color: 'var(--mscb-danger)' }} />,
      className: "bd-danger",
      sx: { '& .MuiBox-root>.mscb-carousel-quantity': { color: 'var(--mscb-danger)' } }
    }
  ];
  const [collateralType, setCollateralType] = useState<string>("");
  const [carousels, setCarousels] = useState<CarouselOption[]>(LOANNormalCarousel.map(d => ({
    quantity: d.total,
    name: d.name,
    type: d.type,
    icon: <ImSigma style={{ fontSize: '1.125rem', color: 'var(--mscb-danger)' }} />,
  })
  ));

  const handleAddCollateral = () => {
    if(collateralCount === 0 || !isCollapsedItem) {
      dispatch(addNewItemTypeCollatetal(''))
      dispatch(setScrollToBottom(true))
      notify("Thêm tài sản thành công", "success")
    }
    else {
      if (isCollapsedItem) {
        showBackdrop(true);
        if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
          dispatch(updateCollaterals({type: isCollapsedItem.type, addCollateral: true}))
        }
        else {
          dispatch(postCollaterals({type:isCollapsedItem.type, addCollateral: true}))
        }
      }
    }
  }

  const onHandlecloseModalListCollateral = () => setOpenModalListCollateral(!openModalListCollateral)
  
  const onHandleSave = (next = false) => {
    if (!ruleDisabled && dataIgnore === "Y") {
      if (isCollapsedItem) {
        if (!validate) return
        showBackdrop(true);
        setTimeout(() => {
          if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
            dispatch(updateCollaterals({type: isCollapsedItem.type}))
          }
          else {
            dispatch(postCollaterals({type:isCollapsedItem.type})) 
          }
        }, 500)
      }
      else if(collateralCount === 0){
        return notify('Vui lòng thêm ít nhất 1 TSBĐ', 'warning');
      }
    }
    else if(!ruleDisabled && dataIgnore === "N"){
      dispatch(postCollateralsIgnore(dataIgnore))
    }
    
  }

  const dataPosition = generateTypeParams(params['*']) ?? ""

  useEffect(() => {
    params.stage === "init" && dispatch(fetchDataGuideState({ los_id, position: dataPosition }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  const generaIconCarousel = (type: string) => {
    switch (type) {
      case ETypeCollateral.ALL:
        return <ImSigma style={{ fontSize: '1.125rem', color: 'var(--mscb-danger)' }} />;
      case ETypeCollateral.REST:
        return <FaWarehouse style={{ fontSize: '1.125rem', color: 'var(--mscb-primary)' }} />;
      case ETypeCollateral.RPRO:
        return <FaUser style={{ fontSize: '1.125rem', color: 'var(--mscb-primary)' }} />;
      case ETypeCollateral.STOC:
        return <AiOutlineLineChart style={{ fontSize: '1.125rem', color: 'var(--mscb-primary)' }} />;
      case ETypeCollateral.MEST:
        return <RiCarFill style={{ fontSize: '1.125rem', color: 'var(--mscb-primary)' }} />;
      default:
        return <ImSigma style={{ fontSize: '1.125rem', color: 'var(--mscb-primary)' }} />
    }
  }

  const onChangeIgnore = (value: string) => {
    if(value === "N" && !!isCollateral){
      setDataIgnoreLocal(value)
    }
    else if(value === "Y" && !isCollateral){
      dispatch(postCollateralsIgnore(value))
    }
  }
  const handleCancelChangeIgnore = () => {
    if(collateralCheckRef.current){
      collateralCheckRef.current.setValue("Y")
    }
    setDataIgnoreLocal(null)
  }

  const onConfirmChangeIgnore = () => {
    if(dataIgnoreLocal) {
      dispatch(postCollateralsIgnore(dataIgnoreLocal))
      setDataIgnoreLocal(null)
    }
  }

  useEffect(() => {
    let db = LOANNormalCarousel.map(ds => ({
      name: generaterNameCollateral(ds.type),
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
    return () => {
      //clean up 
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOANNormalCarousel])

  const onHandleActveCarousel = (type: string) => {
    setCollateralType(type);
    setOpenModalListCollateral(!openModalListCollateral);
  }

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ title: "", position: ETypeButtonBarRole.COLLATERAL }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ title: "", position: ETypeButtonBarRole.COLLATERAL }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position: ETypeButtonBarRole.COLLATERAL }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: "", position: ETypeButtonBarRole.COLLATERAL }));
        break;
      case ETypeButton.save:
        onHandleSave()
        break;
    }
  };

  const currentStateGuide = useSelector(checkRoleButtonBar)?.current_state_id === undefined

  const ruleDisabled = useSelector(getRuleDisbled)
  const onContinue = () => {
    if (!ruleDisabled && dataIgnore === "Y") {
      if (isCollapsedItem) {
        if (!validate) return
        showBackdrop(true);
        if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
          dispatch(updateCollaterals({type: isCollapsedItem.type, onContinue: true}))
        }
        else {
          dispatch(postCollaterals({type:isCollapsedItem.type, onContinue: true})) 
        }
      }
      else if(collateralCount === 0){
        return notify('Vui lòng thêm ít nhất 1 TSBĐ', 'warning');
      }
      else {
        navigate(`/loan/normal/init/${params.id}/other/exception`);
      }
    }
    else {
      navigate(`/loan/normal/init/${params.id}/other/exception`);
    }
  }

  const onBack = () => {
    navigate(`/loan/normal/init/${params.id}/income/ability-repay`);
  }
  const onExit = () => {
    navigate("/");
  };


  return (
    <>
      {
        checkHasCollProduct ?
          <>
            <Box className="mt-6">
              <Box className="flex items-center" sx={{
                marginBottom: '24px',
                backgroundColor: 'rgba(24, 37, 170, 0.1)',
                borderRadius: '4px'
              }}>
                <FaInfoCircle className='ml-3 text-16 text-primary' />
                <span className="whitespace-no-wrap mr-2 ml-2 text-16 font-medium text-primary">
                Có thông tin báo cáo/chứng thư thẩm định giá:
                </span>
                <CollateralCheck
                  onChange={onChangeIgnore}
                  value={dataIgnore}
                  // disabled={getdataType[0]?.price_cert_uuid !== undefined}
                  disabled={ruleDisabled}
                  ref={collateralCheckRef}
                />
                <span className="whitespace-no-wrap mr-2 ml-2 text-16 font-medium text-error">
                  {
                    dataIgnore === "Y" ? "Luồng chính thức" : "Luồng nguyên tắc"
                  }
                </span>
              </Box>
              <Carousel
                // current={0}
                items={carousels}
                onActiveType={(type) => onHandleActveCarousel(type)}
                totalMoney={formatNumber(LOANNormalToalCollateralValue1.toString())}
              />
            </Box>
            <Box
              className="mt-6"
              sx={{
                "& .MuiTableContainer-root": {
                  overflowX: 'hidden'
                }
              }}
            >
              <TableSticky sx={{ '& th, & td': { p: '12px' } }}>
                <TableHead>
                  <TableRow>
                    <TableCell width='3%' align="center" sx={{ fontSize: '18px', color: '#353535', fontWeight: 500 }}>STT</TableCell>
                    <TableCell width='25%' align='left' className='pl-0' sx={{ fontSize: '18px', color: '#353535', fontWeight: 500 }}>TÀI SẢN BẢO ĐẢM</TableCell>
                    <TableCell width='25%' align='left' className='pl-0'/>
                    <TableCell width='25%' align='left' className='pl-0'/>
                    <TableCell
                      width='17% '
                      className="pr-0 text-right py-2"
                      sx={{ '& svg': { color: 'var(--mscb-danger)', } }}
                    >
                      {
                        ruleDisabled || dataIgnore === "N" ? null : <Box className="flex items-center justify-end mscb-pointer text-14" onClick={handleAddCollateral}>
                          <AddBoxOutlinedIcon style={{ fontSize: '24px' }} className='text-primary' />
                          <span className="text-14 whitespace-no-wrap ml-1 text-decor" style={{ color: "#747792" }}>
                            Thêm loại tài sản
                          </span>
                        </Box>
                      }

                    </TableCell>
                  </TableRow>
                </TableHead>
                {
                  (() => {
                    if (getdataType?.length === 0) {
                      return (
                        <TableBody>
                          <TableRow className="w-full">
                            <TableCell colSpan={12} className="w-full">
                              <Empty sx={{
                                minHeight: '400px',
                                "& img": {
                                  width: "15%"
                                },
                                fontSize: '24px',
                                fontWeight: 300,
                                // fontStyle: 'italic',
                              }}>
                                Chưa có dữ liệu
                              </Empty>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )
                    } else {
                      return (
                        <TableBody>
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="p-0"
                              sx={{ border: 'none' }}
                            >
                              {
                                getdataType.map((item, index) => {
                                  return (
                                    <TableFullRowData
                                      key={index}
                                      index={index + 1}
                                      collateralData={item}
                                    />
                                  )
                                })
                              }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )
                    }
                  })()
                }
              </TableSticky>
            </Box>
          </>
           : <Empty sx={{height:"500px"}}>Hồ sơ không cần thông tin TSBĐ</Empty>
      }
      <ModalListCollateral
        type={collateralType}
        open={openModalListCollateral}
        onClose={onHandlecloseModalListCollateral}
      />
      <ModalConfirm
        open={dataIgnoreLocal !== null}
        onClose={handleCancelChangeIgnore}
        onConfirm={onConfirmChangeIgnore}
      >
        <Box className="text-18 font-medium text-primary text-center">
          {`Bạn có chắc thay đổi thông tin này ?`}
        </Box>
        <Box className="text-center">
          {`Các thông tin TSBĐ hiện tại sẽ mất hoàn toàn!`}
        </Box>
      </ModalConfirm>
      <ButtonBarRole
      className="my-6"
      onSave={onHandleSave}
      onBack={onBack}
      onContinue={onContinue}
      onExit={onExit}
      hideContinue={false}
      isApply={true}
      hideDelete={!ruleDisabled}
      hideSave={false || currentStateGuide}
      positionCode={ETypeButtonBarRole.COLLATERAL}
      onBtnMenu={(val) => onSaveMenu(val)}
    />
    </>
  )
}

export default CollateralNew;

