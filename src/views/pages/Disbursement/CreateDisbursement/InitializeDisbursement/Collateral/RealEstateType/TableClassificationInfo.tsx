import { FunctionComponent } from "react";
import Input from 'views/components/base/Input';
import { Grid, Typography } from '@mui/material';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import SelectCollateralLocationType from "views/components/widgets/SelectCollateralLocationType";
import SelectRoadWidth from "views/components/widgets/SelectRoadWidth";

export interface ITableClassificationInfoProps{
  onChangeValueCollateral?: (value: string | number | null, key: keyof ILOANNormalCollateralData) => void;
}

const TableClassificationInfo: FunctionComponent<ITableClassificationInfoProps> = (props) => {

  const { onChangeValueCollateral } = props;

  const onChangeDataFormReport = (value: string | number | null, key: keyof ILOANNormalCollateralData) => {
    onChangeValueCollateral && onChangeValueCollateral(value, key);
  }

  const changeLocation = (data: SelectLocationValue) => {
    onChangeDataFormReport(data.province, 'province');
    onChangeDataFormReport(data.district, 'district');
    onChangeDataFormReport(data.ward, 'ward');
  }

  return (
    <TableRow>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="230px"
      >
        <Typography color="#1825aa" fontWeight={500}>
          THÔNG TIN PHÂN LOẠI
        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6">
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input
              label="1. Địa chỉ thực tế"
              onDebounce={(val) => { onChangeDataFormReport(val, 'address')}}
            />
          </Grid>
          <Grid item xl={9}>
            <SelectLocation
              col={4}
              onChange={changeLocation}
              label={[
                '2. Tỉnh/TP',
                '3. Quận/huyện',
                '4. Phường/xã'
              ]}
              required={[ true, true, true ]}
              // value={{
              //   country:' VN',
              //   province: collateralData?.province ?? '',
              //   district: collateralData?.district ?? '',
              //   ward: collateralData?.ward ?? ''
              // }}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectCollateralLocationType
              label="5. Loại vị trí"
              required
              onChange={(val) => { onChangeDataFormReport(val, 'position_type')}}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="6. Loại vị trí khác"
              required
              onDebounce={(val) => { onChangeDataFormReport(val, 'other_position_type')}}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectRoadWidth
              label="7. Chiều rộng đường hiện hữu (m)"
              required
              onChange={(val) => { onChangeDataFormReport(val, 'lane_width')}}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="8. Mô tả tài sản"
              required
              onDebounce={(val) => { onChangeDataFormReport(val, 'description')}}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TableClassificationInfo;