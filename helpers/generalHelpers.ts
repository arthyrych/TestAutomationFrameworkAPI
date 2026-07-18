// shared: REST + GraphQL
// Note: please add new entities in alphabetical order

let emailCounter = 0

// unique per call - the counter guards same-millisecond calls (GoRest responds 422 to duplicate emails)
export function generateUniqueEmail(): string {
  return `test-email-${Date.now()}-${emailCounter++}@example.com`
}

export function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  const item = arr[randomIndex]
  return item
}
