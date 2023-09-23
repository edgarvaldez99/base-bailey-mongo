import { downloadMediaMessage } from '@adiwajshing/baileys';
import fs from 'node:fs/promises';
import { convertOggMp3 } from './convert-ogg-to-mp3';
import { voiceToText } from '../openai/whisper';

export const getTextFromAI = async (ctx: any) => {
  const buffer = await downloadMediaMessage(ctx, "buffer", {});
  const pathTmpOgg = `${process.cwd()}/tmp/voice-note-${Date.now()}.ogg`;
  const pathTmpMp3 = `${process.cwd()}/tmp/voice-note-${Date.now()}.mp3`;
  await fs.writeFile(pathTmpOgg, buffer);
  await convertOggMp3(pathTmpOgg, pathTmpMp3);
  const text = await voiceToText(pathTmpMp3);
  return text; //el habla1!!
};
