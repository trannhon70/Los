import { TreeItem, TreeView } from '@mui/lab';
import { FC } from 'react';
import CardOutside from 'views/components/layout/CardOutside';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from 'assets/images/folder.png';
import { FaRegFileAlt } from 'react-icons/fa';
import Radio from './Radio';
import Activity from '../Activity'
import categoryStyle from './style';
import Scrollbar from 'views/components/layout/Scrollbar';
import clsx from 'clsx'
const data = [
  {
    profile_type_id: "1",
    profile_type_list: [
      {
        profile_id: "2",
        profile_name: "Tờ trình sản phẩm vay 1",
      },
      {
        profile_id: "3",
        profile_name: "Tờ trình sản phẩm vay 2",
      }
    ],
    profile_type_name: "Tờ trình sản phẩm"
  },
  {
    profile_type_id: "3",
    profile_type_list: [
      {
        profile_id: "22",
        profile_name: "Tờ trình 1",
      },
      {
        profile_id: "3123",
        profile_name: "Tờ trình 2",
      }
    ],
    profile_type_name: "Tờ trình"
  },
  {
    profile_type_id: "33",
    profile_type_list: [
      {
        profile_id: "1232132",
        profile_name: "Thông báo phê duyệt 1",
      },
      {
        profile_id: "3123123",
        profile_name: "Thông báo phê duyệt 2",
      }
    ],
    profile_type_name: "Thông báo phê duyệt"
  },
]


const Category: FC = () => {
  const classes = categoryStyle();
  return <CardOutside label='DANH MỤC HỒ SƠ' className={clsx(classes.root)}>
    <Scrollbar height="600px">
      {data.map((item, index) => (
        <TreeView
       
          className={classes.treeViewroot}
          key={index}
          defaultCollapseIcon={[<ExpandLessIcon />, <img src={FolderIcon} alt='' className='iconCollapse' key={index} />]}
          defaultExpandIcon={[<ChevronRightIcon   key={index} fontSize='large' />, <img src={FolderIcon} alt='' className='iconCollapse' key={item.profile_type_id} />]}
        >
          <TreeItem nodeId="1" label={item.profile_type_name} key={item.profile_type_id} className='label' >
            <Radio key={item.profile_type_id}  options={item.profile_type_list.map((item, i) => ({
              key: item.profile_id,
              value: item.profile_name,
              label: item.profile_name,

            }))} variant="checkbox" position="start"
              islabelIcon={true}
              labelIcon={<FaRegFileAlt className="" key={item.profile_type_id}  />} />
          </TreeItem>
        </TreeView>
      )
      )}
    </Scrollbar>
    <div className='totalApproved'>
      <span>Tổng số biểu mẫu được phê duyệt </span>
      <div className='boxResult'>3/3</div>
    </div>
    <Activity />
  </CardOutside>

}

export default Category;