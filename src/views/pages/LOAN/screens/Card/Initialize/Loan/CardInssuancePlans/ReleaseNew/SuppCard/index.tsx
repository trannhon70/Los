import { Grid } from "@mui/material";
import { FC, useRef, useState, useEffect } from "react";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import { FaHandHoldingUsd, FaUserAlt } from "react-icons/fa";
import suppCardStyle from "./style";
import Typography from "@mui/material/Typography";
import ObjectList from "views/components/layout/ObjectList";
import Input from "views/components/base/Input";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoDiffAdded } from "react-icons/go";
import { BiChevronDown } from "react-icons/bi";
import Scrollbar from "views/components/layout/Scrollbar";
import { timestampToDate } from "utils/date";
import { APP_DATE_FORMAT } from "utils/constants";
import Select from "views/components/base/Select";

const SuppCard: FC = () => {
  const classes = suppCardStyle();

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
  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = [".png"];
    if (validTypes.indexOf(file.type) === -1) {
      return true;
    }
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
  // const DropZone = () => {
  //   return (
  //     <>
  //       <Grid container className="drop-container-basic " onDrop={fileDrop}>
  //         <Grid item className="drop-message-basic w-full">
  //           <Grid container className={`justify-between items-center`}>
  //             <Typography component="h1" color="#353535" fontWeight={500}>
  //               DANH SÁCH HÌNH CHỮ KÝ
  //             </Typography>
  //             <Grid item xs={2} className={`${classes.addsign} upload-icon-basic`}>
  //               <div
  //                 onDragOver={dragOver}
  //                 onDragEnter={dragEnter}
  //                 onDragLeave={dragLeave}
  //                 onDrop={fileDrop}
  //                 onClick={fileInputClicked}
  //                 className="flex-center"
  //               >
  //               <GoDiffAdded
  //                 className={classes.Pointer}
  //                 color="#1825aa"
  //                 size="16px"
  //               />
  //               <span className={classes.Pointer}>Thêm chữ ký</span>
  //               </div>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //         <input
  //           ref={fileInputRef}
  //           className="file-input"
  //           type="file"
  //           multiple
  //           onChange={filesSelected}
  //         />
  //       </Grid>
  //       <Grid container sx={{ maxHeight: "500px",minHeight:"140px" }}>
  //         <Scrollbar className="scrollBar-input-file">
  //           <div className={classes.fileDisplayContainers}>
  //             <Grid item xs={12} className="container-basic pr-5">
  //               <Grid container className="file-display-contain-basic">
  //                 {validFiles.map((data: File, i: number) => (
  //                   <div className="file-status-bar flex" key={i}>
  //                     <div className="file-info">
  //                       {
  //                         data.name.split('.').pop()?.toUpperCase() === 'PNG' ?
  //                           <AiOutlineFileExcel size="30px" color="#19ae5f" /> :
  //                           data.name.split('.').pop()?.toUpperCase() === 'DOCX' ?
  //                           <AiOutlineFileWord size="30px" color="#209cee" /> :
  //                           data.name.split('.').pop()?.toUpperCase() === 'PDF' ?
  //                           <AiOutlineFilePdf size="30px" color="#e04e4e" /> : 
  //                           <FiImage size="30px" color="#209cee" />
  //                       }
  //                     </div>
  //                     <span className="file-name">{data.name}</span>
  //                     <div className="file-type">
  //                       <span className="file-name">
  //                         {data.name.split(".").pop()?.toUpperCase()}
  //                       </span>
  //                       <span className="file-name-icon">
  //                         <BiChevronDown size="16px" color="#1825aa" />
  //                       </span>
  //                     </div>
  //                     <div className="file-update">
  //                       <span>Cập nhật : Nguyễn Văn A</span>
  //                       <i>
  //                         {timestampToDate(
  //                           data?.lastModified / 1000,
  //                           "HH:mm " + APP_DATE_FORMAT
  //                         )}
  //                       </i>
  //                     </div>
  //                     <div
  //                       className="file-remove"
  //                       onClick={() => removeFile(data.name)}
  //                     >
  //                       <strong>
  //                         <RiDeleteBin6Line size="16px" color="#eb0029" />
  //                       </strong>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </Grid>
  //             </Grid>
  //           </div>
  //         </Scrollbar>
  //       </Grid>
  //     </>
  //   );
  // };
  const DropZone = () => {
    return (
      <>
        <Grid container className="drop-container-basic ">
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
          sx={{ minHeight: '202px' }}
        >
          <Scrollbar className="scrollBar-input-file">
            <div className={classes.fileDisplayContainers}>
              <Grid item xs={12} className="container-basic ">
                <Grid container className="file-display-contain-basic">
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
                </Grid>
              </Grid>
            </div>
          </Scrollbar>
        </Grid>
      </>
    );
  };
  return (
    <div className={clsx(classes.root, "pt-5")}>
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12} className={classes.labelObjectList}>
          <ObjectList
            options={[
              { label: "Nguyễn Đông Nhựt", circle: <FaUserAlt /> },
              { label: "Nguyễn Đông Nhựt", circle: <FaUserAlt /> },
              { label: "Nguyễn Đông Nhựt", circle: <FaUserAlt /> },
            ]}
            className={classes.supcardobj}
            enableAdd={false}
            // enableLength={false}
            labelLength='Chủ thẻ phụ:'
            enableMenu={false}
            onAdd={() => {}}
          />
        </Grid>
        <Grid item xl={3} md={3} xs={3} className={classes.inputLabel}>
          <Input label="1. Hạn mức tổng đề xuất (VND)" required />
        </Grid>
        <Grid item xl={12} md={12} xs={12} className={classes.infoBadge}>
          <Grid container>
          <Typography component="h6" className={`text-14 mb-0`}>
              1. Chọn thẻ tín dụng <span className="text-danger">*</span>
            </Typography>
            <Grid item xl={10} xs={10} md={10}>
              <ObjectList
                options={[
                  { label: "Tài Sản 1", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                  { label: "Tài Sản 2", circle: <FaHandHoldingUsd /> },
                ]}
                className={classes.collaretalObjList}
                enableLength={false}
                enableMenu={false}
                onAdd={() => {}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container rowSpacing="20" columnSpacing="20" className="mt-1">
        <Grid item xl={8}>
          <CardInside title="I. Thông tin thẻ" className={classes.Suppcard}>
            <Grid container rowSpacing="20" columnSpacing="20">
              <Grid item xl={4} md={6} xs={12} className={classes.inputLabel}>
                <Select required label="1. Thẻ phụ của thẻ chính" options={[]} />
              </Grid>
              <Grid item xl={4} md={6} xs={12} className={classes.inputLabel}>
                <Select label="2. Loại thẻ" required options={[]} />
              </Grid>
              <Grid item xl={4} md={6} xs={12} className={classes.inputLabel}>
                <Input required label="3. Hạn mức thẻ (VND" />
              </Grid>
              <Grid item xl={12} md={12} xs={12}>
                <Typography
                  component="h6"
                  className={`text-14 font-medium`}
                  color="#353535"
                >
                  4. Tên dập nổi trên thẻ <span className="text-danger">*</span>
                </Typography>
              </Grid>
              <Grid item xl={12} xs={12} md={12}>
                <Grid container columnSpacing="20" rowSpacing="20">
                  <Grid
                    item
                    xl={4}
                    md={4}
                    xs={4}
                    className={classes.inputGroup}
                  >
                    <Typography component="h6" className={`text-14`}>
                      Họ
                    </Typography>
                    <Input />
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    md={4}
                    xs={4}
                    className={classes.inputGroup}
                  >
                    <Typography component="h6" className={`text-14`}>
                      Tên đệm
                    </Typography>
                    <Input />
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    md={4}
                    xs={4}
                    className={classes.inputGroup}
                  >
                    <Typography component="h6" className={`text-14`}>
                      Tên
                    </Typography>
                    <Input />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
        <Grid item xl={4} md={12} xs={12}>
          <CardInside
            title="II. Hình chữ ký"
            classBody="p-5"
            className={classes.SuppCardSignature}
          >
            <DropZone />
          </CardInside>
        </Grid>
      </Grid>
    </div>
  );
};

export default SuppCard;
