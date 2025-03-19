/**
 * Finance API Mappers
 * --------------------------
 * This module provides functions to transform raw API responses
 * from the Finance API into structured, application-friendly formats.
 *
 * Features:
 * - `mapTimeSeries`: Converts time series response data into a mapped object.
 * - `mapTimeSeriesValue`: Parses individual time series entries.
 * - `mapQuote`: Maps quote response data with structured price and volume details.
 * - `mapMarketState`: Converts market state response into a readable format.
 *
 * Dependencies:
 * - Uses financial response interfaces (`IFinResTimeSeries`, etc.).
 * - Outputs mapped data structures (`IFinMapResTimeSeries`, `IFinMapQuote`, etc.).
 */

import type {
  IFinResMarketState,
  IFinResQuote,
  IFinResTimeSeries,
} from '@/api/types/finance/financeResponses';
import type { IFinTimeSeriesValue } from '@/api/types/finance/finance';
import type {
  IFinMapMarketState,
  IFinMapQuote,
  IFinMapResTimeSeries,
} from '@/api/types/finance/financeMap';

/**
 * Maps raw time series response to a structured time series object.
 * @param {IFinResTimeSeries} response - The raw API response.
 * @returns {IFinMapResTimeSeries} - The mapped time series data.
 */
export function mapTimeSeries(response: IFinResTimeSeries): IFinMapResTimeSeries {
  return {
    symbol: response.meta?.symbol,
    interval: response.meta?.interval,
    currency: response.meta?.currency,
    exchange: response.meta?.exchange,
    values: response.values.map(mapTimeSeriesValue),
  };
}

/**
 * Maps an individual time series value entry.
 * @param {IFinTimeSeriesValue} value - Raw time series entry.
 * @returns {IFinMapResTimeSeries['values'][0]} - Parsed time series value.
 */
export function mapTimeSeriesValue(value: IFinTimeSeriesValue): IFinMapResTimeSeries['values'][0] {
  return {
    datetime: new Date(value.datetime),
    open: parseFloat(value.open),
    high: parseFloat(value.high),
    low: parseFloat(value.low),
    close: parseFloat(value.close),
    volume: parseInt(value.volume, 10),
  };
}

/**
 * Maps a financial quote response into a structured format.
 * @param {IFinResQuote} response - The raw API response for a financial quote.
 * @returns {IFinMapQuote | null} - The mapped quote data, or null if invalid.
 */
export function mapQuote(response: IFinResQuote): IFinMapQuote | null {
  return {
    symbol: response.symbol,
    name: response.name,
    exchange: response.exchange,
    currency: response.currency,
    datetime: new Date(response.datetime),
    price: {
      open: parseFloat(response.open),
      high: parseFloat(response.high),
      low: parseFloat(response.low),
      close: parseFloat(response.close),
      previousClose: parseFloat(response.previous_close),
    },
    volume: {
      current: parseInt(response.volume, 10),
      average: parseInt(response.average_volume, 10),
    },
    change: {
      absolute: parseFloat(response.change),
      percent: parseFloat(response.percent_change),
    },
    fiftyTwoWeek: {
      low: parseFloat(response.fifty_two_week.low),
      high: parseFloat(response.fifty_two_week.high),
    },
  };
}

/**
 * Maps market state response into a structured object.
 * @param {IFinResMarketState} response - The raw API response for market state.
 * @returns {IFinMapMarketState} - The market state data.
 */
export function mapMarketState(response: IFinResMarketState): IFinMapMarketState {
  return {
    symbol: response.symbol,
    exchange: response.exchange,
    isOpen: response.market_state === 'open',
  };
}
