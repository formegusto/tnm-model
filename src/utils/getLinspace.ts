export function getLinspace(
  start: number,
  end: number,
  cardinality: number
): number[] {
  const arr: number[] = [];
  const step = (end - start) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) arr.push(start + step * i);

  return arr;
}
