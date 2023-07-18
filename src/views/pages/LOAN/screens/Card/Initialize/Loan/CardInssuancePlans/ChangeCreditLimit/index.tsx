import { Grid, Typography } from "@mui/material"
import { FC, useRef, useState } from "react"
import { FaCreditCard } from "react-icons/fa";
import Checkbox, { CheckboxOption, CheckboxRef } from "views/components/base/Checkbox";
import Input from "views/components/base/Input";
import Radio, { RadioOption } from "views/components/base/Radio";
import Select from "views/components/base/Select";
import CardInside from "views/components/layout/CardInside";
import ObjectList from "views/components/layout/ObjectList"
import Signature from "./Signature";
import ChangeCreditLimitStyles from "./style";

const ChangeCreditLimit: FC = () => {
  const classes = ChangeCreditLimitStyles();
  const [isChangeCreditLimit, setChangeCreditLimit] = useState<boolean>(true);
  const typeRef = useRef<CheckboxRef>(null);

  const optionsType: CheckboxOption[] = [{ label: "Hạn mức thẻ chính thức", value: "1", checked: true },
  { label: "Hạn mức thẻ tạm thời", value: "2", checked: false },
  { label: "Hạn mức bảo đảm thẻ", value: "3", checked: true }
  ];

  const handleChangeType = () => {
    // const checkedArr = typeRef.current?.getChecked()
    // setChangeType(checkedArr[0]);
  }
  const handleChangeCreditLimit = () => {
    setChangeCreditLimit(!isChangeCreditLimit)
  }

  const CardData: RadioOption[] = [
    { value: "YES", label: "Có thay đổi" },
    { value: "NO", label: "Không thay đổi" },
  ];
  return (
    <Grid container rowSpacing="20px" columnSpacing="20px" className={`pt-5`}>
      <Grid item xl={12} md={12} xs={12} className={classes.labelObjectList}>
        <Grid container>
          <Typography component="h6" className={`text-14`}>
            1. Chọn thẻ tín dụng <span className="text-danger">*</span>
          </Typography>
          <Grid item xl={10} md={10} xs={10}>
            <ObjectList
              options={[
                { label: "Thẻ tín dụng 1", circle: <FaCreditCard /> },
                { label: "Thẻ tín dụng 2", circle: <FaCreditCard /> },
              ]}
              className={classes.collaretalObjList}
              enableLength={false}
              enableMenu={false}
              onAdd={() => { }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
        <Input required label="2. Số tài khoản thẻ" />
      </Grid>
      <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
        <Input required label="3. Loại thẻ" />
      </Grid>
      <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
        <Input required label="4. Hạn mức thẻ (VND)" />
      </Grid>
      <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
        <Input required label="5. Hiệu lực thẻ" />
      </Grid>
      <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
        <Input required label="6. Hình thức đảm bảo thẻ hiện tại" />
      </Grid>
      <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
        <Input required label="7. Hạn mức tổng hiện tại (VND)" />
      </Grid>
      <Grid item xl={3} md={12} xs={12} className={classes.inputLabel}>
        <Input required label="8. Hạn mức tổng đề xuất" />
      </Grid>
      <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
        <Typography component="h6" className={`text-14 font-medium w-full`}>
          9. Hình thức thay đổi <span className="text-danger">*</span>
        </Typography>
        <Checkbox
          required
          className="checkbox_type_customer w-full"
          name="changeType"
          options={optionsType}
          ref={typeRef}
          onChange={handleChangeType}
        />
      </Grid>
      <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
        <Grid container columnSpacing="20px" rowSpacing="20px" >
          <Grid item xl={4} md={12} xs={12}>
            <CardInside title="I. Hạn mức thẻ chính thức" className={classes.CardInfo}>
              <Grid container columnSpacing="20px">
                <Grid item xl={12} md={12} xs={12} className={`${classes.inputLabel} mscb-input`}>
                  <Radio
                    label='1. Có thay đổi hạng mức thẻ hay không?'
                    variant="checkbox"
                    name="maincard"
                    options={CardData}
                    onChange={handleChangeCreditLimit}
                    value={CardData[0].value}
                  />
                </Grid>
                {isChangeCreditLimit ? (
                  <>
                    <Grid item xl={6} md={12} xs={12}>
                      <Select required label="2. Hạng mới" options={[]} />
                    </Grid>
                    <Grid item xl={6} md={12} xs={12}>
                      <Input required format={true} label="3. Hạn mức thẻ (VND)" />
                    </Grid>
                  </>
                ) : <Grid item xl={6} md={12} xs={12}>
                  <Input required format={true} label="2. Hạn mức thẻ" />

                </Grid>}
              </Grid>
            </CardInside>
          </Grid>
          <Grid item xl={4} md={12} xs={12}>
            <CardInside title="II. Hình thức bảo đảm thẻ" className={classes.CardInfo}>
              <Grid container columnSpacing="20px" rowSpacing="10px">
                <Grid item xl={12} md={12} xs={12}>
                  <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                  <span className={classes.titleCard} >THẺ CŨ</span>
                </Grid>
                <Grid item xl={6} md={6} xs={12}>
                  <Select required label="1. Hình thức bảo đảm" options={[]} />
                </Grid>
                <Grid item xl={6} md={6} xs={12}>
                  <Input required label="2. Hạn mức thẻ (VND)" />
                </Grid>
                <Grid item xl={12} md={12} xs={12}>
                  <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                  <span className={classes.titleCard} >THẺ MỚI</span>
                </Grid>
                <Grid item xl={6} md={6} xs={12}>
                  <Select required label="1. Hình thức bảo đảm" options={[]} />
                </Grid>
                <Grid item xl={6} md={6} xs={12}>
                  <Input required label="2. Hạn mức thẻ (VND)" />
                </Grid>
              </Grid>
            </CardInside>
          </Grid>
          <Grid item xl={4} md={12} xs={12}>
            <Signature />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

}
export default ChangeCreditLimit