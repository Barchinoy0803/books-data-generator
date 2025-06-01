import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BooksTable } from '../Table';
import { Book } from '../../types';
import Gallery from '../Gallery';

interface BookTabsProps {
    books: Book[]
}

const BookTabs = ({ books }: BookTabsProps) => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Table View" value="1" />
                        <Tab label="Gallery View" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <BooksTable data={books} />
                </TabPanel>
                <TabPanel value="2">
                    <Gallery books={books} />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default BookTabs
