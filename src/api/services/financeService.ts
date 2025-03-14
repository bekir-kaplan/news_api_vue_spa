import { HttpClient } from '@/api/lib/HttpClient';
import { TWELVE_DATA_BASE_URL, TWELVE_DATA_CONFIG, TWELVE_DATA_ENDPOINTS } from '@/api/config';
import type { TimeSeriesResponse, QuoteResponse, MarketStateResponse } from '@/api/types/finance';
import { mapTimeSeries, mapQuote, mapMarketState } from '@/api/mappers/financeMapper';
import type { MappedTimeSeries, MappedQuote, MappedMarketState } from '@/api/types/mappedTypes';

class FinanceService extends HttpClient {
  constructor() {
    super(TWELVE_DATA_BASE_URL, TWELVE_DATA_CONFIG);
  }

  async getTimeSeries(
    symbol: string,
    interval: string = '1day',
    outputsize: number = 30
  ): Promise<MappedTimeSeries> {
    const response = await this.get<TimeSeriesResponse>(TWELVE_DATA_ENDPOINTS.TIME_SERIES, {
      params: {
        symbol,
        interval,
        outputsize,
      },
    });

    return mapTimeSeries(response);
  }

  async getQuote(symbol: string): Promise<MappedQuote | null> {
    const response = await this.get<QuoteResponse>(TWELVE_DATA_ENDPOINTS.QUOTE, {
      params: { symbol },
    });
    return mapQuote(response);
  }

  async getMarketState(symbol: string): Promise<MappedMarketState> {
    const response = await this.get<MarketStateResponse>(TWELVE_DATA_ENDPOINTS.MARKET_STATE, {
      params: { symbol },
    });
    return mapMarketState(response);
  }
}

export const financeService = new FinanceService();
