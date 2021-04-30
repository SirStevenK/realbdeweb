import { OutputBlockData } from "@editorjs/editorjs";

export default function GetParagraphToMJML(block: OutputBlockData): string {
  return `<mj-text align="center" color="#20201E"><p>${block.data.text}</p></mj-text>`;
}
