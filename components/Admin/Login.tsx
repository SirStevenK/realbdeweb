import { useUser } from "@/hooks/UseUser";
import ValidateEmail from "@/lib/scripts/ValidateEmail";
import axios from "axios";
import { Magic } from "magic-sdk";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { RingLoader } from "react-spinners";

const Login: React.FC = () => {
  const { mutate } = useUser();
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const isEmailValid = useMemo(() => ValidateEmail(emailInput), [emailInput]);

  const Connect = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const magic = new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string
      );
      const didToken = await magic.auth.loginWithMagicLink({
        email: emailInput,
      });

      axios
        .post(
          "/api/auth/login",
          {},
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
    },
    [emailInput, mutate]
  );

  return (
    <form className="w-full p-2" onSubmit={Connect}>
      <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
        Authentification
      </h1>
      <div
        className="mx-auto flex border-2 border-secondary rounded-lg mt-2"
        style={{ padding: "2px", maxWidth: "400px", width: "100%" }}
      >
        <input
          type="email"
          className="outline-none border-none px-1 flex-1"
          placeholder="Adresse email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.currentTarget.value)}
          style={{ background: "none", minWidth: "180px" }}
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <LoginButton disabled={!isEmailValid} />
        )}
      </div>
    </form>
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

const LoginButton: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <input
      disabled={disabled}
      type="submit"
      className={`flex-shrink-0 cursor-pointer font-body font-bold p-2 bg-secondary rounded-lg text-white text-center transition duration-500 ease-in-out bg-opacity-${
        disabled ? "50" : "100"
      }`}
      value="Se Connecter"
    />
  );
};

export default Login;
