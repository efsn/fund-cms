export function getDifferentOne(source: number[], other: number[]) {
  if (source.length < other.length) [source, other] = [other, source]
  while (source.length > 0) {
    const item = source.pop() || 0
    if (other.indexOf(item) === -1) {
      return item
      break
    }
  }
}
