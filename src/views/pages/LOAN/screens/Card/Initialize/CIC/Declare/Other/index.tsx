import { FC } from "react";
import MainOther from "../../Form/MainOther";

interface BasicInfoProps {
  isSCB?: boolean;
}

const Other: FC<BasicInfoProps> = (props) => {
  const { isSCB = false } = props;

  return (
    <MainOther isSCB={isSCB} />
  );
};

export default Other;
