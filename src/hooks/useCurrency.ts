import { useState, useEffect, useCallback } from 'react';
import { convertFromGNF } from '@/lib/currency';

const STORAGE_KEY = 'kasafrik_currency';
export const CURRENCY_CHANGE_EVENT = 'kasafrik-currency-change';

export function useCurrency() {
  const [currency, setCurrency] = useState('GNF');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'GNF';
    setCurrency(saved);

    const onCurrencyChange = (e: Event) => {
      setCurrency((e as CustomEvent<string>).detail);
    };

    window.addEventListener(CURRENCY_CHANGE_EVENT, onCurrencyChange);
    return () => window.removeEventListener(CURRENCY_CHANGE_EVENT, onCurrencyChange);
  }, []);

  const convert = useCallback(
    (amountGNF: number) => convertFromGNF(amountGNF, currency),
    [currency]
  );

  return { currency, convert };
}
