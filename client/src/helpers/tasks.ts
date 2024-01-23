export const parseBudget = (minBudget: number, maxBudget: number) => {
  const formatNumber = (number: number) => {
    return number.toLocaleString("ru-RU");
  };

  if (minBudget == maxBudget) {
    return formatNumber(maxBudget);
  } else {
    return `${formatNumber(minBudget)} - ${formatNumber(maxBudget)}`;
  }
};
