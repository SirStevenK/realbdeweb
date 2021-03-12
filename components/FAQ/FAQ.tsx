import RowQuestion from "./RowQuestion";

const FAQ: React.FC = () => {
  return (
    <div className="justify-between items-center">
      <h1 className="font-display font-bold text-3xl text-primary text-center">
        FAQ
      </h1>
      <div className="flex flex-col items-center space-y-1 pb-1 mt-4 space-y-3">
        <RowQuestion />
        <RowQuestion />
        <RowQuestion />
        <RowQuestion />
      </div>
    </div>
  );
};

export default FAQ;