import styled from "@emotion/styled";
import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";

const Wrapper = styled.form({
  width: "100%",
  maxWidth: "680px",
});

const InputText = styled.input({
  background: colors.white,
  border: `3px solid ${colors.light}`,
  borderRadius: "0.5rem",
  color: colors.dark,
  fontFamily: fontFamily.body,
  padding: "2px 5px",
  outline: "none",
  ":focus": {
    border: `3px solid ${colors.primary}`,
  },
});

const TextArea = styled.textarea({
  background: colors.white,
  border: `3px solid ${colors.light}`,
  borderRadius: "0.5rem",
  color: colors.dark,
  display: "block",
  fontFamily: fontFamily.body,
  height: "180px",
  padding: "2px 5px",
  resize: "none",
  outline: "none",
  ":focus": {
    border: `3px solid ${colors.primary}`,
  },
});

const Button = styled.button({
  outline: "none!important",
  background: colors.primary,
  color: colors.light,
  fontFamily: fontFamily.body.join(","),
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "7px 15px",
  borderRadius: "5px",
  ".icon": {
    fontSize: "14px",
    marginLeft: "6px",
    marginRight: "2px",
  },
});

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center pt-2 pb-6 px-3">
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
            Envoyer <i className="fas fa-paper-plane icon" />
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default Contact;
