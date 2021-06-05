import Link from "next/link";

type Props = {
  hidden?: boolean;
};

const MoreTestimonial: React.FC<Props> = ({ hidden = false }) => {
  return (
    <div
      className={`rounded-md overflow-hidden bg-primary bg-opacity-25 flex justify-center items-center ${
        hidden ? "opacity-0 hidden" : "animate-fadein opacity-100"
      }`}
      style={{
        boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.3)",
        width: "100%",
        height: "232px",
      }}
    >
      <Link href="/etudiants">
        <a className="px-4 py-2 border-2 border-primary rounded-md font-display font-bold text-primary cursor-pointer hover:bg-primary hover:bg-opacity-10">
          Voir tous les témoignages
        </a>
      </Link>
    </div>
  );
};

export default MoreTestimonial;
