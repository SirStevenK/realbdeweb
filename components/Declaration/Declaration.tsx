const Declaration: React.FC = () => {
  return (
    <div
      className="flex rounded-lg overflow-hidden bg-light"
      style={{ boxShadow: "0 0 6px 4px rgba(0, 0, 0, 0.4)", maxWidth: "680px" }}
    >
      <div className="py-4 pl-8 pr-6 flex justify-center items-center">
        <img
          className="rounded-md overflow-hidden"
          src="/images/sampropic.png"
          style={{ boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.4)" }}
        />
      </div>
      <div className="ml-2 py-2 px-2 space-y-2">
        <div className="flex space-x-4">
          <span className="font-bold font-display text-primary cursor-pointer">
            01
          </span>
          <span className="font-bold font-display cursor-pointer">02</span>
          <span className="font-bold font-display cursor-pointer">03</span>
        </div>
        <p className="pr-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
          leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa a
          justo accumsan eleifend.
        </p>
        <span className="block text-primary font-display font-bold">
          Tilly Guibord
        </span>
      </div>
    </div>
  );
};

export default Declaration;
