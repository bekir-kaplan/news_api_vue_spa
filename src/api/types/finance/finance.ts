/**
 * Finance API Time Series Value
 * ----------------------------------
 * Represents a **single time series data entry** in a financial dataset.
 *
 * Features:
 * - Stores OHLC (Open, High, Low, Close) price data.
 * - Captures trading volume for a specific datetime.
 */

export interface IFinTimeSeriesValue {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}
