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
  deleleteSubItem,
  deleleteSubtypeItem,
  onChangeCollaretalRPRO,
  setCollapseSubType,
  setCollaretalRPRO,
  setSubType
} from 'features/loan/normal/storage/collateralV2/actions';
import { EDetailsTransport } from 'features/loan/normal/storage/collateralV2/case';
import {
  getLOANNormalCollapseSubType,
  getLOANNormalCollapseSubTypeId, getLoanNormalSubTypeItems,
  getLoanNormalSubTypeItemsActive,
  getLoanNormalSubTypeItemsData, getLoanNormalSubTypeItemsLegalDocs
} from 'features/loan/normal/storage/collateralV2/selector';
import { FC, Fragment, SyntheticEvent, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import {
  ISubItems
} from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import Empty from 'views/components/layout/Empty';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TabPanel from 'views/components/layout/TabPanel';
import SelectCountriesManufacture from 'views/components/widgets/SelectCountriesManufacture';
import SelectorVehicleDetail from 'views/components/widgets/SelectorVehicleDetail';
import SelectVehicleStatus from 'views/components/widgets/SelectVehicleStatus';
import SelectVehicleType from 'views/components/widgets/SelectVehicleType';
import LegalInfomationOwner from '../LegalInfomationOwner';
import collateralStyle, { SxCollateralQSH, SxCollateralTabs } from '../style';
import AssessmentTransportType from './Assessment';
import CheckBoxLegalDocs from './CheckBoxLegalDocs';
export interface DetailsTransportProps {
  open?: boolean;
  keyIndex: number;
  uuidData?: string;
  uuidSubtype?: string;
  certId?: string;
}
const DetailsTransport: FC<DetailsTransportProps> = (props) => {

  const { uuidData = "", uuidSubtype = "" } = props;
  const classes = collateralStyle();
  const dispatch = useDispatch();
  const notify = useNotify()
  const getMessage = useNormalCollateralMessage();
  const data = useSelector(getLoanNormalSubTypeItems(uuidData, uuidSubtype)) ?? []
  const dataActiveItems = useSelector(getLoanNormalSubTypeItemsActive(uuidData, uuidSubtype))
  const dataItems = useSelector(getLoanNormalSubTypeItemsData(uuidData, uuidSubtype, dataActiveItems ?? ''));
  const SubTypeId = useSelector(getLOANNormalCollapseSubTypeId(uuidData, uuidSubtype));
  const isCollapseSubType = useSelector(getLOANNormalCollapseSubType(uuidData, uuidSubtype));
  
  const [deleteTransport, setDeleteTransport] = useState<ISubItems | null>(null);
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [CurrentTab, setCurrentTab] = useState(0);
  const onHandleCancelConfirmTransport = () => setDeleteTransport(null);
  const onHandleClickMenuTransport = (menu: IGroupListBase,position:number) => {
    let dataMenuCer = data?.find((cer, index) => index === position);
    setDeleteTransport(dataMenuCer ?? null);
  };

  const onHandleConfirmCer = () => {
      const dataPos = deleteTransport?.activeUUID
      dispatch(
        deleleteSubtypeItem(dataPos ?? "", {
          uuidData: uuidData ?? "",
          uuidSubType: uuidSubtype ?? "",
        })
      );
      notify("Xóa thành công","success")
    
    onHandleCancelConfirmTransport();
  };

  const toggleTable = () => {

    if(SubTypeId.length === 0){
      notify("Vui lòng chọn loại tài sản", "warning");
    }
    else{
      dispatch(
        setCollapseSubType(uuidData, {
          uuidSubTypeActive: uuidSubtype,
        })
      );
    }
  };

  const onAdd = () => {
    // dispatch(addCollaretalRPRO('', { uuid: uuidData, uuidActive: uuidSubtype }))
  }

  const onChangeDataDetails = (value: string | number | null, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: uuidData, uuidActive: uuidSubtype, key }))
  }

  const optionsData: IGroupListBase[] = data?.map((__, i) => ({
    value: i + 1,
    label: `PTVT ${i + 1}`,
    key: i + 1,
    valueMoney: `${formatNumber(__?.value?.toString() ?? "0")} VNĐ`
  })) ?? []

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data[current].activeUUID ?? ''
    dispatch(onChangeCollaretalRPRO(currentActive, { uuid: uuidData, uuidActive: uuidSubtype }))
  }

  const onChangeSubTypeTransport =(value:string)=>{
    dispatch(setSubType(value, {uuidSubType: uuidSubtype, uuidData: uuidData}));

    setTimeout(() => dispatch(
      setCollapseSubType(uuidData, {
        uuidSubTypeActive: uuidSubtype,
      })
    ), 0.2)
  }
  const dataLegalDocs = useSelector(getLoanNormalSubTypeItemsLegalDocs(uuidData,uuidSubtype,dataActiveItems)) ?? []

  const optionsDataPos = (data?.findIndex(d => d.activeUUID === dataActiveItems) ?? 0) + 1;

  const onHandleOpenModal = () =>{
    setIsModalConfirm(!isModalConfirm);
  }

  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  }
  const onHandleDeleteSubType = () => {
    dispatch(deleleteSubItem(uuidSubtype, { uuidData: uuidData }))
    notify("Xóa thành công","success")
    onHandleCancelConfirm()
  };

  const _LayoutEmpty = () => {
    return (
      <Grid item xl={10}>
        <Empty>Không có dữ liệu</Empty>
      </Grid>
    )
  }

  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  };

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  };


  return <Fragment>
    <TableRow >
      <TableCell
        rowSpan={2}
        align='center'
        width={'2%'}
        sx={{ verticalAlign: 'top', fontSize: '16px', border: 'none' }}
      >
        1
      </TableCell>
      <TableCell 
        width={'20%'} 
        // sx={{
        //   paddingLeft:'12px',
        //   "& .colla-type":{
        //     minWidth:"245px",
        //     maxWidth:'245px'
        //   }
        // }}
      >
        <SelectVehicleType
          className="colla-type"
          sx={SxCollateralQSH}
          onChange={onChangeSubTypeTransport}
          value={SubTypeId ?? ""}
        />
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
          <IconButton onClick={onHandleOpenModal}>
            <IoTrashOutline style={{ fontSize: '1.5rem' }} />
          </IconButton>
          <IconButton onClick={toggleTable}>
            <BiChevronDownCircle style={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>

    <TableRow >
      <TableCell colSpan={5} className="p-0 " sx={{
        border: 'none',
        
      }}>
        <Collapse className='' sx={{
          '& .MuiCollapse-wrapper': {
            "& .MuiCollapse-wrapperInner": {
              paddingLeft: "0px !important"
            }
          }
        }} in={isCollapseSubType} unmountOnExit>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell >
                  <Grid container columnSpacing="20"  >
                    <Grid item xl={2} className={classes.groupListBase}>
                      <GroupListBase labelAdd='Thêm PTVT'
                        onAdd={onAdd}
                        className="group-list"
                        activeId={optionsDataPos}
                        onSelected={onSelectGroupList}
                        onDelete={onHandleClickMenuTransport}
                        options={optionsData}
                        isDelete
                        isValueMoney={true}
                      />
                    </Grid>
                    {
                      data?.length === 0 ?
                        _LayoutEmpty()
                        :
                        <Grid item xl={10}>
                          <AssessmentTransportType
                            uuidData={uuidData}
                            uuidSubtype={uuidSubtype}
                          />

                          <Grid container className="mt-7">
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
                                <Tab label="Thông tin pháp lý giấy chứng nhận" sx={{ borderLeft: "solid 1px #b5b5b5" }} />
                              </Tabs>
                              <SwipeableViews
                                disabled
                                index={CurrentTab}
                                onChangeIndex={handleTabPanel}
                              >
                                <TabPanel padding={false} value={CurrentTab} index={0}>
                                  <LegalInfomationOwner
                                    activeSubType={uuidSubtype}
                                    uuIdData={uuidData}
                                    isFormLegalInfo={false}
                                  />
                                </TabPanel>

                                <TabPanel padding={false} value={CurrentTab} index={1}>
                                  <CardInside title="Thông tin quyền tài sản" fieldsetClass="px-4" classBody="h-full p-6" >
                                    <Grid container spacing={3}>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        {
                                          SubTypeId === EDetailsTransport.NRVE ?
                                            <Input
                                              label="1. Loại phương tiện"
                                              placeholder="Nhập loại phương tiện"
                                              required
                                              value={(dataItems?.transportation_sub_type ?? '')}
                                              onDebounce={(val) => onChangeDataDetails(val, 'transportation_sub_type')}
                                              message={getMessage('transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
                                            />
                                            :
                                            <SelectorVehicleDetail
                                              label="1. Loại phương tiện"
                                              placeholder="Chọn loại phương tiện"
                                              required
                                              value={(dataItems?.transportation_sub_type ?? '')}
                                              onChange={(val) => {
                                                onChangeDataDetails(val, 'transportation_sub_type')
                                                if (val !== 'Khác' && dataItems?.other_transportation_sub_type !== '') {
                                                  onChangeDataDetails(null, 'other_transportation_sub_type')
                                                }
                                              }}
                                              transportType={SubTypeId}
                                              message={getMessage('transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
                                            />
                                        }
                                      </Grid>
                                      {SubTypeId === EDetailsTransport.NRVE
                                        ?
                                        null
                                        :
                                        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                          <Input
                                            label="2. Chi tiết loại phương tiện khác"
                                            placeholder="Nhập chi tiết loại phương tiện khác"
                                            required={SubTypeId === EDetailsTransport.NRVE ? false : (dataItems?.transportation_sub_type === "Khác" ? false : true)}
                                            value={(dataItems?.other_transportation_sub_type ?? '')}
                                            onDebounce={(val) => onChangeDataDetails(val, 'other_transportation_sub_type')}
                                            disabled={SubTypeId === EDetailsTransport.NRVE ? false : (dataItems?.transportation_sub_type === "Khác" ? false : true)}
                                            message={getMessage('other_transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
                                          />
                                        </Grid>}
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="3. Nhãn hiệu"
                                          placeholder="Nhập nhãn hiệu"
                                          required
                                          value={(dataItems?.branch ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'branch')}
                                          message={getMessage('branch', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="4. Model (số loại)"
                                          placeholder="Nhập model (số loại)"
                                          required
                                          value={(dataItems?.model ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'model')}
                                          message={getMessage('model', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                        <SelectCountriesManufacture
                                          label="5. Nơi sản xuất/lắp ráp"
                                          placeholder="Nhập nơi sản xuất/lắp ráp"
                                          required
                                          value={dataItems?.origin_of_production ?? ''}
                                          onChange={(val) => onChangeDataDetails(val, 'origin_of_production')}
                                          message={getMessage('origin_of_production', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="6. Nơi sản xuất/lắp ráp khác"
                                          placeholder="Nhập nơi sản xuất lắp ráp khác"
                                          required={dataItems?.origin_of_production === "OT" ? true : false}
                                          value={(dataItems?.other_origin_of_production ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'other_origin_of_production')}
                                          disabled={dataItems?.origin_of_production === "OT" ? false : true}
                                          message={getMessage('other_origin_of_production', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                    </Grid>

                                  </CardInside>
                                  <CardInside title="Thông tin pháp lý" fieldsetClass="px-4" classBody="h-full p-6" >
                                    <Grid container spacing={3}>
                                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <CheckBoxLegalDocs valueDocs={dataLegalDocs}
                                          uuidActiveData={uuidData}
                                          uuidActiveItem={dataActiveItems}
                                          uuidActiveSubType={uuidSubtype}
                                          message={getMessage('legal_document_types', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="2. Số giấy đăng ký/HSPL"
                                          placeholder="Nhập số giấy đăng ký/HSPL"
                                          // required
                                          value={(dataItems?.license ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'license')}
                                          message={getMessage('license', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <SelectVehicleStatus
                                          label="3. Tình trạng PTVT"
                                          placeholder="Chọn tình trạng PTVT"
                                          required
                                          value={(dataItems?.status ?? '')}
                                          onChange={(val) => onChangeDataDetails(val, 'status')}
                                          message={getMessage('status', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="4. Số khung"
                                          placeholder="Nhập số khung"
                                          // required
                                          value={(dataItems?.vehicle_identification_number ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'vehicle_identification_number')}
                                          message={getMessage('vehicle_identification_number', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="5. Số máy"
                                          placeholder="Nhập số máy"
                                          // required
                                          value={(dataItems?.engine_number ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'engine_number')}
                                          message={getMessage('engine_number', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="6. Biển số đăng ký"
                                          placeholder="Nhập biển số đăng ký"
                                          // required
                                          value={(dataItems?.license_plate ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'license_plate')}
                                          message={getMessage('license_plate', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="7. Mô tả tài sản"
                                          placeholder="Nhập mô tả tài sản"
                                          required
                                          value={(dataItems?.description ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'description')}
                                          message={getMessage('description', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="8. Chất lượng còn lại thẩm định"
                                          placeholder="Nhập chất lượng còn lại thẩm định"
                                          required
                                          type="number"
                                          format
                                          value={(dataItems?.CLCL?.toString() ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'CLCL')}
                                          message={getMessage('CLCL', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                    </Grid>
                                  </CardInside>
                                </TabPanel>
                              </SwipeableViews>
                            </Grid>
                          </Grid>
                        </Grid>
                    }
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>

    <ModalConfirm
      open={deleteTransport !== null}
      onClose={onHandleCancelConfirmTransport}
      onConfirm={onHandleConfirmCer}
    >
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa phương tiện vận tải
      </Box>
    </ModalConfirm>
    <ModalConfirm
      open={isModalConfirm}
      onClose={onHandleCancelConfirm}
      onConfirm={onHandleDeleteSubType}
    >
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa
      </Box>
    </ModalConfirm>
  </Fragment>
}

export default DetailsTransport;