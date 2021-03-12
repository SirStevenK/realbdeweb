type Props = {
  className?: string;
  name: string;
};

const BasicTag: React.FC<Props> = ({ className = "", name }) => {
  return (
    <span
      className={`cursor-pointer select-none inline-block text-light text-sm  border-2 border-light px-2 py-1 rounded-md ${className}`}
    >
      <i aria-hidden className="fas fa-hashtag" />
      <span className="font-display font-demi uppercase ml-1">{name}</span>
    </span>
  );
};

export default BasicTag;
