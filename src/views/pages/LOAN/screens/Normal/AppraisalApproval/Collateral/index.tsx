import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ETypeCollateral } from 'features/loan/normal/storage/collateralV2/case';
import { CarouselOption } from 'views/pages/LOAN/widgets/Carousel/Item';
import { FC, useEffect, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FaUser, FaWarehouse } from 'react-icons/fa';
import { ImSigma } from 'react-icons/im';
import { RiCarFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from 'utils';
import Empty from 'views/components/layout/Empty';
import TableSticky from 'views/components/layout/TableSticky';
import Carousel from 'views/pages/LOAN/widgets/Carousel';
import TableFullRowData from './TableFullRowData';
import useStorageCollateral from './useStorageCollateral';
import { ILOANURLParams } from 'types/models/loan';
import { useNavigate, useParams } from 'react-router';
import ModalListCollateral from './ModalListCollateral';
import { Button } from '@mui/material';
import ModalSpreadsheetLoan from './ModalSpreadsheetLoan';
import { postCollateralsApproval } from 'features/loan/normal/storageApproval/collateral/actions';
import { generaterNameCollateral } from 'views/pages/LOAN/utils';
import AttachmentLegal from './AttachmentLegal';
import { fetchDataGuideState } from 'features/loan/normal';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import useBackdrop from 'app/hooks/useBackdrop';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import AppraisalResult from './AppraisalResult';

const CollateralNew: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const { showBackdrop } = useBackdrop();
  const dispatch = useDispatch();
  const los_id = useSelector(getLOANNormalLOSId)

  const { getdataType, LOANNormalCarousel, LOANNormalToalCollateralValue, countCollateral } = useStorageCollateral("ALL");
  const [openModalListCollateral, setOpenModalListCollateral] = useState<boolean>(false);
  const [isModalSpreadsheet, setIsModalSpreadsheet] = useState<boolean>(false);
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
    name: generaterNameCollateral(d.type),
    type: d.type,
    icon: <ImSigma style={{ fontSize: '1.125rem', color: 'var(--mscb-danger)' }} />,
  })
  ));

  const onHandlecloseModalListCollateral = () => setOpenModalListCollateral(!openModalListCollateral)
  const onHandleSave = (next = false) => {
    dispatch(postCollateralsApproval(""))
  }

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
    let totalQuantity = LOANNormalCarousel.reduce((pre, nex) => { return pre + nex.total }, 0)
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


  useEffect(() => {
    params.stage === "appraisal-approval" && dispatch(fetchDataGuideState({ los_id, position: ETypeButtonBarRole.LOAN_S2_COLLATERAL }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])


  const onHandleActveCarousel = (type: string) => {
    setCollateralType(type);
    setOpenModalListCollateral(!openModalListCollateral);
  }

  const onContinue = () => {
    navigate(`/loan/normal/appraisal-approval/${params.id}/other/approval-exception`);
  }

  const onBack = () => {
    navigate(`/loan/normal/appraisal-approval/${params.id}/income/ability-repay`);
  }
  const onExit = () => {
    navigate("/");
  };

  const onHandleModalSpreadsheet = () => {
    setIsModalSpreadsheet(true)
  }

  const onCloseModalSpreadsheet = () => setIsModalSpreadsheet(false);

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.appraise: // phê duyệt
        onHandleSave();
        break;
      case ETypeButton.confirm:
        showBackdrop(true)
        dispatch(callControlComfirm({ position: ETypeButtonBarRole.LOAN_S2_COLLATERAL, title: "" }));
        break;
      case ETypeButton.approve:
        showBackdrop(true)
        dispatch(callApprovalApprove({ position: ETypeButtonBarRole.LOAN_S2_COLLATERAL, title: "" }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true)
        dispatch(callDisConfirm({ title: "", position: ETypeButtonBarRole.LOAN_S2_COLLATERAL }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true)
        dispatch(callDisApproved({ title: "", position: ETypeButtonBarRole.LOAN_S2_COLLATERAL }));
        break;
    }
  }


  return (
    <>
      {
        <>
          <Box className="mt-6">
            {/* <Box className="flex items-center" sx={{
              marginBottom: '24px',
              backgroundColor: 'rgba(24, 37, 170, 0.1)',
              borderRadius: '4px'
            }}>
              <FaInfoCircle className='ml-3 text-16 text-primary' />
              <span className="whitespace-no-wrap mr-2 ml-2 text-16 font-medium text-primary">
                Bỏ qua thông tin TSBĐ để đi luồng xử lý Nguyên tắc
              </span>
              <CollateralCheck disabled={true}/>
            </Box> */}
            <Carousel
              // current={0}
              items={carousels}
              onActiveType={(type) => onHandleActveCarousel(type)}
              totalMoney={formatNumber(LOANNormalToalCollateralValue.toString())}
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
                  <TableCell width='25%' align='left' className='pl-0'></TableCell>
                  <TableCell width='25%' align='left' className='pl-0'></TableCell>
                  <TableCell
                    width='17% '
                    className="pr-0 text-right py-2"
                    sx={{ '& svg': { color: 'var(--mscb-danger)', } }}
                  >
                    {
                      countCollateral > 0 && <Box className="flex items-center justify-end mscb-pointer text-14">
                        <Button variant="contained"
                          className="ml-4 rounded-0"
                          onClick={onHandleModalSpreadsheet}
                          sx={{
                            background: "#eb0029"
                          }}
                        >
                          Bảng tính LTV
                        </Button>
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
                              "& img": {
                                width: "23%"
                              },
                              fontSize: '20px',
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
                                  <>
                                    <TableFullRowData
                                      key={index}
                                      index={index + 1}
                                      collateralData={item}
                                    />
                                    <AppraisalResult uuidData={item?.uuidActiveData ?? ""}/>
                                  </>
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
      }
      <ModalListCollateral
        type={collateralType}
        open={openModalListCollateral}
        onClose={onHandlecloseModalListCollateral}
      />
      {/* <ButtonBar
        onSave={onHandleSave}
        onExit={onExit}
        onContinue={onContinue}
        onBack={onBack}
        className="my-6"
      /> */}
      <ButtonBarRole
        hideSave={false}
        hideContinue={false}
        isApply={true}
        hideDelete={false}
        onBtnMenu={(item) => onSaveMenu(item)}
        disableContinue={false} // check rule continue
        onExit={onExit}
        onContinue={onContinue}
        onBack={onBack}
        className="my-6"
        positionCode={ETypeButtonBarRole.LOAN_S2_COLLATERAL} />

      <ModalSpreadsheetLoan
        open={isModalSpreadsheet}
        onClose={onCloseModalSpreadsheet}
      />
      <AttachmentLegal />
    </>
  )
}
export default CollateralNew;

