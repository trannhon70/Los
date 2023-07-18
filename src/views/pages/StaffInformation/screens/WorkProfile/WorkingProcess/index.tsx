import {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CardInside from "views/components/layout/CardInside";
import TableSticky from "views/components/layout/TableSticky";

const WorkingProcess: React.FC  = ()=> {


  return (
    <CardInside 
      title="Quá trình công tác" 
      className="mt-5"
      classBody="h-full p-6"
      fieldsetClass="px-4"
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
                <TableCell width={"240px"}sx={{ textAlign: "center" }}>TỪ NGÀY</TableCell>
                <TableCell width={"240px"}sx={{ textAlign: "center" }}>ĐẾN NGÀY</TableCell>
                <TableCell  width={"664px"}sx={{ textAlign: "center" }}>CÔNG TY</TableCell>
                <TableCell width={"300px"}sx={{ textAlign: "center" }}>CHỨC VỤ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell sx={{ textAlign: "center" }}>
                  1
                </TableCell>
                <TableCell >
                  -
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </TableSticky>
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default WorkingProcess;
