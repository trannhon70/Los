import { Grid } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import React, { FC, Fragment, useEffect, useRef } from "react";
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import Radio, { RadioOption, RadioRef } from "views/components/base/Radio";
import CardInside from "views/components/layout/CardInside";
import ObjectList from "views/components/layout/ObjectList";
import { SxObjectListUser, SxRadio } from "../../../style";

export interface LegalOwnerProps {
  collateralData?: ILOANNormalCollateralData;
}

const LegalOwner: FC<LegalOwnerProps> = (props) => {
  const { CollateralOwnerType, register } = useMasterData();
    
  useEffect(() => {
    register('collateralOwnerType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const optionCollateralOwnerTypeRef = useRef<RadioRef>(null);

  const optionCollateralOwnerType: RadioOption[] = CollateralOwnerType.map(
    (cot) => ({
      label: cot.name,
      value: cot.code,
    })
  );

  return (
    <>
      <Grid container spacing={3} className="pt-6">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Radio
            label="Đối tượng sở hữu tài sản"
            required
            sx={SxRadio}
            variant="checkbox"
            options={optionCollateralOwnerType}
            ref={optionCollateralOwnerTypeRef}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ObjectList
            enableAdd={false}
            enableMenu={true}
            menu={[
              {
                label: "Chi tiết",
                value: "1",
              },
            ]}
            options={[
              { label: "USER1", circle: '' },
            ]}
            labelLength="Người sở hữu: &nbsp;"
            current={0}
            sx={SxObjectListUser}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <CardInside
            title="I. Pháp lý uỷ quyền của đất"
            sx={{
              "& legend": {
                fontSize: "16px",
              },
            }}
          >
            <Grid container spacing={3} className="pl-4 pb-4">
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Radio
                  label="Có văn bản ủy quyền hay không"
                  required
                  options={[
                    { label: "Có", value: "Y" },
                    { label: "Không", value: "N" },
                  ]}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <span className='font-medium'>1. Thông tin người được ủy quyền</span>

                <ObjectList
                  className="pt-1"
                  enableAdd={true}
                  enableMenu={true}
                  labelLength="Số lượng:"
                  menu={[
                    {
                      label: "Xóa",
                      value: "1",
                    },
                  ]}
                  current={0}
                  options={[]}
                  sx={SxObjectListUser}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="2. Mối quan hệ giữa người được uỷ quyền với chủ tài sản"
                  required
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="3. Mối quan hệ giữa người được uỷ quyền với đối tượng vay"
                  required
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Input label="4. Hợp đồng ủy quyền" required />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
      </Grid>
    </>
  );
};

export default LegalOwner;
