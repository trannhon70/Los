import { FC } from "react";
import MainReferencePerson from "../../Form/MainReferencePerson";

interface BasicInfoProps {
  isSCB?: boolean;
}

const ReferencePerson: FC<BasicInfoProps> = (props) => {
  const { isSCB = false } = props;

  return (
    <MainReferencePerson isSCB={isSCB} />
  );
};

export default ReferencePerson;
