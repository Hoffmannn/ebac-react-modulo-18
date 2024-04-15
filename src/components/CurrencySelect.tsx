import React, { useContext } from "react";
import ReactSelect from "react-select";
import { AppContext, Currency } from "../contexts/appContext";

// import { Container } from './styles';

const CurrencySelect = ({
  currency,
  onChange,
}: {
  currency: Currency | null;
  onChange: (opt: Currency | null) => void;
}) => {
  const { currencies, isLoading } = useContext(AppContext);

  return (
    <div
      style={{
        colorScheme: "light",
        color: "#000",
      }}
    >
      <ReactSelect
        isLoading={isLoading}
        isSearchable
        getOptionLabel={(opt) =>
          [opt.value.toUpperCase(), opt.label].join(" - ")
        }
        options={currencies}
        value={currency}
        onChange={(opt) => onChange(opt)}
      />
    </div>
  );
};

export default CurrencySelect;
