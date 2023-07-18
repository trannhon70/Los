import { lazy } from 'react';
import { FaHome, FaUserFriends, FaVectorSquare } from 'react-icons/fa';
import { IRoute } from 'types';
import PAGE_URL from 'app/PageURL';

export enum MENUCODE {
  HOME = 'HOME',
  INIT = 'KT',
  INIT_NORMAL = 'KT_KTHSTD',
  INIT_CARD = 'KT_KTHST',
  INIT_PROFILE = 'KT_HSNV',
  INIT_CORRDINATOR = 'KT_DP',
  APPROVAL = 'TDPD',
  APPROVAL_NORMAL = 'TDPD_TDPD',
  APPROVAL_CARD = 'TDPD_TDPDT',
  SEC = 'DK_DPBD',
  SEC_LIST = 'DK_DSHS',
  SEC_REG_SECURITY_MEASURES = 'DK_KTYCCC',
  SEC_ATHOR_INFO = 'DK_TTUQ',
  DISBURSEMENT = 'GNKV',
  DISBURSEMENT_LIST = 'GNKV_DSHS',
  DISBURSEMENT_INIT = 'GNKV_KTGN',
  DISBURSEMENT_REVIEW = 'GNKV_SX',
  CORRDINATOR = 'DP',
  CORRDINATOR_LIST = 'DP_DMHS',
  CORRDINATOR_TASK = 'DP_PCNV',
  DEV = 'DEV',
  DEV_MSCB_ICON = 'D_MI',
  DEV_OPTION_LIST = 'D_OL',
  DEV_TABLE = 'D_T',
  DEV_CHECKBOX = 'D_C',
  DOCUMENTS = 'TLHS',
}

const SidebarRoutes: IRoute[] = [
  {
    code: MENUCODE.HOME,
    icon: <FaHome />,
    name: 'Sidebar.Dashboard',
    path: PAGE_URL.Dashboard,
    component: lazy(() => import('views/pages/Dashboard'))
  },
  {
    code: MENUCODE.INIT,
    name: 'Pages.LOAN.Init',
    path: 'loan',
    icon: <FaUserFriends />,
    component: lazy(() => import('views/pages/LOAN')),
    children: [
      {
        code: MENUCODE.INIT_NORMAL,
        name: 'Khởi tạo hồ sơ tín dụng',
        path: 'normal/init/-/product'
      },
      {
        code: MENUCODE.INIT_CARD,
        name: 'Khởi tạo hồ sơ thẻ',
        path: 'card/init/-/product-card'
      },
      {
        code: MENUCODE.INIT_PROFILE,
        name: 'Hồ sơ nhân viên',
        path: 'profile',
      },
      {
        code: MENUCODE.INIT_CORRDINATOR,
        name: 'Điều phối',
        path: 'corrdinator',
      }
    ]
  },
  {
    code: MENUCODE.SEC,
    name: 'Pages.SecurityMeasures',
    path: 'sec',
    icon: <FaUserFriends />,
    component: lazy(() => import('views/pages/SecurityMeasures')),

    children: [
      {
        code: MENUCODE.SEC_LIST,
        name: 'Danh sach hồ sơ',
        path: 'list-record',
      },
      {
        code: MENUCODE.SEC_REG_SECURITY_MEASURES,
        name: 'Khởi tạo YC công chứng',
        path: 'loan/normal/reg-security-measures/42731u93832479312487/collateral-info',
      },
      {
        code: MENUCODE.SEC_ATHOR_INFO,
        name: 'Thông tin ủy quyền',
        path: 'author-info',
      },
    ]
  },
  {
    code: MENUCODE.DISBURSEMENT,
    name: 'Pages.Disbursement',
    path: 'disbursement',
    icon: <FaUserFriends />,
    component: lazy(() => import('views/pages/Disbursement')),

    children: [
      {
        code: MENUCODE.DISBURSEMENT_LIST,
        name: 'Danh sach hồ sơ',
        path: 'list-record-disbursement',
      },
      {
        code: MENUCODE.DISBURSEMENT_INIT,
        name: 'Khởi tạo giải ngân',
        path: 'disbursement/loan/normal/disbursement/0010304202100000001/initialize-disbursement/base-info',
        component: lazy(() => import('views/pages/Disbursement/CreateDisbursement'))
      },
      {
        code: MENUCODE.DISBURSEMENT_REVIEW,
        name: 'Soát xét',
        path: 'review-controls',
      },
    ]
  },
  {
    code: MENUCODE.CORRDINATOR,
    name: 'Pages.Coordinator.Sidebar',
    path: 'corrdinator/',
    icon: <FaUserFriends />,
    component: lazy(() => import('views/pages/Corrdinator')),
    children: [
      {
        code: MENUCODE.CORRDINATOR_LIST,
        name: 'Danh mục hồ sơ',
        path: 'corrdinator-profile'
      },
      {
        code: MENUCODE.CORRDINATOR_TASK,
        name: 'Phân công nhiệm vụ',
        path: 'corrdinator-description-task'
      }
    ]
  },
  // {
  //   code: MENUCODE.DEV,
  //   name: 'Develop',
  //   path: 'develop',
  //   icon: <FaVectorSquare />,
  //   children: [
  //     {
  //       code: MENUCODE.DEV_MSCB_ICON,
  //       name: 'Mscb Icon',
  //       path: 'mscb-icon',
  //       component: lazy(() => import('views/pages/Example/Develop/MscbIcon'))
  //     },
  //     {
  //       code: MENUCODE.DEV_OPTION_LIST,
  //       name: 'Option List',
  //       path: 'option-list',
  //       component: lazy(() => import('views/pages/Example/Develop/OptionList'))
  //     },
  //     {
  //       code: MENUCODE.DEV_TABLE,
  //       name: 'Table',
  //       path: 'table',
  //       component: lazy(() => import('views/pages/Example/Develop/Table'))
  //     },
  //     {
  //       code: MENUCODE.DEV_CHECKBOX,
  //       name: 'Checkbox',
  //       path: 'checkbox',
  //       component: lazy(() => import('views/pages/Example/Checkbox'))
  //     },
  //   ]
  // },

]

export default SidebarRoutes;