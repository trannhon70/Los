import CloseIcon from "@mui/icons-material/Close";
import { Button, Collapse, Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import Select from "views/components/base/Select";
import Modal from "views/components/layout/Modal";
import Detail from "./Detail";
export interface ModalAttachmentModalLOANProps {
  add?: boolean;
  open?: boolean;
  onClose?(): void;
  onSave?(uuid: string): void;
  onDelete?(): void;
  onAdd?(): void;
  onUpdate?(): void;
}

const AttachmentModalLOAN: FC<ModalAttachmentModalLOANProps> = (props) => {
  const { open = false, onClose } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open);

  const [openDetail, setOpenDetail] = useState(true);
  const [openDetailChild, setOpenDetailChild] = useState(true);

  const clickCollapse = () => setOpenDetail(!openDetail);
  const clickCollapseChild = () => setOpenDetailChild(!openDetailChild);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          minWidth: "80%",
          position: "relative",
          borderRadius: 0,

          '& .MuiDialogContent-root': {
            padding: '16px 24px',
            borderBottom: 'unset !important'
          },

          '& .MuiDialogActions-root': {
            padding: '0px 24px 30px 24px',
          }
        },
      }}
      footer={
        <Box>
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: 'unset', width: '99px' }}
          >
            Lưu
          </Button>
        </Box>
      }
    >
      <Box>
        <Typography
          variant="h5"
          component="div"
          className="text-upper text-primary font-medium text-18 pb-3"
        >
          TÀI LIỆU ĐÍNH KÈM
        </Typography>
        <IconButton
          onClick={onClose}
          color="error"
          sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
        >
          <CloseIcon />
        </IconButton>
        <Box className="flex-center">
          <Box
            sx={{
              width: "3%",
              justifyContent: "flex-start",
              fontWeight: "500",
              fontSize: "18px",
              color: "#353535",
            }}
          >
            STT
          </Box>
          <Box
            sx={{
              width: "22%",
              marginRight: '3%',
              fontWeight: "500",
              fontSize: "18px",
              color: "#353535",
              paddingLeft: "25px",
            }}
          >
            TÊN FILE
          </Box>
          <Box
            sx={{
              width: "40%",
              fontWeight: "500",
              fontSize: "18px",
              color: "#353535",
            }}
          >
            NỘI DUNG TÀI LIỆU
          </Box>
          <Box
            sx={{
              width: "25%",
              fontWeight: "500",
              fontSize: "18px",
              color: "#353535",
            }}
          >
            CẬP NHẬT BỞI
          </Box>
          <Box
            sx={{
              width: "10%",
              fontWeight: "500",
              fontSize: "18px",
              color: "#353535",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <IconButton>
              <AiOutlinePlusSquare color="red" style={{ fontSize: "1.5rem" }}/>
            </IconButton>
            <IconButton>
              <IoTrashOutline style={{ fontSize: "1.5rem" }} color="red"/>
            </IconButton>
          </Box>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: "2px",
            margin: "10px 0px",
            borderColor: "#353535",
          }}
        />
        <Box className="flex-center">
          <Box
            sx={{ width: "3%", fontSize: "14px", fontWeight: '500' , color: "#353535" }}
            className="flex justify-center"
          >
            I
          </Box>
          <Box sx={{ width: "22%", marginRight: '3%'}}>
            <Select
              sx={{
                "& .MuiFormControl-root": {
                  "& .MuiInputBase-formControl": {
                    "& .MuiInputBase-input": {
                      backgroundColor: "white !important",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#1825aa !important",
                      border: "1px solid #1825aa",
                    },
                  },
                },
              }}
              options={[]}
              required
            />
          </Box>
          <Box sx={{ width: "40%" }}></Box>
          <Box sx={{ width: "25%" }}></Box>
          <Box
            sx={{ width: "10%", justifyContent: "flex-end", display: "flex" }}
          >
            <IconButton>
              <AiOutlinePlusSquare style={{ fontSize: "1.5rem" }} color="#1825aa"/>
            </IconButton>
            <IconButton>
              <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa"/>
            </IconButton>
            <IconButton
              sx={{
                "& svg": {
                  transition: "all ease 0.3s",
                  ...(openDetail ? {} : { transform: "rotate(-90deg)" }),
                  fontSize: "24px",
                  "&:hover": {
                    color: "var(--mscb-primary)",
                  },
                },
              }}
              onClick={clickCollapse}
            >
              <BiChevronDownCircle style={{ fontSize: "1.5rem" }} color="#1825aa"/>
            </IconButton>
          </Box>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: "2px",
            margin: "10px 0px",
            borderColor: "#c6c5d1",
          }}
        />
        <Collapse in={openDetail}>
          <Box className="flex-center">
            <Box
              sx={{ width: "3%", fontSize: "14px", fontWeight: '500' , color: "#353535" }}
              className="flex justify-center"
            >
              1
            </Box>
            <Box sx={{ width: "22%", marginRight: '3%' }}>
              <Select
                sx={{
                  "& .MuiFormControl-root": {
                    "& .MuiInputBase-formControl": {
                      "& .MuiInputBase-input": {
                        backgroundColor: "white !important",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "var(--mscb-danger)!important",
                        border: "1px solid var(--mscb-danger)!important",
                      },
                    },
                  },
                }}
                options={[]}
                required
              />
            </Box>
            <Box sx={{ width: "40%" }}></Box>
            <Box sx={{ width: "25%" }}></Box>
            <Box
              sx={{ width: "10%", justifyContent: "flex-end", display: "flex" }}
            >
              <IconButton>
                <AiOutlinePlusSquare style={{ fontSize: "1.5rem" }} color="#1825aa"/>
              </IconButton>
              <IconButton
                sx={{
                  "& svg": {
                    transition: "all ease 0.3s",
                    ...(openDetail ? {} : { transform: "rotate(-90deg)" }),
                    fontSize: "24px",
                    "&:hover": {
                      color: "var(--mscb-primary)",
                    },
                  },
                }}
                onClick={clickCollapseChild}
              >
                <BiChevronDownCircle style={{ fontSize: "1rem" }} color="#1825aa"/>
              </IconButton>
            </Box>
          </Box>
          <Divider
            sx={{
              borderBottomWidth: "2px",
              margin: "10px 0px",
              width: '97%',
              float: 'right',
              borderColor: "#c6c5d1",
            }}
          />
          <Collapse in={openDetailChild}>
            <Detail />
            <Detail />
            <Divider
              sx={{
                borderBottomWidth: "2px",
                margin: "10px 0px",
                borderColor: "#c6c5d1",
              }}
            />
          </Collapse>
        </Collapse>
        <Box className="flex-center">
          <Box
            sx={{ width: "3%", fontSize: "14px", fontWeight: '500', color: "#353535" }}
            className="flex justify-center"
          >
            II
          </Box>
          <Box sx={{ width: "22%", marginRight: '3%' }}>
            <Select
              sx={{
                "& .MuiFormControl-root": {
                  "& .MuiInputBase-formControl": {
                    "& .MuiInputBase-input": {
                      backgroundColor: "white !important",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#1825aa !important",
                      border: "1px solid #1825aa",
                    },
                  },
                },
              }}
              options={[]}
              required
            />
          </Box>
          <Box sx={{ width: "40%" }}></Box>
          <Box sx={{ width: "25%" }}></Box>
          <Box
            sx={{ width: "10%", justifyContent: "flex-end", display: "flex" }}
          >
            <IconButton>
              <AiOutlinePlusSquare style={{ fontSize: "1.5rem" }} color="#1825aa"/>
            </IconButton>
            <IconButton>
              <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa"/>
            </IconButton>
            <IconButton
              sx={{
                "& svg": {
                  transition: "all ease 0.3s",
                  ...(openDetail ? {} : { transform: "rotate(-90deg)" }),
                  fontSize: "24px",
                  "&:hover": {
                    color: "var(--mscb-primary)",
                  },
                },
              }}
              onClick={clickCollapse}
            >
              <BiChevronDownCircle style={{ fontSize: "1.5rem" }} color="#1825aa"/>
            </IconButton>
          </Box>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: "2px",
            margin: "10px 0px",
            borderColor: "#c6c5d1",
          }}
        />
        <Collapse in={openDetail}>
          <Box className="flex-center">
            <Box
              sx={{ width: "3%", fontSize: "14px", fontWeight: '500', color: "#353535" }}
              className="flex justify-center"
            >
              1
            </Box>
            <Box sx={{ width: "22%", marginRight: '3%'}}>
              <Select
                sx={{
                  "& .MuiFormControl-root": {
                    "& .MuiInputBase-formControl": {
                      "& .MuiInputBase-input": {
                        backgroundColor: "white !important",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "var(--mscb-danger)!important",
                        border: "1px solid var(--mscb-danger)!important",
                      },
                    },
                  },
                }}
                options={[]}
                required
              />
            </Box>
            <Box sx={{ width: "40%" }}></Box>
            <Box sx={{ width: "25%" }}></Box>
            <Box
              sx={{ width: "10%", justifyContent: "flex-end", display: "flex" }}
            >
              <IconButton>
                <AiOutlinePlusSquare style={{ fontSize: "1.5rem" }} color="#1825aa"/>
              </IconButton>
              <IconButton
                sx={{
                  "& svg": {
                    transition: "all ease 0.3s",
                    ...(openDetail ? {} : { transform: "rotate(-90deg)" }),
                    fontSize: "24px",
                    "&:hover": {
                      color: "var(--mscb-primary)",
                    },
                  },
                }}
                onClick={clickCollapseChild}
              >
                <BiChevronDownCircle style={{ fontSize: "1rem" }} color="#1825aa"/>
              </IconButton>
            </Box>
          </Box>
          <Divider
            sx={{
              borderBottomWidth: "2px",
              margin: "10px 0px",
              borderColor: "#c6c5d1",
              width: "97%",
              float: "right",
            }}
          />
          <Collapse in={openDetailChild}>
            <Detail />
            <Detail />
            <Divider
              sx={{
                borderBottomWidth: "2px",
                margin: "10px 0px",
                borderColor: "#c6c5d1",
              }}
            />
          </Collapse>
        </Collapse>
      </Box>
    </Modal>
  );
};
export default AttachmentModalLOAN;
