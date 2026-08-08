import React from "react";

interface ShadcnUiIconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  [key: string]: unknown; // for any additional SVG props
}

const ShadcnUiIcon = ({
  size = 24,
  color,
  className = "",
  style,
  onClick,
  ...rest
}: ShadcnUiIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      color={color}
      className={className}
      style={style}
      onClick={onClick}
      {...rest}
    >
      <path fill="none" d="M0 0h256v256H0z"/><path fill="none" stroke="currentColor" strokeWidth="25" strokeLinecap="round" d="M208 128l-80 80M192 40L40 192"/>
    </svg>
  );
};

export default ShadcnUiIcon;
