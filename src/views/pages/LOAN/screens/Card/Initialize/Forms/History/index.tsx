import React, { FC } from 'react';
import CardOutside from 'views/components/layout/CardOutside';
import Empty from 'views/components/layout/Empty';

import {
    Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, 
    ListItemSecondaryAction, ListItemText, ListSubheader, Typography
} from '@mui/material';

import HistoryStyle from './style';
import { useTranslation } from 'react-i18next';
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

const History: FC = () => {

    const classes = HistoryStyle();
    const { t } = useTranslation();
    
    const dataFake = {
        "historyProfile": [
            {
                "date": "08/05/2021",
                "content": [
                    {
                        "timeStart": "19:30",
                        "timeEnd": "19:45",
                        "title": "Khách hàng đã tạo CIF thành công.",
                        "status": "Hoàn thành",
                        "location": "SCB Sài Gòn",
                        "owner": "Nguyễn Anh Đào"
                    },
                    {
                        "timeStart": "11:30",
                        "timeEnd": "19:45",
                        "title": "[Khởi tạo hồ sơ] Thông tin pháp lý",
                        "status": "Đang cập nhật",
                        "location": "SCB Sài Gòn",
                        "owner": "Nguyễn Trần Trung Quân"
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
                        "owner": "Nguyễn Anh Đào"
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
                        "owner": "Nguyễn Anh Đào"
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
                        "owner": "Nguyễn Anh Đào"
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
                        "owner": "Nguyễn Anh Đào"
                    }
                ]
            },
        ]
    }

    return <CardOutside label="LỊCH SỬ THAY ĐỔI" className="mt-5">
        <>
            {dataFake.historyProfile?.length === 0 ? <Empty>{t("Pages.Init.LegalInfo.Table.Emty")}</Empty>
                :
                <Scrollbar  className={classes.root} height="420px">
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
                                        const { owner, timeStart } = item2;
                                        return (
                                            <React.Fragment key={index2}>
                                                {index2 === 0 ? <Divider /> : ""}
                                                <ListItem button alignItems="flex-start" >
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        className={classes.owner}
                                                        primary={
                                                            <React.Fragment>
                                                                <Typography className="full-name" >
                                                                    {owner}
                                                                </Typography>
                                                                <span className={classes.openDate}>{" Tạo ngày " + date + " " + timeStart}</span>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete" disabled={true} disableRipple={true} size={"small"} color={"primary"}>
                                                            {"#" + (index2 + 1).toString()}
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
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
    </CardOutside>
}

export default History;