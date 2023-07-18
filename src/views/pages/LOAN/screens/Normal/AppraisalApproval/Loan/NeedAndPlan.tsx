import { FC } from "react";
import Box from "@mui/material/Box";
import { TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import TableSticky from "views/components/layout/TableSticky";
import Input from "views/components/base/Input";
import TextArea from "views/components/base/TextArea";

const LOANNeedAndPlain: FC = () => {
  return (
    <Box className="mscb-input-table mscb-input-right">
      <Typography
        variant="h4"
        component="h4"
        className="font-bold text-upper mt-6 mb-3"
        sx={{
          fontSize: "19px",
        }}
      >
        BẢNG PHƯƠNG ÁN VAY VỐN
      </Typography>
      <TableSticky className="mscb-table mscb-table-border">
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} className="text-center" width={60}>
              STT
            </TableCell>
            <TableCell rowSpan={2} className="text-center" width={600}>
              Nội dung
            </TableCell>
            {/* <TableCell rowSpan={2} className="text-center" width={198}>
              Kỳ T-2
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell rowSpan={2} className="text-center" width={198}>
              Kỳ T-1
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell rowSpan={2} className="text-center" width={198}>
              Kỳ T<span className="text-danger"> (*)</span>
              <span className="font-normal"> (VNĐ)</span>
            </TableCell> */}
            <TableCell colSpan={2} className="text-center">
              Đơn vị kinh doanh
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell colSpan={2} className="text-center">
              NV TÁI THẨM ĐỊNH
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" width={198}>
              Kỳ T
            </TableCell>
            <TableCell className="text-center" width={198}>
              Kỳ T+1
            </TableCell>
            <TableCell className="text-center" width={198}>
              Kỳ T<span className="text-danger"> (*)</span>
            </TableCell>
            <TableCell className="text-center" width={198}>
              Kỳ T+1<span className="text-danger"> (*)</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="mscb-table-row-title">
            <TableCell align="center" className="">
              I
            </TableCell>
            <TableCell colSpan={5} className="">
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">1</TableCell>
            <TableCell align="left">Doanh thu (1)</TableCell>
            <TableCell align="right">100.060.862</TableCell>
            <TableCell align="right">100.060.862</TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">2</TableCell>
            <TableCell align="left">Tổng chi phí (2) = (2.1) + (2.2) + (2.3) </TableCell>
            <TableCell align="right">20.060.862</TableCell>
            <TableCell align="right">20.060.862</TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
          </TableRow>
          <TableRow className="mscb-table-row-title">
            <TableCell align="center" className="">
              II
            </TableCell>
            <TableCell colSpan={5} className="">
              XÁC ĐỊNH HẠN MỨC VAY
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">1</TableCell>
            <TableCell align="left">Doanh thu (1)</TableCell>
            <TableCell align="right">100.060.862</TableCell>
            <TableCell align="right">100.060.862</TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">2</TableCell>
            <TableCell align="left">Tổng chi phí (2) = (2.1) + (2.2) + (2.3) </TableCell>
            <TableCell align="right">20.060.862</TableCell>
            <TableCell align="right">20.060.862</TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </TableSticky>

      <Typography
        variant="h4"
        component="h4"
        className="font-bold text-upper mt-6 mb-3"
        sx={{
          fontSize: "19px",
        }}
      >
        BẢNG PHƯƠNG ÁN VAY VỐN THẾ HỆ 2
      </Typography>
      <TableSticky className="mscb-table mscb-table-border">
        <TableHead>
          <TableRow>
            <TableCell className="text-center" width={60}>
              STT
            </TableCell>
            <TableCell className="text-center" width={650}>
              Chỉ tiêu
            </TableCell>
            <TableCell className="text-center">
              Đơn vị kinh doanh
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell colSpan={2} className="text-center">
              NV TÁI THẨM ĐỊNH
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" className="">1</TableCell>
            <TableCell align="left">Tổng nhu cầu vốn (1)</TableCell>
            <TableCell align="right">100.060.862</TableCell>
            <TableCell align="right">100.060.862</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">2</TableCell>
            <TableCell align="left">Vốn tự có (2)</TableCell>
            <TableCell align="right">100.060.862</TableCell>
            <TableCell align="right">100.060.862</TableCell>
          </TableRow>
        </TableBody>
      </TableSticky>
      <div style={{ position: "relative" }} className="mt-6">
        <span style={{position: "absolute", right: 0}}>
          <i style={{fontSize: "12px", color: "#707070"}}>Cập nhật : </i>
          <i style={{fontSize: "12px", color: "#1825aa"}}>
            {" "}
            Nguyễn Văn Thanh - 9:30 - 20/05/2021
          </i>
        </span>
        <TextArea 
          label="1. Ghi chú" 
          sx={{
            "& textarea": {
              height: "100px !important",
              overflowY: "scroll!important ",
              overflowX: "hidden!important",
              marginBottom: "23px!important",
              border: 'none',
              backgroundColor: '#f2f3f9',
              resize: 'none',
              outline: 0,
              padding: '8px 12px',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontSize: 'var(--mscb-fontsize)'
            },
            "& textarea::-webkit-scrollbar": {
              width: "5px",
              "border-radius": "50px",
            },

            "& textarea::-webkit-scrollbar-thumb": {
              background: "#d5d5d5",
              "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
            },
            "& textarea:focus": {
              outline: "none",
            }
          }} 
        />
      </div>
    </Box>
  );
};

export default LOANNeedAndPlain;
