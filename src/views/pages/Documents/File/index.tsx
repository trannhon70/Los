import { Box, Button, Grid, IconButton } from "@mui/material";
import clsx from 'clsx';
import { setTitlePage } from "features/app/store/slice";
import { clearCurrentFile, clearProfileDocument, getProfileDocumentGetfile, getProfileDocumentStructure, updateDocumentSearch } from "features/loan/normal/storage/ProfileDocument/action";
import { getDocumentStructureFilesLimit, getDocumentStructureFilesLos_id, getLOANNormalProfileDocumentStructure } from "features/loan/normal/storage/ProfileDocument/selectors";
import { FC, Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { VscSearch } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IPageDocument } from "types/models/loan/normal/storage/ProfileDocument";
import { updateDocumentTitle } from "utils";
import Input, { InputRef } from "views/components/base/Input";
import Select, { SelectOption } from "views/components/base/Select";
import CardOutside from "views/components/layout/CardOutside";
import Empty from "views/components/layout/Empty";
import { FileDetailParams } from "../FileDetail";
import FileList from "./FileList";
import FolderTree from "./FolderTree";
import GuestProfile from './GuestProfile/index';
import FileStyle, { SxDocumentsInputSearch } from "./style";

const buildQuery = (page: number, limit: number,los_id?: string,name?: string, document_type_id?: number, date_start?: string, date_end?: string): string => {
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

const File: FC = () => {
    const classes = FileStyle()
    const { id } = useParams() as FileDetailParams
    const params = useParams() as FileDetailParams
    const [filterId, setFilterId] = useState<string | number>(0);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const folderList = useSelector(getLOANNormalProfileDocumentStructure)
    // const handlechangle = (template_id:number) =>() =>{

    // }


    const optionsFilter:SelectOption[] = [
        {
          label:`TẤT CẢ THƯ MỤC`,
          value: 0
        }
    ].concat(folderList.map((i) => {
        return {
          label:i.name.toLocaleUpperCase(),
          value: Number(i.id)
        };
      }));

    const limit = useSelector(getDocumentStructureFilesLimit);
    const los_id = useSelector(getDocumentStructureFilesLos_id);

    const customerNameRef = useRef<InputRef>(null)
   

    const handleSearch = () => {
        const documentName = customerNameRef.current?.getValue() ?? '';
        dispatch(getProfileDocumentGetfile({
                los_id: id,
                // date_start:  '',
                // date_end: '',
                page : 1,
                limit ,
                document_type_id : Number(params['*']),
                name: documentName
            } as IPageDocument));
         dispatch(updateDocumentSearch({
            name: documentName
        }));
        navigate('?' + buildQuery(1, limit, los_id, documentName))
        
    }
    useEffect(()=>{
        id && dispatch(getProfileDocumentStructure(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    useEffect(() => {
        updateDocumentTitle("TÀI LIỆU HỒ SƠ");  
    })

    useEffect(() => {
        dispatch(setTitlePage("TỦ TÀI LIỆU - "+id))
        dispatch(clearCurrentFile())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if(!params['*']){
            dispatch(clearProfileDocument());    
        }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    console.log({params});
    
    const listFilter = folderList.filter(item => item.id.toString() === filterId.toString());

    const KeyupInput = (e: KeyboardEvent<HTMLInputElement>) => e.code === 'Enter' && handleSearch();
    
    return (
        <Grid container spacing={3} sx={{ height: "calc(100vh - 100px)" }} className={clsx(classes.root,'container-document')}>
            <Grid item xs={3} sx={{ height: "100%" }}>
                <CardOutside label="Thông tin khách hàng" className="guest">
                    <GuestProfile />
                </CardOutside>
                <CardOutside 
                    label="Thư mục" 
                    className="pt-5 folder responesive_FolderTree"
                    extra={
                        <Fragment>
                            <Box 
                                sx={{ 
                                    position: 'absolute', 
                                    top: '20px', 
                                    left: '115px !important',
                                    "@media screen and (max-width: 1600px)":{
                                        left:'103px !important',
                                    },
                                    "@media screen and (max-width: 1500px)":{
                                        left:'100px !important',
                                    },
                                    display:"flex", 
                                    backgroundColor:"var(--mscb-primary)",
                                    height:"40px",
                                    boxShadow:"0 3px 6px 0 rgba(0, 0, 0, 0.06)",
                                    "& .MuiInputBase-root":{
                                        backgroundColor:"var(--mscb-primary) !important",
                                        "& .MuiSelect-select":{
                                            backgroundColor:"var(--mscb-primary) !important",
                                            color:"var(--mscb-white) !important",
                                            paddingTop:"3px",
                                            fontSize:'16px',
                                            maxWidth:"130px",
                                            width:"130px"
                                        },
                                        "@media screen and (max-width: 1500px)":{
                                            "& .MuiSelect-select":{
                                                maxWidth:'110px !important',
                                            }
                                        },
                                    }
                                }}
                            >
                                <Select 
                                    value={filterId}
                                    options={optionsFilter}
                                    onChange={(value)=>{
                                        setFilterId(value);
                                    }}
                                />
                            </Box>
                        </Fragment>
                    }
                >
                    <FolderTree 
                        selected={params['*'].toString()} 
                        onClick={(template_id
                        // ,folderChildId,folderId,name
                        )=>{
                        navigate(`/documents/${params.id}/${template_id}`)
                        }}
                        options={filterId === 0 ? folderList : listFilter}
                    />
                </CardOutside>
            </Grid>
            <Grid item xs={9} sx={{
                "& .makeStyles-content-42":{
                    padding:'0px !important',
                }
            }} >
                <CardOutside  label="Tài liệu" className="table card-out-side-label " 
                    extra={
                        <Fragment>
                            <Box className="flex justify-between absolute top" sx={{  left: '101px !important' }}>
                                <Box className="flex ">
                                    <Box
                                        className='flex ml-1'
                                        sx={SxDocumentsInputSearch}
                                    >
                                        <Input ref={customerNameRef} onKeyup={KeyupInput} className='corrdinator-input-search' placeholder='Tên tài liệu' fullWidth />
                                        <IconButton  onClick={handleSearch}>
                                            <VscSearch className='corrdinator-icon-search' />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="absolute right " sx={{  top: '2px' }}>
                                <Button className="rounded-0 bg-white" sx={{ minWidth:'40px', padding:'5px 8px'}}>
                                    <IconButton aria-label="delete" size="small" className="text-danger" >
                                        <RiErrorWarningFill />
                                    </IconButton>
                                </Button>
                                
                            </Box>
                        </Fragment>
                    }
                >
                    { params["*"] ? <FileList
                     
                     /> : <Empty>Chưa chọn thư mục</Empty> }
                </CardOutside>
            </Grid>
            
        </Grid>
    );
};

export default File;
