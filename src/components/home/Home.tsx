import { Block } from "../block";
// @ts-ignore
import styles from "./Home.module.scss";
import { useEffect, useRef, useState } from "react";

interface IRate {
  [key: string]: number;
}

export const Home = () => {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  // const [rates, setRates] = useState<IRate>({}); //так как, асинхронная меняем на useRef
  const ratesRef = useRef<IRate>({});

  //Получение курса валют с банка цб
  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        const value = 1;
        const result = calculateToPrice(value);
        // @ts-ignore
        setToPrice(result.toFixed(2));
        setFromPrice(value);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const calculateToPrice = (value: number) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];

    return result;
  };

  const calculateFromPrice = (value: number) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;

    return result;
  };

  const onChangeFromPrice = (e: any) => {
    let value = e?.target?.value;
    value = Number(value);
    const result = calculateToPrice(value);
    // const price = value / rates[fromCurrency];
    // const result = price * rates[toCurrency];
    // console.log({ fromCurrency });
    // console.log({ to: rates[toCurrency], from: rates[fromCurrency] });
    // console.log({ price, result });
    // @ts-ignore
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  };

  const onChangeToPrice = (e: any) => {
    console.log(onChangeToPrice);
    let value = e?.target?.value;
    value = Number(value);
    const result = calculateFromPrice(value);
    // const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    // @ts-ignore
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  };

  //Доработка, чтобы при изменении валюты происходила замена в режиме реального времени

  useEffect(() => {
    // onChangeFromPrice(fromPrice);
    const result = calculateToPrice(fromPrice).toFixed(2);
    // @ts-ignore
    setToPrice(result);
    setFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    // onChangeToPrice(toPrice);
    const result = calculateFromPrice(toPrice).toFixed(2);
    // @ts-ignore
    setFromPrice(result);
    setToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className={styles.container}>
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
};
