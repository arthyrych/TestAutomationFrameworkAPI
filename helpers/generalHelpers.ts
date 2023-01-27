// Note: please add new entities in alphabetical order

export function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  const item = arr[randomIndex]
  return item
}
