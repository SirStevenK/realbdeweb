import { OutputBlockData } from "@editorjs/editorjs";
import GetParagraphToMJML from "./GetParagraphToMJML";
import GetHeadingToMJML from "./GetHeadingToMJML";
import GetImageToMJML from "./GetImageToMJML";
import GetListToMJML from "./GetListToMJML";

export default function ConvertBlockToMJML(block: OutputBlockData): string {
  switch (block.type) {
    case "paragraph":
      return GetParagraphToMJML(block);
    case "header":
      return GetHeadingToMJML(block);
    case "image":
      return GetImageToMJML(block);
    case "list":
      return GetListToMJML(block);
    default:
      return "";
  }
}
