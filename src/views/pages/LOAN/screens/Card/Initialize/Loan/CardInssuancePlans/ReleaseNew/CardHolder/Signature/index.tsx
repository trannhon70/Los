import { Grid, Typography } from "@mui/material";
import { FC, useRef, useState, useEffect } from "react";
import CardInside from "views/components/layout/CardInside";
import { GoDiffAdded } from "react-icons/go";
import Scrollbar from "views/components/layout/Scrollbar";
import { timestampToDate } from "utils/date";
import { APP_DATE_FORMAT } from "utils/constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import clsx from "clsx";
import Collapse from '@mui/material/Collapse';
import SignatureStyle from "./style";
const Signature: FC = () => {
  const classes = SignatureStyle();

  const dragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const dragEnter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const dragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [validFiles, setValidFiles] = useState<File[]>([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState<File[]>([]);
  const [expands, setExpands] = useState<boolean>(true);
  const handleClick = () => {
    setExpands(!expands);
  };
  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const validateFile = (file: File) => {
    return true;
  };

  useEffect(() => {
    const filteredArray: File[] = selectedFiles.reduce(
      (file: File[], current: File) => {
        const x = file.find((item: File) => item.name === current.name);
        if (!x) {
          return file.concat([current]);
        } else {
          return file;
        }
      },
      []
    );

    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray: File[]) => [...prevArray, files[i]]);
      } else {
      }
    }
  };
  const removeFile = (name: string) => {
    const validFileIndex = validFiles.findIndex((e: File) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex(
      (e: File) => e.name === name
    );
    selectedFiles.splice(selectedFileIndex, 1);
    setSelectedFiles([...selectedFiles]);
    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (e: File) => e.name === name
    );
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileInputClicked = () => {
    fileInputRef.current?.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current?.files?.length) {
      handleFiles(fileInputRef.current.files);
    }
  };
  const DropZone = () => {
    return (
      <>
        <Grid container className="drop-container-basic pr-5">
          <Grid item className="drop-message-basic w-full">
            <Grid container className={`justify-between items-center`}>
              <Typography component="h1" color="#353535" fontWeight={500}>
                DANH SÁCH HÌNH CHỮ KÝ
              </Typography>
              <div className={classes.addsign}>
                <div
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
                  onClick={fileInputClicked}
                  className="flex-center"
                >
                  <GoDiffAdded color="#1825aa" size="18px" className={classes.Pointer}/>
                  <span className={classes.Pointer}>Thêm chữ ký</span>
                </div>
                {expands ? (
                  <AiOutlineDownCircle
                    color="#1825aa"
                    size="18px"
                    onClick={handleClick}
                    className={classes.Pointer}
                  />
                ) : (
                  <AiOutlineUpCircle
                    color="#1825aa"
                    size="18px"
                    onClick={handleClick}
                    className={classes.Pointer}
                  />
                )}
              </div>
            </Grid>
          </Grid>
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
        </Grid>
        <Grid
          container
          className={clsx("wh-full")}
          sx={{ height: '202px' }}
        >
          <Scrollbar className="scrollBar-input-file">
            <div className={classes.fileDisplayContainers}>
              <Grid item xs={12} className="container-basic pr-5">
                <Grid container className="file-display-contain-basic">
                  <Collapse in={expands} className="w-full">
                    {validFiles.map((data: File, i: number) => (
                      <div className="file-status-bar flex" key={i}>
                      <div className="file-info">
                        <img src={URL.createObjectURL(data)} alt="" />
                      </div>
                      <span className="file-name">{data.name}</span>
                      <div className="file-type">
                        <span className="file-name">
                          {data.name.split(".").pop()?.toUpperCase()}
                        </span>
                        <span className="file-name-icon">
                          <BiChevronDown size="16px" color="#1825aa" />
                        </span>
                      </div>
                      <div className="file-update">
                        <span>Cập nhật : Nguyễn Văn A</span>
                        <i>
                          {timestampToDate(
                            data?.lastModified / 1000,
                            "HH:mm " + APP_DATE_FORMAT
                          )}
                        </i>
                      </div>
                      <div
                        className="file-remove"
                        onClick={() => removeFile(data.name)}
                      >
                        <strong>
                          <RiDeleteBin6Line size="16px" color="#eb0029" />
                        </strong>
                      </div>
                    </div>
                  ))}
                  </Collapse>
                </Grid>
              </Grid>
            </div>
          </Scrollbar>
        </Grid>
      </>
    );
  };
  return (
    <CardInside
      title="IV. Hình chữ ký"
      classBody="p-5"
      className={`${classes.root}`}
    >
      <DropZone />
    </CardInside>
  );
};
export default Signature;
