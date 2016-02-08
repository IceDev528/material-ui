import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import cardReadmeText from './README';
import cardExampleWithAvatarCode from '!raw!./ExampleWithAvatar';
import CardExampleWithAvatar from './ExampleWithAvatar';
import cardExampleWithoutAvatarCode from '!raw!./ExampleWithoutAvatar';
import CardExampleWithoutAvatar from './ExampleWithoutAvatar';

import cardCode from '!raw!material-ui/lib/card/card';
import cardActionsCode from '!raw!material-ui/lib/card/card-actions';
import cardHeaderCode from '!raw!material-ui/lib/card/card-header';
import cardMediaCode from '!raw!material-ui/lib/card/card-media';
import cardTextCode from '!raw!material-ui/lib/card/card-text';
import cardTitleCode from '!raw!material-ui/lib/card/card-title';


const descriptions = {
  avatar: 'A Card containing each of the card components: `CardHeader` (with avatar), `CardMedia` (with overlay), ' +
  '`CardTitle`, `CardText` & `CardActions`.',
  simple: 'An expandable Card with `CardHeader`, `CardText` and `CardActions`. ' +
  'Use the icon to expand the card.',
};

const CardPage = () => (
  <div>
    <Title render={(previousTitle) => `Card - ${previousTitle}`} />
    <MarkdownElement text={cardReadmeText} />
    <CodeExample
      title="Card components example"
      description={descriptions.avatar}
      code={cardExampleWithAvatarCode}
    >
      <CardExampleWithAvatar />
    </CodeExample>
    <CodeExample
      title="Expandable card"
      description={descriptions.simple}
      code={cardExampleWithoutAvatarCode}
    >
      <CardExampleWithoutAvatar />
    </CodeExample>
    <PropTypeDescription code={cardCode} header="### Card properties" />
    <PropTypeDescription code={cardActionsCode} header="### CardActions properties"/>
    <PropTypeDescription code={cardHeaderCode} header="### CardHeader properties"/>
    <PropTypeDescription code={cardMediaCode} header="### CardMedia properties"/>
    <PropTypeDescription code={cardTextCode} header="### CardText properties"/>
    <PropTypeDescription code={cardTitleCode} header="### CardTitle properties"/>
  </div>
);

export default CardPage;
