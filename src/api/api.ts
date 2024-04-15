import axios from "axios";

export const fetchCurrencies = async () => {
  const response = await axios.get(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
  );
  return response.data;
};

export const fetchExchangeValues = async (currency: string) => {
  const response = await axios.get(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
  );
  return response.data;
};
