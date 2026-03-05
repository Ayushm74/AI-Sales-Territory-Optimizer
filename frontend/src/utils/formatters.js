export function currency(value) {
  return "$" + Number(value).toLocaleString();
}