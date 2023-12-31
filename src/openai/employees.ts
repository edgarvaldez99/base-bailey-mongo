import { env } from "node:process";
import { init } from "bot-ws-plugin-openai";

const employeesAddonConfig = {
  model: "gpt-4-0613",
  temperature: 0,
  apiKey: env["OPENAI_API_KEY"],
};

export const employeesAddon = init(employeesAddonConfig);
