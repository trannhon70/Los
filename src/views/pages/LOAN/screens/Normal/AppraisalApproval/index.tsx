import { Paper } from "@mui/material";
import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
//import { updateDocumentTitle } from "utils";
import Loading from "views/components/base/Loading";
import Empty from "views/components/layout/Empty";
import TabPanel from "views/components/layout/TabPanel";
import Tabs from "views/components/layout/Tabs";
import { stageName, TabAppraisalName, tabAppraisalURL } from "views/pages/LOAN/utils";
import CIC from "./CIC";
import InternalCreditRating from "./ICR";
import Income from "./Income";
import LOAN from "./Loan";
import AAOther from "./Other";
import DedupeBlackList from "./DedupeBlackList";
import AppraisalAdd from "./AppraisalAdd";
import useApprovalData from "app/hooks/useApprovalData";
import { fetchedLOANApprovalData, fetchingLOANApprovalData, getLOANApprovalSourceBorrowerUuid, getNotCompletedLoanApproval } from "features/loan/normal/storageApproval/selectors";
import CollateralNew from "./Collateral";
import { clearStorageApprovalCIC } from "features/loan/normal/storageApproval/cic/actions"
import { clearStorageApprovalAdditional } from "features/loan/normal/storageApproval/additionalApproval/actions";
import { updateDocumentTitle } from "utils";
import { existLOANNormalData, fetchingLOANNormalData, getLOANNormalExistData } from "features/loan/normal/storage/selectors";
import useNotify from "app/hooks/useNotify";
import { getApprovalLoanTableOptionSaved } from "features/loan/normal/storageApproval/loan/selectors";

const AppraisalApproval: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotify()
  const currentStage = stageName.indexOf(params.stage);

  useEffect(() => {
    currentStage === 1 && updateDocumentTitle('Thẩm định phê duyệt');
  })

  const { existData } = useApprovalData();
  const fetching = useSelector(fetchingLOANApprovalData);
  const fetched = useSelector(fetchedLOANApprovalData);
  const existNormalData = useSelector(getLOANNormalExistData)
  const fetchedNormal = useSelector(existLOANNormalData)
  const fetchingNormal = useSelector(fetchingLOANNormalData)
  const brwUuid = useSelector(getLOANApprovalSourceBorrowerUuid);
  const isNotCompleteLoan = useSelector(getNotCompletedLoanApproval)
  const current = tabAppraisalURL.indexOf(params['*'].split('/')[0]);
  const loanTableOptionSaved = useSelector(getApprovalLoanTableOptionSaved)

  useEffect(() => {
    if(currentStage === 1){
      
      if(current > 1 && isNotCompleteLoan){
        notify('Thông tin khoản vay chưa nhập đủ thông tin. Vui lòng kiểm tra lại', 'error')
        navigate(`/loan/normal/${stageName[1]}/${params.id}/${tabAppraisalURL[1]}`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params])

  useEffect(() => {
    if (params.id === "-") {
      dispatch(clearStorageApprovalCIC());
      dispatch(clearStorageApprovalAdditional());
    }
  });

  const beforeChange = (_: number, next: number) => {
    if(next > 1 && isNotCompleteLoan){
      notify('Thông tin khoản vay chưa nhập đủ thông tin. Vui lòng kiểm tra lại', 'error')
      return false
    }

    let tabNext = tabAppraisalURL[next];

    switch (tabNext) {
      case 'cic-app':
        tabNext += '/main/borrower';
        break;
      case "loan":
        tabNext += "/product";
        break;
      case "income":
        tabNext += `/borrower/${brwUuid}/salary`;
        // tabNext += `/borrower/-/salary`;

        break;
      case "other":
        tabNext += `/approval-exception`;
        break;
      case "appraisal-add":
        tabNext += `/report`;
        break;
      case "dedupe-blacklist":
        tabNext += `/dedupe`;
        break;
      default: break;
    }

    navigate(`/loan/normal/${stageName[1]}/${params.id}/${tabNext}`);

    return true;
  }
  // console.log('fetching:',fetching, 'fetched:',fetched,'data:',existData)
  return <Paper
    sx={{
      width: '100%',
      height:'100%',
      borderRadius: 0,
      '& > .mscb-tabs': {
        '& > .MuiTabs-root': {
          '& > .MuiTabs-scroller': {
            '& > .MuiTabs-flexContainer': {
              borderBottom: '2px solid #d5d5d5',
            }
          }
        }
      },
      ...((existData || params.id === '-' || !fetching) ? {} : {
        minHeight: !existData && fetching && existNormalData ? '100%' : '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#330a0a0a'
      })
    }}
    className="px-6"
  >
    {(() => {
      if(fetching && params.id !== "-"){
        return <Loading sx={{height:350}}/>;
      }
      if ((fetchingNormal === false && fetchedNormal === true && existNormalData === null)  || (fetched === true && (params.id === '-' || !existData))) {
        return <Empty sx={{
          "& img": {
            width: "23%"
          },
          fontSize: '20px',
          fontWeight: 300,
          // fontStyle: 'italic',
          minHeight: '100%'
        }}>
          Không tìm thấy hồ sơ trên hệ thống
        </Empty>
      }
      if(existData){
        return <Tabs
        current={!!~current ? current : 0}
        beforeChange={beforeChange}
        tabs={TabAppraisalName}
        sx={{
          "& .MuiTabs-flexContainer": {
            "& .MuiButtonBase-root": {
              fontSize: 15,
              lineHeight: "22px",
              minHeight: 41,
              color: "var(--mscb-secondary)",
              fontWeight: 400
            },
            "& .Mui-selected": {
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
            alignItems: 'center',
            '& > .MuiBox-root': {
              height: '100%',
            }
          }}
        >
          <Routes>
            <Route path="cic-app/*" element={< CIC />} />
          </Routes>
        </TabPanel>
        <Routes>
          <Route path="loan/*" element={< LOAN />} />
        </Routes>
        <Routes>
          <Route path="income/*" element={< Income />} />
        </Routes>
        <Routes>
          <Route path="collatera-app/" element={< CollateralNew />} />
        </Routes>
        <Routes>
          <Route path="other/*" element={< AAOther />} />
        </Routes>
        <Routes>
          <Route path="icr/*" element={< InternalCreditRating />} />
        </Routes>
        <Routes>
          <Route path="dedupe-blacklist/*" element={< DedupeBlackList />} />
        </Routes>
        <Routes>
          <Route path="appraisal-add/*" element={<AppraisalAdd />} />
        </Routes>

      </Tabs>
      }

    })()}
  </Paper>
}
export default AppraisalApproval;