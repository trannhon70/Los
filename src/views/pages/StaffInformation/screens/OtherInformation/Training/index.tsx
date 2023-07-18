import React from "react";
import Grid from "@mui/material/Grid";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CardInside from "views/components/layout/CardInside";
import TableSticky from "views/components/layout/TableSticky";



const Training = () => {

  return (
    <CardInside 
      title="Quá trình đào tạo trong ngân hàng" 
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
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>CHỦ ĐỀ</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>MÃ KHÓA HỌC</TableCell>
                <TableCell  width={"100px"}sx={{ textAlign: "center" }}>TÊN KHÓA HỌC</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>TỪ NGÀY</TableCell>
                <TableCell width={"100px"}sx={{ textAlign: "center" }}>ĐẾN NGÀY</TableCell>
                <TableCell width={"160px"}sx={{ textAlign: "center" }}>KẾT QUẢ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell sx={{ textAlign: "center" }}>
                  1
                </TableCell>
                <TableCell>
                  -
                </TableCell>
                <TableCell>
                  -
                </TableCell>
                <TableCell>
                  -
                </TableCell>
                <TableCell>
                  -
                </TableCell>
                <TableCell>
                  -
                </TableCell>
                <TableCell>
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

export default Training;
