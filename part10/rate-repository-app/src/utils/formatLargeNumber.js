export const formatLargeNumber = (num) => {
  // eslint-disable-next-line no-undef
  const formatNum = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num)

  return formatNum
}
