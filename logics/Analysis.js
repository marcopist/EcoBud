export function getCostPerPeriod(transaction, startDate, endDate) {
  if (transaction.ecoData.oneOff) {
    if (transaction.date >= startDate && transaction.date <= endDate) {
      return transaction.amount;
    }
    return 0;
  } else {
    const overlappingDays = Math.Max(
      0,
      Math.min(endDate, transaction.ecoData.endDate) -
        Math.max(startDate, transaction.ecoData.startDate)
    );
    const daysInPeriod = endDate - startDate;
    return (transaction.amount * overlappingDays) / daysInPeriod;
  }
}
