import styled from "@emotion/styled";
import InputText from "@/components/InputText/InputText";
import TextArea from "@/components/TextArea/TextArea";
import Button from "@/components/Button/Button";
import { PaperPlane } from "@/components/icons";
import colors from "@/styles/colors.json";
import { useCallback, useState } from "react";
import axios from "axios";
import ValidateEmail from "@/lib/scripts/ValidateEmail";

const Wrapper = styled.form({
  width: "100%",
  maxWidth: "680px",
});

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const SendContact = useCallback(() => {
    if (
      [name, email, message].every((e) => e.length > 0) &&
      ValidateEmail(email)
    )
      axios
        .post("/api/contact", { name, email, message })
        .then(() => alert("Votre message a bien été envoyé"))
        .then(() => {
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch(() => alert("Votre message n'a pas pu être envoyé"))
        .finally(() => setErrors([]));
    else {
      setErrors(() => {
        const errors: string[] = [];
        if (name.length === 0) errors.push("name");
        if (email.length === 0 || !ValidateEmail(email)) errors.push("email");
        if (message.length === 0) errors.push("message");
        return errors;
      });
    }
  }, [name, email, message]);

  return (
    <div id="contact" className="flex flex-col items-center pt-2 pb-6 px-3">
      <h2 className="font-display font-bold text-2xl text-primary text-center">
        Contact
      </h2>
      <Wrapper
        className="flex flex-col space-y-2 mt-4"
        onSubmit={(event) => {
          SendContact();
          event.preventDefault();
        }}
      >
        <InputText
          colorBorder={errors.includes("name") ? colors.warning : undefined}
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <InputText
          colorBorder={errors.includes("email") ? colors.warning : undefined}
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextArea
          colorBorder={errors.includes("message") ? colors.warning : undefined}
          placeholder="Votre message"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <div className="flex justify-center">
          <Button type="submit">
            Envoyer <PaperPlane />
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default Contact;
