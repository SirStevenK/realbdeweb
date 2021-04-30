import { OutputBlockData } from "@editorjs/editorjs";

export default function GetListToMJML(block: OutputBlockData): string {
  const style = block.data.style as string;
  const items = block.data.items as string[];
  const tag = style === "ordered" ? "ol" : "ul";

  return `<mj-text align="center" color="#20201E">${items
    .map(
      (item, index) =>
        `<p style="font-weight: bold;">${
          tag === "ol" ? `${index + 1}.` : "-"
        } ${item}</p>`
    )
    .join("")}</mj-text>`;
}
