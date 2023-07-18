import { FC, useEffect, useRef } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { IRoute } from 'types';
import clsx from 'clsx';
import Scrollbar, { ScrollbarRef } from '../ScrollbarCLone';
import SidebarRoutes from 'app/navigations/sidebar';
import wrapperStyle from './style';
import Topbar from '../Topbar';
import HideRoutes from 'app/navigations/HideRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getScrollToBottom, setScrollToBottom } from 'features/app/store/slice';
import { ILOANURLParams } from 'types/models/loan';

const ContentWrapper: FC = () => {

  const classes = wrapperStyle();
  const isScrollToBottom = useSelector(getScrollToBottom)
  const scrollbarRef = useRef<ScrollbarRef>(null)
  const dispatch = useDispatch()
  const params = useParams() as ILOANURLParams;

  useEffect(() => {
    if(params['*'] === ""){
      scrollbarRef.current?.scrollToTop();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params])

  useEffect(() => {
    if(isScrollToBottom){
      scrollbarRef.current?.scrollToBottom();
      dispatch(setScrollToBottom(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isScrollToBottom])

  const listenRoutes = (routes: IRoute[]) => {
    return routes?.map(({ path = '', component: Comp, children }, i) => {
      if (!path) return null;
      const routePath = path.replace(/\/?(\?.*)*$/g, '/*$1').replace(/\/\*\/\*?/, '/*');

      if (children?.length){
        return <Route key={ i } path={ routePath } element={ Comp ? <Comp /> : undefined }>
          { listenRoutes(children) }
        </Route>
      }

      if (!Comp) return null;
      return <Route path={ routePath } element={ <Comp />  } key={ i } />
    });
  }

  return <div className={ clsx(classes.root, 'h-full mscb-content-wrapper') }>
    <div className={clsx(classes.smooth, "relative wh-full")}>
      <Scrollbar ref={scrollbarRef}>
        <Topbar />
        <div className={ classes.wrapper }>
          <Routes>
             {listenRoutes(HideRoutes) }
             {listenRoutes(SidebarRoutes)}
          </Routes>
        </div>
      </Scrollbar>
    </div>
  </div>

}

export default ContentWrapper;