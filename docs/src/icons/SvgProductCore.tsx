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
      <mask
        id="product-core-mask1"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={11}
        y={6}
        width={14}
        height={15}
      >
        <path
          d="M11.412 11.15a2.47 2.47 0 011.259-2.153l4.118-2.316a2.47 2.47 0 012.422 0l4.118 2.317a2.47 2.47 0 011.26 2.153v4.522a2.47 2.47 0 01-1.26 2.153l-4.118 2.316a2.47 2.47 0 01-2.422 0l-4.118-2.316a2.47 2.47 0 01-1.26-2.153V11.15z"
          fill="#ED64A6"
        />
      </mask>
      <g mask="url(#product-core-mask1)" fillRule="evenodd" clipRule="evenodd">
        <path d="M11.412 9.706L18 13.412l6.588-3.706L18 6l-6.588 3.706z" fill="#66B2FF" />
        <path
          d="M18 13.411v7.412l6.588-3.706V9.706L18 13.41zM11.412 17.117L18 20.823v-7.412l-6.588-3.705v7.411z"
          fill="#0059B3"
        />
      </g>
      <mask
        id="product-core-mask2"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={4}
        y={10}
        width={14}
        height={15}
      >
        <path
          d="M4 15.268a2.47 2.47 0 011.26-2.153L9.376 10.8a2.47 2.47 0 012.422 0l4.118 2.316a2.47 2.47 0 011.26 2.153v4.522a2.47 2.47 0 01-1.26 2.154L11.8 24.26a2.47 2.47 0 01-2.423 0l-4.118-2.316A2.47 2.47 0 014 19.79V15.27z"
          fill="#ED64A6"
        />
      </mask>
      <g mask="url(#product-core-mask2)" fillRule="evenodd" clipRule="evenodd">
        <path d="M4 13.824l6.588 3.705 6.589-3.705-6.589-3.706L4 13.824z" fill="#66B2FF" />
        <path d="M10.588 17.53v7.41l6.589-3.705v-7.412l-6.589 3.706z" fill="#0059B3" />
        <path d="M4 21.235l6.588 3.706v-7.412L4 13.823v7.412z" fill="#007FFF" />
      </g>
      <mask
        id="product-core-mask3"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={18}
        y={10}
        width={15}
        height={15}
      >
        <path
          d="M18.824 15.268a2.47 2.47 0 011.26-2.153L24.2 10.8a2.47 2.47 0 012.422 0l4.118 2.316A2.47 2.47 0 0132 15.268v4.522a2.47 2.47 0 01-1.26 2.154l-4.118 2.316a2.47 2.47 0 01-2.422 0l-4.118-2.316a2.47 2.47 0 01-1.26-2.154V15.27z"
          fill="#ED64A6"
        />
      </mask>
      <g mask="url(#product-core-mask3)" fillRule="evenodd" clipRule="evenodd">
        <path d="M18.824 13.824l6.588 3.705L32 13.824l-6.588-3.706-6.588 3.706z" fill="#66B2FF" />
        <path d="M25.412 17.53v7.41L32 21.236v-7.412l-6.588 3.706z" fill="#0072E6" />
        <path d="M18.823 21.235l6.588 3.706v-7.412l-6.588-3.706v7.412z" fill="#0059B3" />
      </g>
      <mask
        id="product-core-mask4"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={11}
        y={14}
        width={14}
        height={15}
      >
        <path
          d="M11.412 19.386a2.47 2.47 0 011.259-2.153l4.118-2.316a2.47 2.47 0 012.422 0l4.118 2.316a2.47 2.47 0 011.26 2.153v4.522a2.47 2.47 0 01-1.26 2.153l-4.118 2.317a2.47 2.47 0 01-2.422 0L12.67 26.06a2.47 2.47 0 01-1.26-2.153v-4.522z"
          fill="#ED64A6"
        />
      </mask>
      <g mask="url(#product-core-mask4)" fillRule="evenodd" clipRule="evenodd">
        <path d="M11.412 17.941L18 21.647l6.588-3.706L18 14.235l-6.588 3.706z" fill="#66B2FF" />
        <path d="M18 21.647v7.412l6.588-3.706V17.94L18 21.647z" fill="#0072E6" />
        <path d="M11.412 25.353L18 29.059v-7.412l-6.588-3.706v7.412z" fill="#007FFF" />
      </g>
    </svg>
  );
}

export default SvgComponent;
