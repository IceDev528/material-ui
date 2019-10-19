---
title: Skeleton React component
components: Skeleton
---

# Skeleton

<p class="description">Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.</p>

The data for your components might not be immediately available. You can increase the perceived performance for users by using skeletons. It feels like things are happening immediately, then the information is incrementally displayed on the screen (Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

The component is designed to be used **directly in your components**.
For instance:

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## YouTube example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

## Facebook example

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false}}
