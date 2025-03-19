/**
 * Finance API Request Types
 * ----------------------------------
 * These interfaces define the structure of **request parameters**
 * used when querying the Finance API.
 *
 * Features:
 * - `IFinReqTimeSeries`: Defines parameters for fetching time series data.
 * - `IFinReqQuote`: Defines parameters for retrieving financial quotes.
 * - `IFinReqMarketState`: Defines parameters for checking market state.
 */

export interface IFinReqTimeSeries {
  symbol: string; // Stock or currency symbol (e.g., "AAPL", "EUR/USD")
  interval?: string; // Time interval (e.g., "1min", "1day"), optional with default
  outputsize?: number; // Number of data points to return, optional with default
}

export interface IFinReqQuote {
  symbol: string;
}

export interface IFinReqMarketState {
  symbol: string;
}
