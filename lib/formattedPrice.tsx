
const FormattedPrice = (price: string): string => {
  const priceNumber = parseFloat(price);
   return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceNumber);

};

export default FormattedPrice;
