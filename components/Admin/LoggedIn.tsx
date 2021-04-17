import { useUser } from "@/hooks/UseUser";

const LoggedIn: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="w-full">
      <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center mb-2">
        Vous êtes connecté
      </h1>
      <span className="block font-body text-center">
        Identifiant : {user?.email}
      </span>
    </div>
  );
};

export default LoggedIn;
