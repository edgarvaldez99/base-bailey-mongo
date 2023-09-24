import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";

ffmpeg.setFfmpegPath(ffmpegPath);

export const convertOggMp3 = async (
  inputStream: string | Readable,
  outStream: string,
): Promise<boolean> => {
  return new Promise((resolve) => {
    ffmpeg(inputStream)
      .audioQuality(96)
      .toFormat("mp3")
      .save(outStream)
      .on("progress", () => null)
      .on("end", () => {
        resolve(true);
      });
  });
};
