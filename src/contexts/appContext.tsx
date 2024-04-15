import React, { createContext, useEffect, useState } from "react";
import { fetchCurrencies, fetchExchangeValues } from "../api/api";

export type Currency = {
  value: string;
  label: string;
};

export type Convertion = {
  date: Date;
  currencyA: Currency;
  currencyB: Currency;
  amount: number;
  result: number;
};

interface AppContextProps {
  currencies: Currency[];
  isLoading: boolean;
  handleConvertion: (
    currencyA: Currency,
    currencyB: Currency,
    amount: number
  ) => void;
  convertions: Convertion[];
  clearConvertions: () => void;
}

export const AppContext = createContext<AppContextProps>({
  currencies: [],
  isLoading: true,
  handleConvertion: () => {},
  convertions: [],
  clearConvertions: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [convertions, setConvertions] = useState<Convertion[]>([]);

  const handleConvertion = (
    currencyA: Currency,
    currencyB: Currency,
    amount: number
  ) => {
    fetchExchangeValues(currencyA.value).then((res) => {
      const exchangeValue = res[currencyA.value][currencyB.value];
      const convertion = {
        date: new Date(),
        currencyA,
        currencyB,
        amount,
        result: exchangeValue * amount,
      };
      localStorage.setItem(
        "convertions",
        JSON.stringify([...convertions, convertion])
      );
      setConvertions((prev) => [...prev, convertion]);
    });
  };

  const clearConvertions = () => {
    setConvertions([]);
  };

  useEffect(() => {
    const convertions = localStorage.getItem("convertions");
    if (convertions) {
      setConvertions(JSON.parse(convertions));
    }
  }, []);

  useEffect(() => {
    if (currencies.length === 0 && isLoading) {
      fetchCurrencies().then((res: Record<string, string>) => {
        setCurrencies(
          Object.entries(res).map(([value, label]) => ({ value, label }))
        );
        setIsLoading(false);
      });
    }
  }, [currencies, isLoading]);

  return (
    <AppContext.Provider
      value={{
        currencies,
        isLoading,
        handleConvertion,
        convertions,
        clearConvertions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
