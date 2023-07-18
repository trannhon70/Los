import Paper from '@mui/material/Paper';
import { FC, useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import Tabs from 'views/components/layout/Tabs';
import Legal from './Legal';
import Product from './Product';
import Income from './Income';
import Collateral from './Collateral';
import Forms from './Forms';
import { useDispatch, useSelector } from 'react-redux';
import { tabNameCard } from 'views/pages/LOAN/utils';
import TabPanel from 'views/components/layout/TabPanel';
import Loan from './Loan';
import CreditRatings from './CreditRatings';
import Others from './Others';
import useNotify from 'app/hooks/useNotify';
import { fetchedLOANCardConfigProductCategory, fetchingLOANCardConfigProductCategory } from 'features/loan/card/configs/products/category/selector';
import useProductCardData from 'app/hooks/useProductCardData';
import { updateDocumentTitle } from 'utils';
import CIC from './CIC';


const Initialize: FC = () => {

  const params = useParams() as unknown as ILOANURLParams;
  const navigate = useNavigate();
  const notify = useNotify();

  const dispatch = useDispatch();
  const isFetchedCate = useSelector(fetchedLOANCardConfigProductCategory);
  const isFetchingCate = useSelector(fetchingLOANCardConfigProductCategory);

  const { existData } = useProductCardData();

  // useEffect(() => {
  //   updateDocumentTitle('Khởi tạo hồ sơ thẻ');

  //   // !isFetchedCate
  //   //   && !isFetchingCate
  //   // && dispatch(fetchLOANCardConfigProductCategory());
  //   // if (params.id === '-') {
  //   //     dispatch(clearProductCard());
  //   // }
  // });

  
  useEffect(() => {
    if(params.id === "-" && params["*"] !== 'product-card'){
      navigate("/");
    }
  });

  const current = tabNameCard.indexOf(params['*'].split('/')[0]);


  const beforeChange = (_: number, next: number) => {
    if (next > 0 && existData === false) {
      // notify('Vui lòng khởi tạo nhóm sản phẩm.', 'warning');
      // return false;
    }

    let tabNext = tabNameCard[next];


    switch (tabNext) {
      case 'legal-card':
        tabNext += '/card-holder';
        break;
      case 'cic-card':
        tabNext += '/other/card-holder';
        break;
      case 'loan-card':
        tabNext += '/product';
        break;
      case 'income-card':
        tabNext += '/income/salary';
        break;

      case 'other-card':
        tabNext += '/exception';
        break;
    }

    navigate(`/loan/card/init/${params.id}/${tabNext}`);

    return true;
  }

  return <Paper
    sx={{
      width: '100%',
      borderRadius: 0,
      '& > .mscb-tabs': {
        '& > .MuiTabs-root': {
          '& > .MuiTabs-scroller': {
            '& > .MuiTabs-flexContainer': {
              borderBottom: '2px solid #d5d5d5',
            }
          }
        }
      }
    }}
    className="px-6">
    <Tabs current={!!~current ? current : 0}
      beforeChange={beforeChange}
      tabs={[
        'Nhóm sản phẩm',
        'Thông tin pháp lý',
        'Thông tin CIC',
        'Thông tin khoản vay',
        'Nguồn thu nhập',
        'Tài sản đảm bảo',
        'Hồ sơ khác',
        'XHTDNB',
        'Biểu mẫu'
      ]}>
      <TabPanel
        // padding={false}
        index={0}
        value={current}
        sx={{
          alignItems: 'center',
          '& > .MuiBox-root': {
            height: '100%',
          }
        }}
      >
        <Routes>
          <Route path="product-card" element={<Product />} />
        </Routes>
      </TabPanel>
      <Routes>
        <Route path="legal-card/*" element={<Legal />} />
      </Routes>
      <Routes>
        <Route path="cic-card/*" element={<CIC />} />
      </Routes>
      <Routes>
        <Route path="loan-card/*" element={<Loan />} />
      </Routes>
      <Routes>
        <Route path="income-card/*" element={<Income />} />
      </Routes>
      <Routes>
        <Route path="collateral-card" element={<Collateral />} />
      </Routes>
      <Routes>
        <Route path="other-card/*" element={<Others />} />
      </Routes>
      <Routes>
        <Route path="internal-credit-rating-card" element={<CreditRatings />} />
      </Routes>
      <Routes>
        <Route path="forms-card" element={<Forms />} />
      </Routes>

    </Tabs>
  </Paper>
}

export default Initialize;