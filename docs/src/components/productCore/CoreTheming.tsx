import * as React from 'react';
import { createTheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';
import Frame from 'docs/src/components/action/Frame';
import PlayerCard from 'docs/src/components/showcase/PlayerCard';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const lightTheme = createTheme();
const darkTheme = createTheme({ palette: { mode: 'dark' } });

const code = `<Card variant="outlined" sx={{p: 1, display: 'flex', flexDirection: {xs: 'column', sm: 'row'} }}>
  <CardMedia
    component="img"
    alt="Beside Myself album cover"
    src="/static/images/cards/basement-beside-myself.jpg"
    width="124"
    height="124"
    sx={{ borderRadius: 0.5, width: 'auto', objectFit: 'cover' }}
  />
  <Box sx={{ alignSelf: 'center', mx: 2 }}>
    <Typography variant="body1" fontWeight={500}>
      Ultraviolet
    </Typography>
    <Typography component="div" variant="caption" color="text.secondary">
      Basement • Beside Myself
    </Typography>
    <Box sx={{ mt: 2 }}>
      <IconButton aria-label="fast rewind" disabled>
        <FastRewindRounded />
      </IconButton>
      <IconButton
        aria-label={paused ? 'play' : 'pause'}
        sx={{ mx: 2 }}
        onClick={() => setPaused((val) => !val)}
      >
        {paused ? <PlayArrowRounded /> : <PauseRounded />}
      </IconButton>
      <IconButton aria-label="fast forward" disabled>
        <FastForwardRounded />
      </IconButton>
    </Box>
  </Box>
</Card>`;

export default function CoreTheming() {
  const [customized, setCustomized] = React.useState(true);
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Theming"
              title={
                <Typography variant="h2">
                  Build <GradientText>your design system</GradientText> just as you want it to be
                </Typography>
              }
              description="Use the advanced theming feature to easily tailor the components to your needs. You can also quick start with Material Design."
            />
          </Box>
          <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
            <Highlighter disableBorder selected={customized} onClick={() => setCustomized(true)}>
              <Item
                icon={<AutoAwesomeRounded color="warning" />}
                title="Custom Theme"
                description="Theming allows you to use your brand's design tokens, easily making the components reflect its look and feel."
              />
            </Highlighter>
            <Highlighter disableBorder selected={!customized} onClick={() => setCustomized(false)}>
              <Item
                icon={<SvgMaterialDesign />}
                title="Material Design"
                description="Every component comes with Google's tried and tested design system ready for use."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                py: 2,
                px: 2,
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 188,
              }}
            >
              <PlayerCard
                {...(!customized && { theme: mode === 'dark' ? darkTheme : lightTheme })}
              />
            </Frame.Demo>
            <Frame.Info sx={{ maxHeight: 300, overflow: 'auto' }}>
              <HighlightedCode component={MarkdownElement} code={code} language="jsx" />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
