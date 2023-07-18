import InfoIcon from '@mui/icons-material/Info';
import { Box, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import useNormalData from "app/hooks/useNormalData";
import useNotify from "app/hooks/useNotify";
import DevToolLOANNormalInitPanel from "dev_tool/modules/loan/normal/init/PannelFill";
import { clearStoreDashboard } from 'features/dashboard/store/slice';
import {
  clearLOANNormalStorageLegal,
  clearLOANNormalStorageProduct, clearStorageApprovalFullData,
  clearStorageCollateral
} from "features/loan/normal";
import { fetchLOANNormalConfigProductCategory } from "features/loan/normal/configs/actions";
import {
  fetchedLOANNormalConfigProductCategory,
  fetchingLOANNormalConfigProductCategory
} from "features/loan/normal/configs/product/category/selectors";
import { clearLOANNormalStorageCIC } from "features/loan/normal/storage/cic/actions";
import { setCollateralValidate } from 'features/loan/normal/storage/collateralV2/actions';
import { checkCollateralContinueRule, getAllDataCollateral, getAllDataCollateralFull, getAllDataCollateralIgnore, getLOANNormalCollapse } from "features/loan/normal/storage/collateralV2/selector";
import { clearCustomerStoreData } from 'features/loan/normal/storage/customer/actions';
import { clearStoredHistoryLogs } from 'features/loan/normal/storage/historyLogs/action';
import { clearNormalICRStorage } from 'features/loan/normal/storage/icr/actions';
import { clearLOANNormalStorageIncome } from 'features/loan/normal/storage/income/action';
import { getLOANNormalLegalBorrowerUuid } from "features/loan/normal/storage/income/selector";
import { isCheckCreateLegalBorrower, isCheckExistLoanData, isCheckExistLoanDataProduct } from "features/loan/normal/storage/legal/selectors";
import { clearNormalLOAN } from "features/loan/normal/storage/loan/actions";
import { clearNormalOtherStorage } from 'features/loan/normal/storage/other/action';
import { isCheckCreateProduct } from "features/loan/normal/storage/product/selectors";
import { existLOANNormalData, fetchingLOANNormalData } from "features/loan/normal/storage/selectors";
import { clearStorageApprovalCIC } from 'features/loan/normal/storageApproval/cic/actions';
import { clearStorageApprovalICR } from "features/loan/normal/storageApproval/icr/actions";
import { clearApprovalStorageLoan } from 'features/loan/normal/storageApproval/loan/action';
import { clearLOANNormalGuide } from "features/loan/normal/storageGuide/action";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Loading from "views/components/base/Loading";
import Empty from "views/components/layout/Empty";
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TabPanel from "views/components/layout/TabPanel";
import Tabs from "views/components/layout/Tabs";
import { mappingToCheckChangedJSON, stageName, tabName, TabUIName } from "views/pages/LOAN/utils";
import CIC from "./CIC";
import CollateralNew from "./CollateralNew";
import Forms from "./Forms";
import InternalCreditRating from "./ICR";
import Income from "./Income";
import Legal from "./Legal";
import LOAN from "./LOAN";
import Other from "./Other";
import Product from "./Product";

const Initialize: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotify();

  const isProduct = useSelector(isCheckCreateProduct);
  const isCheckLegalBorrower = useSelector(isCheckCreateLegalBorrower);
  const isCheckLoanData = useSelector(isCheckExistLoanData);
  const isCheckLoanDataProduct = useSelector(isCheckExistLoanDataProduct);
  const isCheckCollateral = useSelector(checkCollateralContinueRule)
  const isFetchedCate = useSelector(fetchedLOANNormalConfigProductCategory);
  const isFetchingCate = useSelector(fetchingLOANNormalConfigProductCategory);
  const allCollaterals = useSelector(getAllDataCollateral)
  const allCollateralsFull = useSelector(getAllDataCollateralFull)
  
  const isIgnore = useSelector(getAllDataCollateralIgnore) 
  const fetching = useSelector(fetchingLOANNormalData);
  const fetched = useSelector(existLOANNormalData)
  const { existData } = useNormalData();
  const collateralData = useSelector(getLOANNormalCollapse())
  const brwUuid = useSelector(getLOANNormalLegalBorrowerUuid);
  const [ isOpenModal, setIsOpenModal ] = useState<number>(5)
  const ruleDisabled = useSelector(getRuleDisbled)

  const handleModal = (next: number) =>{
    setIsOpenModal(next)
  }
  useEffect(() => {
    !isFetchedCate &&
      !isFetchingCate &&
      dispatch(fetchLOANNormalConfigProductCategory());
      if (params.id === "-") {
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

    if (params.id === "-" && params["*"] !== 'product') {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params]);

  // const dataFullStorage = useSelector(getDataCIC);
  // console.log("dataFullStorage",JSON.stringify(dataFullStorage))

  const getTabnext = (tab: string) =>  {
    switch (tab) {
      case "legal":
        return "/borrower";
      case "cic":
        return "/other/borrower";
      case "loan":
        return "/product";
      case "income":
        return `/borrower/${brwUuid}/salary`;
      case "other":
        return "/exception";
      default: return ""
    }
  }

  const current = tabName.indexOf(params["*"].split("/")[0]);

  useEffect(() => {
    if(fetched && params.stage === stageName[0] && !ruleDisabled){
      if(current === -1){
        navigate(`/loan/normal/init/${params.id}/product`);
      }
      else if (!isProduct && current !== 0) {
        notify("Vui lòng khởi tạo nhóm sản phẩm", "warning");
        navigate(`/loan/normal/init/${params.id}/product`);
      }
      else if (!isCheckLegalBorrower && current !== 1 && current !== 0) {
        notify("Vui lòng khởi tạo đối tượng thông tin pháp lý của người vay và người liên hệ", "warning");
        navigate(`/loan/normal/init/${params.id}/legal/borrower`);
      }
      else if (!isCheckLoanData && (current > 3)) {
        notify("Vui lòng khởi tạo thông tin khoản vay", "warning");
        navigate(`/loan/normal/init/${params.id}/loan/product`);
      }
      else if (!isCheckLoanDataProduct && (current > 3)) {
        notify("Vui lòng khởi tạo Hoạt động sản xuất kinh doanh tại thông tin khoản vay", "warning");
        navigate(`/loan/normal/init/${params.id}/loan/business/household-legal`);
      }
      else if (!isCheckCollateral.valid && (current > 5)){
        dispatch(setCollateralValidate(isCheckCollateral))
        notify(isCheckCollateral.message ? isCheckCollateral.message : 'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại', "warning");
        navigate(`/loan/normal/init/${params.id}/collateral`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isProduct, isCheckLegalBorrower, isCheckLoanDataProduct,isCheckCollateral, current, fetched,isCheckLoanData])

  const beforeChange = (_: number, next: number) => {
    if(!ruleDisabled){
      if (!isProduct) {
        notify("Vui lòng khởi tạo nhóm sản phẩm", "warning");
        return false;
      }
      if (
        !isCheckLegalBorrower &&
        (next !== 1 && next !== 0)
      ) {
        notify("Vui lòng khởi tạo đối tượng thông tin pháp lý của Người vay chính và Người liên hệ", "warning");
        return false;
      }
      if (!isCheckLoanData && (next > 3)) {
        notify("Vui lòng khởi tạo thông tin khoản vay", "warning");
        return false;
      }
  
      if (!isCheckLoanDataProduct && (next > 3)) {
        notify("Vui lòng khởi tạo Hoạt động sản xuất kinh doanh tại thông tin khoản vay", "warning");
        return false;
      }
  
      if(_ === 5){
        dispatch(setCollateralValidate(isCheckCollateral))
        if (!isCheckCollateral.valid && (next > 5)){
          notify(isCheckCollateral.message ? isCheckCollateral.message : 'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại', "warning");
          return false
        }
        else {
          if(
              (JSON.stringify(mappingToCheckChangedJSON(allCollaterals.originData)) !== JSON.stringify(mappingToCheckChangedJSON(allCollaterals.data)) 
              && isOpenModal === 5 
              && !allCollaterals.data.every(i=>i.price_cert_uuid)) || (isIgnore === "Y" && !allCollateralsFull?.every(i => i.valuation_id))
            ){
            handleModal(next)
            return false;
          }else{
            handleModal(5)
          }
        }
      }
    }
    
    // if(!isChecktNormalIncome && (tabNext === 'internal-credit-rating' || tabNext === 'forms')){
    //   notify("Vui lòng hoàn thành khởi tạo nguồn thu nhập", "warning");
    //     return false;
    // }
    
    navigate(`/loan/normal/init/${params.id}/${tabName[next]}` + getTabnext(tabName[next]));

    return true;
  };
  const renderTab = (tab: string[]) => {
    return tab.map(e => (
     <div className="flex-center">
       {e} 
       {
         e === TabUIName[5] && collateralData.length === 0 
          && <span>
          <Tooltip
            arrow
            className="ml-1 flex-center"
            sx={{color: '#f26b04', fontSize: 18}}
            title="Chưa khai báo TSBĐ">
         <InfoIcon fontSize="small" />
        </Tooltip></span>
       }
     </div>
    ))
  }

  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: 0,
        "& > .mscb-tabs": {
          "& > .MuiTabs-root": {
            "& > .MuiTabs-scroller": {
              "& > .MuiTabs-flexContainer": {
                borderBottom: "2px solid #d5d5d5",
              },
            },
          },
        },
        ...(existData || params.id === "-" || !fetching
          ? {}
          : {
            minHeight: !existData ? "350px" : undefined,
            display: "flex",
            alignItems: "center",
            backgroundColor: '#330a0a0a'
          }),
      }}
      className="px-4"
    >
      {(() => {
        if (fetching && params.id !== "-") {
          return <Loading sx={{height:350}}/>;
        }
        if (params.id !== "-" && !existData) {
          return <Empty>Không tìm thấy hồ sơ trên hệ thống.</Empty>;
        }
        return (
          <Tabs
            current={!!~current ? current : 0}
            beforeChange={beforeChange}
            tabs={renderTab(TabUIName)}
            sx={{
              "& .MuiTabs-flexContainer":{
                "& .MuiButtonBase-root":{
                  fontSize: 15,
                  lineHeight: "20px",
                  minHeight: 41,
                  color: "var(--mscb-secondary)",
                  fontWeight: 400
                },
                "& .Mui-selected" :{
                  color: '#1825aa',
                  fontWeight: 500
                }
              }
            }}
          >
            <TabPanel
              index={0}
              value={current}
              sx={{
                alignItems: "center",
                "& > .MuiBox-root": {
                  height: "100%",
                },
              }}
            >
              <Routes>
                <Route path="product" element={<Product />} />
              </Routes>
            </TabPanel>

            <Routes>
              <Route path="legal/*" element={<Legal />} />
            </Routes>
            <Routes>
              <Route path="cic/*" element={<CIC />} />
            </Routes>
            <Routes>
              <Route path="loan/*" element={<LOAN />} />
            </Routes>
            <Routes>
              <Route path="income/*" element={<Income />} />
            </Routes>
            <Routes>
              <Route path="collateral" element={<CollateralNew />} />
            </Routes>
            <Routes>
              <Route path="other/*" element={<Other />} />
            </Routes>
            <Routes>
              <Route
                path="internal-credit-rating"
                element={<InternalCreditRating />}
              />
            </Routes>
            <Routes>
              <Route path="forms" element={<Forms />} />
            </Routes>

          </Tabs>
        );
      })()}
      <DevToolLOANNormalInitPanel/>
      <ModalConfirm open={isOpenModal !== 5} onClose={()=>{handleModal(5)}} onConfirm={()=>{
          if(isIgnore === "Y" && !allCollateralsFull?.every(i => i.valuation_id)){
            handleModal(5)
          }
          else {
            beforeChange(5,isOpenModal)
          }
      }}>
        <Box className="text-18 font-medium text-primary text-center">

          Tài sản đảm bảo chưa được lưu vào hệ thống
        </Box>
      </ModalConfirm>
    </Paper>
  );
};

export default Initialize;
