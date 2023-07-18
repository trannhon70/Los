import Grid from "@mui/material/Grid";
import { FC, useEffect, useState } from "react";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import addressInfoStyle from "./style";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Input from "views/components/base/Input";
import SelectLocation from "views/components/widgets/SelectLocation";
import ModalAddress from "views/pages/LOAN/widgets/ModalAddress";

const AddressInfo: FC = () => {
  const classes = addressInfoStyle();

  const [openModal, setOpenModal] = useState(false);
  const [modalAdd, setModalAdd] = useState<boolean | null>(null);

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [modalAdd]);

  const clickList = () => {
    setModalAdd(false);
  };

  const clickAddAddress = () => {
    setModalAdd(true);
  };

  const onCloseModal = () => {
    setModalAdd(null);
  };

  const onChangeModal = () => setModalAdd(true);

  return (
    <CardInside title="IV. Thông tin địa chỉ" className={clsx(classes.root)}>
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
          <Input label="1. Cư trú" required />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
          <Input label="2. Location" required />
        </Grid>
        <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
          <Input
            label="3. Thời hạn còn lại ở VN (người nước ngoài)/Địa chỉ hiện tại (năm)"
            required
          />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Divider />
        </Grid>
        <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
          <SelectLocation
            before={
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="1. Địa chỉ thường trú"
                required={true}
                // value={ permanent?.apartment }
                // onDebounce={ changeApartment(AddressType.PERMANENT) }
                // disabled={ disablePermanent }
                // message={ getMessage('borrower', 'permanentAddressApartment') }
                />
              </Grid>
            }
            label={[
              "2. Tỉnh/TP",
              "3. Quận/huyện",
              "4. Phường/xã"
            ]}
            // value={{
            //   country: National,
            //   province: permanent?.province ?? '',
            //   district: permanent?.district ?? '',
            //   ward: permanent?.ward ?? ''
            // }}
            // message={[
            //   getMessage('borrower', 'permanentAddressProvince'),
            //   getMessage('borrower', 'permanentAddressDistrict'),
            //   getMessage('borrower', 'permanentAddressWard')
            // ]}
            required={[ true, true, true ]}
            col={6}
          // disabled={ disablePermanent }
          // onChange={ changeLocation(AddressType.PERMANENT) }
          />
        </Grid>

        <Grid item xl={12} md={12} xs={12}>
          <Divider />
        </Grid>

        <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
          <SelectLocation
          before={
            <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
              <Input
                label="1. Địa chỉ liên hệ"
                required
                // value={ temp?.apartment }
                // onDebounce={ changeApartment(AddressType.TEMP) }
                // message={ getMessage('borrower', 'tempAddressApartment') }
              />
            </Grid>
          }
          label={[
            "2. Tỉnh/TP",
            "3. Quận/huyện",
            "4. Phường/xã"
          ]}
          // value={{
          //   country: National,
          //   province: temp?.province ?? '',
          //   district: temp?.district ?? '',
          //   ward: temp?.ward ?? ''
          // }}
          // message={[
          //   getMessage('borrower', 'tempAddressProvince'),
          //   getMessage('borrower', 'tempAddressDistrict'),
          //   getMessage('borrower', 'tempAddressWard')
          // ]}
          required={[ true, true, true ]}
          col={ 6 }
          // onChange={ changeLocation(AddressType.TEMP) }
        />
        </Grid>

        <Grid item xl={12}>
          <Divider />
        </Grid>

        <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
          <Input label="1. Tên đơn vị công tác" />
        </Grid>
        <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
          <SelectLocation
          before={
            <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
              <Input
                label="2. Địa chỉ đơn vị công tác"
                // value={ temp?.company }
                // onDebounce={ changeCompany(AddressType.COMPANY) }
                // message={ getMessage('borrower', 'tempAddressApartment') }
              />
            </Grid>
          }
          label={[
            "3. Tỉnh/TP",
            "4. Quận/huyện",
            "5. Phường/xã"
          ]}
          // value={{
          //   country: National,
          //   province: company?.province ?? '',
          //   district: company?.district ?? '',
          //   ward: company?.ward ?? ''
          // }}
          // message={[
          //   getMessage('borrower', 'tempAddressProvince'),
          //   getMessage('borrower', 'tempAddressDistrict'),
          //   getMessage('borrower', 'tempAddressWard')
          // ]}
          required={[ true, true, true ]}
          col={ 6 }
          // onChange={ changeLocation(AddressType.COMPANY) }
        />
        </Grid>
        <Grid
          item
          xl={12}
          md={12}
          xs={12}
          className={`flex justify-end ${classes.buttonList}`}
        >
          <Button onClick={clickList} variant="contained" >
            Danh sách
          </Button>
          <ModalAddress
            open={openModal}
            add={!!modalAdd}
            onClose={onCloseModal}
            screen=""
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default AddressInfo;
