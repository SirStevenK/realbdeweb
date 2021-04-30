import EditorJS from "react-editor-js";
import { API, OutputData } from "@editorjs/editorjs";
import styled from "@emotion/styled";
import { EDITOR_JS_TOOLS } from "@/lib/editorjs/tools";
import colors from "@/styles/colors.json";

type Props = {
  data: OutputData;
  onChange?: (data: OutputData) => void;
};

const prefixImage = process.env.NEXT_PUBLIC_IMAGE_PREFIX as string;

const Wrapper = styled.div({
  "#bdeweb-editor": {
    zIndex: 0,
    background: colors.white,
    border: `3px solid ${colors.gray}`,
    borderRadius: "0.5rem",
    color: colors.dark,
    fontFamily: "Ubuntu,Helvetica,Arial,sans-serif",
    padding: "15px",
    outline: "none",
    textAlign: "center",

    "::placeholder": {
      color: colors.gray,
    },
    ":focus": {
      border: `3px solid ${colors.primary}CC`,
    },
    "h1, h2, h3, h4, h5, h6": {
      fontWeight: "bold",
    },
    h1: {
      fontSize: "24px",
    },
    h2: {
      fontSize: "20px",
    },
  },
  ".codex-editor--narrow .codex-editor__redactor": {
    margin: "0 50px",
  },
});

const AddPrefix = (data: OutputData) => {
  return {
    ...data,
    blocks: data.blocks.map((block) => {
      if (
        block.type === "image" &&
        typeof block.data.file.url === "string" &&
        block.data.file.url.length > 0
      ) {
        return {
          ...block,
          data: {
            ...block.data,
            file: {
              url:
                typeof block.data.file.url === "string" &&
                block.data.file.url.length > 0
                  ? `${prefixImage}${block.data.file.url}`
                  : block.data.file.url,
            },
          },
        };
      } else return block;
    }),
  };
};

const RemovePrefix = (data: OutputData) => {
  return {
    ...data,
    blocks: data.blocks.map((block) => {
      if (
        block.type === "image" &&
        typeof block.data.file.url === "string" &&
        block.data.file.url.length > 0 &&
        (block.data.file.url as string).indexOf(prefixImage) === 0
      ) {
        return {
          ...block,
          data: {
            ...block.data,
            file: {
              url: `${(block.data.file.url as string).substring(
                prefixImage.length
              )}`,
            },
          },
        };
      } else return block;
    }),
  };
};
const ContentEditor: React.FC<Props> = ({ data, onChange = () => null }) => {
  return (
    <Wrapper>
      <EditorJS
        holder="bdeweb-editor"
        tools={EDITOR_JS_TOOLS}
        data={AddPrefix(data)}
        onChange={(api: API, data?: OutputData) =>
          data && onChange(RemovePrefix(data))
        }
      >
        <div
          id="bdeweb-editor"
          className="border border-gray-400 px-4 font-serif rounded-md w-full"
        />
      </EditorJS>
    </Wrapper>
  );
};

export default ContentEditor;
