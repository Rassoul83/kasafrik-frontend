export const EXCHANGE_RATES: Record<string, number> = {
  GNF: 1,
  XOF: 0.0645, // 1 GNF = 0.0645 FCFA
  USD: 0.000116,
  EUR: 0.000108,
  MAD: 0.00116,
};

export function convertFromGNF(amountGNF: number, currency: string): string {
  const rate = EXCHANGE_RATES[currency] ?? 1;
  const converted = Math.round(amountGNF * rate);
  return new Intl.NumberFormat('fr-FR').format(converted) + ' ' + currency;
}
