import { createContext, useContext, useState, ReactNode } from 'react';

const COUNTRY_CURRENCY_MAP: Record<string, { code: string; symbol: string }> = {
  'United States': { code: 'USD', symbol: '$' },
  'Germany': { code: 'EUR', symbol: '€' },
  'South Korea': { code: 'KRW', symbol: '₩' },
  'Japan': { code: 'JPY', symbol: '¥' },
  'Italy': { code: 'EUR', symbol: '€' },
  'Switzerland': { code: 'CHF', symbol: 'CHF' },
  'France': { code: 'EUR', symbol: '€' },
  'Morocco': { code: 'MAD', symbol: 'د.م.' },
  'Mexico': { code: 'MXN', symbol: '$' },
  'India': { code: 'INR', symbol: '₹' },
  'Denmark': { code: 'DKK', symbol: 'kr' },
  'Brazil': { code: 'BRL', symbol: 'R$' },
  'Ghana': { code: 'GHS', symbol: '₵' },
  'China': { code: 'CNY', symbol: '¥' },
};

export interface CurrencyInfo {
  code: string;
  symbol: string;
}

interface CountryContextType {
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  getCurrency: () => CurrencyInfo;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const getCurrency = () => {
    if (!selectedCountry) {
      return { code: 'USD', symbol: '$' };
    }
    return COUNTRY_CURRENCY_MAP[selectedCountry] || { code: 'USD', symbol: '$' };
  };

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry, getCurrency }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within CountryProvider');
  }
  return context;
}
