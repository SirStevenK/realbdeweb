import { RingLoader } from "react-spinners";

type Props = {
  disabled: boolean;
  loading: boolean;
  labelButton?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
};

const InputAdmin: React.FC<Props> = ({
  disabled,
  loading,
  labelButton = "",
  placeholder = "",
  onChange,
  value,
}) => {
  return (
    <div
      className="mx-auto flex border-2 border-secondary rounded-lg mt-2"
      style={{ padding: "2px", maxWidth: "400px", width: "100%" }}
    >
      <input
        type="email"
        className="outline-none border-none px-1 flex-1"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        style={{ background: "none", minWidth: "180px" }}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ConfirmButton disabled={disabled} value={labelButton} />
      )}
    </div>
  );
};

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="flex-shrink-0 flex justify-center items-center cursor-pointer px-8 py-2 bg-secondary rounded-lg"
      style={{ height: "40px" }}
    >
      <RingLoader size={24} color={"#FFFFFF"} />
    </div>
  );
};

const ConfirmButton: React.FC<{ disabled: boolean; value?: string }> = ({
  disabled,
  value = "",
}) => {
  return (
    <input
      disabled={disabled}
      type="submit"
      className={`flex-shrink-0 cursor-pointer font-body font-bold p-2 bg-secondary rounded-lg text-white text-center transition duration-500 ease-in-out bg-opacity-${
        disabled ? "50" : "100"
      }`}
      value={value}
    />
  );
};

export default InputAdmin;
