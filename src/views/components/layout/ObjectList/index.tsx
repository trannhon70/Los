import {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Tab, Tabs, Theme, Box } from '@mui/material';
import clsx from 'clsx';
import ObjectListLabel from './Label';
import objectListStyle from './style';
import ObjectListBox from './Box';
import ObjectListAdd from './Add';
import { ObjectListMenuItem } from './Menu';
import { SxProps } from '@mui/system';
import { diffArray } from 'utils';
import ClearIcon from "@mui/icons-material/Clear";
import LightTooltip from 'views/components/base/LightTooltip';
import TextTooltip from 'views/components/base/TextTooltip';


export interface ObjectListOption {
  circle?: ReactNode;
  label?: ReactNode;
  enableUser?: boolean;
  attachment?: number;
  full_name?: string;
  uuid?: string;
}

export interface ObjectListRef {
  getValue(): number;
}

export interface ObjectListProps {
  className?: string;
  onAdd?(): void;
  onChange?(current: number): void;
  current?: number;
  enableAdd?: boolean;
  enableLength?: boolean;
  enableMenu?: boolean;
  enableNumber?: boolean;
  labelLength?: ReactNode;
  options?: ObjectListOption[];
  onDelete?(current: number): void;
  isDisable?: boolean;
  menu?: ObjectListMenuItem[];
  menuWidth?: string;
  onClickMenu?(menu: ObjectListMenuItem, position: number): void;
  sx?: SxProps<Theme>;
  avatar?: boolean;
  enableDelete?: boolean;
  attachLabel?: ReactNode;
  onAttach?(index: number): void;
}

export interface ObjectListComponent extends ForwardRefRenderFunction<ObjectListRef, ObjectListProps> { }

export type { ObjectListMenuItem };

const ObjectList: ObjectListComponent = (props, ref) => {

  const { className,
    current,
    enableAdd = true,
    enableLength = true,
    enableMenu = true,
    labelLength,
    onAdd,
    onChange,
    onAttach,
    onDelete,
    options,
    enableNumber = true,
    isDisable = false,
    menu,
    menuWidth,
    onClickMenu,
    sx = {},
    avatar,
    enableDelete
  } = props;
  const classes = objectListStyle();
  const [ObjectOptions, setObjectOptions] = useState<ObjectListOption[]>(options ?? []);
  const [CurrentObject, setCurrentObject] = useState<number | undefined>(current);
  const Current = useRef<number | undefined>(current);

  useEffect(() => {
    Current.current = current;
    setCurrentObject(current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ current ]);

  useEffect(() => {
    if (diffArray(ObjectOptions, options ?? [])){
      setObjectOptions(options ?? []);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useImperativeHandle(ref, () => ({
    getValue: () => CurrentObject ?? 0
  }))

  useEffect(() => {
    if (CurrentObject !== Current.current){
      Current.current = CurrentObject;
      onChange && onChange(CurrentObject ?? 0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentObject]);


  const clickAttach = (index: number) => {
    
    onAttach && onAttach(index);
  };

  const olClass = clsx(
    classes.ObjectList,
    { 'disabled-length': !enableLength },
    className,
    'flex items-center'
  );

  const changeObject = (e: SyntheticEvent, newValue: number) => {
    const target = e.target as HTMLElement;
    const isBackdrop = target.classList.contains('MuiBackdrop-root');
    const isMenu = target.classList.contains('MuiList-root');
    const isMenuItem = target.classList.contains('MuiMenuItem-root');
    if (isBackdrop || isMenu || isMenuItem) return false;
    setCurrentObject(newValue);
  }
  const clickMenu = (p: number) => (m: ObjectListMenuItem) => {
    onClickMenu && onClickMenu(m, p);
  }

  const clickDelete = (val: number) => {
    onDelete && onDelete(val);
  }

  return <Box className={olClass} sx={{ ...sx }}>
    {!!enableLength && <ObjectListLabel
      className={clsx(classes.ObjectListLabel, "ObjectListLabel")}
      label={labelLength}
      number={enableNumber ? options?.length : undefined}
    />}
    <div className={clsx(classes.ObjectListContent, 'ObjectListContent')}>
      <Tabs
        variant="scrollable"
        value={CurrentObject}
        sx={{
          zIndex:10
        }}
        indicatorColor="primary"
        scrollButtons="auto"
        allowScrollButtonsMobile
        onChange={changeObject}
      >
        {ObjectOptions.map((option, index) => {
          return <Tab key={index} disabled={isDisable} label={
            <>
              {enableDelete ? (
                <>
                  <ClearIcon className={classes.buttonDelete} onClick={() => clickDelete(index)} />
                  <ObjectListBox
                    circle={option.circle}
                    enableUser={option.enableUser || avatar}
                    enableMenu={ enableMenu }
                    active={CurrentObject === index}
                    menu={menu}
                    onClickMenu={clickMenu(index)}
                    menuWidth={menuWidth}
                  >
                   {/* {option.label} */}
                   <TextTooltip>{option.label}</TextTooltip>
                  </ObjectListBox>
                </>
              ) : (<ObjectListBox
                    circle={option.circle}
                    enableUser={option.enableUser || avatar}
                    enableMenu={enableMenu}
                    active={CurrentObject === index}
                    menu={menu}
                    onClickMenu={clickMenu(index)}
                    menuWidth={menuWidth}
                    attachLabel={option.attachment}
                    onAttach={()=>{
                      clickAttach(index)
                    }}
                  >
                    <TextTooltip>{option.label}</TextTooltip>

                    {/* {option.label} */}
                  </ObjectListBox>
                
              )}
            </>
          }
          />
        })}
      </Tabs>
    </div>
    {!!enableAdd && <ObjectListAdd className={clsx(classes.ObjectListAdd, 'ObjectListAdd')} onClick={onAdd} />}
  </Box>;

}

export default forwardRef(ObjectList);