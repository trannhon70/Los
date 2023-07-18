import Grid from "@mui/material/Grid";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CardInside from "views/components/layout/CardInside";
import TableSticky from "views/components/layout/TableSticky";


const Discipline = () => {

  return (
    <CardInside 
      title="Quá trình kỷ luật" 
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-2"
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
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>NGÀY HIỆU LỰC</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>NGÀY KẾT THÚC</TableCell>
                <TableCell  width={"100px"}sx={{ textAlign: "center" }}>CHỨC DANH</TableCell>
                <TableCell width={"200px"}sx={{ textAlign: "center" }}>ĐƠN VỊ/PHÒNG BAN</TableCell>
                <TableCell width={"150px"}sx={{ textAlign: "center" }}>LÝ DO KỶ LUẬT</TableCell>
                <TableCell width={"150px"}sx={{ textAlign: "center" }}>LÝ DO CHI TIẾT</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>NGÀY PHÁT HIỆN</TableCell>
                <TableCell  width={"100px"}sx={{ textAlign: "center" }}>NGÀY VI PHẠM</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>TỔNG GIÁ TRỊ HIỆN TẠI</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>SỐ QUYẾT ĐỊNH</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>NGƯỜI XÓA KỶ LUẬT</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>NGƯỜI KÝ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>
                    1
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    -
                  </TableCell>
                </TableRow>
            </TableBody>
          </TableSticky>
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default Discipline;
