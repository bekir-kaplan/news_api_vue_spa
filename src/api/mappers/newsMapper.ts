/**
 * News API Mappers
 * --------------------------
 * This module provides functions to transform raw API responses
 * from the News API into structured, application-friendly formats.
 *
 * Features:
 * - `mapArticle`: Converts news articles into a structured format.
 * - `mapSource`: Maps news sources into a structured format.
 * - `mapNewsResponse`: Maps an entire news response, including articles and status.
 * - `mapStatusResponse`: Maps a source response, including sources and status.
 *
 * Dependencies:
 * - Uses API response types (`INewsApiRes`, etc.).
 * - Outputs mapped data structures (`INewsMapNewsRes`, etc.).
 */
import type { TCategoryKey } from '@/types/news.types';
import type { INewsArticle, INewsSource } from '@/api/types/news/news';
import type { INewsMapNewsRes, INewsMapSourceRes } from '@/api/types/news/newsMap';
import type { INewsApiRes, INewsApiResSource } from '@/api/types/news/newsResponses';

/**
 * Maps an individual news article from the API response.
 * @param {INewsApiRes} response - The raw API response.
 * @param {TCategoryKey | undefined} category - The category associated with the news.
 * @returns {INewsArticle[]} - A structured list of news articles.
 */
export function mapArticle(
  response: INewsApiRes,
  category: TCategoryKey | undefined
): INewsArticle[] {
  return response.articles.map((article) => ({
    source: {
      id: article.source.id,
      name: article.source.name,
    },
    author: article.author || 'Unknown',
    title: article.title,
    description: article.description || '',
    url: article.url,
    urlToImage: article.urlToImage || '',
    publishedAt: new Date(article.publishedAt),
    content: article.content || '',
    category: category || 'general',
  }));
}

/**
 * Maps news sources from the API response into a structured format.
 * @param {INewsApiResSource} response - The raw API response.
 * @returns {INewsSource[]} - Structured list of news sources.
 */
export function mapSource(response: INewsApiResSource): INewsSource[] {
  return response.sources.map((source) => ({
    id: source.id,
    name: source.name,
    description: source.description,
    url: source.url,
    category: source.category,
    language: source.language,
    country: source.country,
  }));
}

/**
 * Maps the full news API response into a structured object.
 * @param {INewsApiRes} response - The raw API response.
 * @param {TCategoryKey | undefined} [category] - The category associated with the news.
 * @returns {INewsMapNewsRes} - The mapped news response object.
 */
export function mapNewsResponse(
  response: INewsApiRes,
  category?: TCategoryKey | undefined
): INewsMapNewsRes {
  return {
    articles: mapArticle(response, category),
    totalResults: response.totalResults,
    status: response.status === 'ok' ? 'success' : 'error',
  };
}

/**
 * Maps the source response from the API into a structured object.
 * @param {INewsApiResSource} response - The raw API response.
 * @returns {INewsMapSourceRes} - The mapped source response object.
 */
export function mapStatusResponse(response: INewsApiResSource): INewsMapSourceRes {
  return {
    sources: mapSource(response),
    status: response.status === 'ok' ? 'success' : 'error',
  };
}
