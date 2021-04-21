import { useUser } from "@/hooks/UseUser";
import ValidateEmail from "@/lib/scripts/ValidateEmail";
import axios from "axios";
import { Magic } from "magic-sdk";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import InputAdmin from "../InputAdmin/InputAdmin";

const Login: React.FC = () => {
  const { mutate } = useUser();
  const [emailInput, setEmailInput] = useState("");
  const [notAllowed, setNotAllowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmailValid = useMemo(() => ValidateEmail(emailInput), [emailInput]);

  const Connect = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isEmailValid) return;

      setLoading(true);

      const allowed = await axios
        .post("/api/auth/authorize", {
          email: emailInput,
        })
        .then((res) => {
          if (res.data === "OK") return true;
        })
        .catch(() => false);

      if (!allowed) {
        setNotAllowed(true);
        setLoading(false);
      } else {
        const magic = new Magic(
          process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string
        );
        const didToken = await magic.auth.loginWithMagicLink({
          email: emailInput.toLowerCase(),
        });
        axios
          .post(
            "/api/auth/login",
            { email: emailInput.toLowerCase() },
            {
              headers: {
                Authorization: "Bearer " + didToken,
              },
            }
          )
          .finally(() => {
            mutate();
            setLoading(false);
          });
      }
    },
    [emailInput, isEmailValid, mutate]
  );

  useEffect(() => {
    setNotAllowed(false);
  }, [emailInput]);

  return (
    <form className="w-full p-2" onSubmit={Connect}>
      <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
        Authentification
      </h1>
      <InputAdmin
        disabled={!isEmailValid}
        loading={loading}
        onChange={setEmailInput}
        value={emailInput}
        placeholder="Adresse email"
        labelButton="Se Connecter"
      />
      <span className="mt-2 block font-display text-center text-secondary">
        {notAllowed ? "Vous n'êtes pas un administrateur du site" : ""}
      </span>
    </form>
  );
};

export default Login;
