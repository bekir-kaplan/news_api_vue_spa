import type {
  IFinResTimeSeries,
  IFinTimeSeriesValue,
  IFinResQuote,
  IFinResMarketState,
} from '@/api/types/finance';
import type { MappedTimeSeries, IFinMapQuote, IFinMapMarketState } from '@/api/types/mapTypes';

export function mapTimeSeries(response: IFinResTimeSeries): MappedTimeSeries {
  return {
    symbol: response.meta?.symbol,
    interval: response.meta?.interval,
    currency: response.meta?.currency,
    exchange: response.meta?.exchange,
    values: response.values.map(mapTimeSeriesValue),
  };
}

export function mapTimeSeriesValue(value: IFinTimeSeriesValue): MappedTimeSeries['values'][0] {
  return {
    datetime: new Date(value.datetime),
    open: parseFloat(value.open),
    high: parseFloat(value.high),
    low: parseFloat(value.low),
    close: parseFloat(value.close),
    volume: parseInt(value.volume, 10),
  };
}

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

export function mapMarketState(response: IFinResMarketState): IFinMapMarketState {
  return {
    symbol: response.symbol,
    exchange: response.exchange,
    isOpen: response.market_state === 'open',
  };
}
