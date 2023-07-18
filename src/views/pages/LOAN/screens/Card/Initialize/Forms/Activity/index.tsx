import React from 'react';
import {
    Avatar, Divider, List, ListItem, ListItemAvatar,
    ListItemText, ListSubheader, Typography
} from '@mui/material';
import Empty from 'views/components/layout/Empty';
import clsx from 'clsx';
import ActivityStyle from './style';
import Scrollbar from 'views/components/layout/Scrollbar';
export interface IobjData {
    timeStart: string;
    timeEnd: string;
    title: string;
    status: string;
    location: string;
    owner: string;
}

interface IContent {
    date: string;
    content: IobjData[];
}

const dataFake = {
    "historyProfile": [
        {
            "date": "08/05/2021",
            "content": [
                {
                    "timeStart": "19:30",
                    "timeEnd": "19:45",
                    "title": "Giao dịch viên đang chuẩn bị hồ sơ. Mốc thời gian tính từ lúc GDV điền thông tin tab đầu tiên [thông tin cá nhân].",
                    "status": "Hoàn thành",
                    "location": "SCB Sài Gòn",
                    "owner": "Nguyễn Anh Đào - Chuyên viên thẩm định"
                },
                {
                    "timeStart": "11:30",
                    "timeEnd": "19:45",
                    "title": "Giao dịch viên đang chuẩn bị hồ sơ. Mốc thời gian tính từ lúc GDV điền thông tin tab đầu tiên [thông tin cá nhân].",
                    "status": "Đang cập nhật",
                    "location": "SCB Sài Gòn",
                    "owner": "Nguyễn Trần Trung Quân - GDV"
                }
            ]
        },
        {
            "date": "06/05/2021",
            "content": [
                {
                    "timeStart": "11:30",
                    "timeEnd": "19:45",
                    "title": "Giao dịch viên đang chuẩn bị hồ sơ. Mốc thời gian tính từ lúc GDV điền thông tin tab đầu tiên [thông tin cá nhân].",
                    "status": "Đang cập nhật",
                    "location": "SCB Sài Gòn",
                    "owner": "Nguyễn Anh Đào - Chuyên viên thẩm định"
                }
            ]
        },
        {
            "date": "06/05/2021",
            "content": [
                {
                    "timeStart": "11:30",
                    "timeEnd": "19:45",
                    "title": "Giao dịch viên đang chuẩn bị hồ sơ. Mốc thời gian tính từ lúc GDV điền thông tin tab đầu tiên [thông tin cá nhân].",
                    "status": "Đang cập nhật",
                    "location": "SCB Sài Gòn",
                    "owner": "Nguyễn Anh Đào - Chuyên viên thẩm định"
                }
            ]
        },
        {
            "date": "06/05/2021",
            "content": [
                {
                    "timeStart": "11:30",
                    "timeEnd": "19:45",
                    "title": "Giao dịch viên đang chuẩn bị hồ sơ. Mốc thời gian tính từ lúc GDV điền thông tin tab đầu tiên [thông tin cá nhân]. ",
                    "status": "Đang cập nhật",
                    "location": "SCB Sài Gòn",
                    "owner": "Nguyễn Anh Đào - Chuyên viên thẩm định"
                }
            ]
        },
        {
            "date": "06/05/2021",
            "content": [
                {
                    "timeStart": "11:30",
                    "timeEnd": "19:45",
                    "title": "[Khởi tạo hồ sơ] Thông tin pháp lý",
                    "status": "Đang cập nhật",
                    "location": "SCB Sài Gòn",
                    "owner": "Nguyễn Anh Đào - Chuyên viên thẩm định"
                }
            ]
        },
    ]
}

const Activity: React.FC = () => {
    const classes = ActivityStyle();
    return (
        <>
            <div className={ clsx(classes.label, 'mscb-outside-card-label ellipsis bg-white text-upper text-primary') }>
                QUÁ TRÌNH XỬ LÝ HỒ SƠ
            </div>
            <div className={classes.rowLine}><div className={classes.colorPath}></div></div>
            {dataFake.historyProfile?.length === 0 ? <Empty> Chưa Có Dữ Liệu</Empty>
                :
                <Scrollbar className={classes.root} height="400px">
                    {dataFake.historyProfile.map((item: IContent, index: number) => {
                        const { content, date } = item;
                        return (
                            <React.Fragment key={index}>
                                <List className={'list-container'}
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            {date}
                                        </ListSubheader>
                                    }
                                >
                                    {content.map((item2: IobjData, index2: number) => {
                                        const { timeStart, title, owner } = item2;
                                        return (
                                            <React.Fragment key={index2}>
                                                {index2 === 0 ? <Divider /> : ""}
                                                <ListItem button divider alignItems="flex-start" >
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        className={classes.owner}
                                                        primary={
                                                            <React.Fragment>
                                                                <Typography >
                                                                    {owner}
                                                                </Typography>
                                                                <span className={classes.openDate}>{date + " " + timeStart}</span>
                                                            </React.Fragment>
                                                        }
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography component="span" className={classes.inline}>
                                                                    {title}
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            </React.Fragment>
                                        );
                                    })}
                                </List>
                            </React.Fragment>
                        );
                    })}
                </Scrollbar>
            }
        </>
    );
}

export default Activity;