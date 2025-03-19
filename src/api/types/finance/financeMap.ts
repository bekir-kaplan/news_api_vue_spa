/**
 * Mapped Data Interfaces
 * ----------------------------------
 * These interfaces define the structure of **mapped** data returned
 * after processing API responses from the Finance and News APIs.
 *
 * Features:
 * - Finance:
 *   - `IFinMapTimeSeries`: Defines a single time series entry with parsed data.
 *   - `IFinMapResTimeSeries`: Represents a processed time series response.
 *   - `IFinMapQuote`: Structures a financial quote with parsed values.
 *   - `IFinMapMarketState`: Defines market state details in a structured format.
 */

export interface IFinMapTimeSeries {
  datetime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IFinMapResTimeSeries {
  symbol: string; // Financial asset symbol (e.g., "AAPL")
  interval: string; // Interval of data (e.g., "1min")
  currency: string; // Currency of asset (e.g., "USD")
  exchange: string; // Exchange where asset is traded (e.g., "NASDAQ")
  values: IFinMapTimeSeries[];
}

export interface IFinMapQuote {
  symbol: string;
  name: string; // Name of the asset (e.g., "Apple Inc.")
  exchange: string; // Exchange name (e.g., "NASDAQ")
  currency: string; // Currency (e.g., "USD")
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
