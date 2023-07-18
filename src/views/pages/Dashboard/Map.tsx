import { FC } from 'react';
import clsx from 'clsx';
import CardOutside from 'views/components/layout/CardOutside';
import Mapbox from 'views/components/layout/Mapbox';
import { Paper } from '@mui/material';
import { sxPaperMap } from './style';
export interface MapProps{
  className?: string;
  classNameMapBox?: string;
}

const Map: FC<MapProps> = props => {
  const { className, classNameMapBox } = props;
  const mapClass = clsx(className);

  return <CardOutside label="Bản đồ" className={mapClass}>
    <Paper 
      component='div'
      className="h-full rounded-0 relative" 
      id='scb-mapbox-container'
      sx={ sxPaperMap }
    >
      <Mapbox className={clsx(classNameMapBox, "wh-full")} width='100%' height='100%' />
    </Paper>
  </CardOutside>
}

export default Map;
