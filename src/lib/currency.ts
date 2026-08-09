export const EXCHANGE_RATES: Record<string, number> = {
  GNF: 14.33,    // 1 FCFA = 14.33 GNF
  XOF: 1,        // base FCFA
  USD: 0.00167,  // 1 FCFA = 0.00167 USD
  EUR: 0.00152,  // 1 FCFA = 0.00152 EUR
  MAD: 0.0167,   // 1 FCFA = 0.0167 MAD
};

export function convertFromGNF(amountFCFA: number, currency: string): string {
  const rate = EXCHANGE_RATES[currency] ?? 1;
  const converted = Math.round(amountFCFA * rate);
  return new Intl.NumberFormat('fr-FR').format(converted) + ' ' + currency;
}
