import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';

interface CommunitySayCardProps {
  name: string;
  id: string;
  description: any;
  avatar: string;
  uniqueKey: number;
  url: string;
}

export default function CommunitySayCard(props: CommunitySayCardProps) {
  const { name, id, description, avatar, uniqueKey, url } = props;
  return (
    <Box
      sx={{
        bgcolor: 'greyF3',
        px: { xs: 4, lg: 5 },
        py: 5,
        pt: 5.5,
        borderRadius: 1,
        mt: uniqueKey === 1 ? { sm: 0, lg: 3.3 } : 0,
        display: 'block',
        color: 'inherit',
        '&:hover': {
          bgcolor: 'greyEA',
          textDecoration: 'none',
        },
      }}
      component={Link}
      href={url}
    >
      <Box
        component="img"
        src="/static/branding/mui-x/twitter.svg"
        loading="lazy"
        alt="Twitter"
        sx={{
          mb: { xs: 2, sm: 3 },
        }}
      />
      <Typography
        paragraph
        variant="h4"
        align="center"
        sx={{ mb: { xs: 4, lg: 3 }, textAlign: 'left' }}
      >
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            mr: { xs: 1.5, lg: 2 },
            borderRadius: '50%',
          }}
        >
          <img loading="lazy" src={avatar} width="48" height="48" alt={`${name} avatar`} />
        </Avatar>
        <Box sx={{ fontSize: '1rem', lineHeight: '24px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
          <Typography sx={{ fontSize: '1rem' }}>{id}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
