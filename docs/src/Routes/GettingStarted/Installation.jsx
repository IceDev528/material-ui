import React from 'react'
import Code from '_shared/Code'
import { Typography } from 'material-ui'

const installLibCode = 
`npm i -s date-fns@next
// or 
npm i -s moment`

const muiPickerProviderCode =
`import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

function App() {
  return ( 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  );
}

render(<App />, document.querySelector('#app'));
`
const Installation = () => (
  <div>
    <Typography variant="display2" gutterBottom> Installation </Typography>
    <Typography variant="body1" gutterBottom> Available as <a href="https://www.npmjs.com/package/material-ui-pickers"> npm package </a> </Typography>

    <Code withMargin text="npm i -s material-ui-pickers" />

    <Typography variant="display1" gutterBottom> Peer Library </Typography>
    <Typography variant="body1" gutterBottom>
      Material-ui-pickers was designed to use that date management library that you need.
    </Typography>
    <Typography variant="body1" gutterBottom>
      We are providing interfaces for <a href="https://momentjs.com/"> moment </a> and <a href="https://date-fns.org/"> date-fns 2 </a>. If you are not using moment in the project (or dont have it in the bundle already) we suggest using date-fns, because it much more lightweight and will be correctly tree-shaked from the bundle.
    </Typography>

    <Code withMargin text={installLibCode}/>
    <Typography>
      Teach pickers how to use one of that library using <span className="inline-code">MuiPickersUtilsProvider</span>. This component takes an utils property, and makes it available down the React tree thanks to React context. It should preferably be used at the root of your component tree.
    </Typography>

    <Code withMargin text={muiPickerProviderCode}/>
    <Typography variant="display1" gutterBottom> Font Icons </Typography>
    <Typography variant="body1">
      We are using material-ui-icons icon font to display icons. In order if you can override with a help of corresponding props. Just add this to your html 
    </Typography>
    <Code 
      withMargin 
      language='html' 
      text='<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'
    />
  </div>
)

export default Installation