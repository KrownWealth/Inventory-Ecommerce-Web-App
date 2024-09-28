const FormattedPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2,
  }).format(price);
};

export default FormattedPrice;
