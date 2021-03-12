import { useRouter } from "next/dist/client/router";

const Modal: React.FC = ({ children }) => {
  const router = useRouter();
  return (
    <div className="z-10 fixed top-0 left-0 h-full w-full bg-opacity-75 bg-modal-bg ">
      <div
        className={`absolute top-0 left-0 h-full w-full`}
        onClick={router.back}
      />
      <div className="z-20">{children}</div>
    </div>
  );
};

export default Modal;
