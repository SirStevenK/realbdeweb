import { OutputBlockData } from "@editorjs/editorjs";

export default function GetImageToMJML(block: OutputBlockData): string {
  const url = block.data.file.url as string;
  const caption = block.data.caption as string;

  return `<mj-image src="${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${url}" alt="${caption}" />`;
}
