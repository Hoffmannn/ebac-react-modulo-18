import React, { useContext } from "react";
import { AppContext, Currency } from "../contexts/appContext";

// import { Container } from './styles';

const PreviousConvertions: React.FC = () => {
  const { convertions, clearConvertions } = useContext(AppContext);

  const formatCurrency = (currency: Currency, amount: number) => {
    try {
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: currency.value,
      });
      return formatter.format(amount);
    } catch (error) {
      return `${currency.label || currency.value} - ${amount}`;
    }
  };

  return (
    <div className="PreviousConvertions">
      <h2>Conversões realizadas</h2>
      <ul>
        {convertions.map((convertion) => (
          <li>
            {formatCurrency(convertion.currencyA, convertion.amount)} para{" "}
            {convertion.currencyB.label ||
              convertion.currencyB.value.toUpperCase()}
            : {formatCurrency(convertion.currencyB, convertion.result)}
          </li>
        ))}
      </ul>
      {convertions.length > 0 ? (
        <button onClick={() => clearConvertions()}>Limpar resultados</button>
      ) : (
        <h3>Nenhuma conversão realizada</h3>
      )}
    </div>
  );
};

export default PreviousConvertions;
