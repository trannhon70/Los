import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Grid from '@mui/material/Grid';
import { FC, useState } from "react";
import { AiOutlineFileWord } from "react-icons/ai";
import { IPerson } from "types/models/loan/normal/storage/CollaretalV2";
import Input from 'views/components/base/Input';
import InputDate from "views/components/base/InputDate";
import CardInside from 'views/components/layout/CardInside';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import ModalOwnerInfo from '../../ModalOwnerInfo';
import { SxObjectListUser } from "../../style";
const LegalInfomationCertificateMacket: FC = () => {

  const [isOpen, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(!isOpen);
  }
  const onAddCre = () => {
  }
  const optionsCer: ObjectListOption[] = [{
    label: `Giấy chứng nhận 1`,
    circle: <AiOutlineFileWord />
  }, {
    label: `Giấy chứng nhận 2`,
    circle: <AiOutlineFileWord />,
  }]


  const onChangeCre = (current: number) => {
  }

  const onAddCreUseListLegal = () => {
  }

  const optionsCerUseListLegal: ObjectListOption[] = [{
    label: `USER 1`,
    circle: <PersonOutlineIcon />
  }, {
    label: `USER 2`,
    circle: <PersonOutlineIcon />,
  }]


  const onChangeCrePersionListLegal = (current: number) => {
  }


  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <ObjectList
          enableAdd={true}
          enableMenu={false}
          labelLength="Số lượng GCN: &nbsp;"
          onAdd={onAddCre}
          onChange={onChangeCre}
          current={0}
          options={optionsCer}
        />
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <CardInside
          title="I. Pháp lý chợ/ô sạp/TTTM"
          sx={{
            "& legend": {
              fontSize: '16px'
            }
          }}
        >
          <Grid container spacing={3} className="pl-4 pb-4">
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ObjectList
                enableAdd={true}
                enableMenu={true}
                onAdd={onAddCreUseListLegal}
                onChange={onChangeCrePersionListLegal}
                labelLength="Người sở hữu: &nbsp;"
                current={0}
                options={optionsCerUseListLegal}
                sx={SxObjectListUser}
                menu={[{
                  label: "Chi tiết",
                  value: "1"
                }]}
                onClickMenu={handleOpenModal}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="2. Tên GCN"
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="3. Số GCN"
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="5. Ngày cấp"
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="6. Nơi cấp"
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="5. Tên hợp đồng thuê/mua địa điểm KD"
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="6. Số hợp đồng thuê/mua địa điểm KD"
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="7. Ngày ký kết"
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="8. Bên cho thuê/mua địa điểm kinh doanh"
                required
              />
            </Grid>
          </Grid>
        </CardInside>
        <ModalOwnerInfo open={isOpen}
          onClose={handleOpenModal} />
      </Grid>
    </Grid>
  )
}

export default LegalInfomationCertificateMacket;

