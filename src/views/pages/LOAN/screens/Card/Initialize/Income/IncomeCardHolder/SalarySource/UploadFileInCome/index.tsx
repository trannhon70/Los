import {  Grid } from '@mui/material';
import { FC, useRef, useState, useEffect } from 'react';
import CardInside from "views/components/layout/CardInside";
import { timestampToDate } from 'utils/date';
import { APP_DATE_FORMAT } from 'utils/constants';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import { FiImage } from 'react-icons/fi';
import { FaFileImage, FaFileWord, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { GrDocumentUpload } from 'react-icons/gr';
import {
  AiOutlineDownCircle,
  AiOutlineUpCircle,
  // AiOutlineFileExcel,
  // AiOutlineFileWord,
  // AiOutlineFilePdf
}
  from 'react-icons/ai';
import { HiDownload } from 'react-icons/hi';
// import { FaFileUpload } from 'react-icons/fa';
import uploadFileInComeStyle from "./style";
import Checkbox from 'views/components/base/Checkbox';
import Collapse from '@mui/material/Collapse';
import Scrollbar from 'views/components/layout/Scrollbar';

const UploadFileInCome: FC = () => {

  const classes = uploadFileInComeStyle();

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
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheckContract, setIsCheckContract] = useState(false);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheckContract(!isCheckContract);
  };
  const handleSelectContract = () => {
    if (isCheckAll === true) {
      setIsCheckContract(!isCheckContract);
    }
    else {
      setIsCheckContract(!isCheckContract);
    }
  };


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
      <Grid container className="drop-container-basic">
        <Grid item xs={8}>
          <Checkbox
            onChange={handleSelectContract}
            className={classes.checkboxlabel}
            options={[
              { value: '1', label: '1. Hợp đồng lao động', checked: isCheckContract },
            ]} />
        </Grid>
        <Grid item xs={4} className={classes.addsign}>
          <GrDocumentUpload size="16px" color="#1825aa" />
          <span onClick={fileInputClicked} onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}>
            Tải lên tập tin
          </span>
          {expands ? <AiOutlineDownCircle color="#1825aa" size="18px" onClick={handleClick} /> :
            <AiOutlineUpCircle color="#1825aa" size="18px" onClick={handleClick} />}
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
                  <Grid item xs={1}>
                    <Checkbox checked={isCheckContract} />
                  </Grid>
                  <Grid item xs={1}>
                    <span className="icon-filetype">
                      {
                        data.name.split('.').pop()?.toUpperCase() === 'XLSX' ?
                          <FaFileExcel size="30px" color="#19ae5f" /> :
                          data.name.split('.').pop()?.toUpperCase() === 'DOCX' ?
                            <FaFileWord size="30px" color="#209cee" /> :
                            data.name.split('.').pop()?.toUpperCase() === 'PDF' ?
                              <FaFilePdf size="30px" color="#e04e4e" /> : <FaFileImage size="30px" color="#19ae5f" />
                      }
                    </span>
                  </Grid>
                  <Grid item xs={6} className="file-update">
                    <span className="file-name">{data.name}</span>
                    <span
                    >Cập nhật : Nguyễn Văn A
                    </span>
                    <span><i>{timestampToDate((data?.lastModified / 1000), 'HH:mm - ' + APP_DATE_FORMAT)}</i></span>
                  </Grid>
                  <Grid item xs={1} className="file__type">
                    <span>{data.name.split('.').pop()}</span>
                  </Grid>
                  <Grid item xs={3} className="action-file">
                    <span> <HiDownload size="16px" color="#353535" /></span>
                    <span onClick={() => removeFile(data.name)}> <RiDeleteBin6Line size="16px" color="#353535" /></span>
                  </Grid>
                </Grid>

              </div>

            )
          }
        </Collapse>
      </div>
    </>
  }
  const DropZoneDecision = () => {
    return <>
      <Grid container className="drop-container-basic">
        <Grid item xs={8}>
          <Checkbox
            className={classes.checkboxlabel}
            options={[
              { value: '2', label: '2. Quyết định bổ nhiệm', checked: isCheckAll },
            ]} />
        </Grid>
        <Grid item xs={4} className={classes.addsign}>
          <GrDocumentUpload size="16px" color="#1825aa" />
          <span>
            Tải lên tập tin
          </span>
          {expands ? <AiOutlineDownCircle color="#1825aa" size="18px" onClick={handleClick} /> :
            <AiOutlineUpCircle color="#1825aa" size="18px" onClick={handleClick} />}
        </Grid>
      </Grid>
      <Grid container className="drop-container-basic">
        <Grid item xs={8}>
          <Checkbox
            className={classes.checkboxlabel}
            options={[
              { value: '3', label: '3. Sao kê/Xác nhận lương', checked: isCheckAll },
            ]} />
        </Grid>
        <Grid item xs={4} className={classes.addsign}>
          <GrDocumentUpload size="16px" color="#1825aa" />
          <span>
            Tải lên tập tin
          </span>
          {expands ? <AiOutlineDownCircle color="#1825aa" size="18px" onClick={handleClick} /> :
            <AiOutlineUpCircle color="#1825aa" size="18px" onClick={handleClick} />}
        </Grid>

      </Grid>
      <Grid container className="drop-container-basic">
        <Grid item xs={8}>
          <Checkbox
            className={classes.checkboxlabel}
            options={[
              { value: '4', label: '4. Hình ảnh', checked: isCheckAll },
            ]} />
        </Grid>
        <Grid item xs={4} className={classes.addsign}>
          <GrDocumentUpload size="16px" color="#1825aa" />
          <span>
            Tải lên tập tin
          </span>
          {expands ? <AiOutlineDownCircle color="#1825aa" size="18px" onClick={handleClick} /> :
            <AiOutlineUpCircle color="#1825aa" size="18px" onClick={handleClick} />}
        </Grid>

      </Grid>
      <Grid container className="drop-container-basic">
        <Grid item xs={8}>
          <Checkbox
            className={classes.checkboxlabel}
            options={[
              { value: '5', label: '5. Chứng từ khác', checked: isCheckAll },
            ]} />
        </Grid>
        <Grid item xs={4} className={classes.addsign}>
          <GrDocumentUpload size="16px" color="#1825aa" />
          <span>
            Tải lên tập tin
          </span>
          {expands ? <AiOutlineDownCircle color="#1825aa" size="18px" onClick={handleClick} /> :
            <AiOutlineUpCircle color="#1825aa" size="18px" onClick={handleClick} />}
        </Grid>
      </Grid>
    </>
  }

  return <CardInside className={classes.root}>
    <Grid container className="drop-container-basic-header">
      <Grid item xs={8}>
        <Checkbox
          onChange={handleSelectAll}
          className='select-all-checkbox'
          options={[
            { value: '1', label: 'Chọn tất cả' },
          ]} />
      </Grid>
      <Grid item xs={4} className="drop-container-download">
        <HiDownload size="16px" color="#1825aa" />
        <span>Tải xuống tập tin</span>
      </Grid>
    </Grid>
    <Scrollbar height="500px" >
      <DropZoneContract />
      <DropZoneDecision />
    </Scrollbar>
  </CardInside>


}
export default UploadFileInCome;