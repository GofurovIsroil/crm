export const convertCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(+amount);
};
