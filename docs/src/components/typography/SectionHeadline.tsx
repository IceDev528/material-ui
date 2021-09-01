import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function SectionHeadline({
  overline,
  title,
  description,
  mode: modeProp,
}: {
  overline: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  mode?: 'light' | 'dark';
}) {
  const globalTheme = useTheme();
  const mode = modeProp || globalTheme.palette.mode;
  const overlineColor = mode === 'dark' ? 'primary.400' : 'primary.600';
  const titleColor = mode === 'dark' ? 'grey.300' : 'primaryDark.900';
  const descriptionColor = mode === 'dark' ? 'grey.500' : 'grey.800';
  return (
    <React.Fragment>
      <Typography
        color={overlineColor}
        component="h1"
        fontWeight="bold"
        variant="body2"
        sx={{ mb: 1 }}
      >
        {overline}
      </Typography>
      {typeof title === 'string' ? (
        <Typography variant="h2" color={titleColor}>
          {title}
        </Typography>
      ) : (
        title
      )}
      {description && (
        <Typography color={descriptionColor} sx={{ mt: 1, mb: 2, maxWidth: 450 }}>
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}
