import { Collapse, Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, Fragment, useState } from "react";
import { BiChevronDownCircle } from "react-icons/bi";
import { ICICDocumentInfoAPI } from "types/models/loan/normal/storageApproval/CIC";
import { intToRoman } from "utils";
import Input from "views/components/base/Input";
import DocumentChildList from "./DocumentList";


export interface DocumentInfoProps {
  documentInfo : ICICDocumentInfoAPI,
  docInfoIndex: number
}

const DocumentInfo: FC<DocumentInfoProps> = (props) => {
  const { documentInfo, docInfoIndex} = props

  const [openDetail, setOpenDetail] = useState(true);
  //const [openDetailChild, setOpenDetailChild] = useState(true);
  const clickCollapse = () => setOpenDetail(!openDetail);
  //const clickCollapseChild = () => setOpenDetailChild(!openDetailChild);

  return (
    <Fragment >
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
          {intToRoman(docInfoIndex + 1)}
        </Box>
        <Box sx={{ width: '22%', marginRight: '3%' }}>
          <Input
            disabled
            value={documentInfo.document_type_name}
            sx={{
              '& .Mui-disabled': {
                WebkitTextFillColor: 'unset !important',
              },
              '& .MuiInputBase-input': {
                backgroundColor: 'white !important',
                fontSize: '16px',
                fontWeight: '500',
                color: '#1825aa !important',
                border: '1px solid #1825aa',
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
                ...(openDetail ? {} : { transform: 'rotate(-90deg)' }),
                fontSize: '24px !important',
                '&:hover': {
                  color: 'var(--mscb-primary)',
                },
              },
            }}
            onClick={clickCollapse}
          >
            <BiChevronDownCircle style={{ fontSize: '1rem' }} color="#1825aa" />
          </IconButton>
        </Box>
      </Box>
      <Divider
        sx={{
          borderBottomWidth: '2px',
          margin: '10px 0px',
          borderColor: '#c6c5d1',
        }}
      />
       <Collapse
          in={openDetail}
          key={`${documentInfo?.document_type_id}-${docInfoIndex}`}
        >
          {documentInfo?.document_list?.map((documentList, docListIndex) => (
            <DocumentChildList 
              documentList={documentList}
              docListIndex={docListIndex}
            />
          ))}
      </Collapse>
    </Fragment>
  );
};

export default DocumentInfo;
