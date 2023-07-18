import { FC, ReactNode } from 'react';
import { SxProps, SystemStyleObject, Theme } from '@mui/system';
import clsx from 'clsx';
import Box from '@mui/material/Box';

export interface CarouselOption {
  quantity: number;
  type?: string;
  icon?: ReactNode;
  name?: string;
  className?: string;
  sx?: SxProps<Theme>;
}

export interface CarouselItemProps {
  item: CarouselOption;
  totalMoney?: string;
  isMoney?: boolean;
}

const CarouselItem: FC<CarouselItemProps> = props => {

  const { item, totalMoney, isMoney } = props;

  return <Box
    className={clsx('wh-full flex-column justify-between')}
    sx={{ flex: 1 }}
  >
    <Box
      className="flex justify-between h-full items-center"
      sx={{ mt: '-0.875rem' }}
    >
      <Box sx={{ fontSize: '36px' }} className="mscb-carousel-quantity">{item.quantity}</Box>
      {item.icon}
      {/* <RiHomeFill style={{ fontSize: '26px', color: 'var(--mscb-primary)' }} /> */}
    </Box>
    <Box
      className="text-left"
      sx={{
        color: '#353535',
        fontSize: '15px',
        // height: '42px',
        lineHeight: 1.33,
        textTransform: 'unset!important' as SystemStyleObject<Theme>
      }}
    >
      {item.name}
    </Box>
    {(()=> {
      if(isMoney){
        return (
          <Box
            className="text-left pt-1"
            sx={{
              color: '#eb0029',
              fontSize: '13px',
              fontWeight: 500,
              // height: '42px',
              lineHeight: 1.33,
              textTransform: 'unset!important' as SystemStyleObject<Theme>
            }}
          >
            {totalMoney ?? "0"} VNĐ
          </Box>
        )
      }
      else {
        return (
          <Box
            className="text-left pt-1"
            sx={{
              color: '#6f86fb',
              fontSize: '13px',
              lineHeight: 1.33,
              textTransform: 'unset!important' as SystemStyleObject<Theme>
            }}
          >
            {'Xem tài sản » '}
          </Box>
          // <Typography
          //   variant="subtitle1"
          //   gutterBottom
          //   component="div"
          //   className="text-13 text-left pt-1"
          //   color={"#6f86fb"}
          // >
          //   {'Xem tài sản » '}
          // </Typography>
        )
      }
    })()}
  </Box>
}

export default CarouselItem;