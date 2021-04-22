import axios from "axios";

type PromisedResponse = {
  success: number;
  file?: {
    url: string;
  };
};

export default async function ClientUploadFile(
  file: File
): Promise<PromisedResponse> {
  const { presignedUrl, futureUrl } = await axios
    .get(`/api/aws/getPresignedUrl?filename=${file.name}&type=${file.type}`)
    .then((res) => ({
      presignedUrl: res.data.presignedUrl as string,
      futureUrl: res.data.futureUrl as string,
    }))
    .catch(() => ({ presignedUrl: "", futureUrl: "" }));

  if (!presignedUrl)
    return {
      success: 0,
    };
  else
    return await axios
      .put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      })
      .then(() => ({
        success: 1,
        file: {
          url: futureUrl,
        },
      }))
      .catch(() => ({ success: 0 }));
}
