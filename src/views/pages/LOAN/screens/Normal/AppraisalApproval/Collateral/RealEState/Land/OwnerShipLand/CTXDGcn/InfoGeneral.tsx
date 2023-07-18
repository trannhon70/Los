import { FunctionComponent } from "react";
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material';
import CardInside from "views/components/layout/CardInside";
import Input from 'views/components/base/Input';
import SelectLocation from 'views/components/widgets/SelectLocation';
import SelectConstructionPermit from "views/components/widgets/SelectConstructionPermit";
import { SxSelectDisiable } from "views/pages/LOAN/screens/Card/Initialize/Collateral/style";
import IconButton from '@mui/material/IconButton';
import IconCopy from "views/components/layout/IconCopy";
import {
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreColalteralLandCTXDDataApproval
} from "features/loan/normal/storageApproval/collateral/selector";

export interface InfoGeneralProps {
  uuidData?: string;
  uuidSubType?: string;
}

const InfoGeneral: FunctionComponent<InfoGeneralProps> = (props) => {

  const { uuidData = "", uuidSubType = "" } = props;
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval(uuidData, uuidSubType));
  const dataCTXD = useSelector(getLOANormalStoreColalteralLandCTXDDataApproval(uuidData,
    uuidSubType,
    SubTypeItemsActive ?? ''))

  return (
    <CardInside title="I. Thông tin chung của CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
      <Grid container spacing={3}>
        {/* <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <SelectConstructionPermit
            label="1. Pháp lý CTXD "
            required
            value={dataCTXD?.asset_legal ?? ""}
            sx={SxSelectDisiable}
            disabled
          />
        </Grid>
        <Grid item xl={9} lg={12} md={12} sm={12} xs={12} sx={{ opacity: '50%' }}>
          <Input
            label="2. Pháp lý CTXD khác"
            value={dataCTXD?.legal_CTXD_other}
            disabled
          />
        </Grid> */}

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
          sx={{
            "& .icon-copy": {
              zIndex: "1000",
              position: "absolute",
              cursor: "pointer"
            },
          }}
        >
          <SelectLocation
            col={3}
            before={
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}
                sx={{
                  display: 'flex',
                  flexFlow: 'row-reverse'
                }}
              >
                <Input
                  label="1. Địa chỉ thực tế nhà ở/CTXD"
                  format
                  value={dataCTXD?.address}
                  disabled
                />
                <IconButton
                  sx={{
                    padding: 0
                  }}
                  className="icon-copy"
                  disabled
                >
                  <IconCopy />
                </IconButton>
              </Grid>
            }
            label={[
              '2. Tỉnh/TP',
              '3. Quận/huyện',
              '4. Phường/xã'
            ]}
            required={[true, true, true]}
            value={{
              country: "VN",
              province: dataCTXD?.provice ?? "",
              district: dataCTXD?.district ?? "",
              ward: dataCTXD?.ward ?? ""
            }}
            disabled
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} 
          sx={{
            "& .icon-copy": {
              zIndex: "1000",
              position: "absolute",
              cursor: "pointer"
            },
          }}
        >
          <SelectLocation
            col={3}
            before={
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12} 
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
              >
                <Input
                  label="5. Địa chỉ theo GCN"
                  format
                  value={dataCTXD?.certificate_address}
                  disabled
                />
                 <IconButton
                  sx={{
                    padding: 0
                  }}
                  disabled
                  className="icon-copy"
                >
                  <IconCopy />
                </IconButton>
              </Grid>
            }
            label={[
              '6. Tỉnh/TP',
              '7. Quận/huyện',
              '8. Phường/xã'
            ]}
            required={[true, true, true]}
            value={{
              country: "VN",
              province: dataCTXD?.certificate_province ?? "",
              district: dataCTXD?.certificate_district ?? "",
              ward: dataCTXD?.certificate_ward ?? ""
            }}
            disabled
          />
        </Grid>
      </Grid>
    </CardInside>
  )
}

export default InfoGeneral