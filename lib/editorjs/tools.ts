// import Embed from "@editorjs/embed";
// import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";

import ClientUploadFile from "@/lib/aws/ClientUploadFile";
import ClientUploadFileByUrl from "@/lib/aws/ClientUploadFileByUrl";

export const EDITOR_JS_TOOLS = {
  // embed: {
  //   class: Embed,
  //   config: {
  //     services: {
  //       youtube: true,
  //     },
  //   },
  // },

  // table: Table,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: List,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: ClientUploadFile,
        uploadByUrl: ClientUploadFileByUrl,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1,
    },
  },
  marker: Marker,
};
