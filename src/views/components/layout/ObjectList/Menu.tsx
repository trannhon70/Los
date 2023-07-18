import { FC, MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
// import ClearIcon from "@mui/icons-material/Clear";
// import Icon from 'views/components/atoms/Icon';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export interface ObjectListMenuItem {
  value: string;
  label: string;
  isDanger?: boolean
}

export interface ObjectListMenuProps {
  enable?: boolean;
  menu?: ObjectListMenuItem[];
  onClick?(m: ObjectListMenuItem): void;
  menuWidth?: string;
}

const ObjectListMenu: FC<ObjectListMenuProps> = (props) => {
  const {
    enable,
    menu = [],
    onClick,
    menuWidth = "20ch",

  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl).valueOf();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickMenu = (m: ObjectListMenuItem) => () => {
    setAnchorEl(null);
    onClick && onClick(m);
  };

  if (!enable) return null;
  return (
    <div
      className="object-list-menu"
      style={{ ...(open ? { display: "block" } : {}) }}
    >
      <IconButton component="div" onClick={handleClick}>
        <MoreVertIcon />
        {/* <Icon type="more" color=""style={{display:'flex'}} /> */}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: menuWidth,
          },
        }}
      >
        {menu.map((m) => (
          <MenuItem key={m.value} onClick={clickMenu(m)} className={`${m.isDanger ? 'text-danger' : ''}`} >
            {m.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ObjectListMenu;
