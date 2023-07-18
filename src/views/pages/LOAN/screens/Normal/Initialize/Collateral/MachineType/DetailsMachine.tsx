
import { Box, Collapse, Grid, Tab, Tabs, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from 'app/hooks/useNotify';
import {
  addCollaretalRPRO,
  deleleteSubtypeItem,
  onChangeCollaretalRPRO,
  setCollaretalRPRO
} from 'features/loan/normal/storage/collateralV2/actions';
import {
  getLoanNormalSubTypeItems,
  getLoanNormalSubTypeItemsActive,
  getLoanNormalSubTypeItemsData, getValidateLOANNormalStorageCollateral
} from 'features/loan/normal/storage/collateralV2/selector';
import { FC, Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from "react-swipeable-views";
import {
  ILOANNormalCollateralData,
  ISubItems
} from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import Input from 'views/components/base/Input';
import Radio, { RadioRef } from 'views/components/base/Radio';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
import Empty from "views/components/layout/Empty";
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from "views/components/layout/ModalConfirm";
import TabPanel from "views/components/layout/TabPanel";
import SelectRightPropertyStatus from 'views/components/widgets/SelectRightPropertyStatus';
import LegalInfomationOwner from '../LegalInfomationOwner';
import collateralStyle, { SxCollateralTabs, SxCollatertalCommon } from '../style';
export interface DetailsMachineProps {
  open?: boolean;
  keyIndex: number;
  collateral?: ILOANNormalCollateralData;
  uuid: string;
}
const DetailsMachine: FC<DetailsMachineProps> = (props) => {

  const dispatch = useDispatch();
  const { collateral, uuid } = props
  const [openTable, setOpenTable] = useState(false);
  const getMessage = useNormalCollateralMessage();
  const toggleTable = () => setOpenTable(!openTable);
  const classes = collateralStyle();
  const notify = useNotify();
  const data = useSelector(getLoanNormalSubTypeItems(collateral?.uuidActiveData ?? '', uuid ?? '')) ?? []
  const dataActiveItems = useSelector(getLoanNormalSubTypeItemsActive(collateral?.uuidActiveData ?? '', uuid ?? ''))
  const valid = useSelector(getValidateLOANNormalStorageCollateral)
  const uuidActiveData = collateral?.uuidActiveData ?? "";

  const [CurrentTab, setCurrentTab] = useState(0);

  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  };
  const radioRef= useRef<RadioRef>(null)
  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  };


  const onAdd = () => {
    // dispatch(addCollaretalRPRO('', { uuid: collateral?.uuidActiveData ?? '', uuidActive: uuid }))
  }

  const onChangeDataDetails = (value: string | number | null, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: collateral?.uuidActiveData ?? '', uuidActive: uuid, key }))
  }

  const dataItems = useSelector(getLoanNormalSubTypeItemsData(collateral?.uuidActiveData ?? '', uuid ?? '', dataActiveItems ?? ''));

  const optionsData: IGroupListBase[] = data?.map((__, i) => ({
    value: i + 1,
    label: `Máy móc thiết bị ${i + 1}`,
    key: i + 1,
    valueMoney: formatNumber(__.value?.toString() ?? '')
  })) ?? [];

  const [deleteMachine, setDeleteMachine] = useState<ISubItems | null>(null);
  const onHandleCancelConfirmMachine = () => setDeleteMachine(null);

  const onHandleClickMenuMachine = (menu: IGroupListBase, position: number) => {
    let dataMenuCer = data?.find((cer, index) => index === position);
    setDeleteMachine(dataMenuCer ?? null);
  };

  const onHandleConfirmCer = () => {
    if (collateral?.uuidActiveData && uuid) {
      const dataPos = deleteMachine?.activeUUID
      dispatch(
        deleleteSubtypeItem(dataPos ?? "", {
          uuidData: collateral?.uuidActiveData ?? "",
          uuidSubType: uuid,
        })
      );
      notify("Xóa thành công", "success")
    }
    onHandleCancelConfirmMachine();
  };


  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data[current].activeUUID ?? ''
    dispatch(onChangeCollaretalRPRO(currentActive, { uuid: collateral?.uuidActiveData ?? '', uuidActive: uuid }))
  }
  const optionsDataPos = (data?.findIndex(d => d.activeUUID === dataActiveItems) ?? 0) + 1;


  // set item active khi validate
  useEffect(()=>{

    valid.valid === false && dispatch(onChangeCollaretalRPRO(valid.position as string, {uuid: collateral?.uuidActiveData ?? '',uuidActive: uuid,}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[valid])

  const elementInfomationLegal = () => {
    return (
      <>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" className='text-upper font-bold' gutterBottom component="div">
              A. Thông tin định giá và thẩm định tài sản
            </Typography>
          </Grid>
        </Grid>

        
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input
              label="1. Tỷ lệ cho vay tối đa theo quy định"
              placeholder="Nhập tỷ lệ cho vay tối đa theo quy định"
              required
              onDebounce={(val) => onChangeDataDetails(val, 'ratio')}
              value={dataItems?.ratio?.toString() ?? ''}
              type="number"
              format
              message={getMessage('ratio',{position:dataItems?.activeUUID?? '' })}
            />
          </Grid>
          <Grid item xl={4}>
            <Radio label="2. TS hiện đang đảm bảo cho nghĩa vụ CTD"
              ref={radioRef}
              options={[
                {
                  label: "Đang đảm bảo",
                  value: "Y",
                  checked:dataItems?.credit_extension_secured === 'Y'
                },
                {
                  label: "Không",
                  value: "N",
                  checked: dataItems?.credit_extension_secured === 'N'
                }
              ]}
              onChange={() => onChangeDataDetails(radioRef.current?.getValue().value ?? '', 'credit_extension_secured')}
              variant="checkbox"
              required />
          </Grid>
          <Grid item xl={5}>
            <Input label="3. Giá trị máy móc thiết bị (VNĐ)"
              type="number"
              format
              onDebounce={(val) => onChangeDataDetails(+val, 'value')}
              value={dataItems?.value?.toString() ?? ''}
              required 
              message={getMessage('value',{position:dataItems?.activeUUID?? '' })}
            />
          </Grid>
          <Grid item xl={12}>
            <TextArea label="4. Thông tin nghĩa vụ đang đảm bảo "
              placeholder='Nhập thông tin nghĩa vụ đang đảm bảo'
              onDebounce={(val) => onChangeDataDetails(val, 'info_collatetal')}
              value={dataItems?.info_collatetal ?? ''}
              required 
              message={getMessage('info_collatetal',{position:dataItems?.activeUUID?? '' })}
            />
          </Grid>
        </Grid>


        <Grid container className="mt-5">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" className='text-upper font-bold' gutterBottom component="div">
              B. Thông tin pháp lý
            </Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Tabs
              variant="scrollable"
              value={CurrentTab}
              indicatorColor="primary"
              onChange={changeTab}
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={SxCollateralTabs}
            >
              <Tab label="Thông tin pháp lý chủ sở hữu" />
              <Tab label="Thông tin pháp lý giấy chứng nhận" sx={{ borderLeft: "solid 1px #b5b5b5"}}/>
            </Tabs>
            <SwipeableViews
              disabled
              index={CurrentTab}
              onChangeIndex={handleTabPanel}
            >
              <TabPanel padding={false} value={CurrentTab} index={0}>
                <LegalInfomationOwner 
                  isFormLegalInfo={false}
                  activeSubType={uuid}
                  uuIdData={uuidActiveData}
                />
              </TabPanel>

              <TabPanel padding={false} value={CurrentTab} index={1}>
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                    <CardInside title="Thông tin cơ bản" fieldsetClass="px-4" classBody="h-full p-6" >
                      <Grid container spacing={3}>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="1. Loại tài sản"
                            placeholder='Nhập loại tài sản'
                            required
                            onDebounce={(val) => onChangeDataDetails(val, 'typeCollateral')}
                            value={dataItems?.typeCollateral}
                            message={getMessage('typeCollateral',{position:dataItems?.activeUUID?? '' })}
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="2. Số lượng từng loại"
                            placeholder='Nhập số lượng từng loại'
                            required
                            onDebounce={(val) => onChangeDataDetails(val, 'count')}
                            value={formatNumber(dataItems?.count?.toString()) ?? ''}
                            type="number"
                            message={getMessage('count',{position:dataItems?.activeUUID?? '' })}
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="3. Năm sản xuất"
                            placeholder='Nhập năm sản xuất'
                            required
                            onChange={(val) => onChangeDataDetails(val, 'year')}
                            value={dataItems?.year?.toString()}
                            type="number"
                            message={getMessage('year',{position:dataItems?.activeUUID?? '' })}
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="4. Nhãn hiệu"
                            placeholder='Nhập nhãn hiệu'
                            required
                            onDebounce={(val) => onChangeDataDetails(val, 'branch')}
                            value={dataItems?.branch ?? ''}
                            message={getMessage('branch',{position:dataItems?.activeUUID?? '' })}
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="5. Model (số loại)"
                            placeholder='Nhập model (số loại)'
                            required
                            onDebounce={(val) => onChangeDataDetails(val, 'model')}
                            value={dataItems?.model?.toString() ?? ''}
                            message={getMessage('model',{position:dataItems?.activeUUID?? '' })}
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="6. Nơi sản xuất/lắp ráp"
                            placeholder='Nhập nơi sản xuất/lắp ráp'
                            required
                            onDebounce={(val) => onChangeDataDetails(val, 'production')}
                            value={dataItems?.production?.toString() ?? ''}
                            message={getMessage('production',{position:dataItems?.activeUUID?? '' })}
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
                            placeholder='Nhập CLCL thẩm định'
                            onDebounce={(val) => onChangeDataDetails(val, 'CLCL')}
                            value={dataItems?.CLCL?.toString() ?? ''}
                            type="number"
                            format
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="2. Số giấy tờ đăng ký"
                            placeholder='Nhập số giấy giờ đăng ký'
                            onDebounce={(val) => onChangeDataDetails(val, 'number_register')}
                            value={dataItems?.number_register?.toString() ?? ''}

                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <SelectRightPropertyStatus
                            label="3. Tình trạng tài sản"
                            placeHolder="Chọn tình trạng tài sản"
                            onChange={(val) => onChangeDataDetails(val, 'status')}
                            value={dataItems?.status?.toString() ?? ''}
                            typeProperty="MMTB"
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="4. Mô tả tài sản"
                            placeholder='Nhập mô tả tài sản'
                            onDebounce={(val) => onChangeDataDetails(val, 'description')}
                            value={dataItems?.description?.toString() ?? ''}
                          />
                        </Grid>
                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                          <Input
                            label="5. Số lượng (chiếc)"
                            placeholder='Nhập số lượng (chiếc)'
                            required
                            onDebounce={(val) => onChangeDataDetails(val, 'quantity')}
                            value={dataItems?.quantity?.toString() ?? ''}
                            type="number"
                            format
                          />
                        </Grid>
                      </Grid>

                    </CardInside>
                  </Grid>
                </Grid>
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>
      </>
    );
  };

  return <Fragment>
    <TableRow>
      <TableCell width={'20%'}>
        <Typography sx={SxCollatertalCommon}>Máy móc thiết bị</Typography>
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
        <Collapse sx={{
          '& .MuiCollapse-wrapper': {
            "& .MuiCollapse-wrapperInner": {
              paddingLeft: "0px !important"
            }
          }
        }} in={openTable} unmountOnExit>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Grid container columnSpacing="20" rowSpacing="20">
                    <Grid item xl={2} className={classes.groupListBase}>
                      <GroupListBase
                        labelAdd='Thêm máy móc thiết bị'
                        onAdd={onAdd}
                        isValueMoney
                        onDelete={onHandleClickMenuMachine}
                        isDelete
                        activeId={optionsDataPos}
                        onSelected={onSelectGroupList}
                        options={optionsData}
                        className="group-list"
                      />
                    </Grid>
                    <Grid item xl={10}>
                      {
                        data.length === 0 ? (
                          <Empty> Không có dữ liệu </Empty>
                        ) : (
                          elementInfomationLegal()
                        )
                      }
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