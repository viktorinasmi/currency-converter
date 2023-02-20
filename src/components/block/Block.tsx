// @ts-ignore
import styles from "./Block.module.scss";

const defaultCurrencies = ["UAH", "USD", "EUR", "GBP"];

interface IBlock {
  value: string;
  currency: string;
  onChangeValue?: (e: any) => void;
  onChangeCurrency: (cur: any) => void;
}

export const Block = ({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
}: IBlock) => {
  return (
    <div className={styles.container}>
      <div className={styles.currencies}>
        {defaultCurrencies.map((cur) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            key={cur}
            className={currency === cur ? `${styles.active}` : ""}
          >
            {cur}
          </li>
        ))}
        <li>
          <svg height="50px" viewBox="0 0 50 50" width="50px">
            <rect fill="none" height="50" width="50" />
            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
          </svg>
        </li>
      </div>

      <input
        value={value}
        onChange={onChangeValue}
        type="number"
        placeholder="0"
        className={styles.input}
      />
    </div>
  );
};
