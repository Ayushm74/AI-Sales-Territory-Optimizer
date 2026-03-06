export const currency = (value) => {
  const num = Number(value || 0);
  return num.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
};

export const number = (value) => {
  const num = Number(value || 0);
  return num.toLocaleString();
};

export default { currency, number };


