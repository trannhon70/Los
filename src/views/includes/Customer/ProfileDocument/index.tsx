import { Box, Grid, Skeleton } from "@mui/material";
import iconFolder from "assets/images/folderIcon.svg";
import logo from "assets/images/n1.png";
import { clearDocumentsCabinet, getProfileDocument } from "features/loan/normal/storage/ProfileDocument/action";
import { getLOANNormalProfileDocument } from "features/loan/normal/storage/ProfileDocument/selectors";
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import TextTooltip from "views/components/base/TextTooltip";
import Empty from "views/components/layout/Empty";
import { FileDetailParams } from "views/pages/Documents/FileDetail";

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface Skeleton {
    name: string,
}

const DataSkeletonFake = [
    { name: '.' },
    { name: '.' },
    { name: '.' },
    { name: '.' },
    { name: '.' },
    { name: '.' },
] as Skeleton[]

const folderIcon = () => {
    return <Box className="folderImg"><img src={iconFolder} alt="folderIcon" /></Box>;
};

const ProfileDocument: FC = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ProfileData = useSelector(getLOANNormalProfileDocument);
    const los_id = useSelector(getLOANNormalLOSId)


    const handleClickDocuments = () => {
        navigate(`/documents/${los_id}`);
    }

    useEffect(() => {
        if (los_id !== "") {
            dispatch(getProfileDocument(los_id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [los_id]);

    useEffect(()=>{
        dispatch(clearDocumentsCabinet())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // console.log({params});
    

    return <Fragment>
        <div style={{ padding: '3px 0px', textAlign: 'end', cursor: 'pointer' }}> <u >Xem tất cả</u></div>
        <Grid container spacing={3}>
            {
                (() => {
                    if (!ProfileData?.length) {
                        // eslint-disable-next-line array-callback-return
                        return DataSkeletonFake.map((name, id) => {
                            return <Grid item xs={4} sx={{ paddingTop: '6px !important' }} key={id} >
                                <Skeleton width="100%" >
                                    <Box sx={{ height: '110px' }}>{name.name}</Box>
                                </Skeleton>
                            </Grid>
                        })
                    }
                    else {
                        if (!ProfileData.map.length) {
                            return <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '200px' }} >
                                <Empty>
                                    Không có dữ liệu để hiển thị
                                </Empty>
                            </Grid>
                        }
                        return ProfileData?.map((doc, index) => (
                            <Grid item xs={4} key={doc.id} >
                                <div onClick={handleClickDocuments}>
                                    <Box sx={{ border: '1px solid #d5d5d5', padding: '15px 17px', cursor: 'pointer' }}>
                                        <Grid container >
                                            <Grid item xs={11}>
                                                <Grid container>
                                                    <Grid item xs={2.5}>
                                                        <Box component={folderIcon} sx={{ width: '10%' }} />
                                                    </Grid>
                                                    <Grid item xs={9.5} sx={{ fontSize: '19px', color: '#1825aa' }}><TextTooltip>{doc.total_file} tài liệu</TextTooltip> </Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid item xs={12} >
                                                        <TextTooltip sx={{ marginLeft: '5px', color: '#353535', textAlign: 'left', paddingTop: '8px' }} ><span style={{ fontSize: '16px', fontWeight: 500 }}>{doc.name}</span></TextTooltip>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src={logo} alt="..." /> </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            </Grid>
                        ))
                    }
                })()
            }
        </Grid>
    </Fragment>
}

export default ProfileDocument;

