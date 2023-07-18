import { FC, useEffect, useState } from 'react';
import { SxProps, Theme } from '@mui/system';
import { BsChevronLeft } from 'react-icons/bs';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CarouselItem, { CarouselOption } from './Item';
import { diffArray } from 'utils';
import { ETypeCollateral } from 'features/loan/normal/storage/collateralV2/case';

export interface CarouselProps{
  className?: string;
  items?: CarouselOption[];
  sx?: SxProps<Theme>;
  current?: number;
  totalMoney?: string;
  onActiveType?: (type: string) => void;
}

const Carousel: FC<CarouselProps> = props => {

  const { items = [], className, sx = {}, current, totalMoney, onActiveType } = props;

  const [ CurrentActive, setCurrentActive ] = useState(current);
  const [ CurrentItems, setCurrentItems ] = useState<CarouselOption[]>(items);
  
  useEffect(() => {
    current === CurrentActive || setCurrentActive(current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ current ]);

  useEffect(() => {
    diffArray(items, CurrentItems) && setCurrentItems(items);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ items ]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    // eslint-disable-next-line array-callback-return
    let collateralTypeActive = CurrentItems[newValue]?.type;
    collateralTypeActive && onActiveType && onActiveType(collateralTypeActive);
  }

  return <Tabs
    className={ className }
    value={ CurrentActive }
    onChange={handleChange}
    variant="scrollable"
    scrollButtons
    TabScrollButtonProps={{
      children: <BsChevronLeft />
    }}
    sx={{
      [`& .${tabsClasses.scrollButtons}`]: {
        '& svg': {
          fontSize: '2.25rem',
          color: 'var(--mscb-primary)'
        },
        '&.Mui-disabled': { 
          opacity: 0.3 
        },
      },
      '& .MuiTab-root': {
        width: '179px',
        height: '109px',
        border: '2px solid var(--mscb-primary)',
        mr: '0.75rem',
        p: '0.875rem',
        textTransform: 'unset',
        fontWeight: 400,
        color: '#000',
        '& .Mui-selected': {
          color: '#000'
        }
      },  
      '& .MuiTabs-indicator': {
        display: 'none'
      },
      ...sx
    } as SxProps<Theme>}
  >
    {CurrentItems.map((item, i) => (
      <Tab 
        key={ i } 
        className={ item.className }
        label={ 
          <CarouselItem 
            item={ item } 
            totalMoney={totalMoney} 
            isMoney={item.type === ETypeCollateral.ALL ? true : false}
          /> 
        } 
        sx={ item.sx }
      />
    ))}
  </Tabs>

}

export default Carousel;