import Base, { IconProps } from "./Base";

const Minus: React.FC<IconProps> = (props) => {
  return (
    <Base defaultSize={16} viewBox="0 0 448 512" {...props}>
      <path
        fill="currentColor"
        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      />
    </Base>
  );
};

export default Minus;
