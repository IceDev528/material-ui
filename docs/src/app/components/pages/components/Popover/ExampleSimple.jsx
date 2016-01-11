import React from 'react';
import Popover from 'material-ui/lib/popover/popover';
import RadioButton from 'material-ui/lib/radio-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default class PopoverExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectValue: '1',
      textValue: 'here is a value',
      activePopover: 'none',
      anchorOrigin: {horizontal: 'left', vertical: 'bottom'},
      targetOrigin: {horizontal: 'left', vertical: 'top'},
    };
  }

  show = (key, e) => {
    this.setState({
      activePopover: key,
      anchorEl: e.currentTarget,
    });
  };

  closePopover = (key) => {
    if (this.state.activePopover !== key)
      return;
    this.setState({
      activePopover: 'none',
    });
  };

  setAnchor = (positionElement, position) => {
    let {anchorOrigin} = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
      anchorOrigin: anchorOrigin,
    });
  };

  setTarget = (positionElement, position) => {
    let {targetOrigin} = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
      targetOrigin: targetOrigin,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton onClick={this.show.bind(this, 'pop')} label="Click on me to show a popover" />
        <br/>
        <br/>

        <em>Note that in this version, the select field causes nasty scrolling,
        an upcoming PR will fix, which updates SelectField to use the popover for itself!</em>
        <br/>
        <h2>Position Options</h2>
        <p>Use the settings below to toggle the positioning of the popovers above</p>
        <strong>Current Settings</strong>
        <br/>
        <pre>
          anchorOrigin: {JSON.stringify(this.state.anchorOrigin)}
          <br/>
          targetOrigin: {JSON.stringify(this.state.targetOrigin)}
        </pre>
        <h3>Anchor Origin</h3>
        <div style={{float: 'left'}}>
          <strong>Vertical</strong>
          <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'top')}
            label="Top" checked={this.state.anchorOrigin.vertical === 'top'} />
          <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'center')}
            label="Center" checked={this.state.anchorOrigin.vertical === 'center'} />
          <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'bottom')}
            label="Bottom" checked={this.state.anchorOrigin.vertical === 'bottom'} />
        </div>
        <div style={{float: 'left'}}>
          <strong>Horizontal</strong>
          <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'left')}
            label="Left" checked={this.state.anchorOrigin.horizontal === 'left'} />
          <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'middle')}
            label="Middle" checked={this.state.anchorOrigin.horizontal === 'middle'} />
          <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'right')}
            label="Right" checked={this.state.anchorOrigin.horizontal === 'right'} />
        </div>
        <br style={{clear: 'both'}} />
        <br style={{clear: 'both'}} />

        <h3>Target Origin</h3>
        <div style={{float: 'left'}}>
          <strong>Vertical</strong>
          <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'top')}
            label="Top" checked={this.state.targetOrigin.vertical === 'top'} />
          <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'center')}
            label="Center" checked={this.state.targetOrigin.vertical === 'center'} />
          <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'bottom')}
            label="Bottom" checked={this.state.targetOrigin.vertical === 'bottom'} />
        </div>
        <div style={{float: 'left'}}>
          <strong>Horizontal</strong>
          <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'left')}
            label="Left" checked={this.state.targetOrigin.horizontal === 'left'} />
          <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'middle')}
            label="Middle" checked={this.state.targetOrigin.horizontal === 'middle'} />
          <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'right')}
            label="Right" checked={this.state.targetOrigin.horizontal === 'right'} />
        </div>

        <Popover open={this.state.activePopover === 'pop'}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.closePopover.bind(this, 'pop')} >
          <div style={{padding: 20}}>
            <h2>Here is an arbitrary popover</h2>
            <p>Hi - here is some content</p>
            <RaisedButton primary={true} label="Here is a button"/>
          </div>
        </Popover>
      </div>
    );
  }
}
