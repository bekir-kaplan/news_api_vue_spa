import { HttpClient } from '@/api/lib/HttpClient';
import { TWELVE_DATA_BASE_URL, TWELVE_DATA_CONFIG, TWELVE_DATA_ENDPOINTS } from '@/api/config';
import type { IFinResTimeSeries, IFinResQuote, IFinResMarketState } from '@/api/types/finance';
import { mapTimeSeries, mapQuote, mapMarketState } from '@/api/mappers/financeMapper';
import type { MappedTimeSeries, IFinMapQuote, IFinMapMarketState } from '@/api/types/mapTypes';

class FinanceService extends HttpClient {
  constructor() {
    super(TWELVE_DATA_BASE_URL, TWELVE_DATA_CONFIG);
  }

  async getTimeSeries(
    symbol: string,
    interval: string = '1day',
    outputsize: number = 30
  ): Promise<MappedTimeSeries> {
    const response = await this.get<IFinResTimeSeries>(TWELVE_DATA_ENDPOINTS.TIME_SERIES, {
      params: {
        symbol,
        interval,
        outputsize,
      },
    });

    return mapTimeSeries(response);
  }

  async getQuote(symbol: string): Promise<IFinMapQuote | null> {
    const response = await this.get<IFinResQuote>(TWELVE_DATA_ENDPOINTS.QUOTE, {
      params: { symbol },
    });
    return mapQuote(response);
  }

  async getMarketState(symbol: string): Promise<IFinMapMarketState> {
    const response = await this.get<IFinResMarketState>(TWELVE_DATA_ENDPOINTS.MARKET_STATE, {
      params: { symbol },
    });
    return mapMarketState(response);
  }
}

export const financeService = new FinanceService();
