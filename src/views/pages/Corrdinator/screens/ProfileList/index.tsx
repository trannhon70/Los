import {
  Box,
  Grid,
} from '@mui/material';
import { FunctionComponent, useEffect, useState, KeyboardEvent, useRef } from 'react';
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
import {
  corrdinatorFetched,
  corrdinatorFetching,
  corrdinatorLimit,
  corrdinatorOrderBy,
  corrdinatorPage,
  corrdinatorTotalPage,
  getLOANCorrdinatorList,
  corrdinatorCustomerName
} from 'features/corrdinator/profile/selector';
import querystring from 'querystring'
import { ECorrdinator, ESortFillter } from 'features/corrdinator/profile/case';
import {
  fetchCorrdinatorList,
  updateCorrdinatorListData,
  updateCorrdinatorListLimit,
  updateCorrdinatorListPage,
  updateFidleCorrdinatorListData,
  postGrandRole,
  refreshData,
  updateCorrdinatorSearchCustomerName
} from 'features/corrdinator/profile/action';
import lodash from 'lodash';
import { ICorrdinatorDocumentList } from 'types/models/corrdinator';
import { fetchCorrdinatorUserList } from 'features/corrdinator/corrdinatorUser/action';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import ModalUserGrand, { IModalUserGrandRef } from 'views/pages/Corrdinator/screens/ProfileList/ModalUser';
import { useParams } from 'react-router-dom';
import { clearLOANNormalStorageLegal, clearLOANNormalStorageProduct, clearStorageApprovalFullData, clearStorageCollateral } from 'features/loan/normal';
import { clearNormalLOAN } from 'features/loan/normal/storage/loan/actions';
import { clearLOANNormalStorageCIC } from 'features/loan/normal/storage/cic/actions';
import { clearLOANNormalStorageIncome } from 'features/loan/normal/storage/income/action';
import { clearLOANNormalGuide } from 'features/loan/normal/storageGuide/action';
import { clearStorageApprovalICR } from 'features/loan/normal/storageApproval/icr/actions';
import { clearCustomerStoreData } from 'features/loan/normal/storage/customer/actions';
import { clearStorageApprovalCIC } from 'features/loan/normal/storageApproval/cic/actions';
import { clearStoredHistoryLogs } from 'features/loan/normal/storage/historyLogs/action';
import { ILOANURLParams } from 'types/models/loan';
import { clearNormalOtherStorage } from 'features/loan/normal/storage/other/action';
import { clearNormalICRStorage } from 'features/loan/normal/storage/icr/actions';
import { clearStoreDashboard } from 'features/dashboard/store/slice';
import { clearApprovalStorageLoan } from 'features/loan/normal/storageApproval/loan/action';

const buildQueryCorrdinatorProfileList = (
  page: number,
  size: number,
  documentType: string,
  los_id?: string,
  customer_name?: string,
  branch_code?: string
): string => {
  const url: string[] = [];
  url.push('document_type=' + documentType);
  page > 0 && url.push('page=' + page);
  size >= 50 && url.push('size=' + size);
  los_id && url.push('los_id=' + los_id)
  customer_name && url.push('customer_name=' + customer_name)
  branch_code && url.push('branch_code=' + branch_code)
  return url.join('&');
}

const ProfileList: FunctionComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useNotify();
  const { search } = useLocation();
  const params = useParams() as ILOANURLParams;
  
  // Tam thời set cứng chưa rõ businees 
  const document_type: string = ECorrdinator.LOAN;

  const fetching = useSelector(corrdinatorFetching);
  const fetched = useSelector(corrdinatorFetched);
  const page = useSelector(corrdinatorPage(document_type));
  const totalPage = useSelector(corrdinatorTotalPage(document_type));
  const limit = useSelector(corrdinatorLimit(document_type));
  const order_by = useSelector(corrdinatorOrderBy(document_type));
  const customer_name = useSelector(corrdinatorCustomerName(document_type));

  const CorrdinatorList = useSelector(getLOANCorrdinatorList(document_type));

  const [openModalUser, setOpenModalUser] = useState< null | ICorrdinatorDocumentList>(null);
  const [documentChange, setDocumentChange] = useState<string | null>(null);
  const [fieldChange, setFieldChange] = useState<keyof ICorrdinatorDocumentList | null>(null);
  const [documentSort, setDocumentSort] = useState<string>(ESortFillter.ASC);
  const [productNameSort, setProductNameSort] = useState<string>(ESortFillter.ASC);
  const [loanAmountSort, setLoanAmountSort] = useState<string>(ESortFillter.ASC);
  const [CKS1Sort, setCKS1Sort] = useState<string>(ESortFillter.ASC);
  const [CKS2Sort, setCKS2Sort] = useState<string>(ESortFillter.ASC);
  const [CPDSort, setCPDSort] = useState<string>(ESortFillter.ASC);
  const [isModalCofirmRefreshData, setIsModalCofirmRefreshData] = useState<boolean>(false);
  const [keyCustomerNameSearch, setKeyCustomerNameSearch] = useState<string>(customer_name);
  const refModalUserRef = useRef<IModalUserGrandRef>(null);


  useEffect(() => {
    // dispatch(setTitlePage("DANH MỤC HỒ SƠ"));
    updateDocumentTitle("DANH MỤC HỒ SƠ");
  })

  useEffect(()=>{
    if (!params['*']) {
      dispatch(clearStoreDashboard(""));
      dispatch(clearLOANNormalStorageProduct());
      dispatch(clearLOANNormalStorageLegal());
      dispatch(clearNormalLOAN());
      dispatch(clearLOANNormalStorageCIC());
      dispatch(clearStorageCollateral());
      dispatch(clearLOANNormalStorageIncome());
      dispatch(clearNormalOtherStorage())
      dispatch(clearNormalICRStorage())
      // dispatch(clearStateGuide());
  
      dispatch(clearStorageApprovalFullData())
      dispatch(clearLOANNormalGuide());
      dispatch(clearStorageApprovalICR());
      dispatch(clearCustomerStoreData());
      dispatch(clearStorageApprovalCIC());
      dispatch(clearStoredHistoryLogs());
      dispatch(clearApprovalStorageLoan())
    }
    // clear storage
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if (customer_name !== keyCustomerNameSearch) {
      setKeyCustomerNameSearch(customer_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer_name])

  useEffect(() => {
    navigate('?' + buildQueryCorrdinatorProfileList(page ?? 1, limit ?? 50, document_type, customer_name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const searchUrl = querystring.parse(search.replace('?', ''));
    const searchPage = +searchUrl.page || 1;

    if (searchPage > 0 && searchPage !== page) {
      dispatch(updateCorrdinatorListPage(searchPage, { document_type }));
      return;
    }

    const searchLimit = +searchUrl.size || 50;

    if (searchLimit > 0 && searchLimit !== limit) {
      dispatch(updateCorrdinatorListLimit(searchLimit, { document_type }));
      return;
    }

    if (!fetched && !fetching) {
      dispatch(fetchCorrdinatorList({ page, limit, document_type, order_by, customer_name, size: limit }));
    }
  })

  useEffect(() => {
    dispatch(fetchCorrdinatorUserList({ is_same_branch: false }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeLimit = (value: number) => {
    navigate('?' + buildQueryCorrdinatorProfileList(1, value, document_type, order_by));
  }

  const handleChangePage = (value: number) => {
    limit && navigate('?' + buildQueryCorrdinatorProfileList(value, limit, document_type, order_by));
  }

  const onHandleNavigate = (document_los_uuid: string) => {
    navigate(`/loan/normal/appraisal-approval/${document_los_uuid}/cic-app/main/borrower`);
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
    if (stateTypeSort === ESortFillter.ASC) {
      const daaSortDESC = lodash.orderBy(CorrdinatorList, [field], ['desc']);
      dispatch(updateCorrdinatorListData(daaSortDESC, { document_type }))
      setStateSortType(field, ESortFillter.DESC);
      return;
    }

    if (stateTypeSort === ESortFillter.DESC) {
      const daaSortASC = lodash.orderBy(CorrdinatorList, [field], ['asc']);
      dispatch(updateCorrdinatorListData(daaSortASC, { document_type }))
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

  const changeFieldData = (val: number | string | null | undefined | boolean, field: keyof ICorrdinatorDocumentList, document: string) => {
    setTimeout(() => {
      dispatch(updateFidleCorrdinatorListData(val, { key: field, document: document, document_type: document_type }))
    }, 0.01);
  }

  const onHandleChangeIsEdit = (val: number | string | null | undefined | boolean,
     document: string,
     data:ICorrdinatorDocumentList) => {
    setOpenModalUser(data)
    // dispatch(updateFidleCorrdinatorListData(val, { key: field, document: document, document_type: document_type }))
  }

  // const onHandleAllotment = () => {
  //   dispatch(postGrandRole(document_type));
  // }

  // const onHandleRefreshData = () => setIsModalCofirmRefreshData(true);

  const handleCancelCofirmRefreshData = () => setIsModalCofirmRefreshData(false);

  const handleCofirmRefreshData = () => {
    dispatch(refreshData(document_type));
    setIsModalCofirmRefreshData(false);
    notify("Hủy thành công", "success");
  }

  const onHandleChangeSearchKey = (val: string) => {
    setKeyCustomerNameSearch(val)
  }

  const handleSearchCustomerName = () => {
    dispatch(updateCorrdinatorSearchCustomerName(keyCustomerNameSearch, { document_type: document_type }))
  }

  const onHandleCloseModalUser = () => {
    setOpenModalUser(null);
    setDocumentChange(null);
    setFieldChange(null);
  };

  const onHandleClearData = (document: string, field: keyof ICorrdinatorDocumentList) => {
    dispatch(updateFidleCorrdinatorListData("", {
      document: document,
      document_type: document_type,
      key: field
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onHandleSaveEmpl = (empl_code: string) => {
    if (documentChange !== null && fieldChange !== null) {
      // const empl = StoredCorrdinatorLOANUsers?.find(e => e.employee_code === empl_code)?.username ?? "";

      dispatch(updateFidleCorrdinatorListData(empl_code, {
        document: documentChange,
        document_type: document_type,
        key: fieldChange
      }))
    }

    onHandleCloseModalUser();
  }

  const onHandleOpenModalUser = (val: string, document: string, field: keyof ICorrdinatorDocumentList) => {
    // setOpenModalUser(val)
    document.length === 0 ? setDocumentChange(null) : setDocumentChange(document)
    field.length === 0 ? setFieldChange(null) : setFieldChange(field)
  };

  const onHandleKeyUpSearchInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      dispatch(updateCorrdinatorSearchCustomerName(keyCustomerNameSearch, { document_type: document_type }))
    }
  }
  const onHandleSaveMOdalUser = () =>{
    const modalUserName =() => refModalUserRef.current?.getValue()
    if (!refModalUserRef.current?.validate()) {
      return;
    }
    const body = [
      {
        los_id: openModalUser?.document ?? "",
        customer_name: openModalUser?.customer_name ?? "",
        reappraise_headquarter: modalUserName()?.reappraise_headquarter ?? "",
        controller_1: openModalUser?.controller_1?.username ?? null,
        controller_2: openModalUser?.controller_2?.username ?? null,
        approver: openModalUser?.approver?.username ?? null,
        product: openModalUser?.product ?? "",
        loan_amount: openModalUser?.loan_amount ?? 0,
        note: modalUserName()?.note ?? ""
      }
    ] as unknown as ICorrdinatorDocumentList[]
    dispatch(postGrandRole(body));
    dispatch(fetchCorrdinatorList({ page, limit, document_type, order_by, customer_name, size: limit }));
    setOpenModalUser(null);
  }
  
  return (
    <CardOutsideCustom
      label="PHÂN CÔNG NHIỆM VỤ"
      labelClass='card-out-side-label'
      extraClass='w-full'
      extra={
        <Box className="flex justify-between">
          <Box className="flex w-full">
            <Select options={[{ label: "VÙNG", value: "v" }]} value="v" fullWidth={false} sx={SxSelectFilter} />
            <Select options={[{ label: "ĐƠN VỊ KINH DOANH", value: "v" }]} value="v" fullWidth={false} sx={SxSelectFilter} className="pl-1" />
            <Select options={[{ label: "TRẠNG THÁI HỒ SƠ", value: "v" }]} value="v" fullWidth={false} sx={SxSelectFilter} className="pl-1" />
            <Box
              className='flex ml-1'
              sx={SxCorrdinatorInputSearch}
            >
              <Input className='corrdinator-input-search' placeholder='Tên khách hàng' fullWidth onDebounce={onHandleChangeSearchKey} onKeyup={onHandleKeyUpSearchInput} />
              <IconButton onClick={handleSearchCustomerName}>
                <VscSearch className='corrdinator-icon-search' />
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
            data={CorrdinatorList}
            isLoading={fetching}
            onNavigateUuid={onHandleNavigate}
            onSortDocument={onHandleSortDocument}
            onSortProductName={onHandleSortProductName}
            onSortLoanAmount={onHandleSortLoanAmount}
            onSortCKS1={onHandleSortCKS1}
            onSortCKS2={onHandleSortCKS2}
            onSortCPD={onHandleSortCPD}
            onChangeUser={changeFieldData}
            onChangeIsEdit={onHandleChangeIsEdit}
            onOpenModalUser={onHandleOpenModalUser}
            onClearData={onHandleClearData}
          />
          <Pagination
            totalPage={totalPage ?? 0}
            currentPage={page}
            limit={limit}
            className="pt-10"
            onLimit={handleChangeLimit}
            onChange={handleChangePage}
            disabledPageSize={fetching}
            options={[
              { value: 50, label: '50' },
              { value: 100, label: '100' },
              { value: 150, label: '150' },
              { value: 200, label: '200' },
              { value: 250, label: '250' },
            ]}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Divider className="mt-5 mb-5" />
          <Box className="flex justify-end">
            <Button
              variant="contained"
              sx={{ backgroundColor: "var(--mscb-danger)" }}
              className='rounded-0'
            >
              HỦY
            </Button>

            <Button
              variant="contained"
              className='rounded-0  ml-4'
            >
              PHÂN BỔ
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ModalConfirm
        open={isModalCofirmRefreshData}
        onClose={handleCancelCofirmRefreshData}
        onConfirm={handleCofirmRefreshData}
      >
        <Box className="text-18 font-medium text-primary text-center whitespace-no-wrap">
          Bạn có chắc chắn hủy ?
        </Box>
      </ModalConfirm>
      <ModalUserGrand
        data={openModalUser as ICorrdinatorDocumentList }
        open={Boolean(openModalUser)}
        onClose={onHandleCloseModalUser}
        onSave={onHandleSaveMOdalUser}
        ref={refModalUserRef}
      />
    </CardOutsideCustom>
  )
}

export default ProfileList;