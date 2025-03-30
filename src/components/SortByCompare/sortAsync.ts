async function mergeSorted<T>(
  listA: T[],
  listB: T[],
  comparator: (a: T, b: T) => Promise<number> | number,
): Promise<T[]> {
  let aIndex = 0
  let bIndex = 0
  const result: T[] = []

  while (aIndex < listA.length && bIndex < listB.length) {
    const a = listA[aIndex]
    const b = listB[bIndex]

    const value = await comparator(a, b)

    if (value >= 0) {
      result.push(a)
      aIndex += 1
    } else {
      result.push(b)
      bIndex += 1
    }
  }

  if (aIndex < listA.length) {
    result.push(...listA.slice(aIndex))
  } else if (bIndex < listB.length) {
    result.push(...listB.slice(bIndex))
  }

  return result
}

export async function sortAsync<T>(
  list: T[],
  comparator: (a: T, b: T) => Promise<number> | number,
): Promise<T[]> {
  const n = list.length

  if (n <= 1) return list

  const halfIndex = Math.floor(n / 2)

  const firstHalf = list.slice(0, halfIndex)
  const secondHalf = list.slice(halfIndex)

  return mergeSorted(
    await sortAsync(firstHalf, comparator),
    await sortAsync(secondHalf, comparator),
    comparator,
  )
}
