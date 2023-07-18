import { Skeleton, Box } from '@mui/material';
import clsx from 'clsx';
import { fetchListDataHistoryLogs, fetchMoreHistoryLogsData } from 'features/loan/normal/storage/historyLogs/action';
import { getListHistoryLog, isFetchedLogs, isFetchingLogs } from 'features/loan/normal/storage/historyLogs/selector';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import _ from 'lodash';
import { FC, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { timestampToDate } from 'utils/date';
import Loading from 'views/components/base/Loading';
import CardOutside from 'views/components/layout/CardOutside';
import Empty from 'views/components/layout/Empty';
import Scrollbar, { ScrollbarRef } from 'views/components/layout/ScrollbarCLone';
import HistoryGroup from './HistoryGroup';
import customerStyle from './style';

export interface CustomerHistoryProps {
  className?: string;
}

const CustomerHistory: FC<CustomerHistoryProps> = props => {

  const { className } = props;
  const params = useParams() as unknown as ILOANURLParams;
  const dispatch = useDispatch();
  const scrollbarRef = useRef<ScrollbarRef>(null)
  const classes = customerStyle();

  const FetchingLogs = useSelector(isFetchingLogs);
  const FetchedLogs = useSelector(isFetchedLogs);
  const ListHistoryLogStored = useSelector(getListHistoryLog);
  const los_id = useSelector(getLOANNormalLOSId)
  const sortDate = _.sortBy(ListHistoryLogStored, ['date'])?.reverse()

  useEffect(() => {
    if (los_id && params.id && params.id !== '-') {
      dispatch(fetchListDataHistoryLogs(params.id))
      scrollbarRef?.current?.scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [los_id, params.id]);

  const extra = <div>
    {/* <span className="underline mr-2">Bộ lọc</span>
    <i className="fas fa-filter text-primary" /> */}
  </div>

  const handleScrollBar = (e: any) => {

    if (e?.target?.scrollTop + e?.target?.scrollWidth === e?.target?.scrollHeight - 10) {
      dispatch(fetchMoreHistoryLogsData(params.id))
    }
  }


  return <CardOutside
    label="LỊCH SỬ HỒ SƠ"
    extra={extra}
    className={clsx(className, !FetchedLogs && classes.LoadingBackground,  params.id === '-' ? 'no-data' : '' )}
    extraClass="absolute right top mt-2"
  >
    {
      params.id === '-' ?
      <Box sx={{
        height:"calc(438px)"
      }}>
      <Empty>
        Không có dữ liệu để hiển thị
      </Empty>
      </Box> :!FetchedLogs ?  <Box sx={{height:"438px"}}>
        <Skeleton height={'10%'} width="100%" />
        <Skeleton height={'20%'} width="100%" />
        <Skeleton height={'10%'} width="100%" />
        <Skeleton height={'20%'} width="100%" />
        <Skeleton height={'10%'} width="100%" />
        <Skeleton height={'20%'} width="100%" />
      </Box>
       :
            <div className="mscb-customer-history-container">
            {
              <Scrollbar onScroll={handleScrollBar} ref={scrollbarRef}>
                <div className={`mscb-customer-history-scrollable ${ListHistoryLogStored.length === 0 ? "mscb-customer-history-scrollable-height" : ""}`}>
                  {
                    sortDate?.length > 0 ?
                      sortDate?.map((hl, index) => {
                        return <HistoryGroup
                          key={index}
                          date={hl.date}
                          info={hl.child_time_line.map(ctl => ({
                            start: `${timestampToDate(ctl.created_at,"HH : mm")}`,
                            end: `${timestampToDate(ctl.updated_at,"HH : mm")}`,
                            step: ctl.status_out_message_desc,
                            task: ctl.position_name,
                            status: ctl.status_finished,
                            branch: ctl.branch_name,
                            full_name: ctl.full_name,
                            department: ctl.title_name,
                          }))}
                        />
                      })
                      :
                      <Empty>Không có dữ liệu</Empty>
                  }
                </div>
              </Scrollbar>
            }
          </div>
    }
   
  </CardOutside>
}

export default CustomerHistory;