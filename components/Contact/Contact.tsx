import styled from "@emotion/styled";
import InputText from "../InputText/InputText";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import { PaperPlane } from "../icons";

const Wrapper = styled.form({
  width: "100%",
  maxWidth: "680px",
});

const Contact: React.FC = () => {
  return (
    <div id="contact" className="flex flex-col items-center pt-2 pb-6 px-3">
      <h1 className="font-display font-bold text-2xl text-primary text-center">
        Contact
      </h1>
      <Wrapper
        className="flex flex-col space-y-2 mt-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <InputText type="text" placeholder="Votre nom" />
        <InputText type="email" placeholder="Votre email" />
        <TextArea placeholder="Votre message" />
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
