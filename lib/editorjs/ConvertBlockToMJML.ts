import { OutputBlockData } from "@editorjs/editorjs";
import GetHeadingToMJML from "./GetHeadingToMJML";
import GetImageToMJML from "./GetImageToMJML";
import GetListToMJML from "./GetListToMJML";
import GetParagraphToMJML from "./GetParagraphToMJML";

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
