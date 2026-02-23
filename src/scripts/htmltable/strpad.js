export default function (str, amount, padStr) {
  if (str.length < amount) {
    str += new Array(amount - str.length).join(padStr || " ");
  }
  return str;
}
