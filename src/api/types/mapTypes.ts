import type { INewsArticle, INewsSource } from '@/api/types/news';

// Finance Types
export interface MappedTimeSeriesValue {
  datetime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MappedTimeSeries {
  symbol: string;
  interval: string;
  currency: string;
  exchange: string;
  values: MappedTimeSeriesValue[];
}

export interface IFinMapQuote {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  datetime: Date;
  price: {
    open: number;
    high: number;
    low: number;
    close: number;
    previousClose: number;
  };
  volume: {
    current: number;
    average: number;
  };
  change: {
    absolute: number;
    percent: number;
  };
  fiftyTwoWeek: {
    low: number;
    high: number;
  };
}

export interface IFinMapMarketState {
  symbol: string;
  exchange: string;
  isOpen: boolean;
}

// News Types

export interface INewsMapNewsRes {
  status: string;
  totalResults: number;
  articles: INewsArticle[];
}

export interface INewsMapSourceRes {
  status: string;
  sources: INewsSource[];
}
