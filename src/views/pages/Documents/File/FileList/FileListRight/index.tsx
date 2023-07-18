import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { IoMdClose } from 'react-icons/io';

import Information from './Information';
import Security from './Security';
import { SxFileListRight } from './style';
import Work from './Work';

export interface IFileListRightProps{
    onClose?: () => void;

    index?:string;
    name?:string,
    note?:string,
}

const FileListRight: React.FC<IFileListRightProps> = (props) => {
    const {onClose,index,name,note} = props;
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleClose = () => onClose && onClose();

    

    // console.log('data',index);
    
    return <Box sx={SxFileListRight} >
        <Grid container>
            <Grid item xs={12} sx={{ textAlign: 'end' }} >
                <IconButton  onClick={handleClose}><IoMdClose className='text-danger' /> </IconButton>
            </Grid>
        </Grid>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab className='tab' label="Thông tin" value="1" />
                    <Tab className='tab' label="Hoạt động" value="2" />
                    <Tab className='tab' label="Bảo mật" value="3" />
                </TabList>
            </Box>
            <TabPanel className='TabPanel' value="1">
                <Information index={index} name={name} note={note}/>
            </TabPanel>
            <TabPanel className='TabPanel' value="2">
                <Work />
            </TabPanel>
            <TabPanel className='TabPanel' value="3">
                  <Security />
            </TabPanel>
        </TabContext>
    </Box>
}

export default FileListRight;