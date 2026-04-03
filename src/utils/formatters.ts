// src/utils/formatters.ts
export const formatCurrency = (amount: number) => {
  // Fixed: Switched from en-US/USD to en-IN/INR
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};