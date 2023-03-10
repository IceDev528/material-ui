import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsVertical() {
  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{ minWidth: 300, borderRadius: 'lg' }}
    >
      <TabList>
        <Tab>First tab</Tab>
        <Tab>Second tab</Tab>
        <Tab>Third tab</Tab>
      </TabList>
      <TabPanel sx={{ p: 2, minHeight: 200 }}>
        <b>First</b> tab panel
      </TabPanel>
      <TabPanel value={1} sx={{ p: 2, minHeight: 200 }}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2} sx={{ p: 2, minHeight: 200 }}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
  );
}
