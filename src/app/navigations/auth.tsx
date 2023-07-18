import { lazy } from "react";
import { IRoute } from "types";
import PAGE_URL from "../PageURL";

const AuthRoutes: IRoute[] = [
  {
    path: PAGE_URL.Login,
    exact: true,
    component: lazy(() => import('views/pages/Login'))
  }
];

export default AuthRoutes;