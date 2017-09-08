<!--- This documentation is automatically generated, do not try to edit it. -->

# Slide



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | A single child content element. |
| direction | union:&nbsp;'left'<br>&nbsp;'right'<br>&nbsp;'up'<br>&nbsp;'down'<br> | 'down' | Direction the child element will enter from. |
| enterTransitionDuration | number | duration.enteringScreen | Duration of the animation when the element is entering. |
| in | boolean |  | If `true`, show the component; triggers the enter or exit animation. |
| leaveTransitionDuration | number | duration.leavingScreen | Duration of the animation when the element is exiting. |
| onEnter | TransitionCallback |  | Callback fired before the component enters. |
| onEntered | TransitionCallback |  | Callback fired when the component has entered. |
| onEntering | TransitionCallback |  | Callback fired when the component is entering. |
| onExit | TransitionCallback |  | Callback fired before the component exits. |
| onExited | TransitionCallback |  | Callback fired when the component has exited. |
| onExiting | TransitionCallback |  | Callback fired when the component is exiting. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).


