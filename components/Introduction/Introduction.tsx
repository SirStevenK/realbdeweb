type Props = { text: string };

const Introduction: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <h1
        id="intro"
        className="font-display font-bold text-2xl text-primary text-center"
      >
        Présentation du BDE
      </h1>
      <p
        className="mx-auto font-body mt-4 px-2 text-center text-sm sm:text-base"
        style={{ maxWidth: "960px" }}
      >
        {text}
      </p>
    </div>
  );
};

export default Introduction;
