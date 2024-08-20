export function formatNumber(amount: number, prefix: string = '', suffix: string = ''): string {
  if (amount >= 1_000_000_000) {
    return `${prefix}${(amount / 1_000_000_000).toLocaleString()}B${suffix}`;
  } else if (amount >= 1_000_000) {
    return `${prefix}${(amount / 1_000_000).toLocaleString()}M${suffix}`;
  } else {
    return `${prefix}${amount.toLocaleString()}${suffix}`;
  }
}
