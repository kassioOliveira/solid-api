export class MaxnumberOfCheckInsError extends Error {
  constructor() {
    super('Max number of check-ins reached.')
  }
}
