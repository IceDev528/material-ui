import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getAllBlogPosts, BlogPost } from 'docs/lib/sourcing';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Section from 'docs/src/layouts/Section';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Chip from '@mui/material/Chip';
import Head from 'docs/src/modules/components/Head';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import BrandingProvider from 'docs/src/BrandingProvider';
import { authors as AUTHORS } from 'docs/src/modules/components/TopLayoutBlog';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import Link from 'docs/src/modules/components/Link';

export const getStaticProps = async () => {
  const data = getAllBlogPosts();
  return {
    props: data,
  };
};

const PostPreview = (props: BlogPost) => {
  return (
    <React.Fragment>
      {props.tags && (
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          {props.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontWeight: 500,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[700],
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.grey[700], 0.5)
                    : theme.palette.grey[100],
                '&:hover': {
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.grey[700], 0.5)
                      : theme.palette.grey[100],
                },
              }}
            />
          ))}
        </Box>
      )}
      <Typography
        component="h2"
        fontWeight="bold"
        variant="subtitle1"
        sx={{
          mb: 0.5,
        }}
      >
        <Link
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          sx={{
            color: 'text.primary',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {props.title}
        </Link>
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 'auto' }}>
        {props.description}
      </Typography>
      {props.authors && (
        <AvatarGroup
          sx={{
            mt: 2,
            mb: 1,
            alignSelf: 'flex-start',
            '& .MuiAvatar-circular': {
              width: '28px',
              height: '28px',
              border: 3,
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[800]
                  : theme.palette.grey[100],
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[100],
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[100]
                  : theme.palette.grey[800],
              fontSize: (theme) => theme.typography.pxToRem(13),
              fontWeight: 500,
            },
          }}
        >
          {(props.authors as Array<keyof typeof AUTHORS>).map((author) => (
            <Avatar key={author} alt={AUTHORS[author]?.name} src={AUTHORS[author]?.avatar} />
          ))}
        </AvatarGroup>
      )}
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {props.authors && (
            <Typography variant="body2" fontWeight="500">
              {props.authors
                .slice(0, 3)
                .map((userId) => {
                  const name = AUTHORS[userId as keyof typeof AUTHORS]?.name;
                  if (name) {
                    if (props.authors && props.authors.length > 1) {
                      // display only firstName
                      return name.split(' ')[0];
                    }
                    return name;
                  }
                  return userId;
                })
                .join(', ')}
              {props.authors.length > 2 && ', and more.'}
            </Typography>
          )}
          {props.date && (
            <Typography variant="caption" fontWeight="400" color="text.secondary">
              {new Date(props.date).toDateString()}
            </Typography>
          )}
        </Box>
        <Button
          component="a"
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          id={`describe-${props.slug}`}
          size="small"
          endIcon={<KeyboardArrowRightRoundedIcon />}
          sx={(theme) => ({
            mt: { xs: 0.5, sm: 0 },
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[600],
            '& svg': {
              ml: -0.5,
            },
          })}
        >
          Read more
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default function Blog(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const PAGE_SIZE = 5;
  const router = useRouter();
  const postListRef = React.useRef<HTMLDivElement | null>(null);
  const [page, setPage] = React.useState(0);
  const [selectedTags, setSelectedTags] = React.useState<Record<string, boolean>>({});
  const { allBlogPosts, allTags, tagInfo: rawTagInfo } = props;
  const [firstPost, secondPost, ...otherPosts] = allBlogPosts;
  const tagInfo = { ...rawTagInfo };
  [firstPost, secondPost].forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (tagInfo[tag]) {
          tagInfo[tag]! -= 1;
        }
      });
    }
  });
  const filteredPosts = otherPosts.filter(
    (post) =>
      !Object.keys(selectedTags).length ||
      (post.tags || []).some((tag) => Object.keys(selectedTags).includes(tag)),
  );
  const pageStart = page * PAGE_SIZE;
  const totalPage = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const displayedPosts = filteredPosts.slice(pageStart, pageStart + PAGE_SIZE);
  const getTags = React.useCallback(() => {
    const { tags = '' } = router.query;
    return (typeof tags === 'string' ? tags.split(',') : tags || [])
      .map((str) => str.trim())
      .filter((tag) => !!tag);
  }, [router.query]);

  React.useEffect(() => {
    const arrayTags = getTags();
    const finalTags: Record<string, boolean> = {};
    arrayTags.forEach((tag) => {
      finalTags[tag] = true;
    });
    setSelectedTags(finalTags);
    setPage(0);
  }, [getTags]);

  const removeTag = (tag: string) => {
    router.push(
      {
        query: {
          ...router.query,
          tags: getTags().filter((value) => value !== tag),
        },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <BrandingProvider>
      <Head
        title="Blog - MUI"
        description="MUI (formerly Material-UI) started back in 2014 to unify React and Material Design. Today, MUI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <AppHeader />
      <main>
        <Section bg="gradient">
          <Typography variant="body2" color="primary.600" fontWeight="bold" textAlign="center">
            Blog
          </Typography>
          <Typography component="h1" variant="h2" textAlign="center" sx={{ mb: { xs: 5, md: 10 } }}>
            The <GradientText>latest</GradientText> about MUI
          </Typography>
          <Box
            component="ul"
            sx={{
              display: 'grid',
              m: 0,
              p: 0,
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {[firstPost, secondPost].map((post) => (
              <Paper
                key={post.slug}
                component="li"
                variant="outlined"
                sx={(theme) => ({
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all ease 120ms',
                  '&:hover, &:focus-within': {
                    borderColor: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.300',
                    boxShadow: `0px 4px 20px ${
                      theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.5)'
                        : 'rgba(170, 180, 190, 0.3)'
                    }`,
                  },
                  '&:focus-within': {
                    '& a': {
                      outline: 'none',
                    },
                  },
                })}
              >
                {post.image && (
                  <Box
                    component="img"
                    src={post.image}
                    sx={{
                      aspectRatio: '16 / 9',
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                )}
                <PostPreview {...post} />
              </Paper>
            ))}
          </Box>
        </Section>
        <Container
          ref={postListRef}
          sx={{
            mt: { xs: -8, sm: -7 },
            display: 'grid',
            gridTemplateColumns: { md: '1fr 380px' },
            columnGap: 8,
          }}
        >
          <Typography
            component="h2"
            color="text.primary"
            variant="h5"
            fontWeight="700"
            sx={{ mb: { xs: 1, sm: 2 }, mt: 8 }} // margin-top makes the title appear when scroll into view
          >
            Posts{' '}
            {Object.keys(selectedTags).length ? (
              <span>
                tagged as{' '}
                <Typography component="span" variant="inherit" color="primary" noWrap>
                  &quot;{Object.keys(selectedTags)[0]}&quot;
                </Typography>
              </span>
            ) : (
              ''
            )}
          </Typography>
          <Box sx={{ gridRow: 'span 2' }}>
            <Box
              sx={{
                position: 'sticky',
                top: 100,
                alignSelf: 'start',
                mb: { xs: 2, sm: 8 },
                mt: { xs: 2, sm: 8 }, // margin-top makes the title appear when scroll into view
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primaryDark[700], 0.2)
                    : 'rgba(255, 255, 255, 0.2)',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[200],
              }}
            >
              <Typography color="text.primary" fontWeight="500" sx={{ mb: 2 }}>
                Filter by tag
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {allTags.map((tag) => {
                  const selected = !!selectedTags[tag];
                  return (
                    <Chip
                      key={tag}
                      variant={selected ? 'filled' : 'outlined'}
                      {...(selected
                        ? {
                            label: tag,
                            onDelete: () => {
                              postListRef.current?.scrollIntoView();
                              removeTag(tag);
                            },
                          }
                        : {
                            label: tag,
                            onClick: () => {
                              postListRef.current?.scrollIntoView();
                              router.push(
                                {
                                  query: {
                                    ...router.query,
                                    tags: tag,
                                  },
                                },
                                undefined,
                                { shallow: true },
                              );
                            },
                          })}
                      size="small"
                      sx={{
                        py: 1.2,
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box component="ul" sx={{ p: 0, m: 0 }}>
              {displayedPosts.map((post) => (
                <Box
                  component="li"
                  key={post.slug}
                  sx={() => ({
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    '&:not(:last-of-type)': {
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    },
                  })}
                >
                  <PostPreview {...post} />
                </Box>
              ))}
            </Box>
            <Pagination
              page={page + 1}
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={(_, value) => {
                setPage(value - 1);
                postListRef.current?.scrollIntoView();
              }}
              sx={{ mt: 1, mb: 8 }}
            />
          </Box>
        </Container>
      </main>
      <HeroEnd />
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
