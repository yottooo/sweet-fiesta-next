import bgMessages from '../data/messages.bg.json';
import enMessages from '../data/messages.en.json';

const messages: Record<string, Record<string, string>> = {
  bg: bgMessages as Record<string, string>,
  en: enMessages as Record<string, string>,
};

export function getMessages(locale: string) {
  return messages[locale] || messages.en;
}

export function t(locale: string, key: string): string {
  const msg = getMessages(locale);
  return msg[key] || key;
}
