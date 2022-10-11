import * as React from 'react';
import PopperUnstyled, { PopperPlacementType } from '@mui/base/PopperUnstyled';

function Radio({ value, ...props }: JSX.IntrinsicElements['input']) {
  return (
    <span>
      <input
        type="radio"
        id={`placement-${value}-radio`}
        name="placement"
        value={value}
        style={{ margin: '0 0.375rem 0 1rem' }}
        {...props}
      />
      <label htmlFor={`placement-${value}-radio`}>{value}</label>
    </span>
  );
}

function PlacementForm({
  setPlacement,
}: {
  setPlacement: (placement: PopperPlacementType) => void;
}) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: '4px',
        padding: '0.5rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <b>Placement value:</b>
      </div>
      <div style={{ textAlign: 'center', padding: '0.5rem 0px' }}>
        {['top-start', 'top', 'top-end'].map((value) => (
          <Radio
            key={value}
            value={value}
            onChange={(event) => {
              setPlacement(event.target.value as PopperPlacementType);
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5rem 0px',
        }}
      >
        <div>
          {['left-start', 'left', 'left-end'].map((value) => (
            <Radio
              key={value}
              value={value}
              onChange={(event) => {
                setPlacement(event.target.value as PopperPlacementType);
              }}
            />
          ))}
        </div>
        <div>
          {['right-start', 'right', 'right-end'].map((value) => (
            <Radio
              key={value}
              value={value}
              onChange={(event) => {
                setPlacement(event.target.value as PopperPlacementType);
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '0.5rem 0px' }}>
        {['bottom-start', 'bottom', 'bottom-end'].map((value) => (
          <Radio
            key={value}
            value={value}
            defaultChecked={value === 'bottom'}
            onChange={(event) => {
              setPlacement(event.target.value as PopperPlacementType);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PlacementPopper() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [placement, setPlacement] = React.useState<PopperPlacementType | undefined>(
    undefined,
  );
  return (
    <div style={{ width: '100%' }}>
      <PlacementForm setPlacement={setPlacement} />
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <span
          ref={(elm) => setAnchorEl(elm)}
          aria-describedby="placement-popper"
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(0,0,0,0.12)',
            padding: '1.5rem',
          }}
        >
          ANCHOR
        </span>
        <PopperUnstyled
          id="placement-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement={placement}
        >
          <div
            style={{
              padding: '0.25rem',
              border: '1px solid',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.2)',
            }}
          >
            The content of the Popper.
          </div>
        </PopperUnstyled>
      </div>
    </div>
  );
}
