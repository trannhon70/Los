import { FC } from 'react';
import CardOutside from 'views/components/layout/CardOutside';
import Empty from 'views/components/layout/Empty';

const RaisedChart: FC = () => {

  return <CardOutside label="TỔNG SỐ TIỀN HUY ĐỘNG" className="dashboard-raised-chart">
    <Empty
      sx={{
        minHeight: '400px',
        "& img": {
          width: "15%"
        },
        fontSize: '24px',
        fontWeight: 300,
        fontStyle: 'italic',
      }}
    >Chưa có dữ liệu</Empty>
  </CardOutside>

}

export default RaisedChart;
