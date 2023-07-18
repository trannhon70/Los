import { Divider, Grid, Typography } from '@mui/material';
import { FC, useRef, useState, useEffect } from 'react';
import CardInside from "views/components/layout/CardInside";
import { timestampToDate } from 'utils/date';
import { APP_DATE_FORMAT } from 'utils/constants';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiChevronDown } from 'react-icons/bi';
import { FiImage } from 'react-icons/fi';
import {
  AiOutlineDownCircle,
  AiOutlineUpCircle,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFilePdf
}
  from 'react-icons/ai';
import { FaFileUpload } from 'react-icons/fa';
import Collapse from '@mui/material/Collapse';
import uploadFileOtherStyle from "./style";
import Scrollbar from 'views/components/layout/Scrollbar';

const UploadFileOther: FC = () => {

  const classes = uploadFileOtherStyle();

  const dragOver = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  const dragEnter = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  const dragLeave = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }
  const [expands, setExpands] = useState<boolean>(true)
  const handleClick = () => {
    setExpands(!expands);
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [validFiles, setValidFiles] = useState<File[]>([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState<File[]>([]);



  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  }

  const validateFile = (file: File) => {
    return true;
  }

  useEffect(() => {
    const filteredArray: File[] = selectedFiles.reduce((file: File[], current: File) => {
      const x = file.find((item: File) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);

    setValidFiles([...filteredArray]);

  }, [selectedFiles]);

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray: File[]) => [...prevArray, files[i]]);
      } else {

      }
    }
  }
  const removeFile = (name: string) => {
    const validFileIndex = validFiles.findIndex((e: File) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e: File) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    setSelectedFiles([...selectedFiles]);
    const unsupportedFileIndex = unsupportedFiles.findIndex((e: File) => e.name === name);
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  }
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileInputClicked = () => {
    fileInputRef.current?.click();
  }

  const filesSelected = () => {
    if (fileInputRef.current?.files?.length) {
      handleFiles(fileInputRef.current.files);
    }
  }
  const DropZoneContract = () => {
    return <>
      <Scrollbar height="500px" >
        <Grid container className="drop-container-basic">
          <Grid item xs={8}>
            <Typography className='text-14' fontWeight={500}>1. Giấy tờ nguồn gốc nguồn thu</Typography>
          </Grid>
          <Grid item xs={4} className={classes.addsign}>
            <FaFileUpload size="15px" color="#1825aa" />
            <span className='text-13' onClick={fileInputClicked} onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}>
              Tải lên tập tin
            </span>
            {expands ? <AiOutlineDownCircle color="#1825aa" size="16px" onClick={handleClick} /> :
              <AiOutlineUpCircle color="#1825aa" size="16px" onClick={handleClick} />}
          </Grid>
        </Grid>

        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          multiple
          onChange={filesSelected}
        />

        <div className={classes.fileDisplayContainers}>
          <Collapse in={expands} >
            {
              validFiles.map((data: File, i: number) =>
                <div key={i}>
                  <Grid container className="file-status-bar" key={i}>
                    <Grid item xl={1}>
                      <span className="icon-filetype">
                        {
                          data.name.split('.').pop()?.toUpperCase() === 'PNG' ?
                            <AiOutlineFileExcel size="30px" color="#19ae5f" /> :
                            data.name.split('.').pop()?.toUpperCase() === 'DOCX' ?
                              <AiOutlineFileWord size="30px" color="#209cee" /> :
                              data.name.split('.').pop()?.toUpperCase() === 'PDF' ?
                                <AiOutlineFilePdf size="30px" color="#e04e4e" /> : <FiImage size="30px" color="#209cee" />
                        }
                      </span>
                    </Grid>
                    <Grid item xl={8} className="file-update">
                      <span className="file-name">{data.name}</span>
                      <span
                      >Cập nhật : Nguyễn Văn A
                      </span>
                      <i>{timestampToDate((data?.lastModified / 1000), 'HH:mm ' + APP_DATE_FORMAT)}</i>
                    </Grid>
                    <Grid item xl={1} className="file__type">
                      <span className="file-name">{data.name.split('.').pop()}</span>
                      <span className="file-name-icon">
                        <BiChevronDown size="16px" color="#1825aa" />
                      </span>
                    </Grid>
                    <Grid item xl={2} className="action-file">
                      <span onClick={() => removeFile(data.name)}> <RiDeleteBin6Line size="16px" color="#353535" /></span>
                    </Grid>
                    <Grid item xl={1}>
                    </Grid>
                    <Grid item xl={11} className="mt-2">
                      <Divider />
                    </Grid>
                  </Grid>

                </div>

              )
            }
          </Collapse>
          <Grid container className="drop-container-basic">
            <Grid item xs={8}>
              <Typography className='text-14' fontWeight={500}>2. Giấy tờ nhận nguồn thu</Typography>
            </Grid>
            <Grid item xs={4} className={classes.addsign}>
              <FaFileUpload size="15px" color="#1825aa" />
              <span className='text-13'>
                Tải lên tập tin
              </span>
              {expands ? <AiOutlineDownCircle color="#1825aa" size="16px" onClick={handleClick} /> :
                <AiOutlineUpCircle color="#1825aa" size="16px" onClick={handleClick} />}
            </Grid>
          </Grid>
          <Grid container className="drop-container-basic">
            <Grid item xs={8}>
              <Typography className='text-14' fontWeight={500}>3. Hình ảnh</Typography>
            </Grid>
            <Grid item xs={4} className={classes.addsign}>
              <FaFileUpload size="15px" color="#1825aa" />
              <span className='text-13'>
                Tải lên tập tin
              </span>
              {expands ? <AiOutlineDownCircle color="#1825aa" size="16px" onClick={handleClick} /> :
                <AiOutlineUpCircle color="#1825aa" size="16px" onClick={handleClick} />}
            </Grid>
          </Grid>
          <Grid container className="drop-container-basic">
            <Grid item xs={8}>
              <Typography className='text-14' fontWeight={500}>4. Chứng từ khác</Typography>
            </Grid>
            <Grid item xs={4} className={classes.addsign}>
              <FaFileUpload size="15px" color="#1825aa" />
              <span className='text-13'>
                Tải lên tập tin
              </span>
              {expands ? <AiOutlineDownCircle color="#1825aa" size="16px" onClick={handleClick} /> :
                <AiOutlineUpCircle color="#1825aa" size="16px" onClick={handleClick} />}
            </Grid>
          </Grid>
        </div>
      </Scrollbar>
    </>
  }


  return <CardInside className={classes.root}>
    <DropZoneContract />

  </CardInside>


}
export default UploadFileOther;