import { env } from "node:process";
import { init } from "vir";

const employeesAddonConfig = {
  model: "gpt-4-0613",
  temperature: 0,
  apiKey: env["OPENAI_API_KEY"],
};

export const employeesAddon = init(employeesAddonConfig);
