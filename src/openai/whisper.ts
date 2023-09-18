import fs from "fs";
import { OpenAI } from "openai";
import { env } from "node:process";

export const voiceToText = async (path: string): Promise<string> => {
  if (!fs.existsSync(path)) {
    throw new Error("No se encuentra el archivo");
  }

  try {
    const openai = new OpenAI({
      apiKey: env["OPENAI_API_KEY"],
    });
    const resp = await openai.audio.transcriptions.create({
      file: fs.createReadStream(path),
      model: "whisper-1",
    });

    return resp.text;
  } catch (error: any) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
    return "";
  }
};
