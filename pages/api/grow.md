---
filename: /src/transitions/Grow.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Grow

The Grow transition is used by the Popover component.
It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Element |  | A single child content element. |
| <span style="color: #31a148">in *</span> | boolean |  | If `true`, show the component; triggers the enter or exit animation. |
| rootRef | Function |  | Use that property to pass a ref callback to the root component. |
| transitionClasses | TransitionClasses | {} | The animation classNames applied to the component as it enters or exits. This property is a direct binding to [`CSSTransition.classNames`](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames). |
| transitionDuration | union:&nbsp;number<br>&nbsp;{ enter?: number, exit?: number }<br>&nbsp;'auto'<br> | 'auto' | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## Inheritance

The properties of the [&lt;CSSTransition /&gt;](https://reactcommunity.org/react-transition-group/#CSSTransition) component are also available.

## Demos

- [Popovers](/demos/popovers)

