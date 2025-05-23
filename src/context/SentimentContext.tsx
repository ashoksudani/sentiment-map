import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loadSentimentData } from "../data/loadSentimentData";
import type { CountrySentiment } from "../data/loadSentimentData";

export type SentimentMode = "overall" | "positive" | "neutral" | "negative";

interface SentimentContextProps {
  sentimentData: CountrySentiment | null;
  loading: boolean;
  error: string | null;
  selectedCountry: string | null;
  hoveredCountry: string | null;
  mode: SentimentMode;
  setSelectedCountry: (iso: string | null) => void;
  setHoveredCountry: (iso: string | null) => void;
  setMode: (mode: SentimentMode) => void;
}

const SentimentContext = createContext<SentimentContextProps | undefined>(undefined);

export const SentimentProvider = ({ children }: { children: ReactNode }) => {
  const [sentimentData, setSentimentData] = useState<CountrySentiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mode, setMode] = useState<SentimentMode>("overall");


  useEffect(() => {
    loadSentimentData()
      .then(data => {
        setSentimentData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(`Failed to load sentiment data. ${err.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <SentimentContext.Provider
      value={{
        sentimentData,
        loading,
        error,
        selectedCountry,
        hoveredCountry,
        mode,
        setSelectedCountry,
        setHoveredCountry,
        setMode,
      }}
    >
      {children}
    </SentimentContext.Provider>
  );
};

export const useSentimentContext = () => {
  const context = useContext(SentimentContext);
  if (!context) {
    throw new Error("useSentimentContext must be used within a SentimentProvider");
  }
  return context;
};