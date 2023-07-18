import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import { useSelector } from 'react-redux';
import {  getLOANApprovalFullICRTarget } from 'features/loan/normal/storageApproval/selectors';
import { _calculateAge } from 'views/pages/LOAN/utils';
import ButtonAttachFile from 'views/components/base/ButtonAttachFile';
import AttachmentModalServices from './AttachmentModalServices';
import { getLOANApprovalICRoDocument } from 'features/loan/normal/storageApproval/icr/selector';

const ICRTargets: FC = () => {

  const [isOpen, setOpenAttachModal] = useState<boolean>(false);

  const ICRData = useSelector(getLOANApprovalFullICRTarget)
  const attachment =  useSelector(getLOANApprovalICRoDocument)

  return <>
    <Box component="div" className='flex items-center'>
      <Typography variant="h4" component="h4" className="flex items-center">
      <Box className='font-bold text-20 text-upper'>
        A. Bộ CHỈ TIÊU
      </Box>
      <Box className='ml-5'>

        <ButtonAttachFile
        attachment={attachment.count}
        onClick={() => setOpenAttachModal(true)}
        />
      </Box>
      </Typography>
    </Box>
    <CardInside 
      title="I. Thông tin chung"
      classBody="p-6" 
      fieldsetClass="px-4" 
      titleClass="px-2"  
    >
      <Grid container spacing={ 3 }>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="1. Năm sinh (Tuổi)"
            value={(ICRData?.year_of_birth.toString()+ ' - ' + _calculateAge(ICRData?.year_of_birth.toString() ?? '').toString() + ' tuổi') ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="2. Trình độ học vấn"
            value={ICRData?.academic_level ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="3. Số người phụ thuộc"
            value={ICRData?.number_of_dependents?.toString() ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="4. Tình trạng hôn nhân"
            value={ICRData?.marital_status ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="5. Tình trạng sở hữu"
            value={ICRData?.ownership_status ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="6. Thời gian ở địa chỉ hiện tại"
            value={ICRData?.time_at_current_address ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="7. Vị trí công việc"
            value={ICRData?.position ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="8. Sử dụng dịch vụ thẻ tại SCB"
            value={ICRData?.use_card_service_scb ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="9. Nhận lương qua tài khoản"
            value={ICRData?.receive_money_via_account ? 'Có': 'Không' ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="10. Có QHTD với SCB và các NH khác ở thời điểm vay"
            value={ICRData?.credit_relations ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="11. Uy tín trong quan hệ tín dụng (3 năm gần nhất)"
            value={ICRData?.prestige_credit_relations ?? ''}
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="12. Thu nhập sau thuế bình quân tháng (VND)"
            value={ICRData?.after_tax_income?.toString() ?? ''}
            format
            type='number'
            disabled
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="13. Chi tiêu hàng tháng (VND)"
            value={ICRData?.monthly_spending?.toString() ?? ''}
            format
            type='number'
            disabled
          />
        </Grid>
      </Grid>
    </CardInside>
    {isOpen && (
        <AttachmentModalServices
          open={Boolean(isOpen)}
          onClose={() => setOpenAttachModal(false)}
        />
      )}
  </>

}

export default ICRTargets;