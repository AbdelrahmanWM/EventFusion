export default function convertToSubcurrency(amount: number, factor = 100) {
  // Ensure the amount is at least 50 cents (0.50)
  const safeAmount = Math.max(0.5, amount);
  return Math.round(safeAmount * factor);
}
