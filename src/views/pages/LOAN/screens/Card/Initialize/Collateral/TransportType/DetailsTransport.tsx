import { Box, Collapse, Divider, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useMasterData from 'app/hooks/useMasterData';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import {
  ISubItems
} from 'types/models/loan/normal/storage/CollaretalV2';
import Checkbox from 'views/components/base/Checkbox';
import Input from 'views/components/base/Input';
import Radio, { RadioOption, RadioRef } from 'views/components/base/Radio';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ObjectList from 'views/components/layout/ObjectList';
import Tabs from 'views/components/layout/Tabs';
import SelectVehicleType from 'views/components/widgets/SelectVehicleType';
import ModalOwnerInfo from '../ModalOwnerInfo';
import { SxObjectListUser, SxRadio } from '../style';


const DetailsTransport: FC = () => {

  const [openTable, setOpenTable] = useState(false);
  const checkboxRef = useRef<RadioRef>(null);
  const [CurrentValue, setCurrentValue] = useState<string | undefined>('');
  const [isOpenDetail, setOpenDetail] = useState<boolean>(false);

  const toggleTable = () => setOpenTable(!openTable);
  const onAdd = () => {
  }

  const onChangeDataDetails = (value: string | number | null, key: keyof ISubItems) => {
  }

  const changeCheckbox = () => {
    setCurrentValue(checkboxRef.current?.getValue().value)
  }


  const optionsData: IGroupListBase[] = [
    {
      value: 1,
      label: `PTVT/Động sản 1`,
      key: 1,
      valueMoney: 100000
    },
    {
      value: 2,
      label: `PTVT/Động sản 2`,
      key: 2,
      valueMoney: 2000000
    },
    {
      value: 3,
      label: `PTVT/Động sản 3`,
      key: 3,
      valueMoney: 3000000
    },
    {
      value: 4,
      label: `PTVT/Động sản 4`,
      key: 4,
      valueMoney: 40000000
    },
  ]

  const onSelectGroupList = (value: IGroupListBase) => {
  }

  const { CollateralOwnerType, register } = useMasterData();
    
  useEffect(() => {
    register('collateralOwnerType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const optionCollateralOwnerType: RadioOption[] = CollateralOwnerType.map(cot => ({
    label: cot.name,
    value: cot.code,
    checked: true
  }))


  const handleOpenModal = () => {
    setOpenDetail(!isOpenDetail);
  }

  const isGuaranteed: RadioOption[] = [{
    label: "Đang bảo đảm",
    value: "Y"
  },
  {
    label: "Không",
    value: "N"
  }];

  return <Fragment>
    <TableRow>
      <TableCell
        rowSpan={2}
        align='center'
        width={'3%'}
        sx={{ verticalAlign: 'top', fontSize: '16px', border: 'none' }}
      >
        1
      </TableCell>
      <TableCell width={'22%'}>
        <SelectVehicleType sx={{
          "& .MuiSelect-select": {
            border: '1px solid var(--mscb-primary)!important',
            backgroundColor: "var(--mscb-white)!important",
          },
          "& svg": {
            color: 'var(--mscb-primary)!important',
            mải: '12px',
            mr: '9px'
          },
          "& .MuiInput-input": {
            color: 'var(--mscb-primary)!important',
            fontWeight: "500!important",
            fontSize: "16px!important"
          }
        }} />
      </TableCell>
      <TableCell>

      </TableCell>
      <TableCell className="pl-4">

      </TableCell>
      <TableCell
        className="text-right pr-0 py-2"
        width="140px"
        sx={{ '& svg': { color: 'var(--mscb-primary)' } }}
      >
        <Box>
          <IconButton>
            <IoTrashOutline style={{ fontSize: '1rem' }} />
          </IconButton>
          <IconButton onClick={toggleTable}>
            <BiChevronDownCircle style={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell colSpan={5} className="p-0" sx={{ border: 'none' }}>
        <Collapse in={openTable}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Grid container className='mt-5' columnSpacing="20" rowSpacing="20">
                    <Grid item xl={2}>
                      <GroupListBase labelAdd='Thêm PTVT'
                        onAdd={onAdd}
                        activeId={0}
                        onSelected={onSelectGroupList}
                        options={optionsData} />
                    </Grid>
                    <Grid item xl={10}>
                      <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Typography variant="h6" gutterBottom component="div">
                            A. Thông tin định giá và thẩm định tài sản
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                          <Input
                            label="1. Tỷ lệ cho vay tối đa theo quy định"
                            required />
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                          <Radio label="2. TS hiện đang đảm bảo cho nghĩa vụ CTD"
                            options={isGuaranteed}
                            required />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <Input label="3. Giá trị PTVT (VNĐ)"
                            required />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <TextArea label="3. Thông tin nghĩa vụ đang đảm bảo" placeholder="Nhập thông tin nghĩa vụ"
                            required />
                        </Grid>
                      </Grid>
                      <Grid container className="mt-5">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Typography variant="h6" gutterBottom component="div">
                            B. Thông tin pháp lý
                          </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Tabs tabs={[
                            "Thông tin pháp lý chủ sở hữu",
                            "Thông tin chi tiết",
                          ]}>
                            <div>
                              <Grid container spacing={3} className="pt-6">
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                  <Radio
                                    ref={checkboxRef}
                                    label="Đối tượng sở hữu tài sản"
                                    required
                                    options={optionCollateralOwnerType}
                                    sx={SxRadio}
                                    onChange={changeCheckbox}
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
                                    onClickMenu={handleOpenModal}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div>
                              <CardInside title="Thông tin cơ bản" fieldsetClass="px-4" classBody="h-full p-6" >
                                <Grid container spacing={3}>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="1. Loại phương tiện"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="2. Chi tiết loại phương tiện khác"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="3. Nhãn hiệu"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="4. Nhãn hiệu khác"
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="5. Model (số loại)"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="6. Model (số loại) khác"
                                    />
                                  </Grid>
                                  <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="7. Nơi sản xuất/lắp ráp"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="8. Nơi sản xuất/lắp ráp khác"
                                    />
                                  </Grid>
                                </Grid>

                              </CardInside>
                              <CardInside title="Thông tin pháp lý" fieldsetClass="px-4" classBody="h-full p-6" >
                                <Grid container spacing={3}>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Typography className="text-14 font-medium w-full">1.Danh mục hồ sơ pháp lý</Typography>
                                    <Checkbox
                                      required
                                      className="checkbox_type_customer w-full"
                                      options={[
                                        { value: 'S01', label: 'Giấy chứng nhận' },
                                      ]}
                                    />
                                  </Grid>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container >
                                      <Grid item xl={9} className="flex ml-4">
                                        <Checkbox
                                          required
                                          className="checkbox_type_customer"
                                          sx={{
                                            ".checkbox_type_customer": {
                                              width: "auto"
                                            }
                                          }}
                                          options={[
                                            { value: '1', label: 'GCN đăng ký xe ô tô' },
                                            { value: '2', label: 'GCN đăng ký PTVT' },
                                            { value: '3', label: 'GCN kiểm định' },
                                            { value: '4', label: 'GCN bảo hiểm' },
                                            { value: '5', label: 'GCN xuất xứ' },
                                            { value: '6', label: 'Khác' },
                                          ]}
                                        />
                                        <Input placeholder="Nhập GCN khác" />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Checkbox
                                      required
                                      className="checkbox_type_customer w-full"
                                      options={[
                                        { value: 'S02', label: 'Tờ khai' },
                                      ]}
                                    />
                                  </Grid>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container >
                                      <Grid item xl={9} className="flex ml-4">
                                        <Checkbox
                                          required
                                          className="checkbox_type_customer"
                                          sx={{
                                            ".checkbox_type_customer": {
                                              width: "auto"
                                            }
                                          }}
                                          options={[
                                            { value: '7', label: 'Tờ khai hải quan' },
                                            { value: '8', label: 'Tờ khai nguồn gốc' },
                                            { value: '9', label: 'Khác' },
                                          ]}
                                        />
                                        <Input placeholder="Nhập tờ khai khác" />
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Checkbox
                                      required
                                      className="checkbox_type_customer w-full"
                                      options={[
                                        { value: 'S03', label: 'Hợp đồng' },
                                      ]}
                                    />
                                  </Grid>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container >
                                      <Grid item xl={9} className="flex ml-4">
                                        <Checkbox
                                          required
                                          className="checkbox_type_customer"
                                          sx={{
                                            ".checkbox_type_customer": {
                                              width: "auto"
                                            }
                                          }}
                                          options={[
                                            { value: '10', label: 'Hợp đồng thương mại' },
                                            { value: '11', label: 'Hợp đồng mua bán' },
                                            { value: '12', label: 'Hóa đơn (Invoice)' },
                                            { value: '13', label: 'Khác' },
                                          ]}
                                        />
                                        <Input placeholder="Nhập hợp đồng khác" />
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Checkbox
                                      required
                                      className="checkbox_type_customer w-full"

                                      options={[
                                        { value: 'S04', label: 'Hóa đơn' },
                                      ]}
                                    />
                                  </Grid>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container  >
                                      <Grid item xl={9} className="flex ml-4">
                                        <Checkbox
                                          required
                                          className="checkbox_type_customer"
                                          sx={{
                                            ".checkbox_type_customer": {
                                              width: "auto"
                                            }
                                          }}
                                          options={[
                                            { value: '14', label: 'Hóa đơn tài chính' },
                                            { value: '15', label: 'Khác' },
                                          ]}
                                        />
                                        <Input fullWidth={false} placeholder="Nhập hóa đơn khác" />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="2. Số giấy đăng ký/HSPL"
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="3. Tình trạng PTVT"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="4. Số khung"
                                    />
                                  </Grid>
                                  <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="5. Số máy"
                                    />
                                  </Grid>
                                  <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="6. Biển số đăng ký"
                                    />
                                  </Grid>
                                  <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="7. Mô tả tài sản"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Input
                                      label="8. Chất lượng còn lại thẩm định"
                                      required
                                    />
                                  </Grid>
                                </Grid>

                              </CardInside>
                            </div>
                          </Tabs>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
    <Divider className='mt-5' />
    <ModalOwnerInfo
      open={isOpenDetail}
      onClose={handleOpenModal}
    />
  </Fragment >
}

export default DetailsTransport;