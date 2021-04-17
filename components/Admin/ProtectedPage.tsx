import { useUser } from "@/hooks/UseUser";

const ProtectedPage: React.FC = ({ children }) => {
  const { user } = useUser({ redirectTo: "/admin" });

  if (!user) return null;
  else return <>{children}</>;
};

export default ProtectedPage;
