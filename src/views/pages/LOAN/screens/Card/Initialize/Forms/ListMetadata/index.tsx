

import CardOutside from 'views/components/layout/CardOutside';
import Empty from 'views/components/layout/Empty';
import { FC } from 'react'
import GroupListBase from 'views/components/layout/GroupListBase';
import MetaDataList from './style';
import Scrollbar from 'views/components/layout/Scrollbar';

const data = [
  { key: 1, value: '1', label: 'Loại tài sản thế chấp' },
  { key: 2, value: '2', label: 'Loại tài sản thế chấp' },
  { key: 3, value: '3', label: 'Loại tài sản thế chấp' },
  { key: 4, value: '4', label: 'Loại tài sản thế chấp' },
  { key: 5, value: '5', label: 'Loại tài sản thế chấp' },
  { key: 6, value: '6', label: 'Loại tài sản thế chấp' },
  { key: 7, value: '7', label: 'Loại tài sản thế chấp' },
  { key: 8, value: '8', label: 'Loại tài sản thế chấp' },
  { key: 9, value: '1', label: 'Loại tài sản thế chấp' },
  { key: 10, value: '2', label: 'Loại tài sản thế chấp' },
  { key: 11, value: '3', label: 'Loại tài sản thế chấp' },
  { key: 12, value: '4', label: 'Loại tài sản thế chấp' },
  { key: 13, value: '5', label: 'Loại tài sản thế chấp' },
  { key: 14, value: '6', label: 'Loại tài sản thế chấp' },
  { key: 24, value: '7', label: 'Loại tài sản thế chấp' },
  { key: 15, value: '8', label: 'Loại tài sản thế chấp' },
  { key: 16, value: '1', label: 'Loại tài sản thế chấp' },
  { key: 17, value: '2', label: 'Loại tài sản thế chấp' },
  { key: 18, value: '3', label: 'Loại tài sản thế chấp' },
  { key: 19, value: '4', label: 'Loại tài sản thế chấp' },
  { key: 20, value: '5', label: 'Loại tài sản thế chấp' },
  { key: 21, value: '6', label: 'Loại tài sản thế chấp' },
  { key: 22, value: '7', label: 'Loại tài sản thế chấp' },
  { key: 23, value: '8', label: 'Loại tài sản thế chấp' },
]
const ListMetadata: FC = () => {
  const classes = MetaDataList()
  return <CardOutside label="DANH SÁCH METADATA" className={classes.root} >
    <Scrollbar className="scroll-container" height="700px">
      {data.length > 0 ?
        <GroupListBase options={data} isAdd />
        :
        <Empty>Không có dữ liệu</Empty>
      }
    </Scrollbar >
  </CardOutside >
}

export default ListMetadata;