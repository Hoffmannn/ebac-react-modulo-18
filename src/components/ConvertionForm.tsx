import React, { useContext, useState } from "react";
import { AppContext, Currency } from "../contexts/appContext";
import CurrencySelect from "./CurrencySelect";

// import { Container } from './styles';

const ConvertionForm: React.FC = () => {
  const { handleConvertion } = useContext(AppContext);

  const [currencyA, setCurrencyA] = useState<Currency | null>(null);
  const [currencyB, setCurrencyB] = useState<Currency | null>(null);
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!currencyA || !currencyB) {
      setError("Preencha ambas as moedas para realizar a conversão");
    } else {
      handleConvertion(currencyA, currencyB, amount);
    }
  };

  return (
    <form onSubmit={handleConvert} className="ConvertionForm">
      <label>Converter de</label>
      <CurrencySelect
        currency={currencyA}
        onChange={(opt) => setCurrencyA(opt)}
      />

      <label>para</label>
      <CurrencySelect
        currency={currencyB}
        onChange={(opt) => setCurrencyB(opt)}
      />

      <label>Quantidade a ser convertida</label>
      <input
        type="number"
        step=".01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
      />
      <button type="submit">Converter</button>

      {error && <p style={{ color: "#f00" }}>{error}</p>}
    </form>
  );
};

export default ConvertionForm;
