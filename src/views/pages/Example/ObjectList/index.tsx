import { FC, Fragment } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HorizontalList from 'views/components/layout/HorizontalList';
import ObjectList, { ObjectListMenuItem } from 'views/components/layout/ObjectList';

const MENUS: ObjectListMenuItem[] = [
  { value: 'edit', label: 'Chỉnh sửa' },
  { value: 'delete', label: 'Xoá' },
];

const menuWidth = '20ch';

const ENABLE_MENU = true;

const ExampleObjectList: FC = () => {

  const onClickMenu = (menu: ObjectListMenuItem, position: number) => {

  }

  return <Fragment>
    <div className="bg-white p-8 mt-3 shadow">
      <ObjectList labelLength="sf sdf sdf sdf ds fs fsd" options={[
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
        { label: 'MMMMMM' },
      ]} menu={ MENUS } menuWidth={ menuWidth } onClickMenu={ onClickMenu } enableMenu={ ENABLE_MENU } />
    </div>
    <div className="bg-white p-8 mt-3 shadow">
      <HorizontalList options={[
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
        { circle: <AccountBalanceIcon />, label: 'MMMMMM' },
      ]} />
    </div>
  </Fragment>

}

export default ExampleObjectList;