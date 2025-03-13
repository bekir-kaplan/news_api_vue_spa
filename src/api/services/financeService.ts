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
    try {
      const response = await this.get<TimeSeriesResponse>(TWELVE_DATA_ENDPOINTS.TIME_SERIES, {
        params: {
          symbol,
          interval,
          outputsize,
        },
      });

      if (response.status !== 'ok') {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
      }

      return mapTimeSeries(response);
    } catch (error: any) {
      console.error('Failed to fetch time series:', error);
      throw new Error(error.message);
    }
  }

  async getQuote(symbol: string): Promise<MappedQuote> {
    try {
      const response = await this.get<QuoteResponse>(TWELVE_DATA_ENDPOINTS.QUOTE, {
        params: { symbol },
      });
      return mapQuote(response);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      throw error;
    }
  }

  async getMarketState(symbol: string): Promise<MappedMarketState> {
    try {
      const response = await this.get<MarketStateResponse>(TWELVE_DATA_ENDPOINTS.MARKET_STATE, {
        params: { symbol },
      });
      return mapMarketState(response);
    } catch (error) {
      console.error('Failed to fetch market state:', error);
      throw error;
    }
  }
}

export const financeService = new FinanceService();
