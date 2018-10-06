import * as React from 'react';
import * as PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

export default class Input extends React.PureComponent {
  static propTypes = {
    mask: PropTypes.any,
    inputRef: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mask: undefined,
  }

  render() {
    const { inputRef, ...props } = this.props;
    return (
      this.props.mask
        ? <MaskedInput {...props} ref={inputRef} />
        : <input {...props} ref={inputRef} />
    );
  }
}
