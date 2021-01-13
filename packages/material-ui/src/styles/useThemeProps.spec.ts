import { Theme, unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import { SliderProps } from '@material-ui/core/Slider';
import { expectType } from '@material-ui/types';

function ThemedComponent() {
  const props = useThemeProps<Theme, SliderProps, 'MuiSlider'>({
    props: { color: 'primary' },
    name: 'MuiSlider',
  });

  // additional props are valid
  expectType<boolean, typeof props.isRtl>(props.isRtl);
  expectType<Theme, typeof props.theme>(props.theme);

  // component's props are valid
  // Only existence of props is relevant here not type.
  props.track;
  props.valueLabelDisplay;
}
