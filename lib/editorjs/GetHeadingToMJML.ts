import { OutputBlockData } from "@editorjs/editorjs";

export default function GetHeadingToMJML(block: OutputBlockData): string {
  let fontSize: string;
  switch (block.data.level) {
    case 1:
      fontSize = "24px";
      break;
    case 2:
      fontSize = "20px";
      break;
    default:
      fontSize = "16px";
      break;
  }

  return `<mj-text align="center" color="#20201E" font-size="${fontSize}" font-weight="500" padding="0px">${block.data.text}</mj-text><mj-divider border-width="2px" border-color="#20201E" width="35%" />`;
}
