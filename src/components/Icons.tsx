export const ShirtIcon = ({ hasShirt }: { hasShirt: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'>
    <path
      d='M10 4v2H8V4h2m4 0v2h-2V4h2M8 2h8v4h4l-1 15H5L4 6h4V2m2 4v2h4V6h2l-.8 9H8.8L8 6h2z'
      fill={hasShirt ? "rgba(0, 0, 0, 0.26)" : "white"}
    />
  </svg>
);

export const PantsIcon = ({ hasPants }: { hasPants: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 64 64'
    width='24'
    height='24'>
    <path
      d='M20,2V12H44V2ZM16,12H48L44,60H36L32,32H28L24,60H16Z'
      fill={hasPants ? "rgba(0, 0, 0, 0.26)" : "white"}
    />
  </svg>
);
