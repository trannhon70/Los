import { Box, Collapse, Divider, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNotify from 'app/hooks/useNotify';
import { FC, Fragment, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import {
  ISubItems
} from 'types/models/loan/normal/storage/CollaretalV2';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import Radio from 'views/components/base/Radio';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from "views/components/layout/ModalConfirm";
import Tabs from 'views/components/layout/Tabs';
import SelectRightPropertyStatus from 'views/components/widgets/SelectRightPropertyStatus';
import collateralStyle, { SxCollateralQSH } from '../style';



const DetailsMachine: FC = () => {

  const [openTable, setOpenTable] = useState(false);
  const toggleTable = () => setOpenTable(!openTable);
  const classes = collateralStyle();
  const notify = useNotify();

  const onAdd = () => {
  }

  const onChangeDataDetails = (value: string | number | null, key: keyof ISubItems) => {
  }


  const optionsData: IGroupListBase[] = [
    {
      value: 1,
      label: `Máy móc thiết bị 1`,
      key: 1,
      valueMoney: 100000
    },
    {
      value: 2,
      label: `Máy móc thiết bị 2`,
      key: 2,
      valueMoney: 2000000
    },
    {
      value: 3,
      label: `Máy móc thiết bị 3`,
      key: 3,
      valueMoney: 3000000
    },
    {
      value: 4,
      label: `Máy móc thiết bị 4`,
      key: 4,
      valueMoney: 40000000
    },
  ]


  const [deleteMachine, setDeleteMachine] = useState<ISubItems | null>(null);
  const onHandleCancelConfirmMachine = () => setDeleteMachine(null);

  const onHandleClickMenuMachine = (menu: IGroupListBase, position: number) => {

  };

  const onHandleConfirmCer = () => {

    notify("Xóa thành công", "success")
    onHandleCancelConfirmMachine();
  };


  const onSelectGroupList = (value: IGroupListBase) => {
  }


  const elementInfomationLegal = () => {
    return (
      <>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" gutterBottom component="div">
              A. Thông tin định giá và thẩm định tài sản
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input
              label="1. Tỷ lệ cho vay tối đa theo quy định"
              required
            />
          </Grid>
          <Grid item xl={4}>
            <Radio label="2. TS hiện đang đảm bảo cho nghĩa vụ CTD"
              options={[
                {
                  label: "Đang đảm bảo",
                  value: "1"
                },
                {
                  label: "Không",
                  value: "2"
                }
              ]}
              variant="checkbox"
              required />
          </Grid>
          <Grid item xl={5}>
            <Input label="3. Giá trị máy móc thiết bị (VNĐ)"
              required />
          </Grid>
          <Grid item xl={12}>
            <TextArea label="4. Thông tin nghĩa vụ đang đảm bảo "
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
                <CardInside title="Thông tin pháp lý giấy chứng nhận">
                  <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                    </Grid>
                  </Grid>
                </CardInside>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                    <CardInside title="Thông tin cơ bản" fieldsetClass="px-4" classBody="h-full p-6" >
                      <Grid container spacing={3}>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="1. Loại tài sản"
                            required
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="2. Số lượng từng loại"
                            required
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <InputDate
                            label="3. Năm sản xuất"
                            required
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="4. Nhãn hiệu"
                            required
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="5. Model (số loại)"
                            required
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="6. Nơi sản xuất/lắp ráp"
                            required
                          />
                        </Grid>
                      </Grid>

                    </CardInside>
                  </Grid>
                  <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                    <CardInside title="Thông tin pháp lý" fieldsetClass="px-4" classBody="h-full p-6" >
                      <Grid container spacing={3}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="1. CLCL thẩm định"
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="2. Số giấy tờ đăng ký"
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <SelectRightPropertyStatus
                            label="3. Tình trạng tài sản"
                            typeProperty="MMTB"
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="4. Mô tả tài sản"
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="5. Số lượng (chiếc)"
                            required
                          />
                        </Grid>
                      </Grid>

                    </CardInside>
                  </Grid>
                </Grid>
              </div>
            </Tabs>
          </Grid>
        </Grid>
      </>
    );
  };


  return <Fragment>
    <TableRow>
      <TableCell width={'20%'}>
        <Typography sx={SxCollateralQSH}>Máy móc thiết bị 1</Typography>
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
            <IoTrashOutline style={{ fontSize: '1.5rem' }} />
          </IconButton>
          <IconButton onClick={toggleTable}>
            <BiChevronDownCircle style={{ fontSize: '1.5rem' }} />
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
                    <Grid item xl={2} className={classes.groupListBase}>
                      <GroupListBase labelAdd='Thêm máy móc thiết bị'
                        onAdd={onAdd}
                        isValueMoney
                        onDelete={onHandleClickMenuMachine}
                        isDelete
                        activeId={0}
                        onSelected={onSelectGroupList}
                        options={optionsData}
                      />
                    </Grid>
                    <Grid item xl={10}>

                      {elementInfomationLegal()}

                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
    <ModalConfirm
      open={deleteMachine !== null}
      onClose={onHandleCancelConfirmMachine}
      onConfirm={onHandleConfirmCer}
    >
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa máy móc thiết bị
      </Box>
    </ModalConfirm>
  </Fragment>
}

export default DetailsMachine;