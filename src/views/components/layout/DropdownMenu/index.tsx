import { FC, MouseEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Loading from 'views/components/base/Loading';
import Tooltip from './Tooltip';
import dropdownStyle from './style';

export interface DropdownMenuItem{
  value: string;
  devider?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  right?: ReactNode;
  disable?: boolean;
  className?: string;
}

export interface DropdownMenuProps{
  className?: string;
  tooltip?: ReactNode;
  isIcon?: boolean;
  size?: number;
  title?: ReactNode;
  minWidth?: number;
  minWidthMenu?: number | string;
  icon?: ReactNode;
  menu?: DropdownMenuItem[];
  onOpen?(done: () => void): void;
  loading?: boolean;
  onClose?(): void;
  onClick?(item: DropdownMenuItem): void | boolean;
  horizontal?: number | "right" | "left" | "center";
  vertical?: number | "bottom" | "top" | "center";
  asAvatar?: boolean;
  counter?: number;
  maxHeight?: number;
  disabled? : boolean
}

export interface DropdownMenuComponent extends FC<DropdownMenuProps>{}

const DropdownMenu: DropdownMenuComponent = props => {

  const { 
    className, 
    tooltip, 
    title, 
    isIcon, 
    icon, 
    size = 40, 
    minWidth = 100, 
    menu, 
    loading, 
    minWidthMenu = '20ch',
    horizontal = 'right',
    vertical = 'bottom',
    asAvatar,
    counter = 0,
    onClose,
    onOpen,
    onClick,
    maxHeight = 400,
    disabled = false,
  } = props;

  const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
  const [ MenuItems, setMenuItems ] = useState<DropdownMenuItem[] | undefined>(menu);
  const [ loadDone, setLoadDone ] = useState(false);

  const open = Boolean(anchorEl);
  const classes = dropdownStyle();

  const isLoadDone = () => {
    setLoadDone(true);
  }

  useEffect(() => {
    setMenuItems(menu);
  }, [ menu ]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onOpen && onOpen(isLoadDone);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose && onClose();
  };

  const hasIcon = (items: DropdownMenuItem[]) => {
    return Boolean(~items.map(m => !!m.icon).indexOf(true)).valueOf()
  };

  const validValue = useMemo(() => {
    const vals = (MenuItems ?? []).map(m => m.value)
      .filter((val, index, self) => self.indexOf(val) === index);
    return vals.length === (MenuItems ?? []).length;
  }, [ MenuItems ]);

  const clickItem = (item: DropdownMenuItem) => () => {
    if (!item.disable && (!onClick || onClick(item) !== false)){
      setAnchorEl(null);
      onClose && onClose();
    }
  }

  const ItemList: DropdownMenuItem[][] = [];
  let Current: DropdownMenuItem[] = [];

  MenuItems?.map(item => {
    if (item.devider){
      ItemList.push(Current);
      Current = [];
    }
    else{
      Current.push(item);
    }
    return null;
  });

  Current.length && ItemList.push(Current);

  return <div className={ clsx('mscb-dropdown-menu', className) }>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Tooltip tooltip={ tooltip }>
        {(() => {

          if (isIcon){
            return <IconButton 
              disabled={disabled}
              onClick={ handleClick} 
              size="small" 
              sx={{ ml: '5px' }}
              className={ classes.IconButton }
            >
              <Avatar 
                sx={{ width: size, height: size }} 
                className={ clsx(classes.MenuIcon, 'mscb-menu-icon') }
              >
                { icon !== undefined ? icon : asAvatar ? undefined : '' }
              </Avatar>
              {
                counter > 0 &&
                <span className={ classes.Counter }>
                  { counter > 9 ? '+9' : counter }
                </span>
              }
            </IconButton>
          }

          return <Typography sx={{ minWidth }}>
            { title }
          </Typography>
        })()}
      </Tooltip>
    </Box>
    {
      validValue &&
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          style: {
            minWidth: minWidthMenu,
            maxHeight,
            overflow: 'hidden auto',
            marginTop: '7px'
          },
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal, vertical }}
      >
        {(() => {
          if (MenuItems?.length){
            let isFirst = true;
            return ItemList.map((items, i) => {
              const isIcon = hasIcon(items);
              const ListElement = items.map(item => {
                return <MenuItem 
                  key={ item.value } 
                  onClick={ clickItem(item) } 
                  className={ clsx('items-start', item.className) }
                >
                  {
                    !!item.icon &&
                    <ListItemIcon>
                      { item.icon }
                    </ListItemIcon>
                  }
                  <ListItemText inset={ isIcon && !item.icon }>
                    { item.label === undefined ? item.value : item.label }
                  </ListItemText>
                  {
                    !!item.right &&
                    <Typography variant="body2" color="text.secondary">
                      { item.right }
                    </Typography>
                  }
                </MenuItem>
              });

              isFirst || ListElement.unshift(<Divider key={ i } />);
              isFirst = false;

              return ListElement;
            });
          }
          else if (loading && !loadDone){
            return <Loading />
          }
        })()}
      </Menu>
    }
    
  </div>;

}

export default DropdownMenu;