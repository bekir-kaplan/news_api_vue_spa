import type { CON_LANGUAGE_MAPPING } from '@/constants/conFilter';

export interface IEventSelectElementChange {
  key: string;
  value: string;
  event?: Event;
}

export type TLanguageCodes = keyof typeof CON_LANGUAGE_MAPPING;
export type TCountryCodes = (typeof CON_LANGUAGE_MAPPING)[keyof typeof CON_LANGUAGE_MAPPING];
