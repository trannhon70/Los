import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { fetchCif } from 'features/loan/normal/storage/legal/actions';
import { dataBorrowerInfomation } from 'features/loan/normal/storage/legal/selectors';
import { getProfileDocument } from 'features/loan/normal/storage/ProfileDocument/action';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import moment from 'moment';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { formatNumber } from 'utils';
import { APP_DATE_FORMAT } from 'utils/constants';
import { timestampToDate } from 'utils/date';
import Input from 'views/components/base/Input';
import TextTooltip from 'views/components/base/TextTooltip';
import CardInside from 'views/components/layout/CardInside';
import CardOutside from 'views/components/layout/CardOutside';
import Empty from 'views/components/layout/Empty';
import IconCopy from 'views/components/layout/IconCopy';
import Tabs from 'views/components/layout/Tabs';
import ProfileDocument from './ProfileDocument';
export interface CustomerInfoProps {
  className?: string;
}

const CustomerInfo: FC<CustomerInfoProps> = props => {
  const { className } = props;
  const dataInfo = useSelector(dataBorrowerInfomation);
  const currentDate = moment(moment().format(APP_DATE_FORMAT), APP_DATE_FORMAT)
  const createDate = moment(timestampToDate(dataInfo.created_at ?? 0), APP_DATE_FORMAT)

  const params = useParams() as ILOANURLParams;
  const dispatch = useDispatch()
  const [cif, setCif] = useState<string>("")
  const ruleDisabled = useSelector(getRuleDisbled)
  const los_id = useSelector(getLOANNormalLOSId)

  // const getRuleDisabledForCif = () => {
  //   if(params.stage === "init" && params['*'] === 'legal/borrower' && !ruleDisabled){
  //     return false
  //   }
  //   return true
  // }

  const ruleDisabledForCif = !(params.stage === "init" && params['*'] === 'legal/borrower' && !ruleDisabled)

  useEffect(() => {
    if(dataInfo.cif){
      setCif(dataInfo.cif)
    }
  },[dataInfo.cif])

  useEffect(() => {
    if(!dataInfo.cif){
      setCif("")
    }
    else {
      setCif(dataInfo.cif)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ruleDisabledForCif]) 

  
  const handleChangeCif = (value: string) => {
    setCif(value)
  }

  const handleCifKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      onPostCif()
    }
  }
  const onPostCif = () => {
    if(cif) {
      dispatch(fetchCif(cif))
    }
  }

  const handleClickFecthFireDashboard = (current: number, next: number) =>{
    if (next === 1 && los_id !== "") {
      dispatch(getProfileDocument(los_id));  
    }
    return true;
  }

  return <CardOutside label="THÔNG TIN KHÁCH HÀNG" className={className}>
    <div className="flex justify-between">
      <div className="flex">
        <Avatar sx={{ width: '4.25rem', height: "4.25rem", borderWidth: '2px', borderStyle: 'solid' }} className="bd-warning">
          {dataInfo.basicInfo.fullname.substr(0, 1).toUpperCase()}
        </Avatar>
        <div className="ml-3">
          <div className="text-warning text-upper font-medium">
            {dataInfo.basicInfo.fullname ? dataInfo.basicInfo.fullname : "-"}
            <span> [ {dataInfo.basicInfo.gender === "F" ? <i className="fas fa-female" /> :
              dataInfo.basicInfo.gender === "M" ? <i className="fas fa-male" /> : null} ]</span>
          </div>
          <div>
            <i className="tio-email" />
            <span className="ml-2">{dataInfo.basicInfo.email ? dataInfo.basicInfo.email : "-"}</span>
          </div>
          <div>
            <i className="fas fa-phone-alt" />
            <span className="ml-2">{dataInfo.basicInfo.mobile ? dataInfo.basicInfo.mobile : "-"}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Button variant="outlined" className="bd-danger rounded-0 text-small text-danger text-normal">
          Diamond Plus
        </Button>
      </div>
    </div>
    <Tabs className="tabs-bg mt-3" variant="fullWidth" uppercase={false} 
      beforeChange={handleClickFecthFireDashboard} 
      tabs={[
      'Thông tin cơ bản',
      'Tài liệu hồ sơ',
      'Ghi chú',
      'Preferences'
    ]}>
      <Grid container spacing={3} className="w-full">
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <CardInside title="Hồ sơ khách hàng" titleClass="overflow-ellipsis" classBody="px-3 pb-5 card-tabs-info">
            <div className="flex">
              <div>
                <i className="fas fa-id-card-alt text-primary" />
              </div>
              <div className="ml-1 w-full">
                <div className="text-upper">CIF</div>
                <div className="flex justify-between">
                  <Input 
                    value={cif}
                    onChange={handleChangeCif}
                    onKeyup={handleCifKeyup}
                    disabled={ruleDisabledForCif}
                  />
                  {
                    !ruleDisabledForCif && <Button className='search-btn' onClick={onPostCif}>
                    <VscSearch size={18} className="icon-search"/>
                  </Button>
                  }
                  
                </div>
              </div>
            </div>
            <div className="flex mt-4">
              <div>
                <i className="fas fa-id-card text-primary" />
              </div>
              <div className="ml-1 w-full">
                <div className="text-upper">CMND/CCCD/Hộ chiếu</div>
                <div className="text-primary">{dataInfo?.indetity?.num}</div>
              </div>
            </div>
            <div className="flex mt-4">
              <div>
                <i className="fas fa-file text-primary" />
              </div>
              <div className="ml-1 w-full">
                <div className="flex justify-between">
                  <div className="text-upper">IDLOS</div>
                  <div>
                    <IconCopy className="mr-2" />
                  </div>
                </div>
                <div className="text-primary">{dataInfo.los_uuid ? dataInfo.los_uuid : "-"}</div>
              </div>
            </div>
          </CardInside>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <CardInside title="Thông tin sản phẩm" titleClass="max-w-full overflow-ellipsis" classBody="px-3 pb-5 card-tabs-info">
            <div className="flex">
              <div>
                <i className="fas fa-money-bill text-primary" />
              </div>
              <div className="ml-1 w-full">
                <div className="text-upper">Nhóm sản phẩm</div>
                <div className="text-primary"><TextTooltip>{dataInfo.productInfo.categoty?.product_category_name ? dataInfo.productInfo.categoty?.product_category_name : "-"}</TextTooltip></div>
              </div>
            </div>
            <div className="flex mt-4">
              <div>
                <i className="fas fa-gift text-primary" />
              </div>
              <div className="ml-1 w-full">
                <div className="text-upper">Sản phẩm/Chương trình</div>
                <div className="text-primary"><TextTooltip>{dataInfo.productInfo.type?.product_type_name ? dataInfo.productInfo.type?.product_type_name : "-"}</TextTooltip></div>
              </div>
            </div>
            <div className="flex mt-4">
              <div>
                <i className="fas fa-crown text-primary" />
              </div>
              <div className="ml-1 w-full">
                <div className="text-upper">Chi tiết sản phẩm</div>
                <div className="text-primary"><TextTooltip>{dataInfo.productInfo.detail?.product_detail_name ? dataInfo.productInfo.detail?.product_detail_name : "-"}</TextTooltip></div>
              </div>
            </div>
          </CardInside>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <CardInside
            className="h-full mt-0"
            fieldsetClass="bd-danger shadow card-tabs-info fieldset-tabs-info"
            classBody="px-5 pt-0 items-center flex h-full"
          >
            <div>
              <div>
                <div className="text-upper">Số tiền (VNĐ)</div>
                <div className="text-danger font-bold number-tabs-info">{dataInfo.loanInfo.totalMoneyLOAN ? formatNumber(dataInfo.loanInfo.totalMoneyLOAN.toString()) : "-"}</div>
              </div>
              <div className="mt-3">
                <div className="text-upper">Thời hạn (tháng)</div>
                <div className="text-primary font-bold number-tabs-info">{dataInfo.loanInfo.expiredCredit ? dataInfo.loanInfo.expiredCredit : "-"}</div>
              </div>
            </div>
          </CardInside>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="h-full" 
      >
        <Grid item className="wh-full" sx={{height:'245px' ,marginRight:'6px'}}> 
            <ProfileDocument />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="h-full">
        <Grid item className="wh-full">
          <Empty>
            Không có dữ liệu để hiển thị
          </Empty>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="h-full">
        <Grid item className="wh-full">
          <Empty>
            Không có dữ liệu để hiển thị
          </Empty>
        </Grid>
      </Grid>
    </Tabs>
    {/* <div className="staff-join-info mt-4">
      <div className="wh-full flex justify-end items-center">
        <div>ssss</div>
        <div className="underline text-small mr-5">Nhân sự tham gia: 10</div>
        <AvatarGroup max={4} className="mr-3">
          <Avatar sizes="40px" alt="Remy Sharp" />
          <Avatar sizes="40px" alt="Travis Howard" />
          <Avatar sizes="40px" alt="Cindy Baker" />
          <Avatar sizes="40px" alt="Agnes Walker" />
          <Avatar sizes="40px" alt="Trevor Henderson" />
          <Avatar sizes="40px" alt="Trevor Henderson" />
          <Avatar sizes="40px" alt="Trevor Henderson" />
          <Avatar sizes="40px" alt="Trevor Henderson" />
          <Avatar sizes="40px" alt="Trevor Henderson" />
          <Avatar sizes="40px" alt="Trevor Henderson" />
        </AvatarGroup>
      </div>
    </div> */}
    <div className="staff-join-info mt-4">
      <Grid container sx={{paddingTop:"10px"}}>
        <Grid item xl={4} sx={{
          "display": "flex",
          "justify-content": "start",
          paddingLeft: "20px"
        }}>
          <div style={{
            "display": "flex",
            alignItems: "center"
          }}>
            <span>Ngày khởi tạo:&nbsp;</span>
            <span className='text-primary fw-500'>
              {!dataInfo.created_at ? null : " " + timestampToDate(dataInfo.created_at ?? 0, '' + APP_DATE_FORMAT) ?? 0}
            </span>
          </div>
        </Grid>
        <Grid item xl={3} sx={{
          "display": "flex",
          "justify-content": "start",
          paddingLeft: "20px"
        }}>
          <div style={{
            "display": "flex",
            alignItems: "center"
          }}>
            <span>Số ngày đã xử lý:&nbsp;</span>
            <span className='text-primary fw-500'>
              {!dataInfo.created_at ? null : moment.duration(currentDate.diff(createDate)).asDays() ?  moment.duration(currentDate.diff(createDate)).asDays() : 0}
            </span>
          </div>

        </Grid>
        <Grid item xl={5} className="pl-10 justify-end" style={{display:"flex"}}>
          <div className="underline text-small mr-5" style={{
            "display": "flex",
            alignItems: "center"
          }}>Nhân sự tham gia: 1</div>
          <AvatarGroup max={4} className="mr-3">
            <Avatar sizes="40px" alt="Remy Sharp" />
          </AvatarGroup>
        </Grid>
      </Grid>
    </div>
  </CardOutside>

}

export default CustomerInfo;