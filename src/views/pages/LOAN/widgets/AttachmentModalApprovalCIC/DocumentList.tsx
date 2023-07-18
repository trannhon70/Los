
import ImageIcon from "@mui/icons-material/Image";
import { Box, Collapse, Divider, IconButton } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { BiChevronDownCircle } from "react-icons/bi";
import { ICICDocumentAPI, ICICDocumentChildFileAPI } from "types/models/loan/normal/storageApproval/CIC";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";


export interface DetailProps {
  file: ICICDocumentChildFileAPI,
  docListIndex: number,
  childFileIndex: number
}
const Detail: FC<DetailProps> = (props) => {
  const { file, docListIndex, childFileIndex } = props
  return (
    <Fragment>
      <Divider
        sx={{
          borderBottomWidth: "2px",
          margin: "10px 0px 10px 40px",
          width: '97%',
          //float: 'right',
          borderColor: "#c6c5d1",
        }}
      />
      <Box className="flex-center">
        <Box
          sx={{ width: "3%", fontSize: "14px", color: "#353535" }}
          className="flex justify-center"
        >
          {`${docListIndex + 1}.${childFileIndex + 1}`}
        </Box>
        <Box sx={{ width: "22%", marginRight: '3%', wordBreak: 'break-all' }}>
          <Box style={{ display: "flex", alignItems: "center", marginLeft: '25px' }}>
            <ImageIcon />
            <span style={{ cursor: 'pointer', marginLeft: "5px", color: '#1825aa', fontWeight: 'bold', fontSize: '14px' }}>
              {file.name ?? ''}
            </span>
          </Box>
        </Box>
        <Box sx={{ width: "40%", fontSize: "14px", color: '#353535', fontWeight: '500' }}>{file.description ?? ''}</Box>
        <Box sx={{ width: "25%" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "14px", color: '#353535', fontWeight: '500' }}>{file.updated_by ?? file.created_by}</span>
            <span style={{ color: '#808080', fontSize: '12px' }}>
              {file.updated_at ? timestampToDate(file.updated_at ?? 0, "hh:mm - DD/MM/YYYY")
                : timestampToDate(file.created_at ?? 0, "hh:mm - DD/MM/YYYY")}
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            width: "10%",
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
        </Box>
      </Box>
    </Fragment>
  );
};

export interface DocumentListProps {
  documentList: ICICDocumentAPI,
  docListIndex: number,
}

const DocumentList: FC<DocumentListProps> = (props) => {
  
  const { documentList , docListIndex } = props
  const [openDetailChild, setOpenDetailChild] = useState(true);
  const clickCollapseChild = () => setOpenDetailChild(!openDetailChild);

  return (
    <Fragment>
      <Box className="flex-center">
        <Box
          sx={{
            width: '3%',
            fontSize: '14px',
            fontWeight: '500',
            color: '#353535',
          }}
          className="flex justify-center"
        >
          {docListIndex + 1}
        </Box>
        <Box sx={{ width: '22%', marginRight: '3%' }}>
          <Input
            disabled
            value={documentList.document_name}
            sx={{
              '& .Mui-disabled': {
                WebkitTextFillColor: 'unset !important',
              },
              '& .MuiInputBase-input': {
                backgroundColor: 'white !important',
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--mscb-danger)!important',
                border: '1px solid var(--mscb-danger)!important',
              },
            }}
          />
        </Box>
        <Box sx={{ width: '40%' }}></Box>
        <Box sx={{ width: '25%' }}></Box>
        <Box
          sx={{
            width: '10%',
            justifyContent: 'flex-end',
            display: 'flex',
          }}
        >
          <IconButton
            sx={{
              '& svg': {
                transition: 'all ease 0.3s',
                ...(openDetailChild ? {} : { transform: 'rotate(-90deg)' }),
                fontSize: '24px !important',
                '&:hover': {
                  color: 'var(--mscb-primary)',
                },
              },
            }}
            onClick={clickCollapseChild}
          >
            <BiChevronDownCircle
              style={{ fontSize: '1rem' }}
              color="#1825aa"
            />
          </IconButton>
        </Box>
      </Box>
      {documentList.document_child_files.map((childFile, childIndex) => (
        <Collapse
          in={openDetailChild}
          key={`${docListIndex}-${childIndex}`}
        >
          <Detail
            file={childFile}
            docListIndex={docListIndex}
            childFileIndex={childIndex}
          />
        </Collapse>
      ))}
      <Divider
        sx={{
          borderBottomWidth: '2px',
          margin: '10px 0px',
          borderColor: '#c6c5d1',
        }}
      />
    </Fragment>
  )
}

export default DocumentList;