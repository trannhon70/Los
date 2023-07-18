import Avatar from '@mui/material/Avatar';
import { FC, Fragment } from 'react';
import { ICustomerGroupActivites } from 'types/models/loan/normal/storage/Customer';
import { splitAvatarLink } from 'utils';
import { timestampToDate } from 'utils/date';
import Empty from 'views/components/layout/Empty';

export interface DiscuzzGroupProps {
  discussions: ICustomerGroupActivites[];
}

const DiscuzzGroup: FC <DiscuzzGroupProps> = props => {
  
  const { discussions } = props;

  if(discussions.length === 0) return <Empty>Không có dữ liệu để hiển thị</Empty>;
  
  return <div className="mscb-customer-discuzz-activity-data">
    {
      discussions?.map((d, i) => (
        <div key={ `${d.date}` }  >
          <div className="font-bold mscb-customer-discuzz-activity-date">
            {d.date ?? 0}
          </div>
          {
            d.activities.map(activity => (
              <Fragment key={activity.id}>
                <div className="mscb-customer-discuzz-activity-content">
                <div className="mscb-customer-discuzz-activity-info">
                  <div className="mscb-customer-discuzz-activity-userinfo flex justify-between">
                    <div className="flex mscb-customer-discuzz-activity-user">
                      <Avatar src={splitAvatarLink(activity?.avatar)}></Avatar>
                      <div>
                        <div className="font-bold">{activity.full_name} - { activity.user_title_name }</div>
                        <div>
                          <em>
                            {`Tạo ngày ${timestampToDate(activity.created_at, "DD/MM/YYYY - HH:mm") }`}
                          </em>
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <Link to="" className="text-primary font-bold text-18">#{ d.id }</Link>
                    </div> */}
                  </div>
                  <div className="mt-2">
                    <em>Đã bình luận:</em>
                    <div className="mscb-customer-discuzz-activity-content">"{ activity.content }"</div>
                  </div>
                </div>
                </div>
                <div className="mscb-customer-discuzz-activity-line" />
              </Fragment>
            ))
          }
        </div>
      )) 
    } 
  </div>

}

export default DiscuzzGroup;
