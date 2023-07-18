import { FunctionComponent,useState } from "react";
import Input from 'views/components/base/Input';
import { Grid, IconButton, Typography } from '@mui/material';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import SelectCollateralLocationType from "views/components/widgets/SelectCollateralLocationType";
import SelectRoadWidth from "views/components/widgets/SelectRoadWidth";
import { getCollateralIgnore, getLOANNormalCollateralData } from "features/loan/normal/storage/collateralV2/selector";
import { useSelector } from "react-redux";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import IconCopy from "views/components/layout/IconCopy";
import ModalCollateralAddress from "views/pages/LOAN/widgets/ModalCollateralAddress";
import useNotify from "app/hooks/useNotify";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface ITableClassificationInfoProps{
  collateralData?: ILOANNormalCollateralData;
  onChangeValueCollateral?: (value: string | number | null, key: keyof ILOANNormalCollateralData) => void;
}
export interface ICollateralAddress{
  address: string;
  province: string;
  district: string;
  ward: string
}

const TableClassificationInfo: FunctionComponent<ITableClassificationInfoProps> = (props) => {

  const { onChangeValueCollateral } = props;
  const notify = useNotify();
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  const ruleDisabled = useSelector(getRuleDisbled)
  const onChangeDataFormReport = (value: string | number | null, key: keyof ILOANNormalCollateralData) => {
    onChangeValueCollateral && onChangeValueCollateral(value, key);
  }
  const getData = useSelector(getLOANNormalCollateralData());
  const dataIgnore = useSelector(getCollateralIgnore);
  const changeLocation = (data: SelectLocationValue) => {
    onChangeDataFormReport(data.province, 'province');
    onChangeDataFormReport(data.district, 'district');
    onChangeDataFormReport(data.ward, 'ward');
  }
  const getMessage = useNormalCollateralMessage();
  const openModalCopy = () =>{
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
              onChange={changeLocation}
              label={[
                '2. Tỉnh/TP',
                '3. Quận/huyện',
                '4. Phường/xã'
              ]}
              required={[ true, true, true ]}
              value={{
                country:' VN',
                province: getData?.province ?? '',
                district: getData?.district ?? '',
                ward: getData?.ward ?? ''
              }}
              message={[
                getMessage( 'province',{position: getData?.uuidActiveData ?? ''}),
                getMessage( 'district', {position: getData?.uuidActiveData ?? ''}),
                getMessage('ward', {position: getData?.uuidActiveData ?? ''})
              ]}
              before={
                <Grid item xl={3} lg={3} md={12} sm={12} xs={12}
                sx={{
                 display: 'flex',
                 flexFlow: 'row-reverse'
               }}
               >
                 <Input
                   value={getData?.address}
                   disabled={ruleDisabled || dataIgnore}
                   label="1. Địa chỉ thực tế"
                   onDebounce={(val) => { onChangeDataFormReport(val, 'address')}}
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
              disabled = {ruleDisabled || dataIgnore}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectCollateralLocationType
              label="5. Loại vị trí"
              required
              onChange={(val) => { onChangeDataFormReport(val, 'position_type')
                if(val!=='OTHER'){
                  onChangeDataFormReport(null, 'other_position_type')
                }
                if(val ==='NO_ROAD'){
                  onChangeDataFormReport(null, 'lane_width')
                }
              }}
              disabled = {ruleDisabled || dataIgnore}
              value={getData?.position_type}
                message={ getMessage('typeLocation', {position: getData?.uuidActiveData ?? ''})}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="6. Loại vị trí khác"
              placeholder='Nhập thông tin mô tả vị trí khác'
              required={getData?.position_type === "OTHER" ? true : false}
              onDebounce={(val) => { onChangeDataFormReport(val, 'other_position_type')}}
              value={getData?.other_position_type ?? ""}
              disabled={(getData?.position_type === "OTHER" ? false : true) || ruleDisabled || dataIgnore}
              message={ getMessage('other_position_type', {position: getData?.uuidActiveData ?? ''})}

            />
          </Grid>
          <Grid item xl={3}>
            <SelectRoadWidth
              label="7. Chiều rộng đường hiện hữu (m)"
              required={getData?.position_type !=='NO_ROAD'}
              disabled={ruleDisabled || dataIgnore || getData?.position_type ==='NO_ROAD'}
              onChange={(val) => { onChangeDataFormReport(val, 'lane_width')}}
              value={getData?.lane_width}
              message={ getMessage('widthRoad', {position: getData?.uuidActiveData ?? ''})}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="8. Mô tả tài sản"
              required
              disabled = {ruleDisabled || dataIgnore}
              placeholder='Nhâp thông tin mô tả tài sản'
              onDebounce={(val) => { onChangeDataFormReport(val, 'description')}}
              value={getData?.description ?? ""}
              message={ getMessage('description', {position: getData?.uuidActiveData ?? ''})}
            />
          </Grid>
        </Grid>
      </TableCell>
      <ModalCollateralAddress open={isModalOpen} onClose={openModalCopy} onSave={(data)=>{
        onChangeDataFormReport(data.apartment, 'address')
        onChangeDataFormReport(data.province, 'province');
        onChangeDataFormReport(data.district, 'district');
        onChangeDataFormReport(data.ward, 'ward');
        openModalCopy()
        notify('Copy địa chỉ thành công','success')
      }}/>
    </TableRow>
  )
}

export default TableClassificationInfo;