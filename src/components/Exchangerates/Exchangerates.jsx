import { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";

import './index.css';

export default function Rates() {
  const [amountFrom, setAmountFrom] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [amountTo, setAmountTo] = useState(1);
  const [currencyTo, setCurrencyTo] = useState("USD");
  const { isLoading, data, error } = useFetch(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
  );
  const [convertedAmount, setConvertedAmount] = useState(1);
  console.log(data)
  useEffect(() => {
    if (data) {
      const rateFrom = data.find((item) => item.cc === currencyFrom)?.rate;
      const rateTo = data.find((item) => item.cc === currencyTo)?.rate;
      const convertedAmount =
        currencyFrom === "UAH"
          ? currencyTo === "UAH"
            ? amountFrom
            : Math.round((amountFrom / rateTo) * 100) / 100
          : Math.round((amountFrom / rateFrom) * rateTo * 100) / 100;
      setConvertedAmount(convertedAmount);
      setAmountTo(convertedAmount);
    }
  }, [amountFrom, currencyFrom, amountTo, currencyTo, data]);

  function changeCurrencyFrom(event) {
    setCurrencyFrom(event.target.value);
  }

  function changeAmountFrom(event) {
    setAmountFrom(event.target.value);
    if (data) {
      const rateFrom = data.find((item) => item.cc === currencyFrom)?.rate;
      const rateTo = data.find((item) => item.cc === currencyTo)?.rate;
      const convertedAmount =
        currencyFrom === "UAH"
          ? currencyTo === "UAH"
            ? event.target.value
            : Math.round((event.target.value / rateTo) * 100) / 100
          : Math.round((event.target.value / rateFrom) * rateTo * 100) / 100;
      setAmountTo(convertedAmount);
    }
    if (currencyFrom === "UAH" && currencyTo === "UAH") {
      setAmountTo(event.target.value);
    }
  }

  function changeCurrencyTo(event) {
    setCurrencyTo(event.target.value);
  }

  function changeAmountTo(event) {
    setAmountTo(event.target.value);
    if (data) {
      const rateFrom = data.find((item) => item.cc === currencyFrom)?.rate;
      const rateTo = data.find((item) => item.cc === currencyTo)?.rate;
      const convertedAmount =
        currencyTo === "UAH"
          ? currencyFrom === "UAH"
            ? event.target.value
            : Math.round(event.target.value * rateFrom * 100) / 100
          : Math.round((event.target.value / rateTo) * rateFrom * 100) / 100;
      setAmountFrom(convertedAmount);
    }
    if (currencyFrom === "UAH" && currencyTo === "UAH") {
      setAmountFrom(event.target.value);
    }
  }

  console.log(convertedAmount);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">Калькулятор валют</h2>
        <div className="main__content">
          <div className="main__content-item">
            <div className="input__holder">
              <input
                className="input__value"
                id="amountFrom"
                type="number"
                value={amountFrom}
                onChange={changeAmountFrom}
              />
            </div>
            <div className="select__holder">
              <select className="select" value={currencyFrom} onChange={changeCurrencyFrom}>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div className="main__content-item">
            <div className="input__holder">
              <input
                className="input__value"
                id="amountTo"
                type="number"
                value={amountTo}
                onChange={changeAmountTo}
              />
            </div>
            <div className="select__holder">
              <select className="select" value={currencyTo} onChange={changeCurrencyTo}>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
