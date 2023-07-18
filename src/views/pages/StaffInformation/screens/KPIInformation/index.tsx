import Grid from "@mui/material/Grid";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CardInside from "views/components/layout/CardInside";
import TableSticky from "views/components/layout/TableSticky";


const KPIInformation = () => {

  return (
    <CardInside 
      title="Quá trình đào tạo trong ngân hàng" 
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-10"
    >
      <Grid container >
        <Grid item xs={12}>
          <TableSticky
            className="mscb-table mscb-table-border"
            sx={{ maxHeight: "calc(100%-60px)" }}
          >
            <TableHead>
              <TableRow>
                <TableCell width={"20px"} sx={{ textAlign: "center" }}>STT</TableCell>
                <TableCell width={"200px"}sx={{ textAlign: "center" }}>KỲ ĐÁNH GIÁ</TableCell>
                <TableCell width={"200px"}sx={{ textAlign: "center" }}>TỔNG ĐIỂM KPIS</TableCell>
                <TableCell  width={"200px"}sx={{ textAlign: "center" }}>TỈ LỆ HOÀN THÀNH</TableCell>
                <TableCell width={"200px"}sx={{ textAlign: "center" }}>KẾT QUẢ / XẾP HẠNG</TableCell>
                <TableCell width={"664px"}sx={{ textAlign: "center" }}>GHI CHÚ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>
                  1
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  -
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>-</TableCell>
                <TableCell sx={{ textAlign: "right" }}>-</TableCell>
                <TableCell >-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </TableSticky>
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default KPIInformation;
