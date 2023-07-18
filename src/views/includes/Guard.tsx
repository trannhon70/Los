import { FC, useState, lazy, useEffect } from "react";
import PAGE_URL from "app/PageURL";
import { useSelector, useDispatch } from "react-redux";
import { getIsAuth, getSesstionStatus, logout } from "features/auth/store/slice";
import { matchPath, Navigate, useLocation } from "react-router-dom";
import AppNotification from "./AppNotification";
import { TimeoutProvider } from '@minerva/react-timeout';
import useMasterData from "app/hooks/useMasterData";
import { APP_SESSION_TIMEOUT, APP_TOKEN_NAME } from "utils/constants";
import ModalAlert from "views/components/layout/ModalAlert";
import { removeStorage } from "utils";

const Layout = lazy(() => import('./Layout'));

const Guard: FC = () => {

  const AlertMessageConent = {
    session: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.',
    client: 'Bạn đã không thao tác một thời gian dài. Vui lòng đăng nhập lại để tiếp tục.'
  }

  const isAuth = useSelector(getIsAuth);
  const sessionStatus = useSelector(getSesstionStatus);
  const location = useLocation();
  const isLoginPage = matchPath(PAGE_URL.Login, location.pathname);
  const { register } = useMasterData();

  const dispatch = useDispatch();
  const [ alertType, setAlertType ] = useState<keyof typeof AlertMessageConent | undefined>();

  useEffect(() => {
    sessionStatus && setAlertType('session');
  }, [ sessionStatus ]);

  useEffect(() => {
    isAuth && register(
      '@all', 
      'VN', 
      [ 
        'district', 
        'ward', 
        'loanProduct',
        'partner',
        'partnerProduct',
        'personalRep',
        'businessType',
        'typeException',
        'pollicyDetail',
        'typeCardUse',
        'giftSelection',
        'documentType',
        'authenQuestion',
        'vehicleDetail',
        'personTypes',
        'relationship',
      
        'creditInstitution',
        'ablePayLabel',
        'acceptCreditLabel',
        'acceptStatus',
        'businessLicenceType',
        'listLegalDocument',
        'collateral',
        'guaranteeForm',
        'legalStatus',
        'methodReceiveSalary',
        'collateralOwnerType',
        'rentalOwnerProperty',
        'paymentMethod',
        'repayPrincipalInterest',
        'addressType',
        'appraisalPurpose',
        'appraisalUnitType',
        'assetType',
        'businessRepresentation',
        'businessTypeIncome',
        'businessTypeSh',
        'capitalNeed',
        'cifIfType',
        'collateralCertificateType',
        'collateralCertifiedType',
        'collateralLocationType',
        'collateralType',
        'constructionPermit',
        'constructionType',
        'contractTerm',
        'countriesManufacture',
        'country',
        'currencyType',
        'custClassififation',
        'customerType',
        'debtClassification',
        'disbursement',
        'education',
        'policyGroup',
        'fatca',
        'frequence',
        'gender',
        'averageIncome',
        'independentValuation',
        'issuer',
        'landUseCertified',
        'lendingMethod',
        'loanInterestRate',
        'loanPurposeCore',
        'machineType',
        'marriedStatus',
        'originLaneUse',
        'ownerProperty',
        'paperType',
        'priceAppraisal',
        'typeTermLoan',
        'loanPurpose',
        // 'purposeUsingLane',
        'typeRealEstateStatus',
        'releaseType',
        'remark',
        'residentStatus',
        'rightPropertyPropertyStatus',
        'goodPropertyStatus',
        'devicesPropertyStatus',
        'typeRisk',
        'roadWidth',
        'schedule',
        'typeApartment',
        'typeRealEstate',
        'vehicleStatus',
        'vehicleType',
        'documentStatus',
        'noticeTitle',
        'isPass',
        'reasonForRefusal',
        'scoreRankDetail',
        // 'purposeUseLaneValuation',
        'envGlobal',
        'validateMaCostType',
      ]
    );
  })

  if (!isAuth && !isLoginPage) {
    return <Navigate to={  PAGE_URL.Login } state={{ from: location }} />;
  }

  const clientHandle = () => {
    removeStorage(APP_TOKEN_NAME);
    setAlertType('client')
  }

  const onCloseAlert = () => {
    dispatch(logout()); 
  }

  return <TimeoutProvider timeout={ APP_SESSION_TIMEOUT } handle={ clientHandle }>
    <AppNotification />
    <Layout />
    <ModalAlert
      message="Cảnh báo đăng nhập"
      description={ alertType && AlertMessageConent[alertType] }
      open={ !!alertType }
      onClose={ onCloseAlert }
    />
  </TimeoutProvider>
};

export default Guard;