import { FC, useState } from 'react';
import { RiAddBoxLine, RiAddCircleLine } from 'react-icons/ri';
import { IoTrashOutline } from 'react-icons/io5';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import ExceptionInfoRow from './ExceptionRow'
import exceptionInfoStyle from "./style";
import Empty from 'views/components/layout/Empty';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { Collapse } from '@mui/material';


const ExceptionInformation: FC = () => {

  const classes = exceptionInfoStyle();
  const exceptionInfoClass = clsx(classes.root, "mscb-exception-info");
  const labelHeaderSTT = "STT";
  const labelHeaderExceptionType = "LOẠI NGOẠI LỆ";
  const labelHeaderQuantity = "SỐ LƯỢNG";
  const labelCaptionCheck = "Kiểm tra ngoại lệ";
  const [expands, setExpands] = useState<boolean>(true)

  const handleAddException = () => {
  }

  const handleDeleteAllException = () => {
  }
  const handleExpands = () => {
    setExpands(!expands);
  }

  const options = [{
    Exception: [
      {
        exception_type: "1",
        exception_name: "NGOẠI LỆ PHÁP LÝ",
        exception_item: [
          {
            id: "PL1",
            name: "NGOẠI LỆ PHÁP LÝ 1",
            explain: "Em là búp măng non em lớn lên trong mùa cách mạng...",
            explain_reality: "Sướng vui có Đảng tiền phong,có Đảng như ánh thái dương",
          },
          {
            id: "PL2",
            name: "NGOẠI LỆ PHÁP LÝ 2",
            explain: "sống yên vui trong tình yêu thương.",
            explain_reality: "Cuộc đời ngàn năm bừng sáng",
          },
          {
            id: "PL3",
            name: "NGOẠI LỆ PHÁP LÝ 3",
            explain: "Khăn quàng thắm vai em ghi chiến công anh hùng cách mạng",
            explain_reality: "Cuộc đời ngàn năm bừng sáng",
          },

        ]
      },
      {
        exception_type: "2",
        exception_name: "NGOẠI LỆ TSBĐ",
        exception_item: [
          {
            id: "TS1",
            name: "NGOẠI LỆ TSBĐ 1",
            explain: "Em là búp măng non em lớn lên trong mùa cách mạng...",
            explain_reality: "Sướng vui có Đảng tiền phong,có Đảng như ánh thái dương",
          },
          {
            id: "TS2",
            name: "NGOẠI LỆ TSBĐ 2",
            explain: "sống yên vui trong tình yêu thương.",
            explain_reality: "Cuộc đời ngàn năm bừng sáng",
          },
          {
            id: "TS3",
            name: "NGOẠI LỆ TSBĐ 3",
            explain: "Khăn quàng thắm vai em ghi chiến công anh hùng cách mạng",
            explain_reality: "Cuộc đời ngàn năm bừng sáng",
          },

        ]
      },
    ]
  }]

  return (
    <Box component="div" className={`${exceptionInfoClass} pt-5`}>
      <Grid container className='mscb-exception-info-grid'>
        <Grid item xs={12} >
          <Grid container>
            <Grid item xs={6} className="mscb-exception-header-left">
              <Box component="div" className="exception-stt-label text-upper">
                <Typography variant='h5' color='var(--mscb-black)'>
                  {labelHeaderSTT}
                </Typography>
              </Box>
              <Box component="div" className="exception-type-label text-upper">
                <Typography variant='h5' color='var(--mscb-black)'>
                  {labelHeaderExceptionType}
                </Typography>
              </Box>
              <Box component="div" className="exception-quantity-label text-upper">
                <Typography variant='h5' color='var(--mscb-black)'>
                  {labelHeaderQuantity}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="mscb-exception-header-right justify-end">
              <Box component="div" className="exception-check-box">
                <button className="exception-check-btn">
                  <Typography variant='subtitle2' color='var(--mscb-primary)'>
                    {labelCaptionCheck}
                  </Typography>
                </button>
              </Box>
              <Box component="div" className="exception-action-box">
                <Box component="div" className="icon-add-box" onClick={handleAddException}>
                  <RiAddBoxLine
                    size="20px"
                    color="var(--mscb-danger)"
                    cursor="pointer"
                  />
                </Box>
                <Box component="div" className="icon-trash-box" onClick={handleDeleteAllException}>
                  <IoTrashOutline
                    size="1rem"
                    color="var(--mscb-danger)"
                    cursor="pointer"
                  />
                </Box>
                <Box component="div" className="icon-collapse-box">
                  {expands ? <MdRemoveCircleOutline
                    size="20px"
                    color="var(--mscb-danger)"
                    cursor="pointer"
                    onClick={handleExpands}
                  /> :
                    <RiAddCircleLine
                      size="20px"
                      color="var(--mscb-danger)"
                      cursor="pointer"
                      onClick={handleExpands}
                    />}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Collapse in={expands} >

            {options[0]?.Exception.map((item, index) => {
              return (
                <ExceptionInfoRow
                  key={index}
                  stt={index + 1}
                  documentException={item}
                />
              )
            })}
          </Collapse>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '12px' }}>
          {(() => {
            if (options.length === 0) {
              return <Empty>
                <p>Không có dữ liệu</p>
              </Empty>
            }
          })()}
        </Grid>
      </Grid>
    </Box>
  )

}

export default ExceptionInformation;
