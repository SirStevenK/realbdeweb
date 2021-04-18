export type IconProps = {
  className?: string;
  onClick?: () => void;
  size?: number;
};

type Props = IconProps & {
  viewBox: string;
  defaultSize: number;
};

const Base: React.FC<Props> = ({
  children,
  className,
  defaultSize,
  onClick,
  size,
  viewBox,
}) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width={size?.toString() || defaultSize.toString()}
      height={size?.toString() || defaultSize.toString()}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default Base;
