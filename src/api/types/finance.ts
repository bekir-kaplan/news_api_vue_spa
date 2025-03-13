export interface TimeSeriesValue {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface TimeSeriesResponse {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: Array<TimeSeriesValue>;
  status: string;
  message?: string;
}

export interface QuoteResponse extends TimeSeriesValue {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  previous_close: string;
  change: string;
  percent_change: string;
  average_volume: string;
  fifty_two_week: {
    low: string;
    high: string;
  };
  status: string;
}

export interface MarketStateResponse {
  symbol: string;
  exchange: string;
  market_state: 'open' | 'closed';
  status: string;
}
