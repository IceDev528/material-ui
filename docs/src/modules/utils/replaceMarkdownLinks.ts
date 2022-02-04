export const replaceMaterialLinks = (markdown: string) => {
  return markdown.replace(
    /\(\/(guides|customization|getting-started|discover-more)\/([^)]*)\)/gm,
    '(/material/$1/$2)',
  );
};

export const replaceComponentLinks = (markdown: string) => {
  return markdown
    .replace(/\(\/components\/data-grid([^)]*)\)/gm, '(/x/react-data-grid$1)')
    .replace(
      /\(\/components\/((icons|material-icons|transitions|pickers|about-the-lab)\/?[^)]*)\)/gm,
      '(/material/$1)',
    )
    .replace(/\(\/components\/(?!tabs|breadcrumbs)([^)]*)\)/gm, '(/material/react-$1)')
    .replace(/\(\/material\/(react-[-a-z]+)(x|ch)es(\/|#)([^)]*)\)/gm, '(/material/$1$2$3$4)')
    .replace(/\(\/material\/(react-[-a-z]+)(x|ch)es"/gm, '(/material/$1$2)')
    .replace(
      /\(\/material\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s(\/|#)([^)]*)\)/gm,
      '(/material/$1$2$3)',
    )
    .replace(/\(\/material\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s"/gm, '(/material/$1)')
    .replace(/react-trap-focu/gm, 'react-trap-focus')
    .replace(/react-progres/gm, 'react-progress')
    .replace(/\(\/components\/(tabs|breadcrumbs)([^)]*)\)/gm, '(/material/react-$1$2)');
};

export const replaceAPILinks = (markdown: string) => {
  return markdown
    .replace(/\(\/api\/data-grid([^)]*)\)/gm, '(/x/api/data-grid$1)')
    .replace(/\(\/api\/([^"/]+-unstyled)([^)]*)\)/gm, '(/base/api/$1$2)')
    .replace(
      /\(\/api\/(unstable-trap-focus|click-away-listener|no-ssr|portal|textarea-autosize)([^)]*)\)/gm,
      '(/base/api/$1$2)',
    )
    .replace(
      /\(\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)([^)]*)\)/gm,
      '(/material/api/$1$2)',
    )
    .replace(/\(\/api\/([^)]*)\)/gm, '(/material/api/$1)');
};

const replaceStylesLinks = (markdown: string) => {
  return markdown.replace(/\(\/styles\/([^)]*)\)/gm, '(/system/styles/$1)');
};

export default function replaceMarkdownLinks(markdown: string) {
  return replaceStylesLinks(replaceMaterialLinks(replaceAPILinks(replaceComponentLinks(markdown))));
}
