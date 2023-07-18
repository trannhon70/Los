import { FC } from 'react';
import clsx from 'clsx';
import infoStyle from './style';
import Input from "views/components/base/Input";
import { Button } from '@mui/material';

const Customer: FC = () => {

  const classes = infoStyle();
  return (
    <div className={clsx(classes.root)}>
      <div className={clsx(classes.label, 'mscb-outside-card-label ellipsis bg-white text-upper text-primary')}>
        THÔNG TIN
      </div>
      <div className={classes.rowLine}><div className={classes.colorPath}></div></div>
      <div className={clsx(classes.codeContract)}>
        <Input
          type='text'
          label='Số hợp đồng thế chấp'
        />
      </div>
      <div className='btnSaveInfo'>
        <Button variant="contained" className="rounded-0" color="success">ÁP DỤNG</Button>
      </div>
    </div>
  )

}

export default Customer;