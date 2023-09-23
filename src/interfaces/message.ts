export interface Message {
  role: string;
  content: string;
}

export interface PhoneMessages {
  phone: string;
  messages: Message[];
}
