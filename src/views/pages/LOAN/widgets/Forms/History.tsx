import { FC, Fragment } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Scrollbar from "views/components/layout/Scrollbar";
import { IDateLogData } from "types/models/loan/normal/storage/Forms";
import Empty from "views/components/layout/Empty";
import { converStringDate } from "utils";

export interface FormsHistoryProps {
  logData?: IDateLogData[];
}

const FormsHistory: FC<FormsHistoryProps> = (props) => {
  const { logData } = props;

  return (
    <Scrollbar height="250px">
      {logData && logData.length ? (
        logData.map((item, index) => {
          return (
            <Fragment key={index}>
              <List
                className={"list-container"}
                subheader={
                  <ListSubheader component="div">
                    {converStringDate(item.date)}
                    <Divider />
                  </ListSubheader>
                }
              >
                {item.logs.map((log, idx) => {
                  return (
                    <Fragment key={idx}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="AVT" />
                        </ListItemAvatar>
                        <ListItemText
                          className="item-text"
                          primary={
                            <Fragment>
                              <span className="full-name-label text-14 font-medium">
                                {log.user_fullname}
                              </span>
                              <br />
                              <span className="content-label text-12 font-light">
                                {log.content}
                                <br/>
                                {converStringDate(log.updated_at, true)}
                              </span>
                            </Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            disabled={true}
                            disableRipple={true}
                            size={"small"}
                            sx={{ color: "#1825aa !important" }}
                          >
                            {"#" + (idx + 1).toString()}
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Fragment>
                  );
                })}
              </List>
            </Fragment>
          );
        })
      ) : (
        <Empty>Không có dữ liệu để hiển thị</Empty>
      )}
    </Scrollbar>
  );
};

export default FormsHistory;
