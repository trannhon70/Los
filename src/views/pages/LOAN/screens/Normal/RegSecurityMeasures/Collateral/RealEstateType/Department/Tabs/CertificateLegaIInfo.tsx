import { Grid } from "@mui/material";

import React, { FC } from "react";
import { AiOutlineFileWord } from "react-icons/ai";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListOption,
} from "views/components/layout/ObjectList";
import { SxObjectListUser } from "../../../style";


const CertificateLegaIInfo: FC = () => {


  const onAddCre = () => {

  };
  const onChangeCre = (current: number) => {

  };

  const optionsCer: ObjectListOption[] = [{
    label: `Giấy chứng nhận 1`,
    circle: <AiOutlineFileWord />
  }, {
    label: `Giấy chứng nhận 2`,
    circle: <AiOutlineFileWord />
  }]

  const onAddCreUseListLegal = () => {
  };

  const optionsCerUseListLegal: ObjectListOption[] = [{
    label: `USER 1`,
    circle: <AiOutlineFileWord />
  }, {
    label: `USER 2`,
    circle: <AiOutlineFileWord />
  }]

  const onChangeCreUseListLegal = (current: number) => {
  };

  return (
    <>
      <Grid container spacing={3} className="pt-6">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ObjectList
            enableAdd={true}
            enableMenu={false}
            labelLength="Số lượng GCN: &nbsp;"
            onAdd={onAddCre}
            onChange={onChangeCre}
            current={0}
            options={optionsCer}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <CardInside
            title="I. Thông tin giấy chứng nhận"
            sx={{
              "& legend": {
                fontSize: "16px",
              },
            }}
          >
            <Grid container spacing={3} className="pl-4 pb-4">
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <ObjectList
                  enableAdd={true}
                  enableMenu={false}
                  onAdd={onAddCreUseListLegal}
                  onChange={onChangeCreUseListLegal}
                  labelLength="Người sở hữu: &nbsp;"
                  current={0}
                  options={optionsCerUseListLegal}
                  sx={SxObjectListUser}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="1. Loại GCN"

                  required
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="2. Loại GCN khác"

                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="3. Số GCN"

                  required
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="4. Số vào sổ cấp GCN"

                  required
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <InputDate
                  label="5. Ngày cấp"

                  required
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="6. Nơi cấp"

                  required
                />
              </Grid>
              <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="7. Loại hợp đồng"

                  required
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="8. Số hợp đồng"

                  required
                />
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Input
                  label="9. Ngày hợp đồng"

                  required
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
      </Grid>
    </>
  );
};

export default CertificateLegaIInfo;
