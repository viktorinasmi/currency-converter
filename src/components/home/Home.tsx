import { Block } from "../block";
// @ts-ignore
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { URL } from "../API";
import { json } from "stream/consumers";

interface IRate {
  [key: string]: number;
}

export const Home = () => {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");

  const [rates, setRates] = useState<IRate>({});

  //Получение курса валют с банка цб
  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
        console.log(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (e: any) => {
    let { value } = e.target;
    value = Number(value);
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    // console.log({ fromCurrency });
    // console.log({ to: rates[toCurrency], from: rates[fromCurrency] });
    // console.log({ price, result });
    setToPrice(result.toString());
    setFromPrice(value);
  };

  const onChangeToPrice = (e: any) => {
    let { value } = e.target;
    const price = value / rates[toCurrency];
    const result = price * rates[fromCurrency];
    value = Number(value);
    setFromPrice(result.toString());
    setToPrice(value);
  };

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
