import Grid from "@mui/material/Grid";
import { FC, useState } from "react";
import Select from "views/components/base/Select";
import CashMethod from "./Method/Cash";
import TransferMethod from "./Method/Transfer";

const MethodDisbursement: FC = () => {

  const [ type, setType ] = useState<string>('1');

  const handleChangeMethod = (value: string) => {
    switch (value) {
      case '1':
        return setType("1")
      case '2':
        return setType("2")
      case '3':
        return setType("3")
      default:
        return setType("1")
    }
  }

  return (
    <>
      <span
        style={{
          fontSize: "19px",
          fontWeight: 'bold',
          color: "#353535",
          // marginBottom: '6px',
          textTransform: 'uppercase',
        }}
      >
        B. Phương thức giải ngân
      </span>
      <Grid container spacing={3}>
        <Grid item xl={3} md={3}>
          <Select
            label="1. Phương thức giải ngân"
            required
            onChange={handleChangeMethod}
            options={[
              { label: 'Tiền mặt', value: '1' },
              { label: 'Chuyển khoản', value: '2' },
              { label: 'Tiền mặt và chuyển khoản', value: '3' },
            ]}
            value="1"
          />
        </Grid>
        <Grid item xl={12} md={12}>
          {(() => {
            if(type === "1"){
              return <CashMethod type="1" />
            } else if(type === "2"){
              return <TransferMethod type="2" />
            } else {
              return <>
                <CashMethod type="3" />
                <TransferMethod type="3" />
              </>
            }
          })()}
        </Grid>
      </Grid>
    </>
  );
};

export default MethodDisbursement;
