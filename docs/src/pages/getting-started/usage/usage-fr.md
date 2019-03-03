# Utilisation

<p class="description">Commencez rapidement avec React et Material-UI.</p>

Les composants Material-UI fonctionnent de manière isolée. **They are self-supporting**, and will only inject the styles they need to display. Ils ne s'appuient sur aucune feuille de style globale telle que [normalize.css](https://github.com/necolas/normalize.css/).

Vous pouvez utiliser n'importe lequel des composants comme indiqué dans la documentation. Veuillez vous référer à chaque [page de démonstration](/demos/buttons/) pour voir comment les composants doivent être importés.

## Démarrage rapide

Voici un exemple rapide pour vous aider à commencer, **c'est tout ce dont vous avez besoin** :

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Oui, c'est tout ce dont vous avez besoin pour commencer, comme vous pouvez le voir dans cette démo en direct et interactive :

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## Variables globales

L'expérience d'utilisation de Material-UI peut être améliorée avec une poignée d'importants globaux que vous devez connaître.

### La balise meta responsive design (vue adaptative)

Material-UI est d'abord développé sur mobile, stratégie dans laquelle nous écrivons d'abord du style pour les appareils mobiles, puis mettons à l'échelle les composants à l'aide des media queries CSS. Pour que le rendu et le zoom tactile soient corrects pour tous les périphériques, ajoutez la balise meta viewport à votre élément `<head>`.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
```

### CssBaseline

Material-UI fournit un composant [CssBaseline](/style/css-baseline/) facultatif. Il corrige certaines incohérences entre les navigateurs et les appareils tout en fournissant des comportement par défaut à des éléments HTML communs.

## Documentation versionnée

Cette documentation reflète toujours la dernière version stable de Material-UI. Vous pouvez trouver les anciennes versions de la documentation sur une [page séparée](/versions/).

## Etapes suivantes

Maintenant que vous avez une idée de la configuration de base, il est temps d'en apprendre d'avantage sur :

- Comment fournir [la police et la typographie Material Design](/style/typography/) .
- Comment tirer parti de la [solution de thème](/customization/themes/).
- Comment [modifier](/customization/overrides/), l'apparence des composants.