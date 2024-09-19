
export function formatCurrencyString({ value, currency }:{value: number, currency?:string}) {
  console.log('formatCurrencyString', value, currency);
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency? currency : 'USD',
  });
  return numberFormat.format(value/100);
}