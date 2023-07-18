import React from 'react';
import Transport from 'views/components/atoms/Icon/Transport';
import Test from 'views/components/atoms/Icon/Test';
import Batdongsan from 'views/components/atoms/Icon/Batdongsan';
import PTVT from 'views/components/atoms/Icon/PTVT';
import More from 'views/components/atoms/Icon/More';
import Taisan from 'views/components/atoms/Icon/Taisan';
import Add from 'views/components/atoms/Icon/Add';



const icons = {
    transport: Transport,
    test: Test,
    batdongsan: Batdongsan,
    ptvt: PTVT,
    more: More,
    taisan: Taisan,
    add: Add,
}
type Icons = typeof icons;
export type IconType = keyof Icons

interface IconProps {
    type: IconType;
    color: string;
    verticalAlign?: string;
    size?: string;
    margin?: string;
    display?: string;
    isHover?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
  }

  // const figmaIcons: Array<IconType> = [
  //   'transport',
  //   'batdongsan',
  //   'more'
  // ];
 
// const createStyle = (type: IconType, color: string, verticalAlign: string, size: string, margin: string, display: string, disabled: boolean) => ({
//     width: size,
//     margin,
//     '& > svg': {
//       verticalAlign,
//       width: size,
//       height: size,
//       fill: color,
//       display,
//      '& > g > path:nth-of-type(2)': {
//         fill: figmaIcons.includes(type) ? undefined : color,
//     },
//     '& > path': {
//       fill: figmaIcons.includes(type) ? color : undefined,
//     },
//     },
//     ':hover': {
//       cursor: disabled ? 'not-allowed' : 'pointer'
//     },
// }); 
  
  const Icon: React.FC<IconProps> = ({
    type, color, verticalAlign = 'bottom', size = '20px', margin = '0', display = 'unset', isHover = false, disabled = false, onClick, style
  }) => {
    const RenderIcon = icons[type];
    return (
      // <span style={createStyle(type, disabled ? "#999999" : isHover ? "#3145D1" : color, verticalAlign, size, margin, display, disabled) } onClick={onClick}>
      <span style={style} onClick={onClick}>
        <RenderIcon/>
      </span>
    );
  };
  
  export default Icon;