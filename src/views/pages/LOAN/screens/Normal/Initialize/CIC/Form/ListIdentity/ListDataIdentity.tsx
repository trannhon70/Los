import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useMasterData from "app/hooks/useMasterData";
import { FC, useEffect } from "react";
import { ILOANNormalStorageLegalIdentityData } from "types/models/loan/normal/storage/Legal";
import { timestampToDate } from "utils/date";
import Empty from "views/components/layout/Empty";
import Modal from "views/components/layout/Modal";
import TableSticky from "views/components/layout/TableSticky";

export interface IListDataIdentityProps {
  dataIdentity: ILOANNormalStorageLegalIdentityData[] | null;
  open?: boolean;
  onClose?(): void;
}

const ListDataIdentity: FC<IListDataIdentityProps> = (props) => {
  const { dataIdentity, open = false, onClose } = props;

  const { CifIfType, register } = useMasterData();
  
  useEffect(() => {
    register('cifIfType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const onCloseBtn = () => {
    onClose && onClose();
  };

  const emptyLayout = () => {
    return (
      <TableRow>
        <TableCell colSpan={8}>
          <Empty> Không có dữ liệu </Empty>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onCloseBtn}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          minWidth: "60%",
          position: "relative",
          borderRadius: 0,
        },
      }}
    >
      <IconButton
        onClick={onCloseBtn}
        color="error"
        sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
      >
        <CloseIcon />
      </IconButton>
      <Box>
        <Typography
          variant="h5"
          component="div"
          className="text-upper text-primary font-medium text-18 pb-3"
        >
          Danh sách giấy tờ định danh
        </Typography>
        <TableSticky className="mscb-table mscb-table-border">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>STT</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Loại</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Số định danh</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Ngày cấp</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Ngày hết hạn</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Nơi cấp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(() => {
              if (dataIdentity?.length === 0) {
                return emptyLayout();
              } else {
                return dataIdentity?.map((id, index) => (
                  <TableRow key={id.uuid}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {CifIfType.find((t) => t.id === id.identity_type.id)?.name}
                    </TableCell>
                    <TableCell>{id.identity_num}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {timestampToDate(id.issued_date ?? 0)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {!!id.expired_date ? timestampToDate(id.expired_date ?? 0) : ""}
                    </TableCell>
                    <TableCell>{id.place_of_issue}</TableCell>
                  </TableRow>
                ));
              }
            })()}
          </TableBody>
        </TableSticky>
      </Box>
    </Modal>
  );
};

export default ListDataIdentity;
