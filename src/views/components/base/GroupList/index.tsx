import * as React from 'react';
import clsx from 'clsx';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import gListStyle from './style';


export interface GroupListRef {
  getValue(): void;
  setValue(): void;
}

export interface IGroupList {
  key: string | number;
  value: string | number;
  label?: string
}

export interface GroupListProps {
  onChange?(): void;
  options?: IGroupList[];
  type?: string;
  typeTMS?: boolean;
}

export interface GroupListBaseComponent
  extends React.ForwardRefRenderFunction<GroupListRef, GroupListProps> { }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GroupList: GroupListBaseComponent = (props, ref) => {
  const { options = [], type, typeTMS = true } = props;

  const classes = gListStyle();
  const [itemActive, setItemActive] = React.useState<string | number>();

  const handleCheck = (value: IGroupList) => {
    setItemActive(value.key);
  };

  return (
    <div className={clsx(classes.root, 'wh-full')}>
      {type ? (<List sx={{ width: '100%', bgcolor: 'background.paper', 
      border: 'solid 1px #d5d5d5', paddingTop: '0 !important', paddingBottom: '0 !important' }}>
        {options.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem className={clsx(classes.item, 'wh-full')}
              key={value.key}
              disablePadding
            >
              <ListItemButton role={undefined}
                onClick={handleCheck.bind(this, value)} dense
                className={`${itemActive && itemActive === value.key ? clsx(classes.active, 'wh-full') : ""
                  }`}>
                <ListItemIcon>
                  <Avatar className={`${itemActive && itemActive === value.key ? clsx('ava-root') : ""}`}
                    style={{ height: '20px', width: '20px', fontSize: '10px' }}>{index + 1}</Avatar>
                </ListItemIcon>
                <ListItemText className={`${itemActive && itemActive === value.key ? clsx('tex-root') : ""}`}
                  style={{ marginLeft: '-20px' }} id={labelId} primary={`${value.label}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
        {!typeTMS ? (
          <ListItem className={clsx(classes.total, 'wh-full')}>
            <span>Tổng số lượng: </span>
            <span style={{ marginLeft: '80px' }}>{options.length}</span>
          </ListItem>
        ) : null}
      </List>
      ) : (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', border: 'solid 1px #d5d5d5', paddingTop: '0 !important'}}>
            {options.map((item, index) => {
              const labelId = `checkbox-list-label-${item}`;
              return (
                <div
                  key={item.key}
                  className={`items ${itemActive && itemActive === item.key ? clsx(classes.active, 'wh-full') : ""
                    }`}
                >
                  {!typeTMS ? (
                    <div
                      key={item.key}
                      className={`items ${itemActive && itemActive === item.key
                        ? clsx(classes.active, 'wh-full')
                        : ""
                        }`}
                    >
                      <Link to={`${item.value}`}>
                        <ListItem className={clsx(classes.item, 'wh-full')}
                          key={item.key}
                          disablePadding
                        >
                          <ListItemButton role={undefined}
                            onClick={handleCheck.bind(this, item)} dense
                            className={`${itemActive && itemActive === item.key ? clsx(classes.active, 'wh-full') : ""
                              }`}>
                            <ListItemIcon>
                              <Avatar className={`${itemActive && itemActive === item.key ? clsx('ava-root') : ""}`}
                                style={{ height: '20px', width: '20px', fontSize: '10px' }}>{index + 1}</Avatar>
                            </ListItemIcon>
                            <ListItemText className={`${itemActive && itemActive === item.key ? clsx('tex-root') : ""}`}
                              style={{ marginLeft: '-20px' }} id={labelId} primary={`${item.label}`} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    </div>
                  ) : (""
                  )}
                </div>
              );
            })}
            {!typeTMS ? (
              <ListItem className={clsx(classes.total, 'wh-full')}>
                <span>Tổng số lượng: </span>
                <span style={{ marginLeft: '80px' }}>{options.length}</span>
              </ListItem>
            ) : null}
          </List>
        </>
      )}
    </div>
  );
};

export default React.forwardRef(GroupList);
