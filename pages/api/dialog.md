<!--- This documentation is automatically generated, do not try to edit it. -->

# Dialog

Dialogs are overlaid modal paper based components with a backdrop.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Node |  | Dialog children, usually the included sub-components. |
| classes | Object |  | Useful to extend the style applied to components. |
| enterTransitionDuration | number | duration.enteringScreen | Duration of the animation when the element is entering. |
| fullScreen | boolean | false | If `true`, it will be full-screen |
| ignoreBackdropClick | boolean | false | If `true`, clicking the backdrop will not fire the `onRequestClose` callback. |
| ignoreEscapeKeyUp | boolean | false | If `true`, hitting escape will not fire the `onRequestClose` callback. |
| leaveTransitionDuration | number | duration.leavingScreen | Duration of the animation when the element is leaving. |
| maxWidth | union:&nbsp;'xs'<br>&nbsp;'sm'<br>&nbsp;'md'<br> | 'sm' | Determine the max width of the dialog. The dialog width grows with the size of the screen, this property is useful on the desktop where you might need some coherent different width size across your application. |
| onBackdropClick | Function |  | Callback fired when the backdrop is clicked. |
| onEnter | TransitionCallback |  | Callback fired before the dialog enters. |
| onEntered | TransitionCallback |  | Callback fired when the dialog has entered. |
| onEntering | TransitionCallback |  | Callback fired when the dialog is entering. |
| onEscapeKeyUp | Function |  | Callback fires when the escape key is released and the modal is in focus. |
| onExit | TransitionCallback |  | Callback fired before the dialog exits. |
| onExited | TransitionCallback |  | Callback fired when the dialog has exited. |
| onExiting | TransitionCallback |  | Callback fired when the dialog is exiting. |
| onRequestClose | Function |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| open | boolean | false | If `true`, the Dialog is open. |
| transition | Node | Fade | Transition component. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `paper`
- `paperWidthXs`
- `paperWidthSm`
- `paperWidthMd`
- `fullScreen`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDialog`.

## Demos

- [Dialogs](/demos/dialogs)

