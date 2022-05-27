import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

export default function InteractiveCard() {
  return (
    <Card
      row
      variant="soft"
      color="success"
      sx={{
        minWidth: '260px',
        gap: 2,
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontWeight="md" color="success.plainColor" mb={0.5}>
          Yosemite Park
        </Typography>
        <Typography level="body2">California, USA</Typography>
      </CardContent>
      <CardOverflow
        variant="solid"
        color="success"
        sx={{
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'sm',
          fontWeight: 'md',
          letterSpacing: '1px',
        }}
      >
        USED
      </CardOverflow>
    </Card>
  );
}
