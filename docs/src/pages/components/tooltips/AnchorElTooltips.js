import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

export default function AnchorElTooltips() {
  const positionRef = React.useRef({
    x: 0,
    y: 0,
  });

  const popperRef = React.useRef(null);
  const areaRef = React.useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.scheduleUpdate();
    }
  };

  return (
    <Tooltip
      title="Add"
      placement="top"
      arrow
      PopperProps={{
        popperRef,
        anchorEl: {
          clientHeight: 0,
          clientWidth: 0,
          getBoundingClientRect: () => ({
            top: areaRef.current?.getBoundingClientRect().top ?? 0,
            left: positionRef.current.x,
            right: positionRef.current.x,
            bottom: areaRef.current?.getBoundingClientRect().bottom ?? 0,
            width: 0,
            height: 0,
          }),
        },
      }}
    >
      <Box
        /* @ts-expect-error need to fix #17010 */
        ref={areaRef}
        bgcolor="primary.main"
        color="primary.contrastText"
        onMouseMove={handleMouseMove}
        p={2}
      >
        Hover
      </Box>
    </Tooltip>
  );
}
