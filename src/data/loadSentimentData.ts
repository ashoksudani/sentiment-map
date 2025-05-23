import Papa from "papaparse";
import type { SentimentEntry } from '../types/sentiment';

type Sentiment = "positive" | "neutral" | "negative";

export interface CountrySentiment {
  [isoCode: string]: Sentiment;
}

// Helper to mimic a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loadSentimentData = async (): Promise<CountrySentiment> => {
  const response = await fetch("/geo_sentiments.csv");
  const text = await response.text();

  // Mimic a 100ms delay
  await delay(400);

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
    complete: (results: { data: SentimentEntry[] }) => {
        const sentimentMap: CountrySentiment = {};
        for (const row of results.data as SentimentEntry[]) {
          console.log(row);
          const sentiment = getSentiment(row.RandomValue);
          const iso = countryToISO(row.Country.trim());
          if (iso) sentimentMap[iso] = sentiment;
        }
        resolve(sentimentMap);
      },
      error: reject,
    });
  });
};

const getSentiment = (value: string): Sentiment => {
  if (Number(value) === 0) return "negative";
  if (Number(value) === 1) return "neutral";
  return "positive";
};

const countryToISO = (country: string): string | null => {
  const mapping: { [key: string]: string } = {
    "United States": "US",
    "United Kingdom": "GB",
    "Canada": "CA",
    "Australia": "AU",
    "Germany": "DE",
    "France": "FR",
    "Japan": "JP",
    "China": "CN",
    "India": "IN",
    "Brazil": "BR",
    "Mexico": "MX",
    "Russia": "RU",
    "Italy": "IT",
    "Spain": "ES",
    "South Korea": "KR",
    "Netherlands": "NL",
    "Saudi Arabia": "SA",
    "South Africa": "ZA",
    "Turkey": "TR",
    // Add more if needed
  };
  return mapping[country] || null;
};



/*
import type { SentimentEntry } from '../types/sentiment';

// import sentimentCsv from './geo_sentiments.csv?url';

const CSV_URL = '/geo_sentiments.csv';

export async function loadSentimentData(): Promise<SentimentEntry[]> {
  const response = await fetch(CSV_URL);
  const text = await response.text();
  const lines = text.split('\n').slice(1);

  return lines
    .filter(Boolean)
    .map((line) => {
      const [Country, Region, RandomValue] = line.split(',');
      return {
        Country: Country.trim(),
        Region: Region.trim(),
        RandomValue: Number(RandomValue),
      } as SentimentEntry;
    });
}
*/