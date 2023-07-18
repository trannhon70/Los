import { Breadcrumbs, Grid, IconButton, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import {
    documentGetfileToPage,
    documentGetfileUpdateLimit,
    downloadDocumentFile,
    getProfileDocumentGetfile,
    setFileExtension,
    updateDocumentSearch
} from "features/loan/normal/storage/ProfileDocument/action";
import {
    getDocumentStructureDateEnd,
    getDocumentStructureDateStart,
    getDocumentStructureFilesFetching,
    getDocumentStructureFilesLimit,
    getDocumentStructureFilesName,
    getDocumentStructureFilesPage,
    getDocumentStructureFilesTotalPage,
    getLOANNormalCurrentFile,
    getLOANNormalDocumentBreadScrumb,
    getLOANNormalProfileDocumentGetFile
} from "features/loan/normal/storage/ProfileDocument/selectors";
import _ from "lodash";
import querystring from 'querystring';
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { AiFillFileExcel, AiOutlineFileImage, AiOutlineFileText } from "react-icons/ai";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { IPageDocument } from "types/models/loan/normal/storage/ProfileDocument";
import { download } from "utils";
import { APP_DATE_FORMAT } from "utils/constants";
import { timestampToDate } from "utils/date";
import InputDate from "views/components/base/InputDate";
import Select from "views/components/base/Select";
import TextTooltip from "views/components/base/TextTooltip";
import Empty from "views/components/layout/Empty";
import Pagination from "views/components/layout/Pagination";
import SkeletonRow from "views/components/layout/SkeletonTable";
import TableSticky from "views/components/layout/TableSticky";
import { FileDetailParams } from "../../FileDetail";
import { SxFileList, SxTable } from "./style";


const buildQuery = (page: number, limit: number,los_id?: string,name?: string,  date_start?: string, date_end?: string ,document_type_id?: number): string => {
    const url: string[] = [];
    page > 1 && url.push('page=' + page);
    limit > 10 && url.push('limit=' + limit);
    los_id && url.push('los_id=' + los_id);
    name && url.push('name=' + name);
    document_type_id && url.push('document_type_id=' + document_type_id);
    date_start && url.push('date_start=' + date_start);
    date_end && url.push('date_end=' + date_end);
    return url.join('&');
  }

const FileList: FC = props => {
    const isLoading = false;
    const { id } = useParams() as FileDetailParams 
    const params = useParams() as FileDetailParams;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { search } = useLocation();
    const containerRef = useRef(null);

    const getFileData = useSelector(getLOANNormalProfileDocumentGetFile)
    const curentFile = useSelector(getLOANNormalCurrentFile)
    const page = useSelector(getDocumentStructureFilesPage);
    const limit = useSelector(getDocumentStructureFilesLimit);
    const fetching = useSelector(getDocumentStructureFilesFetching);
    const totalPage = useSelector(getDocumentStructureFilesTotalPage);
    const name = useSelector(getDocumentStructureFilesName);
    const date_start = useSelector(getDocumentStructureDateStart);
    const date_end = useSelector(getDocumentStructureDateEnd);
    const breadScrumbList = useSelector(getLOANNormalDocumentBreadScrumb)
    
    const [selectedIndex, setSelectedIndex] = useState<string>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openRight, setOpenRight] = useState(false);
    const [sort, setSort] = useState<'asc' | 'desc'>('asc')
    const [loading, setLoading] = useState<boolean>(isLoading);

    useEffect(() =>{
        if(isLoading !== loading){
            setLoading(isLoading)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading])

    useEffect(() => {
        if (id !== "") {
            const body ={
                page,
                limit,
                los_id:id,
                ...(name?.length) && {name: name},
                ...(date_start?.length) && {date_start: date_start},
                ...(date_end?.length) && {date_end: date_end},
                document_type_id : Number(params['*']),
            } as IPageDocument;
             dispatch(getProfileDocumentGetfile(body))
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, params['*'], page, limit, date_start, date_end]);

    useEffect(() =>{
        const searchUrl = querystring.parse(search.replace('?',''));
        const searchPage = +searchUrl.page || 1;
        if(searchPage > 0 && searchPage !== page){
            totalPage>=searchPage && dispatch(documentGetfileToPage(searchPage));
            return;
        }
        const searchLimit = +searchUrl.limit || 10;
        if(searchLimit > 0 && searchLimit !== limit){
            dispatch(documentGetfileUpdateLimit(searchLimit));
            return;
        }
    })
    
    const handleChangeLimit = (value: number) => {
        navigate('?' + buildQuery(1,value,params.id,name))
    }
    
    const handlechanglePage = (value: number) => {
        navigate('?' + buildQuery(value,limit,params.id ,name))
    }

    const handlechangleDateStart = (value: number) => {
        dispatch(updateDocumentSearch({date_start: value.toString(), date_end}));
        navigate('?' + buildQuery(1,limit,params.id ,name,value.toString()))
    }

    const handlechangleDateEnd = (value: number) => {
        dispatch(updateDocumentSearch({date_start, date_end: value.toString()}));
        navigate('?' + buildQuery(1,limit,params.id ,name,date_start,value.toString()))
    }
    
    const handlechangleFilterSelectName = (value: number) =>{
       value === 0 ? setSort('asc') : setSort('desc')
    }

    // const handleCloseOpenRight = () => {
    //     setOpenRight(false);
    //     setSelectedIndex(undefined)
    // }

    const onHandleConfirmDownload = () =>{
        curentFile && download({ filename: decodeURI(curentFile.file_name), url: curentFile.file_url })
    }

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: string,
        name:string,
        file_extension: string,
        uuid: string,
    ) => {
        // setOpenRight((prev) => !prev);
        dispatch(downloadDocumentFile({
            uuid: uuid,
            isDownload: (name.includes('.PDF') || name.includes('.pdf') || file_extension.includes('image')) ? false : true
        }))
        const indexOfExtension = file_extension.indexOf('/')
        dispatch(setFileExtension(file_extension))
        if (selectedIndex) {
            setSelectedIndex(undefined);
        } else {
            setSelectedIndex(index);
        }
        //"jpg", "png", "jpeg", "pdf"
        if(name.includes('.PDF') || name.includes('.pdf') || file_extension.includes('image')){
            return navigate(`/documents/${params.id}/${params["*"]}/${uuid}/${file_extension.substring(indexOfExtension,-1)}`);
        }
        else {
            onHandleConfirmDownload()
        }
    };

    const listFilter = _.orderBy(getFileData, ['name'], [sort]);

    const _LoadingData = () => {
        return (
            <SkeletonRow cellNumber={5} rowNumber={16} animation="pulse" />
        )
      }
    
    const showIcon = (name:string) =>{
        //pdf
        if(name.includes('.pdf') || name.includes('.PDF') ){
            return <BsFileEarmarkPdfFill style={{ fontSize: '18px', color: '#f46565' }} />
        }

        //"jpg", "png", "jpeg"
        else if(name.includes('.jpg') || name.includes('.png') || name.includes('.jpeg')){
            return <AiOutlineFileImage style={{ fontSize: '18px', color: 'orange' }} />
        }

        //"doc", "docm", "docx"         
        else if(name.includes('.doc') || name.includes('.docm') || name.includes('.docx')){
            return <FaFileAlt style={{ fontSize: '18px', color: '#808080' }} />
        }                                      
        
        //"xlsx", "xlsm", "xls"
        else if(name.includes('.xlsx') || name.includes('.xlsm') || name.includes('.xls')){
            return <AiFillFileExcel style={{ fontSize: '18px', color: '#07a791' }} />
        }
        
        //"pptx", "ppt", "pptm"
        else if(name.includes('.pptx') || name.includes('.ppt') || name.includes('.xls')){
            return <AiOutlineFileText style={{ fontSize: '18px', color: '#688fdb' }}  />
        }
    }
    
    return <Fragment >
        <Grid container sx={SxTable} ref={containerRef}>
            <Grid item xs={openRight ? 8 : 12} sx={SxFileList} >
                <Grid container>
                    <Grid item xs={openRight ? 5 : 7} className="file_DS">
                        <Breadcrumbs
                            separator={<Typography>{'>'}</Typography>}
                            aria-label="breadcrumb"
                        >
                            {breadScrumbList.map((i,idx)=>{
                                return <Typography key={idx} sx={{
                                        fontSize: "16px",
                                        fontWeight: idx + 1 === breadScrumbList.length ? 500 : 'normal',
                                        color: idx + 1 === breadScrumbList.length ? '#353535' : '#707070',
                                        "@media only screen and (max-width: 1600px)":{
                                            fontSize:'14px !important',
                                          },
                                    }}>
                                        <TextTooltip>{i.toLocaleUpperCase()}</TextTooltip>
                                    </Typography>
                            })}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={openRight ? 7 : 5} className="file_Sort">
                        <Grid container >
                            <Grid item xs={3}>
                                
                                <Select 
                                    onChange={(value)=>{
                                        handlechangleFilterSelectName(value as number) 
                                    }}
                                    options={[
                                        { label: 'Sắp xếp A - Z', value: 0 },
                                        { label: 'Sắp xếp Z - A', value: 1 },
                                    ]} 
                                    value={sort ==='asc' ? 0 : 1}
                                />
                            </Grid>
                            <Grid item xs={0.5} className="icon"><TbMinusVertical style={{ color: '#16151575' }} /></Grid>
                            <Grid item xs={0.7} className="file_Sort_Text">Từ</Grid>
                            <Grid item xs={3.4}>
                                <InputDate fullWidth onChange={(value:number)=>{
                                    handlechangleDateStart(value/1000)
                                }}/>
                            </Grid>
                            <Grid item xs={1} sx={{ justifyContent: 'center' }} className="file_Sort_Text">Đến</Grid>
                            <Grid item xs={3.4}>
                                <InputDate fullWidth onChange={(value:number)=>{
                                    handlechangleDateEnd(value/1000)
                                }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableSticky className="mscb-table "
                        sx={{  
                                marginTop: '20px',
                                height:"calc(100vh - 325px)",
                                "&::-webkit-scrollbar-track": {
                                    marginTop: "40px",
                                },
                                "& .MuiTable-root":{
                                    height: !listFilter.length ? "100%" : 'initial'
                                } 
                            }}
                          >
                            <TableHead sx={{height:'40px'}}>
                                <TableRow className="text_Title" sx={{ borderBottom: '2px solid  rgba(224, 224, 224, 1)' }}>
                                    <TableCell sx={{ width: '3%', fontSize: '18px', minWidth: '3%' }}>STT</TableCell>
                                    <TableCell sx={{ width: '47%', fontSize: '18px', minWidth: '300px' }}>TÊN HỒ SƠ</TableCell>
                                    <TableCell sx={{ width: '10%', fontSize: '18px', minWidth: '150px' }}>Tiêu đề</TableCell>
                                    <TableCell sx={{ width: '15%', fontSize: '18px', minWidth: '200px' }}>KHỞI TẠO BỞI</TableCell>
                                    <TableCell sx={{ width: '15%', fontSize: '18px', minWidth: '230px' }}>CẬP NHẬT GẦN NHẤT</TableCell>
                                    {/* <TableCell sx={{ width: '10%', textAlign: 'end', minWidth: '100px' }}><IconButton> <AiFillSetting style={{ color: '#1825aa', fontSize: '16px' }} /> </IconButton> </TableCell> */}
                                </TableRow>
                                {/* <TableRow>
                                    <TableCell colSpan={6}><div className="text_Contract" >I. <span style={{ marginLeft: '19px' }}>HỢP ĐỒNG ĐẶT CỌC</span></div></TableCell>
                                </TableRow> */}
                            </TableHead>
                            <TableBody sx={{
                                "& .MuiTableRow-root.Mui-selected": {
                                    backgroundColor: 'rgba(44, 141, 237, 0.1)',
                                }                                
                            }}>
                                {(() =>{
                                    if(loading){
                                        return _LoadingData();
                                    }
                                    if(!listFilter.length ){
                                        return <Fragment>
                                            <TableRow>
                                            <TableCell colSpan={ 5 } sx={{borderBottom:'0px'}}>
                                            <Empty>
                                                Không có dữ liệu để hiển thị
                                            </Empty>
                                            </TableCell>
                                        </TableRow>
                                      </Fragment>
                                    }
                                    else{
                                        return listFilter?.map((item, index) => (
                                            <TableRow hover selected={selectedIndex === (index).toString()} key={index} 
                                            onClick={(event) => handleListItemClick(event, (index).toString(), item.name, item.file_extension, item.uuid
                                            )} 
                                            >
                                                <TableCell sx={{ width: '3%' }}> { (page - 1) * limit + index + 1 }</TableCell>
                                                <TableCell sx={{ width: '300px', maxWidth:'300px' }}>
                                                    <TextTooltip className="textName">
                                                        <IconButton sx={{ width: '30px', textAlign: 'center',padding:'4px' }}>
                                                            {
                                                                showIcon(item.name)                                                              
                                                            }
                                                        </IconButton>
                                                        <TextTooltip>
                                                            {
                                                                item.name
                                                            }
                                                        </TextTooltip>
                                                    </TextTooltip>
                                                </TableCell>
                                                <TableCell> {item.note}</TableCell>
                                                <TableCell sx={{ width: '20%' }}>
                                                    <TextTooltip className="text_Initiated ">{item.created_by_name ? item.created_by_name : "-"}</TextTooltip>
                                                    
                                                    <span className="text_Time">{ timestampToDate(item.created_at, 'HH:mm - ' + APP_DATE_FORMAT) }</span>
                                                </TableCell>
                                                <TableCell sx={{ width: '20%' }}>
                                                    <TextTooltip className="text_Initiated ">
                                                    {item.modified_by_name ? item.modified_by_name : "-"}
                                                    </TextTooltip>
                                                    <span className="text_Time"> { timestampToDate(item.modified_at , 'HH:mm - ' + APP_DATE_FORMAT) } </span>
                                                </TableCell>
                                                {/* <TableCell sx={{ width: '10%', textAlign: 'end' }}> <BiDotsHorizontalRounded style={{ fontSize: '18px', color: '#707070' }} /> </TableCell> */}
                                            </TableRow>                         
                                        ))                                   
                                    }
                                })()                                    
                                }
                            </TableBody>
                    </TableSticky >
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: '30px' }}>
                      {
                        (()=>{
                            if(getFileData.length){
                                return  fetching ?(
                                    <Pagination
                                        className="pagination"
                                        totalPage={totalPage ?? 0}
                                        currentPage={page}
                                        limit={limit}
                                        onChange={handlechanglePage}
                                        onLimit={handleChangeLimit}
                                        
                                    />
                                ):(
                                    <Pagination
                                        className="pagination"
                                        totalPage={totalPage}
                                        currentPage={page}
                                        limit={limit}
                                    />
                                )
                            }
                        })()
                      }  
                </Grid>
            </Grid>
            {/* {
                selectedIndex && (
                    <Grid item xs={4}>
                        <Slide
                            direction="left"
                            // unmountOnExit
                            in={openRight}
                            container={containerRef.current}
                        >
                            <Paper elevation={4} className="rounded-0">


                                <FileListRight
                                    onClose={handleCloseOpenRight}
                                    index={index}
                                    name={name}
                                    note={note}
                                />

                            </Paper>
                        </Slide>
                    </Grid>

                )
            } */}

        </Grid>
    </Fragment>
}

export default FileList;