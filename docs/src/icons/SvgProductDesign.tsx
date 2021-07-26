import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      {...props}
    >
      <circle cx={18} cy={18} r={16} fill="#EAEEF3" />
      <path
        d="M15.25 25.497a2.5 2.5 0 002.499-2.5v-2.499h-2.5a2.5 2.5 0 000 4.999z"
        fill="#0ACF83"
      />
      <path
        d="M12.75 17.998a2.5 2.5 0 012.5-2.499h2.499v4.999h-2.5a2.5 2.5 0 01-2.499-2.5z"
        fill="#A259FF"
      />
      <path
        d="M12.75 13a2.5 2.5 0 012.5-2.5h2.499v4.999h-2.5a2.5 2.5 0 01-2.499-2.5z"
        fill="#F24E1E"
      />
      <path d="M17.749 10.5h2.5a2.5 2.5 0 010 4.999h-2.5V10.5z" fill="#FF7262" />
      <path d="M22.748 17.998a2.5 2.5 0 01-4.999 0 2.5 2.5 0 014.999 0z" fill="#1ABCFE" />
    </svg>
  );
}

export default SvgComponent;
