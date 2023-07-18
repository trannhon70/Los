import { Box, Button, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FC, Fragment, useState, ReactNode } from "react";
import CardOutside from 'views/components/layout/CardOutside';
import clsx from 'clsx';
import FileDetailStyle from "./style"
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import PDF from "./PDF";
import VersionList from "./VersionList";
import { ReactComponent as UpgradeIcon } from 'assets/images/Up.svg';
import { ReactComponent as AIcon } from 'assets/images/Text.svg';
import { ReactComponent as CardIcon } from 'assets/images/File.svg';
import { ReactComponent as HistroryIcon } from 'assets/images/History.svg';
import { ReactComponent as PercentIcon } from 'assets/images/Percent.svg';
import { ReactComponent as InboxIcon } from "assets/images/Document.svg"
import { DeclareNameDetailFile } from "views/pages/LOAN/utils";
import HistoryList from "./HistoryList";
import downloadIcon from "assets/images/Dowload.svg"
import { useSelector } from "react-redux";
import { getLOANNormalCurrentFile } from "features/loan/normal/storage/ProfileDocument/selectors";
import { download } from "utils";
import TextTooltip from "views/components/base/TextTooltip";

interface IListItem {
    icon: ReactNode,
    name: string
}
export interface FileDetailParams {
    id: string,
    folder_id: string,
    file_id: string,
    type: string,
    "*": string
}
const listItem = [
    {
        icon: <InboxIcon fill="rgba(0, 0, 0, 0.54)" />,
        name: "Nội dung"
    },
    {
        icon: <AIcon />,
        name: "Nhận dạng ký tự quan học"
    },
    {
        icon: <UpgradeIcon />,
        name: "Phiên bản"
    },
    {
        icon: <CardIcon />,
        name: "Thẻ"
    },
    {
        icon: <PercentIcon />,
        name: "Tính chất"
    },
    {
        icon: <HistroryIcon />,
        name: "Lịch sử"
    }
] as IListItem[]
const FileDetail: FC = () => {
    const classes = FileDetailStyle()
    const params = useParams() as FileDetailParams
    const current = DeclareNameDetailFile.indexOf(params["*"]);
    const [selectedIndex, setSelectedIndex] = useState(current);
    const navigate = useNavigate()
    const curentFile = useSelector(getLOANNormalCurrentFile)
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        if (index === 0) {
            navigate('')
        }
        if (index === 1) {
            navigate('identity')
        }
        if (index === 2) {
            navigate('version')
        }
        if (index === 5) {
            navigate('history')
        }
    };
    return (
        <CardOutside
            label={<Button
                onClick={() => { navigate(`/documents/${params.id}/${params.folder_id}`) }}>
                {curentFile?.file_name}
            </Button>
            }
            className={clsx(classes.root)}
            extra={
                <Fragment>
                    <Box sx={{ position: 'absolute', top: '9px', right: '0px !important', display: "flex", backgroundColor: "white" }}>
                        <IconButton
                            sx={{ borderRadius: '0px', minWidth: '30px', height: "30px", boxShadow: "unset" }}
                            onClick={() => {
                                curentFile && download({ filename: decodeURI(curentFile.file_name), url: curentFile.file_url });
                            }}
                        >
                            <img src={downloadIcon} alt="extra-icon" />
                        </IconButton>
                        {/* <Button sx={{ borderRadius: '0px', minWidth: '30px', height:"30px", boxShadow:"unset" }}>
                            <img src={arrowIcon} alt="extra-icon" />
                        </Button>
                        <Button sx={{ borderRadius: '0px', minWidth: '30px', height:"30px", boxShadow:"unset" }}>
                            <img src={shareIcon} alt="extra-icon" />
                        </Button>
                        <Button sx={{ borderRadius: '0px', minWidth: '30px', height:"30px", boxShadow:"unset" }}>
                            <img src={lockIcon} alt="extra-icon" />
                        </Button>
                        <Button sx={{ borderRadius: '0px', minWidth: '30px', height:"30px", boxShadow:"unset" }}>
                            <img src={printIcon} alt="extra-icon" />
                        </Button>
                        <Button sx={{ borderRadius: '0px', minWidth: '30px', height:"30px", boxShadow:"unset" }}>
                            <img src={recycleIcon} alt="extra-icon" />
                        </Button> */}
                    </Box>
                </Fragment>
            }
        >
            <Grid container columns={15} >
                <Grid item xs={12}>
                    <Routes>
                        <Route index element={<PDF />} />
                        <Route path="identity" element={<PDF isIdentityPage={true} />} />
                        <Route path="version" element={<VersionList />} />
                        <Route path="history" element={<HistoryList />} />
                    </Routes>
                </Grid>
                <Grid item xs={3} sx={{ boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.22)', }}>
                    <List component="nav" sx={{
                        "& svg": {
                            "& path": {
                                fill: "var(--mscb-secondary)"
                            }
                        },
                        "& .Mui-selected": {
                            backgroundColor: "unset !important",
                            "& .MuiTypography-root": {
                                color: "var(--mscb-primary)",
                            },
                            "& .MuiListItemIcon-root": {
                                color: "var(--mscb-primary)"
                            },
                            "& .MuiListItemText-root": {
                                color: "var(--mscb-primary)"
                            },
                            "& svg": {
                                "& path": {
                                    fill: "var(--mscb-primary)"
                                }
                            },

                        }
                    }}>
                        {
                            listItem.map((i, index) => (
                                <ListItemButton
                                    key={index}
                                    selected={selectedIndex === index}
                                    onClick={(event) => handleListItemClick(event, index)}
                                >
                                    <ListItemIcon sx={{ minWidth: "unset", paddingRight: "8px" }}>
                                        {i.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={{
                                            "& .MuiTypography-root": {
                                                color: "var(--mscb-secondary)",
                                                fontSize: "16px"
                                            },
                                        }}
                                        primary={<TextTooltip> {i.name} </TextTooltip>}

                                    />
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
        </CardOutside>
    );
};

export default FileDetail;
