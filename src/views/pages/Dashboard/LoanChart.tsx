import { FC }  from 'react';
import CardOutside from 'views/components/layout/CardOutside';
import Empty from 'views/components/layout/Empty';

const LoanChart: FC = () => {

  return <CardOutside label="TỔNG SỐ TIỀN CHO VAY">
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

export default LoanChart;
