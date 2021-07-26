import * as React from 'react';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import SvgHambugerMenu from 'docs/src/icons/SvgHamburgerMenu';

const Anchor = styled('a')<{ component?: React.ElementType }>(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 700,
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  transition: theme.transitions.create('background'),
  '&:hover, &:focus': {
    backgroundColor: theme.palette.grey[100],
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
}));

const UList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const PRODUCTS = [
  { name: 'Core', description: 'Ready to use, forever free, foundational components.' },
  { name: 'Advanced', description: 'Powerful and robust components for your complex apps.' },
  {
    name: 'Templates',
    description: 'Fully built, out-of-the-box, templates for your application.',
  },
  { name: 'Design Kits', description: 'Our components available in your favorite design tool.' },
];

export default function HeaderNavDropdown() {
  const [open, setOpen] = React.useState(true);
  const [productsOpen, setProductsOpen] = React.useState(true);
  const hambugerRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <React.Fragment>
      <IconButton
        ref={hambugerRef}
        disableRipple
        onClick={() => setOpen((value) => !value)}
        sx={{
          position: 'relative',
          borderRadius: 1,
          '&:focus': { boxShadow: `0 0 0 1px #e5e8ec` },
          '& rect': {
            transformOrigin: 'center',
            transition: '0.2s',
          },
          ...(open && {
            '& rect:first-of-type': {
              transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
            },
            '& rect:last-of-type': {
              transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
            },
          }),
        }}
      >
        <SvgHambugerMenu />
      </IconButton>
      <ClickAwayListener
        onClickAway={(event) => {
          if (hambugerRef.current && !hambugerRef.current.contains(event.target as Node)) {
            setOpen(false);
          }
        }}
      >
        <Collapse
          in={open}
          sx={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            boxShadow: '0 15px 10px -5px rgb(90 105 120 / 10%)',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ p: 2.5, bgcolor: 'background.paper' }}>
            <UList>
              <li>
                <Anchor
                  component="button"
                  onClick={() => setProductsOpen((bool) => !bool)}
                  sx={{ justifyContent: 'space-between' }}
                >
                  Products
                  <KeyboardArrowDownRounded
                    color="primary"
                    sx={{
                      transition: '0.3s',
                      transform: productsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    }}
                  />
                </Anchor>
                <Collapse in={productsOpen}>
                  <UList
                    sx={{ borderLeft: '1px solid', borderColor: 'grey.100', pl: 1, pb: 1, ml: 1 }}
                  >
                    {PRODUCTS.map((item) => (
                      <NextLink href="/branding/home" passHref>
                        <Anchor sx={{ flexDirection: 'column', alignItems: 'initial' }}>
                          <div>{item.name}</div>
                          <Typography variant="body2">{item.description}</Typography>
                        </Anchor>
                      </NextLink>
                    ))}
                  </UList>
                </Collapse>
              </li>
              <li>
                <NextLink href="/branding/home" passHref>
                  <Anchor>Docs</Anchor>
                </NextLink>
              </li>
              <li>
                <NextLink href="/branding/home" passHref>
                  <Anchor>Pricing</Anchor>
                </NextLink>
              </li>
              <li>
                <NextLink href="/branding/home" passHref>
                  <Anchor>About us</Anchor>
                </NextLink>
              </li>
            </UList>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </React.Fragment>
  );
}
