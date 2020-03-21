---
title: Composant React Badge
components: Badge
---

# Badge

<p class="description">Emblema gera um pequeno emblema para o canto superior direito do seu filho(s).</p>

## Basic badges

Exemples de badges contenant du texte, utilisant les couleurs primaires et secondaires. Le badge est appliqué aux enfants.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Badges custom

Voici un exemple de personnalisation du composant. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Visibilité du badge

La visibilité des badges peut être contrôlée à l'aide de la propriété `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

Le badge se cache automatiquement quand badgeContent est nul. Vous pouvez la remplacer avec la propriété `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

Vous pouvez utiliser la propriété `max` pour limiter la valeur du contenu du badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

La propriété `dot` change un badge en petit point. Il peut être utilisé comme une notification indiquant que quelque chose a changé sans donner un nombre.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Badge overlap

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Badge alignment

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}