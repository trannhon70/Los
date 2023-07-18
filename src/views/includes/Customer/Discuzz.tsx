import { Box, Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { fetchLOANNormalCustomerData, fetchMoreCustomerData, postCustomerComment } from 'features/loan/normal/storage/customer/actions';
import { getFetchedLOANNormalCustomerData, getLOANNormalCustomerData } from 'features/loan/normal/storage/customer/selectors';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import Input from 'views/components/base/Input';
import CardOutside from 'views/components/layout/CardOutside';
import Empty from 'views/components/layout/Empty';
import Scrollbar, { ScrollbarRef } from 'views/components/layout/ScrollbarCLone';
import Tabs from 'views/components/layout/Tabs';
import DiscuzzGroup from './DiscuzzGroup';
import customerStyle from './style';

export interface CustomerDiscuzzProps{
  className?: string;
}

const CustomerDiscuzz: FC<CustomerDiscuzzProps> = props => {

  const { className } = props;
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const los_id = useSelector(getLOANNormalLOSId)
  const [comment, setComment] = useState<string>()
  const scrollbarRef = useRef<ScrollbarRef>(null)
  const [isNewComment, setIsNewComment] = useState<boolean>(true)
  const classes = customerStyle();

  useEffect(() => {
    if (los_id && params.id && params.id !== '-') {
      dispatch(fetchLOANNormalCustomerData(los_id));
      scrollbarRef?.current?.scrollToTop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [los_id, params.id]);
  
  const discussions = useSelector(getLOANNormalCustomerData)
  // const fetching = useSelector(getFetchingLOANNormalCustomerData)
  const fetched = useSelector(getFetchedLOANNormalCustomerData)

  useEffect(() => {
    if(isNewComment && fetched){
      scrollbarRef?.current?.scrollToTop()
      setIsNewComment(!isNewComment)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[discussions, fetched])

  const handleChangeComment = (value: string) => {
    setComment(value);
  }
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      onPostComment()
    }
  }
  const onPostComment = () => {
    if(comment){
      dispatch(postCustomerComment(comment))
      setComment(undefined)
      setIsNewComment(true)
    }
  }
  const handleScrollBar = (e: any) => {
    console.log(e?.target?.scrollTop , e?.target?.scrollWidth , e?.target?.scrollHeight);
    
    if (e?.target?.scrollTop + e?.target?.scrollWidth === e?.target?.scrollHeight + 21) {
      dispatch(fetchMoreCustomerData(los_id))
    }
  }
 
  return <CardOutside className={clsx(className, !fetched && classes.LoadingBackground)} label="TƯ VẤN THẢO LUẬN">
    {
      params.id === '-' ? <Box sx={{
        height:"calc(438px)"
      }}>
      <Empty>
        Không có dữ liệu để hiển thị
      </Empty>
      </Box>  :!fetched  ? <Box sx={{height:"438px"}}>
      <Skeleton height={'10%'} width="100%" />
      <Skeleton height={'30%'} width="100%" />
      <Skeleton height={'20%'} width="100%" />
      <Skeleton height={'20%'} width="100%" />
      <Skeleton height={'10%'} width="100%" />
    </Box> : <Tabs className="" variant="fullWidth" tabs={[
        'Hoạt động',
        'Relations',
        'Watcheds'
      ]}>
        <div className="h-full mscb-customer-discuzz-activity">
          <div className="mscb-customer-discuzz-list">
            <Scrollbar 
              ref={scrollbarRef}
              onScroll={handleScrollBar}
            >
              <div className="h-full mscb-customer-discuzz-panel" >
                <DiscuzzGroup discussions={discussions} />
              </div>
            </Scrollbar>
          </div>
          <div className="flex justify-between mscb-customer-discuzz-message">
            <div className="mscb-customer-discuzz-input">
              <Input placeholder="Ghi bình luận" 
                value={comment}
                onChange={handleChangeComment}
                onKeyup={handleKeyUp}
              />
            </div>
            
            <div className="flex justify-end items-center">
              <IconButton size="medium" onClick={onPostComment} className={classes.icon}>
               <RiSendPlaneFill size={20} color="#fff" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="h-full">
          <Empty>
            Không có dữ liệu để hiển thị
          </Empty>
        </div>
        <div className="h-full">
          <Empty>
            Không có dữ liệu để hiển thị
          </Empty>
        </div>
      </Tabs>
    }
   
  </CardOutside>

}

export default CustomerDiscuzz;