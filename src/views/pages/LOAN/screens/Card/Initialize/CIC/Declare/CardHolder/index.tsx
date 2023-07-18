import { FC } from 'react';
import MainCardHolder from '../../Form/MainCardHolder';

interface BasicInfoProps {
  isSCB?: boolean;
}


const CardHolder: FC<BasicInfoProps> = (props) => {
  const { isSCB = false } = props;

  return <>
    <MainCardHolder isSCB={isSCB} />
  </>

}

export default CardHolder;
