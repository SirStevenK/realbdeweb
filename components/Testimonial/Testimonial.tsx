const Testimonial: React.FC = () => {
  return (
    <div
      className="rounded-md overflow-hidden bg-white"
      style={{
        boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.3)",
        maxWidth: "540px",
      }}
    >
      <div className="ml-2 py-3 px-2 space-y-2">
        <i aria-hidden className="fas fa-quote-left text-primary text-xl" />
        <p className="pr-2 font-body text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
          leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa a
          justo accumsan eleifend.
        </p>
      </div>
      <div className="flex justify-center items-center p-2 bg-primary bg-opacity-25">
        <img
          className="rounded-full overflow-hidden"
          src="/images/sampropic.png"
          style={{
            boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2)",
            height: "64px",
            width: "64px",
          }}
        />
        <div className="ml-4">
          <span className="block text-primary font-display font-bold">
            Tilly <span className="uppercase">Guibord</span>
          </span>
          <span className="block text-primary font-display text-sm">
            Promo 2017
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
