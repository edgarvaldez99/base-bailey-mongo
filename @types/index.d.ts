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

declare module "bot-ws-plugin-openai" {
  export function init(config: any): any;
}

declare module "@bot-whatsapp/bot" {
  export interface AnswerOptions {
    media?: string | null;
    sensitive?: boolean;
    buttons?: Array<any>;
    capture?: boolean;
    child?: string | null;
    delay?: number;
    keyword?: {};
    callback?: boolean;
    nested?: any[];
  }

  export interface JsonContext {
    ref: string;
    keyword: string | any[];
    options: {
      sensitive: boolean;
      regex: any;
    };
  }

  export interface ContextOptions {
    sensitive?: boolean;
    regex?: any;
  }

  export interface Context {
    from: string;
    ref: string;
    keyword: string | any[];
    answer: string[];
    json?: JsonContext[];
    options?: ContextOptions;
    callbacks?: Function | null;
  }

  export interface FlowContext {
    ctx: Context;
    ref: string;
    addAnswer: (
      answer: string | string[],
      options?: AnswerOptions,
      cb?: Function | null,
      nested?: Function[]
    ) => this;
    addAction: (
      cb?: (ctx?: any, options?: any) => void,
      flagCb?: () => void
    ) => this;
    toJson: () => this;
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

  export function addKeyword(
    keywords: string | string[],
    options?: ContextOptions
  ): FlowContext;

  export enum EVENTS {
    WELCOME = "",
    VOICE_NOTE = "",
  }
}
