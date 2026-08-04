import React from "react";

interface EmailIconProps {
  size?: number | string;
  color?: string;
  stroke?: string;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  strokeWidth?: number | string;
  [key: string]: unknown; // for any additional SVG props
}

const EmailIcon = ({
  size = 24,
  color,
  stroke,
  fill,
  className = "",
  style,
  onClick,
  strokeWidth,
  ...rest
}: EmailIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={color}
      stroke={stroke}
      fill={fill || "none"}
      className={className}
      style={style}
      onClick={onClick}
      strokeWidth={strokeWidth}
      {...rest}
    >
      <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export default EmailIcon;
