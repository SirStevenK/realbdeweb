import axios from "axios";

type PromisedResponse = {
  success: number;
  file?: {
    url: string;
  };
};

export default async function ClientUploadFileByUrl(
  url: string
): Promise<PromisedResponse> {
  return await axios
    .post<{ futureUrl?: string }>(`/api/aws/uploadByUrl`, { url })
    .then(({ data: { futureUrl } }) => {
      if (futureUrl) return { success: 1, file: { url: futureUrl } };
      else return { success: 0 };
    })
    .catch(() => ({ success: 0 }));
}
