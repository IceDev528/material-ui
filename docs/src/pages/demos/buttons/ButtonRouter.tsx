import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link, LinkProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref as any} {...props} />
));

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
const HomeLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef' | 'to'>>(
  (props, ref) => <Link innerRef={ref as any} to="/home" {...props} />,
);

function App() {
  return (
    <Router>
      <Button color="primary" component={AdapterLink} to="/">
        Root
      </Button>
      {/* Avoids property collision */}
      <Button component={HomeLink}>Home</Button>
    </Router>
  );
}

export default App;
