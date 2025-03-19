/**
 * Finance API Response Types
 * ----------------------------------
 * These interfaces define the structure of **responses** returned
 * after querying the Finance API.
 *
 * Features:
 * - `IFinResTimeSeries`: Represents a time series response containing metadata and values.
 * - `IFinResQuote`: Defines the structure of a stock or currency quote response.
 * - `IFinResMarketState`: Represents the market state (open/closed) response.
 *
 * Dependencies:
 * - Uses `IFinTimeSeriesValue` for OHLC (Open, High, Low, Close) price data.
 */
import type { IFinTimeSeriesValue } from './finance';

export interface IFinResTimeSeries {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: IFinTimeSeriesValue[];
  status: string;
  message?: string;
}

export interface IFinResQuote extends IFinTimeSeriesValue {
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

export interface IFinResMarketState {
  symbol: string;
  exchange: string;
  market_state: 'open' | 'closed';
  status: string;
}
