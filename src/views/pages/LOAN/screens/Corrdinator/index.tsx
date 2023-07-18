import {
  Box,
  Grid,
} from '@mui/material';
import {
  FunctionComponent,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'views/components/base/Select';
import Button from '@mui/material/Button';
import Input from 'views/components/base/Input';
import IconButton from '@mui/material/IconButton';
import { VscSearch } from 'react-icons/vsc';
import InputDate from 'views/components/base/InputDate';
import Pagination from 'views/components/layout/Pagination';
import Divider from '@mui/material/Divider';
import {
  SxInnputSearchDate,
  SxCorrdinatorTitle,
  SxCorrdinatorInputSearch,
  SxCorrdinatorBtn,
  SxSelectFilter
} from './style';
import TableProfile from './TableProfile';
import CardOutsideCustom from 'views/components/layout/CardOutsideCustom';
import { updateDocumentTitle } from 'utils';
import { useLocation, useNavigate } from 'react-router';
import querystring from 'querystring'
import { ECorrdinator, ESortFillter } from 'features/corrdinator/profile/case';
import lodash from 'lodash';
import { ICorrdinatorDocumentList } from 'types/models/corrdinator';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import {
  corrdinatorLOANLOSID,
  corrdinatorLOANFetched,
  corrdinatorLOANFetching,
  corrdinatorLOANLimit,
  corrdinatorLOANOrderBy,
  corrdinatorLOANPage,
  corrdinatorLOANTotalPage,
  getLOANCorrdinatorLOANList
} from 'features/loan/corrdinator/document/selector';
import {
  fetchCorrdinatorLOANList,
  updateCorrdinatorLOANListData,
  updateCorrdinatorLOANListLimit,
  updateCorrdinatorLOANListPage,
  updateFidleCorrdinatorLOANListData,
  postLOANGrandRole,
  refreshDataLOAN,
  updateCorrdinatorLOANSearchCustomerName
} from 'features/loan/corrdinator/document/action';
import ModalUserGrand from './ModalUserGrand';

const buildQueryCorrdinatorLOAN = (
  page: number, 
  size: number,
  documentType: string, 
  los_id?: string,
): string => {
  const url: string[] = [];
  url.push('document_type=' + documentType);
  page > 0 && url.push('page=' + page);
  size >= 10 && url.push('size=' + size);
  los_id && url.push('los_id=' + los_id)
  return url.join('&');
}

const CorrdinatorLOAN: FunctionComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useNotify();
  const { search } = useLocation();

  // Tam thời set cứng chưa rõ businees 
  const document_type: string = ECorrdinator.LOAN;

  const fetching = useSelector(corrdinatorLOANFetching);
  const fetched = useSelector(corrdinatorLOANFetched);
  const page = useSelector(corrdinatorLOANPage(document_type));
  const totalPage = useSelector(corrdinatorLOANTotalPage(document_type));
  const limit = useSelector(corrdinatorLOANLimit(document_type));
  const order_by = useSelector(corrdinatorLOANOrderBy(document_type));
  const los_id = useSelector(corrdinatorLOANLOSID(document_type));

  const CorrdinatorLOANList = useSelector(getLOANCorrdinatorLOANList(document_type));
  // const StoredCorrdinatorLOANUsers = useSelector(getStoredCorrdinatorLOANUsers);

  const [ openModalUser, setOpenModalUser ]= useState<string | null>(null);
  const [ documentChange, setDocumentChange ]= useState<string | null>(null);
  const [ fieldChange, setFieldChange ]= useState<keyof ICorrdinatorDocumentList | null>(null);
  const [ documentSort, setDocumentSort ] = useState<string>(ESortFillter.ASC);
  const [ productNameSort, setProductNameSort ] = useState<string>(ESortFillter.ASC);
  const [ loanAmountSort, setLoanAmountSort ] = useState<string>(ESortFillter.ASC);
  const [ CKS1Sort, setCKS1Sort ] = useState<string>(ESortFillter.ASC);
  const [ CKS2Sort, setCKS2Sort ] = useState<string>(ESortFillter.ASC);
  const [ CPDSort, setCPDSort ] = useState<string>(ESortFillter.ASC);
  const [ isModalCofirmRefreshData, setIsModalCofirmRefreshData ] = useState<boolean>(false);
  const [ keyCustomerNameSearch, setKeyCustomerNameSearch ] = useState<string>("");

  const isCheckDisiableBtnAllotment: boolean = CorrdinatorLOANList.filter(cl => cl.isEdit).length > 0 ? false : true;

  useEffect(() => {
    // dispatch(setTitlePage("DANH MỤC HỒ SƠ"));
    updateDocumentTitle("DANH MỤC HỒ SƠ");
  })

  // useEffect(() => {
  //   if(customer_name !== keyCustomerNameSearch){
  //     setKeyCustomerNameSearch(customer_name);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [customer_name])

  useEffect(() => {
    navigate('?' + buildQueryCorrdinatorLOAN(page ?? 1, limit ?? 10, document_type ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const searchUrl = querystring.parse(search.replace('?', ''));
    const searchPage = +searchUrl.page || 1;

    if (searchPage > 0 && searchPage !== page){
      dispatch(updateCorrdinatorLOANListPage(searchPage, { document_type }));
      return;
    }

    const searchLimit = +searchUrl.limit || 10;

    if (searchLimit > 0 && searchLimit !== limit){
      dispatch(updateCorrdinatorLOANListLimit(searchLimit, { document_type }));
      return;
    }

    if (!fetched && !fetching){
      dispatch(fetchCorrdinatorLOANList({ page, limit, document_type, order_by, size: limit, los_id }));
    }
  })

  const handleChangeLimit = (value: number) => {
    navigate('?' + buildQueryCorrdinatorLOAN(1, value, document_type, order_by));
  }

  const handleChangePage = (value: number) => {
    limit && navigate('?' + buildQueryCorrdinatorLOAN(value, limit, document_type, order_by));
  }

  const onHandleNavigate = (document_los_uuid: string) => {
    navigate(`/loan/normal/init/${ document_los_uuid }/product`);
  }

  const setStateSortType = (field: keyof ICorrdinatorDocumentList, sortType: string) => {
    switch (field) {
      case "document":
        setDocumentSort(sortType);
        break;
      case "product_name":
        setProductNameSort(sortType);
        break;
      case "loan_amount":
        setLoanAmountSort(sortType);
        break;
      case "controller_1":
        setCKS1Sort(sortType);
        break;
      case "controller_2":
        setCKS2Sort(sortType);
        break;
      case "approver":
        setCPDSort(sortType);
        break;
      default:
        break;
    }
  }
  
  const sortData = (stateTypeSort: string, field: keyof ICorrdinatorDocumentList) => {
    if(stateTypeSort === ESortFillter.ASC){
      const daaSortDESC = lodash.orderBy(CorrdinatorLOANList, [field], ['desc']);
      dispatch(updateCorrdinatorLOANListData(daaSortDESC, { document_type } ))
      setStateSortType(field, ESortFillter.DESC);
      return;
    }

    if(stateTypeSort === ESortFillter.DESC){
      const daaSortASC = lodash.orderBy(CorrdinatorLOANList, [field], ['asc']);
      dispatch(updateCorrdinatorLOANListData(daaSortASC, { document_type } ))
      setStateSortType(field, ESortFillter.ASC);
      return;
    }
  }

  const onHandleSortDocument = () => sortData(documentSort, "document");

  const onHandleSortProductName = () => sortData(productNameSort, "product_name");

  const onHandleSortLoanAmount = () => sortData(loanAmountSort, "loan_amount");

  const onHandleSortCKS1 = () => sortData(CKS1Sort, "controller_1");

  const onHandleSortCKS2 = () => sortData(CKS2Sort, "controller_2");

  const onHandleSortCPD = () => sortData(CPDSort, "approver");

  const onHandleChangeIsEdit = (val: number | string | null | undefined | boolean, field: keyof ICorrdinatorDocumentList, document: string) => {
    // dispatch(updateFidleCorrdinatorLOANListData(val, {key: field, document: document, document_type: document_type }))
  }

  const onHandleAllotment = () => {
    dispatch(postLOANGrandRole(document_type));
  }

  const onHandleRefreshData = () => setIsModalCofirmRefreshData(true);

  const handleCancelCofirmRefreshData = () => setIsModalCofirmRefreshData(false);

  const handleCofirmRefreshData = () => {
    dispatch(refreshDataLOAN(document_type));
    setIsModalCofirmRefreshData(false);
    notify("Hủy thành công", "success");
  }

  const onHandleChangeSearchKey = (val: string) => {
    setKeyCustomerNameSearch(val)
  }

  const handleSearchCustomerName = () => {
    dispatch(updateCorrdinatorLOANSearchCustomerName(keyCustomerNameSearch, {document_type: document_type}))
  }

  const onHandleKeyUpSearchInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.code === "Enter"){
      dispatch(updateCorrdinatorLOANSearchCustomerName(keyCustomerNameSearch, {document_type: document_type}))
    }
  }

  const onHandleCloseModalUser = () => {
    setOpenModalUser(null);
    setDocumentChange(null);
    setFieldChange(null);
  };

  // const onHandleSaveEmpl = (empl_code: string) => {
  //   if(documentChange !== null && fieldChange !== null){
  //     // const empl = StoredCorrdinatorLOANUsers?.find(e => e.employee_code === empl_code)?.username ?? "";

  //     dispatch(updateFidleCorrdinatorLOANListData(empl_code, {
  //       document: documentChange,
  //       document_type: document_type,
  //       key: fieldChange
  //     }))
  //   }
    
  //   onHandleCloseModalUser();
  // }

  const onHandleOpenModalUser = (val: string, document: string, field: keyof ICorrdinatorDocumentList) => {
    setOpenModalUser(val)
    document.length === 0 ? setDocumentChange(null) : setDocumentChange(document)
    field.length === 0 ? setFieldChange(null) : setFieldChange(field)
  };  

  // const onHandleClearData = (document: string, field: keyof ICorrdinatorDocumentList) => {
  //   dispatch(updateFidleCorrdinatorLOANListData("", {
  //     document: document,
  //     document_type: document_type,
  //     key: field
  //   }))
  // }

  return (
    <CardOutsideCustom 
      label="PHÂN CÔNG NHIỆM VỤ"
      labelClass='card-out-side-label'
      extraClass='w-full'
      extra= {
        <Box className="flex justify-between">
          <Box className="flex w-full">
            <Select options={[{label: "VÙNG", value: "v"}]} value="v" fullWidth={false} sx={SxSelectFilter}/>
            <Select options={[{label: "ĐƠN VỊ KINH DOANH", value: "v"}]} value="v" fullWidth={false} sx={SxSelectFilter} className="pl-1"/>
            <Select options={[{label: "TRẠNG THÁI HỒ SƠ", value: "v"}]} value="v" fullWidth={false} sx={SxSelectFilter} className="pl-1"/>
            <Box 
              className='flex ml-1' 
              sx={SxCorrdinatorInputSearch}
            >
              <Input className='corrdinator-input-search' placeholder='Mã hồ sơ / Tên / CMND' fullWidth onDebounce={onHandleChangeSearchKey} onKeyup={onHandleKeyUpSearchInput}/>
              <IconButton onClick={handleSearchCustomerName}>
                <VscSearch className='corrdinator-icon-search'/>
              </IconButton>
            </Box>
          </Box>

          <Box sx={SxCorrdinatorBtn}>
            <Button variant="contained" className='rounded-0'>Phân công</Button>
          </Box>
        </Box>
      }
    >
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <div className='flex justify-between'>
            <Box sx={SxCorrdinatorTitle} >
              <span className="text-20 text-secondary font-bold">I. DANH SÁCH HỒ SƠ : VÙNG 1 - SCB PHẠM NGỌC THẠCH</span>
              <span className='text-16 corrdinator-status'>
                Trạng thái: 
                <span className='text-14 corrdinator-status-chile pr-3'><span className='corrdinator-status-chile-success'></span>Hoàn thành</span> 
                <span className='text-14 corrdinator-status-chile corrdinator-status-chile-borber pr-3'><span className='corrdinator-status-chile-stop' />Dừng</span> 
                <span className='text-14 corrdinator-status-chile'><span className='corrdinator-status-chile-late' />Trễ</span>
              </span>
            </Box>
            <Box className="flex">
              <InputDate 
                label='Từ'
                sx={SxInnputSearchDate}
              />

              <InputDate 
                label='Đến'
                sx={SxInnputSearchDate}
              />
            </Box>
          </div>
          
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TableProfile
            data={CorrdinatorLOANList}
            isLoading={fetching}
            onNavigateUuid={onHandleNavigate}
            onSortDocument={onHandleSortDocument}
            onSortProductName={onHandleSortProductName}
            onSortLoanAmount={onHandleSortLoanAmount}
            onSortCKS1={onHandleSortCKS1}
            onSortCKS2={onHandleSortCKS2}
            onSortCPD={onHandleSortCPD}
            onChangeIsEdit={onHandleChangeIsEdit}
            onOpenModalUser={onHandleOpenModalUser}
            // onClearData={onHandleClearData}
          />

          <Pagination 
            totalPage={ totalPage ?? 0 } 
            currentPage={ page }
            limit={ limit }
            className="pt-10"
            onLimit={handleChangeLimit}
            onChange={handleChangePage}
            disabledPageSize={fetching}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Divider className="mt-5 mb-5" />
          <Box className="flex justify-end">
            <Button 
              variant="contained" 
              sx={{backgroundColor: "var(--mscb-danger)"}} 
              className='rounded-0' 
              disabled={isCheckDisiableBtnAllotment}
              onClick={onHandleRefreshData}
            >
              HỦY
            </Button>

            <Button 
              variant="contained" 
              className='rounded-0  ml-4' 
              onClick={onHandleAllotment} 
              disabled={isCheckDisiableBtnAllotment}
            >
              PHÂN BỔ
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ModalConfirm 
        open={ isModalCofirmRefreshData } 
        onClose={ handleCancelCofirmRefreshData } 
        onConfirm={ handleCofirmRefreshData }
      >
        <Box className="text-18 font-medium text-primary text-center whitespace-no-wrap">
          Bạn có chắc chắn hủy ?
        </Box>
      </ModalConfirm>
      <ModalUserGrand 
        open={openModalUser === null ? false : true} 
        onClose={onHandleCloseModalUser}
      />
    </CardOutsideCustom>
  )
}

export default CorrdinatorLOAN;