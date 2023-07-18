import { FunctionComponent, useState } from "react";
import Input from 'views/components/base/Input';
import { Grid, IconButton, Typography } from '@mui/material';
import SelectLocation from 'views/components/widgets/SelectLocation';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import SelectCollateralLocationType from "views/components/widgets/SelectCollateralLocationType";
import SelectRoadWidth from "views/components/widgets/SelectRoadWidth";
import { getLOANNormalCollateralData } from "features/loan/normal/storage/collateralV2/selector";
import { useSelector } from "react-redux";
import IconCopy from "views/components/layout/IconCopy";
import ModalCollateralAddress from "views/pages/LOAN/widgets/ModalCollateralAddress";
// import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface ITableClassificationInfoProps {
  collateralData?: ILOANNormalCollateralData;
  onChangeValueCollateral?: (value: string | number | null, key: keyof ILOANNormalCollateralData) => void;
}
export interface ICollateralAddress {
  address: string;
  province: string;
  district: string;
  ward: string
}

const TableClassificationInfo: FunctionComponent<ITableClassificationInfoProps> = (props) => {
  const {collateralData, onChangeValueCollateral } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // const ruleDisabled = useSelector(getRuleDisbled)

  const getData = useSelector(getLOANNormalCollateralData());

  const openModalCopy = () => {
    setIsModalOpen(!isModalOpen)
  }

  
  return (
    <TableRow>
      <TableCell sx={{ border: 'none' }} width='3%'></TableCell>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="100%"
      >
        <Typography color="#1825aa" fontWeight={500} fontSize={14}>
          THÔNG TIN PHÂN LOẠI
        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6" width='77%'>
        <Grid container spacing={3}>
          <Grid
            item
            xl={12}
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
              label={[
                '2. Tỉnh/TP',
                '3. Quận/huyện',
                '4. Phường/xã'
              ]}
              required={[true, true, true]}
              
              value={{
                country: ' VN',
                province: collateralData?.province ?? '',
                district: collateralData?.district ?? '',
                ward: collateralData?.ward ?? ''
              }}

              before={
                <Grid item xl={3} lg={3} md={12} sm={12} xs={12}
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
                >
                  <Input
                    value={ collateralData?.address }
                    disabled={true}
                    label="1. Địa chỉ thực tế"
                  />
                  <IconButton
                    sx={{
                      padding: 0
                    }}
                    className="icon-copy"
                    onClick={openModalCopy}
                  >
                    <IconCopy />
                  </IconButton>
                </Grid>
              }
              disabled={true}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectCollateralLocationType
              label="5. Loại vị trí"
              required
              disabled={true}
              value={collateralData?.position_type}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="6. Loại vị trí khác"
              placeholder='Nhập thông tin mô tả vị trí khác'
              value={collateralData?.other_position_type ?? ""}
              disabled={true}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectRoadWidth
              label="7. Chiều rộng đường hiện hữu (m)"
              required
              disabled={true}
              value={collateralData?.lane_width}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="8. Mô tả tài sản"
              required
              disabled={true}
              placeholder='Nhâp thông tin mô tả tài sản'
              value={collateralData?.description ?? ""}
            />
          </Grid>
        </Grid>
      </TableCell>
      <ModalCollateralAddress disabled={true} open={isModalOpen} onClose={openModalCopy}/>
    </TableRow>
  )
}

export default TableClassificationInfo;