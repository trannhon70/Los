import CloseIcon from "@mui/icons-material/Close";
import { Button, Divider, Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import Input from "views/components/base/Input";
import Modal from "views/components/layout/Modal";
import TableSticky from "views/components/layout/TableSticky";

export interface ModalFindIDProps {
  open?: boolean;
  onClose?(): void;
}

const ModalFindID: FC<ModalFindIDProps> = (props) => {
  const { open = false, onClose } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onCloseBtn = () => {
    onClose && onClose();
  };

  const handleSaveBtn = () => {};

  return (
    <Modal
      open={isOpen}
      onClose={onCloseBtn}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          minWidth: "60%",
          position: "relative",
          borderRadius: 0,
        },
      }}
      footer={
        <Box className="pt-2 pb-2 pr-4">
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: "unset", width: "99px" }}
            onClick={onCloseBtn}
          >
            Hủy Bỏ
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "unset", width: "99px" }}
            onClick={handleSaveBtn}
          >
            Chọn
          </Button>
        </Box>
      }
    >
      <IconButton
        onClick={onCloseBtn}
        color="error"
        sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
      >
        <CloseIcon />
      </IconButton>
      <Typography
        variant="h5"
        component="div"
        className="text-upper text-primary font-medium text-18 pb-3"
      >
        Tìm kiếm
      </Typography>
      <Grid container spacing={3}>
        <Grid item xl={6} xs={6} md={12}>
          <Input label="1. Mã LOS (ID LOS)" value="001_03042021_0000000%" />
        </Grid>
        <Grid item xl={6} xs={6} md={12}>
          <Input
            label="2. Họ và tên khách hàng vay"
            value="001_03042021_0000000%"
          />
        </Grid>
        <Grid item xl={12} md={12} xs={12} className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "unset", width: "99px" }}
          >
            Tìm kiếm
          </Button>
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Divider />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <TableSticky className="mscb-table mscb-table-border">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  stt
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  mã los
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  Họ và tên khách hàng vay
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  Loại tiền vay
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  Số tiền vay
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ textAlign: "center", fontWeight: "500" }}>
                  1
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#1825aa",
                    fontWeight: "500",
                  }}
                >
                  001_03042021_00000001
                </TableCell>
                <TableCell sx={{ fontWeight: "500" }}>Lê Trọng Quyền</TableCell>
                <TableCell sx={{ fontWeight: "500" }}>VND</TableCell>
                <TableCell
                  sx={{
                    textAlign: "right",
                    color: "#eb0029",
                    fontWeight: "500",
                  }}
                >
                  1.000.000.000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ textAlign: "center", fontWeight: "500" }}>
                  2
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#1825aa",
                    fontWeight: "500",
                  }}
                >
                  001_03042021_00000001
                </TableCell>
                <TableCell sx={{ fontWeight: "500" }}>Lê Trọng Quyền</TableCell>
                <TableCell sx={{ fontWeight: "500" }}>VND</TableCell>
                <TableCell
                  sx={{
                    textAlign: "right",
                    color: "#eb0029",
                    fontWeight: "500",
                  }}
                >
                  1.000.000.000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ textAlign: "center", fontWeight: "500" }}>
                  3
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#1825aa",
                    fontWeight: "500",
                  }}
                >
                  001_03042021_00000001
                </TableCell>
                <TableCell sx={{ fontWeight: "500" }}>Lê Trọng Quyền</TableCell>
                <TableCell sx={{ fontWeight: "500" }}>VND</TableCell>
                <TableCell
                  sx={{
                    textAlign: "right",
                    color: "#eb0029",
                    fontWeight: "500",
                  }}
                >
                  1.000.000.000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ textAlign: "center", fontWeight: "500" }}>
                  4
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#1825aa",
                    fontWeight: "500",
                  }}
                >
                  001_03042021_00000001
                </TableCell>
                <TableCell sx={{ fontWeight: "500" }}>Lê Trọng Quyền</TableCell>
                <TableCell sx={{ fontWeight: "500" }}>VND</TableCell>
                <TableCell
                  sx={{
                    textAlign: "right",
                    color: "#eb0029",
                    fontWeight: "500",
                  }}
                >
                  1.000.000.000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ textAlign: "center", fontWeight: "500" }}>
                  5
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#1825aa",
                    fontWeight: "500",
                  }}
                >
                  001_03042021_00000001
                </TableCell>
                <TableCell sx={{ fontWeight: "500" }}>Lê Trọng Quyền</TableCell>
                <TableCell sx={{ fontWeight: "500" }}>VND</TableCell>
                <TableCell
                  sx={{
                    textAlign: "right",
                    color: "#eb0029",
                    fontWeight: "500",
                  }}
                >
                  1.000.000.000
                </TableCell>
              </TableRow>
            </TableBody>
          </TableSticky>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalFindID;
