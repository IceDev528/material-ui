import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';

const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

export default function ResponsiveSpacing() {
  return (
    <Box sx={{ width: 500, minHeight: 377 }}>
      <Masonry columns={3} spacing={{ xs: 1, sm: 2, md: 3 }}>
        {heights.map((height, index) => (
          <MasonryItem key={index}>
            <Box
              sx={{
                textAlign: 'center',
                height,
                border: 1,
                bgcolor: 'background.paper',
              }}
            >
              {index + 1}
            </Box>
          </MasonryItem>
        ))}
      </Masonry>
    </Box>
  );
}
