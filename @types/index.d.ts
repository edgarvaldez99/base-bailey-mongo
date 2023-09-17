// @types/index.d.ts

declare module "@bot-whatsapp/database/mongo" {
  interface MongoAdapterOptions {
    dbUri: string;
    dbName: string;
  }

  export default class MongoAdapter {
    constructor(options: MongoAdapterOptions);
  }
}

declare module "@bot-whatsapp/provider/baileys" {
  export default class BaileysProvider {}
}

declare module "@bot-whatsapp/portal" {
  export default function QRPortalWeb(): void;
}

declare module "@bot-whatsapp/bot" {
  export interface AnswerOptions {
    media?: string | null;
    buttons?: Array<any>;
    capture?: boolean;
    child?: string | null;
    delay?: number;
  }

  export interface FlowContext {
    addAnswer: (
      answer: string[],
      options: AnswerOptions,
      cb?: Function | null,
      nested?: Function[]
    ) => this;
    addAction: (cb: () => null, flagCb: () => null) => this;
  }

  export interface BotOptions {
    flow: FlowContext;
    provider: any;
    database: any;
  }

  export function createFlow(flow: any[]): any;

  export function createProvider(provider: any): any;

  export function createBot(options: {
    flow: any;
    provider: any;
    database: any;
  }): any;

  export function addKeyword(keywords: string[]): FlowContext;
}
