import { FC, Fragment, useRef, useState } from 'react';
import { TioIcons } from './TioIcon';
import { GGIcons } from './Gg';
import { IconoIcons } from './Icono';
import { UilIcons } from './Uil';
import Input, { InputRef } from 'views/components/base/Input';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useNotify from 'app/hooks/useNotify';

const DevelopMscbIcon: FC = () => {

  const textRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<InputRef>(null);
  const [ search, setSearch ] = useState('');
  const notify = useNotify()

  const changeSearch = () => {
    setSearch(inputRef.current?.getValue() ?? '');
  }

  const clickIcon = (icon: string) => () => {
    if (textRef.current){
      textRef.current.value = icon;
      textRef.current?.select();
      document.execCommand('copy');
      notify('Copied "' + icon + '"', 'success');
    }
  }

  return <Fragment>
    <Paper sx={{ width: '100%' }} className="p-6">
      <div>
        Tio Icon: <b>{ TioIcons.length }</b>;
        GG Icon: <b>{ GGIcons.length }</b>;
        Icono Icon: <b>{ IconoIcons.length }</b>
      </div>
      <Input placeholder="Search icon" ref={ inputRef } value={ search } onDebounce={ changeSearch } />
    </Paper>
    <textarea ref={ textRef } defaultValue="" style={{ height: 0, opacity: 0 }} />
    <Divider className="mt-2" />
    <Typography className="font-bold text-22 py-2" component="h2">Tio Icons</Typography>
    <Grid container spacing={ 1 }>
      {TioIcons.filter(icon => {
        return !search || icon.indexOf(search) > -1
      }).map(icon => {
        return <Grid item xl={ 1 } lg={ 2 } md={ 3 } sm={ 4 } xs={ 12 } key={ icon }>
          <Paper 
            sx={{ 
              width: '100%', 
              maxWidth: '100%', 
              minWidth: '100px',
              height: '100px', 
              cursor: 'pointer', 
              padding: '12px'
            }} 
            onClick={ clickIcon(icon) }
          >
            <div className="flex-column items-center justify-between h-full">
              <div className="flex-center">
                <i className={ `${ icon } tio-xl` } />
              </div>
              <div className="flex-center text-center text-small">{ icon }</div>
            </div>
          </Paper>
        </Grid>
      })}
    </Grid>
    <Divider className="mt-6" />
    <Typography className="font-bold text-22 py-2" component="h2">GG Icons</Typography>
    <Grid container spacing={ 1 }>
      {GGIcons.filter(icon => {
        return !search || icon.indexOf(search) > -1
      }).map(icon => {
        return <Grid item xl={ 1 } lg={ 2 } md={ 3 } sm={ 4 } xs={ 12 } key={ icon }>
          <Paper 
            sx={{ 
              width: '100%', 
              maxWidth: '100%', 
              minWidth: '100px',
              height: '100px', 
              cursor: 'pointer', 
              padding: '12px'
            }} 
            onClick={ clickIcon(icon) }
          >
            <div className="flex-column items-center justify-between h-full">
              <div className="flex-center">
                <i className={ `${ icon }` } />
              </div>
              <div className="flex-center text-center text-small">{ icon }</div>
            </div>
          </Paper>
        </Grid>
      })}
    </Grid>
    <Divider className="mt-6" />
    <Typography className="font-bold text-22 py-2" component="h2">Icono Icons</Typography>
    <Grid container spacing={ 1 }>
      {IconoIcons.filter(icon => {
        return !search || icon.indexOf(search) > -1
      }).map(icon => {
        return <Grid item xl={ 1 } lg={ 2 } md={ 3 } sm={ 4 } xs={ 12 } key={ icon }>
          <Paper 
            sx={{ 
              width: '100%', 
              maxWidth: '100%', 
              minWidth: '100px',
              height: '100px', 
              cursor: 'pointer', 
              padding: '12px'
            }} 
            onClick={ clickIcon(icon) }
          >
            <div className="flex-column items-center justify-between h-full">
              <div className="flex-center">
                <i className={ `${ icon }` } />
              </div>
              <div className="flex-center text-center text-small">{ icon }</div>
            </div>
          </Paper>
        </Grid>
      })}
    </Grid>
    <Divider className="mt-6" />
    <Typography className="font-bold text-22 py-2" component="h2">Uil Icons</Typography>
    <Grid container spacing={ 1 }>
      {UilIcons.filter(icon => {
        return !search || icon.indexOf(search) > -1
      }).map(icon => {
        return <Grid item xl={ 1 } lg={ 2 } md={ 3 } sm={ 4 } xs={ 12 } key={ icon }>
          <Paper 
            sx={{ 
              width: '100%', 
              maxWidth: '100%', 
              minWidth: '100px',
              height: '100px', 
              cursor: 'pointer', 
              padding: '12px'
            }} 
            onClick={ clickIcon(icon) }
          >
            <div className="flex-column items-center justify-between h-full">
              <div className="flex-center">
                <i className={ `${ icon } text-24` } />
              </div>
              <div className="flex-center text-center text-small">{ icon }</div>
            </div>
          </Paper>
        </Grid>
      })}
    </Grid>
  </Fragment>


}

export default DevelopMscbIcon;