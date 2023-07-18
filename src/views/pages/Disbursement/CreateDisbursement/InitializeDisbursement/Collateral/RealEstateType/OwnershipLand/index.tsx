import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ECheckType, ETypeLand } from 'features/loan/normal/storage/collateralV2/case';
import { FC, useRef, useState } from 'react';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { MdHomeWork } from 'react-icons/md';
import Checkbox, { CheckboxRef } from 'views/components/base/Checkbox';
import HorizontalList from 'views/components/layout/HorizontalList';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import AssessmentInfomation from '../../AssessmentInfomation';
import { SxObjectListTypeCollateral } from '../../style';
import CTXDGcn from './CTXDGcn';
import CTXDLand from './CTXDLand';
import CollateralLegal from './LegalLand';


const OwnershipLand: FC = () => {

  const [currentTypeDefault, setCurrentTypeDefault] = useState<number>(0);
  const checkBoxTypeInfoRef = useRef<CheckboxRef>(null);

  const optionsLandCTXDGcnQsh: ObjectListOption[] = [{
    label: `GCN QSH CTXD 1`,
    circle: <MdHomeWork />
  }, {
    label: `GCN QSH CTXD 2`,
    circle: <MdHomeWork />
  }]

  const handleChangeCheckBox = () => {

  }

  const onChangeType = (current: number) => {
    if (currentTypeDefault !== current) {
      setCurrentTypeDefault(current);
    }
  }

  const onHandleAddCtxdOfGcnQsh = () => {
  }

  const onHandleChangeCtxdOfGcnQsh = (current: number) => {
  }

  return (
    <Grid container spacing={3} >
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <ObjectList
          enableAdd={false}
          onChange={(current) => onChangeType(current)}
          enableMenu={false}
          labelLength="Chọn loại"
          current={currentTypeDefault}
          options={[
            { label: 'Đất', circle: <FaHandHoldingUsd /> },
            { label: 'CTXD trên đất', circle: <FaHandHoldingUsd /> },
            { label: 'CTXD có GCN QSH riêng', circle: <FaHandHoldingUsd /> }
          ]}
          sx={SxObjectListTypeCollateral}
        />
      </Grid>

      {
        (() => {
          if (currentTypeDefault === ETypeLand.LAND) {
            return (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box className="flex items-center">
                  <span className="text-14 font-medium text-secondary pr-5">
                    Chọn loại tài sản khai báo thông tin
                  </span>
                  <Checkbox
                    ref={checkBoxTypeInfoRef}
                    onChange={handleChangeCheckBox}
                    options={
                      [
                        {
                          label: "CTXD trên đất",
                          value: ECheckType.CTXD_LAND,
                          checked: false
                        },
                        {
                          label: "CTXD GCN riêng",
                          value: ECheckType.CTXD_GCN,
                          checked: false
                        }
                      ]
                    }
                  />
                </Box>
              </Grid>
            )
          }

          if (currentTypeDefault === ETypeLand.CTXD_GCN) {
            return (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <HorizontalList
                  onAdd={onHandleAddCtxdOfGcnQsh}
                  current={0}
                  options={optionsLandCTXDGcnQsh}
                  onChange={onHandleChangeCtxdOfGcnQsh}
                />
              </Grid>
            )
          }
        })()
      }

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <AssessmentInfomation
        />
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        {
          (() => {
            if (currentTypeDefault === ETypeLand.LAND) {
              return (
                <CollateralLegal
                />
              )
            } else if (currentTypeDefault === ETypeLand.CTXD_LAND) {
              return (
                <CTXDLand

                />
              )
            } else if (currentTypeDefault === ETypeLand.CTXD_GCN) {
              return (
                <CTXDGcn

                />
              )
            }
          })()
        }
      </Grid>
    </Grid>
  )
}

export default OwnershipLand;