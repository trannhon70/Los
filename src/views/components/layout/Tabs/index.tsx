import Box from '@mui/material/Box';
import clsx from 'clsx';
import tabsStyle from './style';
import TabPanel, { TabPanelProps } from '../TabPanel';
import SwipeableViews from 'react-swipeable-views';
import { Tab, Tabs as MuiTabs, Theme } from '@mui/material';
import { SxProps } from "@mui/system";
import { 
  Children, 
  cloneElement, 
  forwardRef, 
  ForwardRefRenderFunction, 
  isValidElement, 
  ReactNode, 
  SyntheticEvent, 
  useEffect, 
  useImperativeHandle, 
  useRef, 
  useState 
} from 'react';

export interface TabsRef{
  getValue(): number;
}

export interface TabsProps{
  beforeChange?(current: number, next: number): boolean;
  children?: ReactNode | ReactNode[];
  className?: string;
  current?: number;
  onChange?(): void;
  variant?: "scrollable" | "standard" | "fullWidth";
  tabs?: ReactNode[];
  uppercase?: boolean;
  sx?: SxProps<Theme>;
}

export interface TabsComponent extends ForwardRefRenderFunction<TabsRef, TabsProps>{}

const Tabs: TabsComponent = (props, ref) => {

  const { 
    className, 
    current = 0, 
    variant = "scrollable", 
    beforeChange, 
    tabs = [], 
    children, 
    onChange,
    uppercase = true,
    sx = {}
  } = props;
  const classes = tabsStyle();

  const [ CurrentTab, setCurrentTab ] = useState(current);
  const Current = useRef<number>(current);

  useEffect(() => {
    Current.current = current;
    setCurrentTab(current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ current ]);

  useEffect(() => {
    if (CurrentTab !== Current.current){
      Current.current = CurrentTab;
      onChange && onChange();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentTab ]);

  useImperativeHandle(ref, () => ({
    getValue: () => CurrentTab
  }));

  const changeTab = (_: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab && (!beforeChange || beforeChange(CurrentTab, newValue))){
      setCurrentTab(newValue);
    }
    return false;
  }

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  }

  return <Box className={ clsx(classes.Tabs, 'mscb-tabs', className) } sx={ sx }>
    <MuiTabs 
      variant={ variant } 
      value={ CurrentTab } 
      indicatorColor="primary" 
      onChange={ changeTab } 
      scrollButtons="auto"
      allowScrollButtonsMobile
    >
      {tabs.map((tab, index) => <Tab 
        label={ tab } 
        key={ index } 
        sx={{ textTransform: uppercase ? 'uppercase' : 'none' }} 
      />)}
    </MuiTabs>
    <SwipeableViews disabled index={ CurrentTab } onChangeIndex={ handleTabPanel } className="mscb-tabpanel-container">
      { Children.map(children, (child, index) => {
        if (isValidElement<TabPanelProps>(child)){
          return cloneElement(child, {
            key: index,
            value: CurrentTab,
            index
          })
        }
        return <TabPanel key={ index } padding={ false } value={ CurrentTab } index={ index } className="h-full">
          { child }
        </TabPanel>
      }) }
    </SwipeableViews>
  </Box>

}

export default forwardRef(Tabs);