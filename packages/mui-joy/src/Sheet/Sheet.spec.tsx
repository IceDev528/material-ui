import Sheet from '@mui/joy/Sheet';
import * as React from 'react';

<Sheet />;

<Sheet component="div" />;

// `variant`
<Sheet variant="text" />;
<Sheet variant="light" />;
<Sheet variant="outlined" />;
<Sheet variant="contained" />;

// `color`
<Sheet color="primary" />;
<Sheet color="danger" />;
<Sheet color="info" />;
<Sheet color="success" />;
<Sheet color="warning" />;
<Sheet color="neutral" />;

// `elevation`
<Sheet elevation="xs" />;
<Sheet elevation="sm" />;
<Sheet elevation="md" />;
<Sheet elevation="lg" />;
<Sheet elevation="xl" />;

// @ts-expect-error there is no variant `filled`
<Sheet variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Sheet color="secondary" />;

// @ts-expect-error there is no elevation `xl2`
<Sheet elevation="xl2" />;
