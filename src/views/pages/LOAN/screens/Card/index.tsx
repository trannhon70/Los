import { FC, Fragment, useEffect } from "react";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { updateDocumentTitle } from "utils";
import StepArrow from "views/components/layout/StepArrow";
import Customer from "views/includes/Customer";
import { stageName } from "../../utils";
import Initialize from "./Initialize";

const LOANCard: FC = () => {

  const params = useParams() as ILOANURLParams;

  useEffect(() => {
    updateDocumentTitle("Khởi tạo hồ sơ thẻ");
  });

  const current = stageName.indexOf(params.stage);

  return (
    <Fragment>
      <Customer />
      <StepArrow
        className="mt-8"
        circle={["I", "II", "III", "IV", "V", "VI"]}
        current={!!~current ? current : 0}
        tabs={[
          "Khởi tạo hồ sơ",
          "Thẩm định - phê duyệt",
          "Quản lý hợp đồng",
          "Đăng ký biện pháp đảm bảo",
          "Giải ngân khoản vay",
          "Quản lý hồ sơ",
        ]}
      >
        <Initialize />
      </StepArrow>
    </Fragment>
  );
};

export default LOANCard;
