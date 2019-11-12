import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import url from 'url';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import CollapseIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import { makeStyles, withStyles, createMuiTheme, lighten } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/**
 * @param {unknown} value
 */
function useType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (value === null) {
    return 'null';
  }

  return typeof value;
}

/**
 *
 * @param {unknown} value
 * @param {ReturnType<typeof useType>} type
 */
function useLabel(value, type) {
  switch (type) {
    case 'array':
      return `Array(${value.length})`;
    case 'null':
      return 'null';
    case 'undefined':
      return 'undefined';
    case 'function':
      return `f ${value.name}()`;
    case 'object':
      return 'Object';
    case 'string':
      return `"${value}"`;
    case 'symbol':
      return `Symbol(${String(value)})`;
    case 'bigint':
    case 'boolean':
    case 'number':
    default:
      return String(value);
  }
}

function useTokenType(type) {
  switch (type) {
    case 'object':
    case 'array':
      return 'comment';
    default:
      return type;
  }
}

function ObjectEntryLabel({ objectKey, objectValue }) {
  const type = useType(objectValue);
  const label = useLabel(objectValue, type);
  const tokenType = useTokenType(type);

  return (
    <React.Fragment>
      {objectKey}: <span className={clsx('token', tokenType)}>{label}</span>
    </React.Fragment>
  );
}
ObjectEntryLabel.propTypes = { objectKey: PropTypes.any, objectValue: PropTypes.any };

const useObjectEntryStyles = makeStyles({
  treeItem: {
    '&:focus > $treeItemContent': {
      backgroundColor: lighten('#333', 0.08),
      outline: `2px dashed ${lighten('#333', 0.3)}`,
    },
  },
  treeItemContent: {
    '&:hover': {
      backgroundColor: lighten('#333', 0.08),
    },
  },
});

function ObjectEntry(props) {
  const { nodeId, objectKey, objectValue } = props;

  const keyPrefix = nodeId;

  let children = null;
  if (
    (objectValue !== null && typeof objectValue === 'object') ||
    typeof objectValue === 'function'
  ) {
    children =
      Object.keys(objectValue).length === 0
        ? undefined
        : Object.keys(objectValue).map(key => {
            return (
              <ObjectEntry
                key={key}
                nodeId={`${keyPrefix}.${key}`}
                objectKey={key}
                objectValue={objectValue[key]}
              />
            );
          });
  }

  const classes = useObjectEntryStyles();

  return (
    <TreeItem
      classes={{ root: classes.treeItem, content: classes.treeItemContent }}
      nodeId={nodeId}
      label={<ObjectEntryLabel objectKey={objectKey} objectValue={objectValue} />}
    >
      {children}
    </TreeItem>
  );
}
ObjectEntry.propTypes = {
  nodeId: PropTypes.string.isRequired,
  objectKey: PropTypes.any.isRequired,
  objectValue: PropTypes.any,
};

function Inspector(props) {
  const { data, expandPaths } = props;

  const keyPrefix = '$ROOT';
  const defaultExpanded = React.useMemo(() => {
    return Array.isArray(expandPaths)
      ? expandPaths.map(expandPath => `${keyPrefix}.${expandPath}`)
      : [];
  }, [keyPrefix, expandPaths]);
  // for default*  to take effect we need to remount
  const key = React.useMemo(() => defaultExpanded.join(''), [defaultExpanded]);

  return (
    <TreeView
      key={key}
      defaultCollapseIcon={<ExpandIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={defaultExpanded}
      defaultExpandIcon={<CollapseIcon />}
    >
      {Object.keys(data).map(objectKey => {
        return (
          <ObjectEntry
            key={objectKey}
            nodeId={`${keyPrefix}.${objectKey}`}
            objectKey={objectKey}
            objectValue={data[objectKey]}
          />
        );
      })}
    </TreeView>
  );
}

Inspector.propTypes = {
  data: PropTypes.any,
  expandPaths: PropTypes.arrayOf(PropTypes.string),
};

const styles = theme => ({
  root: {
    backgroundColor: '#333',
    borderRadius: 4,
    color: '#fff',
    display: 'block',
    padding: theme.spacing(2),
    paddingTop: 0,
    minHeight: theme.spacing(40),
    width: '100%',
  },
  switch: {
    paddingBottom: theme.spacing(1),
  },
});

function computeNodeIds(object, prefix) {
  if ((object !== null && typeof object === 'object') || typeof object === 'function') {
    const ids = [];
    Object.keys(object).forEach(key => {
      ids.push(`${prefix}${key}`, ...computeNodeIds(object[key], `${prefix}${key}.`));
    });

    return ids;
  }
  return [];
}

function useNodeIdsLazy(object) {
  const [allNodeIds, setAllNodeIds] = React.useState([]);
  // technically we want to compute them lazily until we need them (expand all)
  // yielding is good enough. technically we want to schedule the computation
  // with low pri  and upgrade the priority later
  React.useEffect(() => {
    setAllNodeIds(computeNodeIds(object, ''));
  }, [object]);

  return allNodeIds;
}

function DefaultTheme(props) {
  const { classes } = props;
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState(null);
  const t = useSelector(state => state.options.t);

  React.useEffect(() => {
    const URL = url.parse(document.location.href, true);
    const expandPath = URL.query['expend-path'];

    if (!expandPath) {
      return;
    }

    setExpandPaths(
      expandPath.split('.').reduce((acc, path) => {
        const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
        acc.push(last + path);
        return acc;
      }, []),
    );
  }, []);

  const data = React.useMemo(createMuiTheme, []);

  const allNodeIds = useNodeIdsLazy(data);
  React.useDebugValue(allNodeIds);
  React.useEffect(() => {
    if (checked) {
      // in case during the event handler allNodeIds wasn't computed yet
      setExpandPaths(allNodeIds);
    }
  }, [checked, allNodeIds]);

  return (
    <div className={classes.root}>
      <FormControlLabel
        className={classes.switch}
        control={
          <Switch
            checked={checked}
            onChange={(event, newChecked) => {
              setChecked(newChecked);
              if (newChecked) {
                setExpandPaths(allNodeIds);
              } else {
                setExpandPaths([]);
              }
            }}
          />
        }
        label={t('expandAll')}
      />
      <Inspector data={data} expandPaths={expandPaths} expandLevel={checked ? 100 : 1} />
    </div>
  );
}

DefaultTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultTheme);
