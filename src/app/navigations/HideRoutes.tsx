import PAGE_URL from "app/PageURL";
import { lazy } from "react";
import { FaPersonBooth, FaVectorSquare } from "react-icons/fa";
import { IRoute } from "types";
import { MENUCODE } from "./sidebar";

const HideRoutes: IRoute[] = [
      {
        name: 'Pages.Dashboard.Profile',
        path: PAGE_URL.NotAuth,
        icon: <FaPersonBooth />,
        component: lazy(() => import('views/includes/NotAuth'))
      },  
      {
        code: MENUCODE.DOCUMENTS,
        name: 'Tài liệu hồ sơ',
        path: 'documents/:id',
        icon: <FaVectorSquare />,
        component: lazy(() => import('views/pages/Documents/File'))
      },
      {
        name: 'Tài liệu khoản vai',
        path: 'documents/:id/:folder_id/:file_id/:type',
        icon: <FaVectorSquare />,
        component: lazy(() => import('views/pages/Documents/FileDetail'))
      }
]

export default HideRoutes;