import { Grid, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { AiOutlineFileWord } from 'react-icons/ai';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import HorizontalList from 'views/components/layout/HorizontalList';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import SelectConstructionPermit from 'views/components/widgets/SelectConstructionPermit';
import SelectConstructionType from 'views/components/widgets/SelectConstructionType';
import SelectLocation from 'views/components/widgets/SelectLocation';
import { SxObjectListTypeCollateral } from './style';

// TODO: Thông tin CTXD
const CTXDInfomation: FunctionComponent = () => {



  ///// CTXD trên đất

  const onAddCTXDLand = () => {

  }

  const onChangeHorizonList = (current: number) => {
  }


  const optionsData: IGroupListBase[] = [
    {
      value: 1,
      label: `CTXD trên đất 1`,
      key: 1,
    },
    {
      value: 2,
      label: `CTXD trên đất 2`,
      key: 2,
    }
    , {
      value: 3,
      label: `CTXD trên đất 3`,
      key: 3,
    }
  ]

  ////// thong tin loai ctxd

  const onAddCTXDLandType = () => {

  }

  const onChangeCTXDLandType = (current: number) => {
  }

  const optionsDataCTXDLandType: ObjectListOption[] = [{
    label: `CTXD 1`,
    circle: <AiOutlineFileWord />
  },
  {
    label: `CTXD 2`,
    circle: <AiOutlineFileWord />
  }]


  return (
    <Grid container spacing={3} className="mt-0">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography variant="h6" gutterBottom component="div" className="font-medium text-19">
          B. Thông tin Pháp lý CTXD
        </Typography>
      </Grid>
      <Grid item xl={12}>
        <HorizontalList
          onAdd={onAddCTXDLand}
          enableMenu={false}
          current={0}
          options={optionsData}
          onChange={onChangeHorizonList}
        />
      </Grid>
      <Grid item xl={12}>
        <CardInside title="I. Thông tin chung của CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
          <Grid container spacing={3}>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <SelectConstructionPermit
                label="1. Pháp lý CTXD "
                required
              />
            </Grid>
            <Grid item xl={9} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Pháp lý CTXD khác"
                required
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <SelectLocation
                col={3}
                before={
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="3. Địa chỉ thực tế nhà ở/CTXD"
                      format
                      required
                    />
                  </Grid>
                }
                label={[
                  '4. Tỉnh/TP',
                  '5. Quận/huyện',
                  '6. Phường/xã'
                ]}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <SelectLocation
                col={3}
                before={
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="7. Địa chỉ thực tế nhà ở/CTXD"
                      format
                      required
                    />
                  </Grid>
                }
                label={[
                  '8. Tỉnh/TP',
                  '9. Quận/huyện',
                  '10. Phường/xã'
                ]}
              />
            </Grid>
          </Grid>

        </CardInside>
      </Grid>
      <Grid item xl={12}>
        <CardInside title="II. Thông tin loại CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
          <ObjectList
            enableAdd={true}
            enableMenu={false}
            current={0}
            labelLength="Loại CTXD"
            onAdd={onAddCTXDLandType}
            onChange={onChangeCTXDLandType}
            options={optionsDataCTXDLandType}
            sx={SxObjectListTypeCollateral}
          />
          <Grid container spacing={3} className='mt-5'>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <SelectConstructionType
                label="1. Loại công trình"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Loại công trình khác"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="3. Diện tích xây dựng theo GCN (m2)"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="4. Diện tích xây dựng thực tế (m2)"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="5. Diện tích sàn theo GCN (m2)"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="6. Diện tích sàn thực tế (m2)"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="7. Diện tích sử dụng theo GCN (m2)"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="8. Diện tích sử dụng thực tế (m2)"
              />
            </Grid>

            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="9. Thời hạn sở hữu"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="10. Hình thức sở hữu"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="11. Kết cấu công trình theo GCN"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="12. Kết cấu công trình thực tế"
              />
            </Grid>

            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="13. Cấp (Hạng) theo GCN"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="14. Số tầng theo GCN"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="15. Số tầng thực tế"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="16. Thời gian đưa vào sử dụng"
              />
            </Grid>



          </Grid>

        </CardInside>
      </Grid>
    </Grid>
  )
}

export default CTXDInfomation;

